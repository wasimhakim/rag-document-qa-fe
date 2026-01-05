import { type PropsWithChildren } from 'react'

function AppFrame({ children }: PropsWithChildren) {
  return (
    <div className="app-shell">
      <main className="app-frame">
        <div className="frame-overlay" />
        {children}
      </main>
    </div>
  )
}

export default AppFrame
