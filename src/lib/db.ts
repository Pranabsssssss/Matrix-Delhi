import mysql from "mysql2/promise";
import crypto from "crypto";

export interface Student {
  id: number;
  name: string;
  email: string;
  team_name: string;
  qr_token: string;
  has_attended: number;
  scanned_at: string | null;
  created_at?: string;
}

const dbConfig = {
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "",
  database: process.env.DB_NAME || "matrixdelhi",
  port: Number(process.env.DB_PORT) || 3306,
  connectTimeout: 5000,
  dateStrings: true,
};

let pool: mysql.Pool | null = null;

function getPool(): mysql.Pool {
  if (!pool) {
    pool = mysql.createPool({
      ...dbConfig,
      waitForConnections: true,
      connectionLimit: 10,
      queueLimit: 0,
    });
  }
  return pool;
}

// Generate current timestamp in GMT+5:30 (Indian Standard Time)
export function getISTDatetimeString(): string {
  const d = new Date();
  const formatter = new Intl.DateTimeFormat("sv-SE", {
    timeZone: "Asia/Kolkata",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hourCycle: "h23",
  });
  return formatter.format(d);
}

// Generate secure QR Token
export function generateQrToken(): string {
  return `MD2026-${crypto.randomBytes(8).toString("hex").toUpperCase()}`;
}

/**
 * Check if an email exists ANYWHERE in the registrations_csv table.
 * Searches every text column — leader_email, member_email, form_email,
 * and literally every other column in case someone pasted an email there.
 */
async function emailExistsInCsvTable(email: string): Promise<{ found: boolean; name: string; teamName: string }> {
  const p = getPool();
  const cleanEmail = email.trim().toLowerCase();

  // Search the 3 email columns first (most likely matches)
  const [rows]: any = await p.query(
    `SELECT leader_name, member_name, team_name, leader_email, member_email, form_email
     FROM registrations_csv
     WHERE LOWER(TRIM(leader_email)) = ?
        OR LOWER(TRIM(member_email)) = ?
        OR LOWER(TRIM(form_email)) = ?
     LIMIT 1`,
    [cleanEmail, cleanEmail, cleanEmail]
  );

  if (rows && rows.length > 0) {
    const row = rows[0];
    // Figure out which name to use based on which email matched
    let matchedName = row.leader_name || "Participant";
    if (row.member_email && row.member_email.trim().toLowerCase() === cleanEmail) {
      matchedName = row.member_name || row.leader_name || "Participant";
    }
    return { found: true, name: matchedName.trim(), teamName: (row.team_name || "Participant").trim() };
  }

  // Fallback: brute-force search ALL columns for the email string
  const allCols = [
    "timestamp_col", "team_name", "team_size", "school_name",
    "leader_name", "leader_class", "leader_email", "leader_whatsapp",
    "leader_gender", "leader_github", "leader_emergency",
    "member_name", "member_class", "member_email", "member_whatsapp",
    "member_gender", "member_github", "member_emergency",
    "agreement", "form_email",
  ];

  const conditions = allCols.map((col) => `LOWER(TRIM(\`${col}\`)) = ?`).join(" OR ");
  const params = allCols.map(() => cleanEmail);

  const [broadRows]: any = await p.query(
    `SELECT leader_name, member_name, team_name FROM registrations_csv WHERE ${conditions} LIMIT 1`,
    params
  );

  if (broadRows && broadRows.length > 0) {
    const row = broadRows[0];
    return { found: true, name: (row.leader_name || row.member_name || "Participant").trim(), teamName: (row.team_name || "Participant").trim() };
  }

  return { found: false, name: "", teamName: "" };
}

/**
 * Main registration flow:
 * 1. Check if email exists anywhere in registrations_csv
 * 2. If not found → return null (access denied)
 * 3. If found → check if already in attendance_students (return existing)
 * 4. If not in attendance_students → create new entry with QR token
 */
