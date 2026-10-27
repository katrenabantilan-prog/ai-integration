# AI Integration System

Group 6 project — a cross-platform AI application that brings conversational assistance, text summarization, and content generation into one unified system. Web-first, with desktop (Electron) and mobile (React Native) planned in later versions.

## Team and Roles

| Name                     | Role            
|                          |                 
| Katrena Bantillan        | Team Leader     
| Honeylyn Montemayor      | Project Manager 
| Princess Millan Gomisong | Developer 
| Jihara Cayongcong        | Developer 
| Sam Cabilin              | QA 

## Tech Stack

- Backend: Node.js, Express, PostgreSQL, JWT authentication, bcrypt password hashing
- Frontend: React, Vite, react-router-dom
- AI Integration: External AI model API (provider selected in v1.1.0)
- Desktop: Electron wrapper (v1.5.0)
- Mobile: React Native via Expo (v1.6.0)

## Proposal Alignment

This repository follows the group's project proposal. The proposal's 8-week schedule maps to our version progression:

| Proposal Phase

| Planning and Design | Week 1 | Database schema and API endpoint plan (backend/schema.sql) |
| Backend Development | Weeks 2-3 | v1.0.0 (auth) and v1.1.0 (AI service) |
| Frontend Development | Weeks 4-6 | v1.1.0 through v1.4.0 (web), then v1.5.0 (desktop), v1.6.0 (mobile) |
| Integration and Testing | Week 7 | QA review and bug-fix patches per version |
| Documentation and Presentation | Week 8 | README updates per version plus final user manual |

## Version Roadmap

| Version | Owner                     | Feature                               | Platform |
|---------|-------                    |                                       |          |
| v1.0.0  | Princess Millan Gomisong  | User Authentication                   | Web      |
| v1.0.1  | Princess Millan Gomisong  | Auth bug fixes                        | Web      |
| v1.1.0  | Jihara Cayongcong         | AI Chat Assistant                     | Web      |
| v1.2.0  | Princess Millan Gomisong  | Chat History and Saved Outputs        | Web      |
| v1.3.0  | Jihara Cayongcong         | Text Summarizer and Content Generator | Web      |
| v1.4.0  | Princess Millan Gomisong  | Admin Panel                           | Web      |
| v1.5.0  | Jihara Cayongcong         | Desktop application                   | Desktop  |
| v1.6.0  | Both developers           | Mobile application                    | Mobile   |

## Expected Deliverables per Version

This section is the grading reference. At each version, this is the acceptance checklist that the team and instructor can verify against the proposal's Feature Matrix.

### v1.0.0 — User Authentication
Owner: Princess Millan Gomisong
Proposal reference: Feature Matrix — User Authentication (Web slice)
Status: In progress

Expected output when complete:
- User can register with email and password
- Password is bcrypt-hashed in PostgreSQL (never stored plain)
- Login issues a JWT valid for 7 days
- JWT is stored in browser localStorage
- Protected dashboard is inaccessible without a token (redirects to login)
- Refreshing the page preserves the session
- Logout clears the token and returns to the login page

### v1.0.1 — Authentication Bug Fixes
Owner: Princess Millan Gomisong
Status: Planned

Expected output when complete:
- All bugs filed by QA against v1.0.0 are resolved
- Regression tests confirm no previously-working feature broke
- QA signs off with a passing test summary

### v1.1.0 — AI Chat Assistant
Owner: Jihara Cayongcong
Proposal reference: Feature Matrix — AI Chat Assistant (Web slice)
Status: Planned

Expected output when complete:
- Backend POST /api/chat accepts a user message and returns an AI response
- AI service module calls the chosen provider (OpenAI, Anthropic, or Gemini)
- Chat UI displays the conversation as message bubbles
- Conversation and message history persisted to PostgreSQL
- Chat page is reachable from the dashboard
- APP_VERSION updated to v1.1.0 (AI Chat)

### v1.2.0 — Chat History and Saved Outputs
Owner: Princess Millan Gomisong
Proposal reference: Feature Matrix — Chat History and Saved Outputs (Web slice)
Status: Planned

Expected output when complete:
- Sidebar lists all past conversations for the logged-in user
- User can rename a conversation and delete it
- Messages persist across page refresh
- Any assistant message can be bookmarked as a saved output
- Saved outputs list is accessible and exportable as text

### v1.3.0 — Text Summarizer and Content Generator
Owner: Jihara Cayongcong
Proposal reference: Feature Matrix — Text Summarizer and Content Generator (Web and Desktop)
Status: Planned

Expected output when complete:
- User can paste text and receive an AI-generated summary
- User can specify topic and tone; AI generates a draft (email, essay, study notes)
- Both outputs save to PostgreSQL and appear in chat history
- UI matches the existing glass-morphism theme

### v1.4.0 — Admin Panel
Owner: Princess Millan Gomisong
Proposal reference: Feature Matrix — Admin Panel (Web only)
Status: Planned

Expected output when complete:
- Admin role enforced via the users table role column
- Admin page lists all registered users with registration date
- Admin can view per-user message and conversation counts
- Non-admin users receive 403 when accessing admin routes

### v1.5.0 — Desktop Application
Owner: Jihara Cayongcong
Proposal reference: Frontend Platforms — Desktop (Windows and macOS)
Status: Planned

Expected output when complete:
- Electron wrapper around the web build
- Runs as a native desktop window
- Shares the same backend API
- APP_VERSION bumped accordingly

### v1.6.0 — Mobile Application
Owner: Both developers
Proposal reference: Frontend Platforms — Mobile (iOS and Android)
Status: Planned

Expected output when complete:
- React Native (Expo) app for iOS and Android
- Login and AI Chat implemented at minimum
- Shares API logic with web
- APP_VERSION bumped accordingly

## Setup

Setup instructions will be added in v1.0.0 once the initial codebase is merged.

## Contributing Workflow

- Every change goes through a feature branch
- Each branch opens a Pull Request for QA review
- QA merges the PR after testing and sign-off
- No direct pushes to main (branch protection enforced)
- Commit in logical chunks — no code dumping
- All changes must be traceable to a GitHub Issue