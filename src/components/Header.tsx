function Header() {
  return (
    <header className="relative z-10 flex flex-col items-center gap-3 text-center">
      <span className="badge">RAG document upload</span>
      <h1 className="app-title">RAG Document QA</h1>
      <p className="app-subtitle">Drop your PDFs to prepare them for question-and-answer workflows.</p>
    </header>
  )
}

export default Header
