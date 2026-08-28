# ⚡ MATRIX DELHI 2026 — Official Event Platform

> **The complete web platform, registration verification engine, volunteer QR attendance scanner, and live hackathon management system that powered Matrix Delhi 2026.**

![Next.js](https://img.shields.io/badge/Next.js-16.3.1-black?style=for-the-badge&logo=next.js)
![React](https://img.shields.io/badge/React-19-blue?style=for-the-badge&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-38B2AC?style=for-the-badge&logo=tailwind-css)
![MySQL](https://img.shields.io/badge/MySQL-Database-4479A1?style=for-the-badge&logo=mysql&logoColor=white)
![Framer Motion](https://img.shields.io/badge/Framer_Motion-13.0-FF0055?style=for-the-badge&logo=framer)

---

## 📌 Overview

**Matrix Delhi 2026** was an exclusive Under-18 / High School Web Development Hackathon hosted at **CM Shri School, Sector 10, Dwarka, New Delhi**. Over 100+ student developers gathered for 12 hours of rapid building, deploying, and competing with modern web technologies.

This repository contains the complete source code for the platform that ran the entire event lifecycle:
1. **Public Event Portal** — Cyberpunk-themed landing page, prize breakdown, interactive schedule, and venue guide.
2. **Attendance Pass Engine** — Pre-registered applicant verification, 143-attendee hard-limit control, and unique QR pass generation.
3. **Volunteer PWA Scanner** — In-browser camera barcode/QR scanner for rapid gate check-ins with GMT+5:30 IST timestamping.
4. **Admin Control Center** — Password-protected operations dashboard with real-time stats, team filtering, and attendance management.
5. **Project Submission Pipeline** — Verified live submission portal checking attendee presence and team leader permissions before accepting Vercel & GitHub links.

---

## 💡 Background & Origin: From Google Forms to Custom Platform

Due to strict time constraints and rapid event organization, **participant registrations were initially collected in a hurry using Google Forms**. 

As registration numbers surged and the event approached, managing gate check-ins, age verification, duplicate submissions, and attendance tracking solely through manual spreadsheets was no longer viable. 

To solve this efficiently:
1. **Data Ingestion**: The raw applicant responses from the Google Forms CSV export were sanitized and imported directly into a relational MySQL database table (`registrations_csv`).
2. **Platform Engineering**: This custom Next.js 16 web application was built to interface with that dataset, providing:
   - **Automated Verification**: Students claim digital passes by validating their name and email against the imported Google Forms records.
   - **Capacity Protection**: A hard-coded cap of 143 attendees was enforced to prevent hall overcrowding.
   - **Dynamic QR Code Generation**: Unique cryptographic tokens (`MD2026-XXXXXXXX`) were generated for each verified attendee.
   - **Live Gate Check-in & Submissions**: Volunteers scanned QR codes at the gate using the built-in PWA camera scanner, and only physically checked-in teams were unlocked to submit their projects.

---

## 🚀 Key Features

### 🎟️ 1. Smart Attendee Registration & QR Pass Claiming
- **Pre-Registration Verification**: Users enter their real name and registered email. The backend scans the pre-approved applicant dataset (`registrations_csv`) across all member, leader, and form fields.
- **Hard-Capped Capacity**: Enforces a strict maximum limit of 143 registered attendees to maintain venue safety and seating constraints.
- **Unique Digital Pass**: Generates high-entropy tokenized QR passes (`MD2026-XXXXXXXX`) with client-side canvas rendering and save-to-device capabilities.

### 📱 2. Volunteer QR Attendance Scanner (`/event/scan`)
- **PWA Mobile Camera Scanner**: Built with `html5-qrcode` to enable event volunteers to scan attendee QR codes directly from their phones.
- **Instantaneous Check-in**: Validates passes against the database, records GMT+5:30 IST scan timestamps, and prevents duplicate check-ins with clear audio-visual feedback.
- **Session Protection**: Cookie-based authentication preventing unauthorized scanning.

### 📊 3. Real-Time Admin Operations Dashboard (`/event/admin`)
- **Live Event Metrics**: Real-time KPI cards displaying Total Registered, Total Present, Total Absent, Attendance Rate %, and Project Submissions Count.
- **Search & Filter**: Search by attendee name, email, or team name; filter by check-in status; and execute manual check-in overrides.
- **Submission Tracking**: Live view of all project submissions with direct links to live Vercel deployments, GitHub repositories, and submitter credentials.

### 💻 4. Live Hackathon Project Submission (`/submit`)
- **Presence Verification**: Rejects submissions from any participant who has not been physically checked in at the venue.
- **Team Leader Enforcement**: If a team leader is marked present, team members are restricted from submitting duplicate entries, ensuring only one authoritative project per team.
- **Live URL Validation**: Strict protocol validation for deployed Vercel URLs, public GitHub repositories, and Instagram handles.

### 🎨 5. Cyberpunk Design System
- **Theme Support**: Seamless Light & Dark mode support powered by CSS variables and Tailwind CSS v4.
- **Interactive Parallax**: Dynamic cursor-driven parallax glow and background animations built with Framer Motion.
- **Modern Typography & UI**: High-contrast cyberpunk styling featuring custom geometric badges, animated glowing borders, and accessible SVGs.

---

## 🛠️ Tech Stack

| Layer | Technology |
| :--- | :--- |
| **Framework** | [Next.js 16 (App Router)](https://nextjs.org/) with Turbopack |
| **UI Library** | [React 19](https://react.dev/) |
| **Styling** | [Tailwind CSS v4](https://tailwindcss.com/) & [PostCSS](https://postcss.org/) |
| **Animations** | [Framer Motion](https://www.framer.com/motion/) |
| **Database** | [MySQL 8.0](https://www.mysql.com/) via `mysql2/promise` connection pooling |
| **QR Engine** | [`qrcode`](https://www.npmjs.com/package/qrcode) & [`html5-qrcode`](https://www.npmjs.com/package/html5-qrcode) |
| **Type Safety** | [TypeScript 5](https://www.typescriptlang.org/) |

---

## 🗄️ Database Schema

The platform utilizes three primary MySQL tables:

```sql
-- 1. Pre-registered Applicants (Imported from Google Form CSV)
CREATE TABLE IF NOT EXISTS registrations_csv (
  id INT AUTO_INCREMENT PRIMARY KEY,
  timestamp_col VARCHAR(255),
  team_name VARCHAR(255),
  team_size VARCHAR(50),
  school_name VARCHAR(255),
  leader_name VARCHAR(255),
  leader_class VARCHAR(50),
  leader_email VARCHAR(255),
  leader_whatsapp VARCHAR(50),
  leader_gender VARCHAR(50),
  leader_github VARCHAR(255),
  leader_emergency VARCHAR(50),
  member_name VARCHAR(255),
  member_class VARCHAR(50),
  member_email VARCHAR(255),
  member_whatsapp VARCHAR(50),
  member_gender VARCHAR(50),
  member_github VARCHAR(255),
  member_emergency VARCHAR(50),
  agreement VARCHAR(50),
  form_email VARCHAR(255)
);

-- 2. Live Claimed Attendance Passes & Check-in Records
CREATE TABLE IF NOT EXISTS attendance_students (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  team_name VARCHAR(255) NOT NULL,
  qr_token VARCHAR(100) NOT NULL UNIQUE,
  has_attended TINYINT(1) DEFAULT 0,
  scanned_at VARCHAR(100) DEFAULT NULL,
  created_at VARCHAR(100) NOT NULL
);

-- 3. Live Hackathon Project Submissions
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
  submitted_at VARCHAR(100) DEFAULT NULL,
  updated_at VARCHAR(100) DEFAULT NULL,
  UNIQUE KEY unique_team (team_name)
);
```

---

## 📂 Project Structure

```
Matrix-Delhi/
├── public/
│   ├── images/
│   │   ├── aerochrome.svg       # Official System Design Partner Logo
│   │   ├── cms.webp             # Official Venue Partner Logo
│   │   ├── hero-bg.webp         # Light theme hero background
│   │   ├── hero-black-bg.webp   # Dark theme hero background
│   │   ├── school-bg.webp       # Venue campus background
│   │   └── tech/                # Tech stack SVG icons
│   ├── logo.svg
│   └── favicon.svg
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   └── event/
│   │   │       ├── admin/       # Admin statistics & attendance override API
│   │   │       ├── auth/        # Volunteer & Admin session auth API
│   │   │       ├── register/    # CSV validation & pass claiming API
│   │   │       ├── scan/        # QR Code check-in scan API
│   │   │       ├── student/     # Student pass lookup API
│   │   │       └── submit/      # Project submission & presence verification API
│   │   ├── coc/                 # Code of Conduct page
│   │   ├── event/               # Event portal & Pass landing page
│   │   │   ├── admin/           # Admin live operations dashboard
│   │   │   ├── qr/              # Digital QR pass viewer
│   │   │   └── scan/            # Volunteer PWA camera scanner
│   │   ├── instructions/        # Participant guidelines & venue transport info
│   │   ├── register/            # Attendee pass claiming page
│   │   ├── submit/              # Live project submission page
│   │   ├── why-cm-shri/         # Venue partner highlight page
│   │   ├── layout.tsx           # Root layout & Theme provider
│   │   ├── page.tsx             # Main event landing page
│   │   └── globals.css          # Global styling & Tailwind v4 theme
│   ├── components/              # Modular UI components (Navbar, Hero, Prizes, etc.)
│   ├── hooks/                   # Custom React hooks (registration timer, etc.)
│   └── lib/
│       └── db.ts                # MySQL database connection pool & helper methods
├── .env.example                 # Environment variables configuration template
├── next.config.ts               # Next.js compiler & routing configuration
├── package.json                 # Project dependencies & scripts
├── tsconfig.json                # TypeScript compiler configuration
└── README.md                    # Project documentation
```

---

## ⚙️ Getting Started

### Prerequisites
- **Node.js**: `v20.x` or higher
- **npm** or **pnpm** / **yarn**
- **MySQL**: `v8.0` or higher

### 1. Clone the Repository
```bash
git clone https://github.com/Pranabsssssss/Matrix-Delhi.git
cd Matrix-Delhi
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Configure Environment Variables
Copy `.env.example` to create `.env.local`:
```bash
cp .env.example .env.local
```

Open `.env.local` and configure your database credentials and passcodes:
```env
# Database Credentials
DB_HOST=your_database_host_here
DB_USER=your_database_username_here
DB_PASSWORD=your_database_password_here
DB_NAME=your_database_name_here
DB_PORT=3306

# Protected Access Passcodes
VOLUNTEER_PASSWORD=your_volunteer_password_here
ADMIN_PASSWORD=your_admin_password_here
EVENT_SECRET=your_jwt_secret_key_here
```

### 4. Run Development Server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to view the application.

### 5. Build for Production
```bash
npm run build
npm run start
```

---

## 🛡️ Security & Privacy Notice

- **Zero Baked Credentials**: All database connection strings, JWT secrets, and admin passcodes are read strictly from environment variables (`.env.local`).
- **Input Sanitization & Parameterized Queries**: All database queries use parameterized prepared statements via `mysql2` to prevent SQL injection vulnerabilities.
- **Presence-Gated Submissions**: Submissions are strictly verified against the database to confirm that the submitter is marked present at the venue before accepting entries.

---

## 🤝 Partners & Acknowledgements

- **Official System Design Partner**: [Aerochrome](https://www.aerochrome.in/)
- **Official Venue Partner**: CM Shri School, Sector 10, Dwarka, New Delhi
- **Lead Organiser**: Pranab Saini
- **Organising Team & Volunteers**: Matrix Delhi 2026 Core Team

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).
