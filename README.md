# Resume Mirror

An AI-powered resume tailoring tool that helps job seekers land more interviews by analysing their resume against job descriptions and providing actionable improvements.

## Features

- **Resume Tailoring** — Rewrites resume bullets to match job descriptions and boosts ATS score
- **Recruiter Red Flag Scan** — Detects issues that silently kill applications before recruiters see them
- **Interview Question Predictor** — Generates likely interview questions based on gaps between your resume and the role
- **PDF Export** — Download the tailored resume analysis as a clean PDF

## Tech Stack

- **Framework** — Next.js 14 (App Router)
- **Language** — TypeScript
- **Styling** — Tailwind CSS
- **AI** — Google Gemini 2.5 Flash
- **PDF Export** — jsPDF

## Getting Started

### Prerequisites

- Node.js 18+
- A free Google Gemini API key from [aistudio.google.com](https://aistudio.google.com)

### Installation

1. Clone the repository

```bash
git clone https://github.com/yourusername/resumemirror.git
cd resumemirror
```

2. Install dependencies

```bash
npm install
```

3. Create a `.env.local` file in the root directory

```bash
GEMINI_API_KEY=your_gemini_api_key_here
```

4. Run the development server

```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000)

## Project Structure