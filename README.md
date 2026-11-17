# TNPSC SuccessPoint v2.0 (Modernized Remake)

**TNPSC SuccessPoint** is an educational web application and Computer-Based Test (CBT) simulator built for Tamil Nadu Public Service Commission (TNPSC) competitive exam aspirants (Group 1, Group 2/2A, and Group 4 & VAO).

Designed and engineered by **Pugazharasu A. (TINT Solutions)**.

---

## 🌟 Key Features

### 1. 🖥️ Computer-Based Test (CBT) Simulator
- **Real-Time Countdown Timer**: Timed practice mimicking official TNPSC exam conditions.
- **Dynamic Question Palette**:
  - 🟩 Answered Questions
  - 🟪 Marked for Review
  - 🟥 Skipped / Unvisited
- **Bilingual Interface**: Seamlessly toggle between **தமிழ் (Tamil)** and **English**.
- **Exam Standard Modules**:
  - *Group 4 & VAO Full Mock Exam*
  - *பொதுத்தமிழ் - இலக்கியம் & திருக்குறள் சிறப்புத் தேர்வு*
  - *Aptitude & Mental Ability Shortcut Sprint*
  - *Indian Polity & Tamil Nadu Administration (Unit 8 & 9)*

### 2. 📊 Instant Scorecard & In-Depth Review
- Instant scoring calculation according to TNPSC mark schemes.
- Accuracy percentage, question-by-question breakdown, and celebratory effects.
- Step-by-step explanations referencing Samacheer Kalvi school textbooks.

### 3. 🔥 Daily Practice Booster & Streak Tracker
- 5 quick questions of the day covering Tamil, Aptitude, Polity, and Current Affairs.
- Gamified experience points (+50 XP) and daily practice streak counter to foster consistent study habits.

### 4. 📚 Curated Study Materials & PYQ Hub
- Searchable directory of revision guides, Samacheer Kalvi digests, formula handbooks, and previous year question papers.
- Simulated one-click downloads with live user counters and category filtering.

### 5. 🎯 Unit-Wise Syllabus Tracker
- Interactive checklist covering official TNPSC syllabus units (SSLC & Degree standards).
- Real-time progress bar calculation and local persistence across browser sessions.

### 6. 💬 Peer Doubt-Clearing Community Forum
- Ask questions, share problem-solving shortcuts, and debate solutions.
- Upvoting system, subject tags (`#திருக்குறள்`, `#Aptitude`, `#Unit8`), and **Verified Faculty** response badges.

### 7. 🛡️ Role-Based Access Control (Admin & Aspirant)
- One-click role switcher in the navbar between **Aspirant Mode** and **Admin Mode**.
- **Admin Desk**: View live question bank, test statistics, and add new custom mock exam questions with real-time propagation.

---

## 🚀 Tech Stack

- **Frontend Framework**: React 19 + Vite 8
- **Styling**: Tailwind CSS v4 + Plus Jakarta Sans + Noto Sans Tamil typography
- **Icons**: Lucide React
- **Animations & Effects**: Canvas Confetti
- **State & Storage**: LocalStorage sync for streaks, XP, test records, and syllabus mastery

---

## 💻 Getting Started

### Prerequisites
- Node.js (v18 or higher recommended)
- npm or pnpm

### Running Locally
```bash
# Navigate to the project directory
cd C:\Users\pugazharasu\.gemini\antigravity\scratch\tnpsc-successpoint

# Start the Vite development server
npm run dev
```

### Production Build
```bash
# Build optimized production bundle
npm run build

# Preview production build locally
npm run preview
```

---

## 📁 Project Structure

```
tnpsc-successpoint/
├── public/
│   └── logo.svg                 # Brand mark & vectors
├── src/
│   ├── components/
│   │   ├── Navbar.jsx           # Top header, role switcher, streak counter
│   │   ├── HeroBanner.jsx       # Target recruitment banner & stats
│   │   ├── Dashboard.jsx        # Aspirant dashboard & readiness tracker
│   │   ├── CBTTestsCatalog.jsx  # Exam modules selector
│   │   ├── MockTestEngine.jsx   # Interactive CBT simulator with live timer
│   │   ├── TestResultsModal.jsx # Scorecard & question review
│   │   ├── DailyQuiz.jsx        # Daily 5-question booster
│   │   ├── SyllabusTracker.jsx  # Unit-wise checklist & completion %
│   │   ├── StudyMaterials.jsx   # Searchable PDF download hub
│   │   ├── CommunityForum.jsx   # Doubt clearing & peer discussion feed
│   │   ├── AdminPortal.jsx      # Faculty question bank manager
│   │   └── Footer.jsx           # Official links & credits
│   ├── data/
│   │   ├── mockQuestions.js     # TNPSC standard bilingual question bank
│   │   ├── studyMaterials.js    # Curated notes, guides, and PYQ data
│   │   ├── syllabusData.js      # Official Group 4 & Group 2 syllabus
│   │   └── communityDiscussions.js # Doubt forum threads & verified answers
│   ├── App.jsx                  # State management & tab routing
│   ├── index.css                # Tailwind CSS v4 directives & custom themes
│   └── main.jsx                 # React root mount
├── package.json
└── vite.config.js
```
