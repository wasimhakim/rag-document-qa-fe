# RAG Document QA Frontend

Upload a PDF and chat with a RAG-backed assistant. This Vite + React app provides a two-step flow: document upload and question answering with markdown-rendered responses.

## Features
- PDF upload with drag-and-drop, file validation, and progress states.
- Chat experience with typing indicator, markdown rendering, and conversation history.
- Simple routing between upload and chat views.

## Getting started
1. Install dependencies:

   ```bash
   npm install
   ```

2. Start the dev server:

   ```bash
   npm run dev
   ```

3. Build for production:

   ```bash
   npm run build
   ```

4. Preview the production build:

   ```bash
   npm run preview
   ```

## API configuration
The frontend expects a backend running at `http://127.0.0.1:8000` by default. To point to a different host, update `API_HOST` in `src/lib/api.ts`.

### Expected endpoints
- `POST /upload` with `multipart/form-data` (`file` field). Returns JSON: `{ "message": "..." }`.
- `GET /ask?query=...` returns JSON: `{ "data": "..." }`.

## Tech stack
- React 19 + TypeScript
- Vite 7
- Tailwind CSS (via `@tailwindcss/vite`)
- React Router

## Project structure
- `src/pages/UploadPage.tsx`: upload view and header copy.
- `src/pages/ChatPage.tsx`: chat view, message handling, and routing state.
- `src/components/`: UI building blocks (upload panel, chat input, messages, header).
- `src/lib/api.ts`: backend calls and API host configuration.
- `src/lib/format.ts`: markdown normalization for assistant output.