export async function createOrGetStudent(data: {
  name: string;
  email: string;
}): Promise<Student | null> {
  const p = getPool();
  const cleanEmail = data.email.trim().toLowerCase();
  const cleanName = data.name.trim();

  // 1. Check if email exists in raw CSV table
  const lookup = await emailExistsInCsvTable(cleanEmail);
  if (!lookup.found) {
    return null; // Access denied — email not in pre-registered CSV
  }

  // 2. Check if already registered in attendance_students
  const [existing]: any = await p.query(
    "SELECT * FROM attendance_students WHERE LOWER(email) = ?",
    [cleanEmail]
  );

  if (existing && existing.length > 0) {
    const student = existing[0] as Student;
    return student;
  }

  // 3. HARD LIMIT CHECK: Maximum 143 attendees can register and claim QR passes
  const [countRows]: any = await p.query("SELECT COUNT(*) as count FROM attendance_students");
  const currentCount = countRows && countRows[0] ? Number(countRows[0].count) : 0;
  if (currentCount >= 143) {
    throw new Error("CAPACITY_REACHED");
  }

  // 4. Create new attendance record
  const finalName = cleanName || lookup.name;
  const token = generateQrToken();
  const istNow = getISTDatetimeString();

  const [result]: any = await p.query(
    `INSERT INTO attendance_students (name, email, team_name, qr_token, has_attended, created_at)
     VALUES (?, ?, ?, ?, 0, ?)`,
    [finalName, cleanEmail, lookup.teamName, token, istNow]
  );

  return {
    id: result.insertId,
    name: finalName,
    email: cleanEmail,
    team_name: lookup.teamName,
    qr_token: token,
    has_attended: 0,
    scanned_at: null,
    created_at: istNow,
  };
}

// Find student by Email (in attendance_students)
export async function getStudentByEmail(email: string): Promise<Student | null> {
  const p = getPool();
  const cleanEmail = email.trim().toLowerCase();
  const [rows]: any = await p.query(
    "SELECT * FROM attendance_students WHERE LOWER(email) = ?",
    [cleanEmail]
  );
  if (rows && rows.length > 0) return rows[0] as Student;
  return null;
}

// Find student by QR Token (in attendance_students)
export async function getStudentByToken(token: string): Promise<Student | null> {
  const p = getPool();
  const cleanToken = token.trim();
  const [rows]: any = await p.query(
    "SELECT * FROM attendance_students WHERE qr_token = ?",
    [cleanToken]
  );
  if (rows && rows.length > 0) return rows[0] as Student;
  return null;
}

// Mark Attendance (0 → 1) with direct GMT+5:30 timestamp
export async function markAttendance(token: string): Promise<{
  status: "success" | "already_scanned" | "invalid_token";
  student: Student | null;
}> {
  const student = await getStudentByToken(token);
  if (!student) {
    return { status: "invalid_token", student: null };
  }
  if (student.has_attended === 1) {
    return { status: "already_scanned", student };
  }

  const istNow = getISTDatetimeString();
  const p = getPool();
  await p.query(
    "UPDATE attendance_students SET has_attended = 1, scanned_at = ? WHERE qr_token = ?",
    [istNow, token.trim()]
  );

  student.has_attended = 1;
  student.scanned_at = istNow;
  return { status: "success", student };
}

// Get All Students (attendance_students) for Admin Dashboard
export async function getAllStudents(): Promise<Student[]> {
  const p = getPool();
  const [rows]: any = await p.query(
    "SELECT * FROM attendance_students ORDER BY created_at DESC"
  );
  if (rows && Array.isArray(rows)) return rows as Student[];
  return [];
}

export interface ProjectSubmission {
  id: number;
  team_name: string;
  submitter_name: string;
  submitter_email: string;
  submitter_role: "leader" | "member";
  vercel_url: string;
  github_url: string;
  instagram_id?: string;
  description: string;
  submitted_at: string;
  updated_at?: string;
}

