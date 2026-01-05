function App() {
  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-gradient-to-br from-slate-50 via-white to-sky-50 px-4 py-12">
      <div className="relative w-full max-w-2xl overflow-hidden rounded-3xl border border-slate-200 bg-white/90 p-10 text-center shadow-xl shadow-slate-200">
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-sky-100/50 via-transparent to-indigo-50/40" />
        <div className="relative flex flex-col items-center gap-4">
          <span className="rounded-full border border-sky-200 bg-sky-50 px-4 py-1.5 text-sm font-semibold uppercase tracking-wide text-sky-700">
            Coming soon
          </span>
          <h1 className="text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">
            RAG Document QA
          </h1>
        </div>
      </div>
    </div>
  )
}

export default App
