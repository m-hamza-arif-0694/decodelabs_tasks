# DecodeLabs Internship Tasks 🚀

This repository (`decodelabs_tasks`) contains completed projects and tasks submitted for the **DecodeLabs Industrial Training Kit (Batch 2026)**.

---

## 📂 Repository Structure & Progress

| # | Project Name | Status | Key Technologies & Architecture |
|---|---|---|---|
| 1 | [Project 1: Responsive Frontend Interface](./Project_1_Responsive_Interface) | ✅ Completed | HTML5 Semantics, CSS3 Grid/Flexbox/Container Queries, 2025 Aesthetics, Vanilla JS State Management |
| 2 | [Project 2: Backend API Development](./Project_2) | ✅ Completed | Node.js, Express, RESTful Routing, Syntactic Validation, HTTP Status Codes |
| 3 | [Project 3: Database Integration](./Project_3_Database_Integration) | ✅ Completed | SQLite, Parameterized Queries, Schema Design, SQL Constraints |
| 4 | [Project 4: Full-Stack Integration](./Project_4) | ✅ Completed | Express REST API, SQLite Integration, Vanilla JS Frontend, CORS, Async/Await Fetch, XSS Prevention |

---
## 🛠️ Project Details

### [Project 1: Responsive Frontend Interface](./Project_1_Responsive_Interface)
- **Goal**: Create a responsive frontend interface for a digital entry point adhering to the mobile-first paradigm and 2025 UI/UX compliance.
- **Key Features**:
  - **Mobile-First Architecture**: Single-column base layout expanding seamlessly at 768px (Tablet) and 1024px (Desktop) breakpoints.
  - **2025 Aesthetics Palette**: Uses curated tokens (`Mocha Mousse #A5856F`, `Ethereal Blue #A0D4E0`, `Moonlit Grey #F2F0EA`).
  - **Modern Typography**: Geometric headings (`Montserrat`) paired with readable body text (`Roboto`) and fluid sizing (`clamp()`).
  - **CSS Container Queries**: Dynamic card component layouts based on inline container dimensions.
  - **Universal Access & WCAG Compliance**: Distinct `aria-label`s, semantic landmarks (`<header>`, `<nav>`, `<main>`, `<article>`, `<footer>`), 24px icon placeholders, and visible keyboard focus outlines.
  - **Interactive State Management**: Vanilla JS handling mobile menu drawer toggle, active navigation link states, and interactive card bookmark counters.

### [Project 2: Backend API Development](./Project_2)
- **Goal**: Develop a robust backend API ("The Nervous System") to handle application logic, routing, and data validation.
- **Key Features**:
  - **RESTful Endpoints**: Adheres to correct noun-based naming conventions (`GET /api/projects`, `POST /api/submissions`).
  - **The Gatekeeper Rule**: Implements syntactic and semantic validation for incoming JSON data, enforcing "Never Trust the Client".
  - **Accurate Server Tone**: Uses precise HTTP status codes (`200 OK`, `201 Created`, `400 Bad Request`, `404 Not Found`, `500 Internal Error`).
  - **Error Resilience**: Includes a global error handler and a catch-all 404 route for invalid paths.

---

### [Project 3: Database Integration](./Project_3_Database_Integration)
- **Goal**: Connect the backend with a permanent database to handle State Persistence and CRUD operations.
- **Key Features**:
  - **Relational Schema**: Enforces architectural integrity with `UNIQUE`, `NOT NULL`, and `CHECK` constraints on the database level.
  - **SQL Injection Prevention**: All endpoints use strictly **Parameterized Queries** to separate data from executable logic.
  - **CRUD Web Mapping**: Maps HTTP methods directly to SQL commands (`POST` -> `INSERT`, `GET` -> `SELECT`, `PUT` -> `UPDATE`, `DELETE` -> `DELETE`).

---

### [Project 4: Full-Stack Integration](./Project_4)
- **Goal**: Seamlessly bridge frontend UI design with Express REST APIs and a persistent SQLite database vault to form a complete end-to-end full-stack system.
- **Key Features**:
  - **End-to-End Integration**: Full integration connecting HTML5/CSS3 frontend, client-side async `fetch` API, Express RESTful endpoints, and SQLite backend storage.
  - **CORS Handling**: Configured cross-origin resource sharing (`cors` middleware) enabling seamless communication between frontend and backend servers.
  - **User Registration & Live Grid**: Interactive form serializing JSON payloads to create user records, combined with real-time UI grid updates upon database changes.
  - **XSS & Security Safeguards**: Safe DOM element insertion (`textContent` over `innerHTML`), server-side validation gatekeepers, and SQL injection prevention using parameterized queries (`?`).
  - **Dynamic Navigation & State Observer**: Smooth scroll navigation across sections (`Home`, `Register`, `User Records`), auto-synchronizing active blue highlights using `IntersectionObserver` (ScrollSpy).

---

*Powered by [DecodeLabs](https://www.decodelabs.tech)*