export async function submitProject(data: {
  name: string;
  email: string;
  vercelUrl: string;
  githubUrl: string;
  instagramId?: string;
  description: string;
}): Promise<{ success: boolean; submission?: ProjectSubmission; error?: string }> {
  const p = getPool();
  const cleanEmail = data.email.trim().toLowerCase();
  const cleanName = data.name.trim();
  const cleanInsta = (data.instagramId || "").trim();

  // 1. Verify attendance in attendance_students table
  const [attRows]: any = await p.query(
    "SELECT * FROM attendance_students WHERE LOWER(TRIM(email)) = ?",
    [cleanEmail]
  );

  if (!attRows || attRows.length === 0) {
    return {
      success: false,
      error: "Access Denied: Your email address was not found in the registered attendance database. Only registered attendees can submit.",
    };
  }

  const student = attRows[0] as Student;

  // 2. Check if student has attended today (has_attended === 1)
  if (student.has_attended !== 1) {
    return {
      success: false,
      error: "Access Denied: You must be marked present at the event today before submitting your project.",
    };
  }

  // 3. Verify Name match
  if (cleanName.toLowerCase() !== student.name.trim().toLowerCase()) {
    return {
      success: false,
      error: `Name Mismatch: Your entered name ("${cleanName}") does not match your registered attendance name ("${student.name}").`,
    };
  }

  // 4. Determine Leader/Member role & check Leader attendance from registrations_csv
  const [teamRows]: any = await p.query(
    `SELECT leader_name, leader_email, member_name, member_email, team_name, form_email
     FROM registrations_csv
     WHERE LOWER(TRIM(leader_email)) = ?
        OR LOWER(TRIM(member_email)) = ?
        OR LOWER(TRIM(form_email)) = ?
     LIMIT 1`,
    [cleanEmail, cleanEmail, cleanEmail]
  );

  let submitterRole: "leader" | "member" = "leader";
  let teamName = student.team_name || "Participant";

  if (teamRows && teamRows.length > 0) {
    const team = teamRows[0];
    teamName = team.team_name || teamName;
    const leaderEmail = (team.leader_email || team.form_email || "").trim().toLowerCase();
    const memberEmail = (team.member_email || "").trim().toLowerCase();

    const isLeader = cleanEmail === leaderEmail;
    const isMember = memberEmail && cleanEmail === memberEmail && !isLeader;

    if (isMember) {
      // Submitter is Team Member. Check if Leader is present today!
      const [leaderAttRows]: any = await p.query(
        "SELECT has_attended FROM attendance_students WHERE LOWER(TRIM(email)) = ?",
        [leaderEmail]
      );
      const leaderIsPresent = leaderAttRows && leaderAttRows.length > 0 && leaderAttRows[0].has_attended === 1;

      if (leaderIsPresent) {
        return {
          success: false,
          error: `Submission Restricted: Your team leader (${team.leader_name || leaderEmail}) is marked present today. Only the team leader is authorized to submit the project when present.`,
        };
      }

      submitterRole = "member";
    } else {
      submitterRole = "leader";
    }
  }

  // 5. Ensure project_submissions table exists and has instagram_id column
  await p.query(`
    CREATE TABLE IF NOT EXISTS project_submissions (
      id INT AUTO_INCREMENT PRIMARY KEY,
      team_name VARCHAR(255) NOT NULL,
      submitter_name VARCHAR(255) NOT NULL,
      submitter_email VARCHAR(255) NOT NULL,
      submitter_role VARCHAR(50) NOT NULL,
      vercel_url VARCHAR(500) NOT NULL,
      github_url VARCHAR(500) NOT NULL,
      instagram_id VARCHAR(255) DEFAULT '',
      description TEXT NOT NULL,
      submitted_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
      UNIQUE KEY unique_team (team_name)
    )
  `);

  try {
    await p.query("ALTER TABLE project_submissions ADD COLUMN instagram_id VARCHAR(255) DEFAULT ''");
  } catch (e) {
    // Column already exists, ignore
  }

  const istNow = getISTDatetimeString();

  await p.query(
    `INSERT INTO project_submissions (team_name, submitter_name, submitter_email, submitter_role, vercel_url, github_url, instagram_id, description, submitted_at)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
     ON DUPLICATE KEY UPDATE
       submitter_name = VALUES(submitter_name),
       submitter_email = VALUES(submitter_email),
       submitter_role = VALUES(submitter_role),
       vercel_url = VALUES(vercel_url),
       github_url = VALUES(github_url),
       instagram_id = VALUES(instagram_id),
       description = VALUES(description),
       updated_at = VALUES(submitted_at)`,
    [teamName, cleanName, cleanEmail, submitterRole, data.vercelUrl.trim(), data.githubUrl.trim(), cleanInsta, data.description.trim(), istNow]
  );

  return {
    success: true,
    submission: {
      id: 0,
      team_name: teamName,
      submitter_name: cleanName,
      submitter_email: cleanEmail,
      submitter_role: submitterRole,
      vercel_url: data.vercelUrl.trim(),
      github_url: data.githubUrl.trim(),
      instagram_id: cleanInsta,
      description: data.description.trim(),
      submitted_at: istNow,
    },
  };
}

export async function getAllProjectSubmissions(): Promise<ProjectSubmission[]> {
  const p = getPool();
  try {
    const [rows]: any = await p.query(
      "SELECT * FROM project_submissions ORDER BY submitted_at DESC"
    );
    if (rows && Array.isArray(rows)) return rows as ProjectSubmission[];
    return [];
  } catch (err) {
    return [];
  }
}

