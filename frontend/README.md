# Spark5 HackIndia - Athena 

Welcome to **Athena**, our submission for **Spark5 HackIndia** — a full-stack AI-driven assistant built to serve students and college admins. It's smart, responsive, and designed to make college communication and Q&A ridiculously simple.

## 🚀 Problem We’re Solving
College communication often feels like shouting into the void — circulars lost in emails, queries ignored, students left confused. We wanted to fix that.

## 🎯 What is Athena?
Athena is a college-specific information system powered by **Retrieval-Augmented Generation (RAG)**. It allows:
- 📩 **Admins** to upload circulars/notices which are chunked and stored using **Pinecone Vector DB**, referenced in **NeonDB**, and embedded via **Mistral embeddings**.
- 🤖 **Students** to ask any college-related questions and get accurate answers with sources.
- 🧠 Uses **Mistral Large** for generative answers.
- 🎓 Also includes a **flashcard feature** for students to revise concepts easily.


---

## 💬 Sample Questions Students Can Ask

Here are some example queries Athena can handle:

- _"When is the semester 4 revaluation result coming out?"_
- _"What is the dress code for the industrial visit next week?"_
- _"Can I submit my lab records after the internal exams?"_
- _"Where is the new ECE seminar hall located?"_
- _"What’s the last date to pay exam fees without fine?"_
- _"Is there any holiday declared this Friday?"_
- _"Are laptops allowed for the hackathon?"_
- _"What's the eligibility criteria for placement in TCS?"_

These are parsed, matched to relevant circulars/notices, and answered with referenced context.

---

## 🧱 Project Structure
```
.
├── backend              # Bun backend API with RAG functionality
├── frontend             # Vite + React + Tailwind frontend
├── services             # API integration layer
└── README.md
```

---

## 🛠️ Backend (Bun)

### Routes
| Route | Method | Description |
|-------|--------|-------------|
| `/api/upload` | `POST` | Upload and chunk circulars; store in Pinecone & NeonDB |
| `/api/query` | `POST` | Accepts a student query, retrieves relevant chunks, passes to Mistral, returns answer |
| `/api/flashcards` | `GET` | Get all flashcards |
| `/api/flashcards` | `POST` | Create a new flashcard |
| `/api/flashcards/:id` | `DELETE` | Delete a flashcard |

> All routes are written in `server.js` and use Bun's native performance.

### Key Tech:
- 📦 Bun (ultrafast JS runtime)
- 🌲 Pinecone for vector storage
- 🐘 NeonDB for metadata
- 🧠 Mistral embeddings + Mistral Large for completions

---

## 💻 Frontend
Built with Vite + React + TailwindCSS + shadcn/ui for rapid development and clean UI.

### Pages
- `/login` – Auth gate
- `/admin/dashboard` – Upload circulars, view queries
- `/student/chat` – Ask anything, powered by RAG
- `/student/flashcards` – View & create study flashcards

### Components of Note:
- `ChatInterface.jsx` – clean student Q&A interface
- `AdminDashboard.jsx` – intuitive circular uploader
- `FlashCards.tsx` – elegant UI for learning cards

---

## 🔐 Authentication
- Simple context-based auth in `AuthContext.tsx`
- Protected routing using `ProtectedRoute.tsx`

---

## 📚 Flashcards Feature
Students can create, view, and delete flashcards. Think Anki, but simpler and in-platform. Perfect for exam prep or quick revision.

---

## 🌐 Tech Stack Summary
| Layer | Stack |
|-------|-------|
| Frontend | React + TailwindCSS + Vite + Shadcn/UI |
| Backend | Bun + Mistral APIs + Pinecone + NeonDB |
| AI | Mistral Embeddings, Mistral Large |
| Vector DB | Pinecone |
| Metadata DB | NeonDB |

---


## 🧪 Running Locally
### Prerequisites
- Bun
- Node.js (for frontend)
- Environment vars (Mistral API key, Pinecone, NeonDB)

### Backend
```bash
cd backend
bun install
bun server.js
```

### Frontend
```bash
cd frontend
npm install
npm run dev
```

---

## 📄 License
No License — do what you want, just don’t claim you built it at 3AM with chai like we did 😄

---

## 🙌 Special Thanks
To **HackIndia** for this opportunity and the motivation to build something that might just help the next confused student out there.



