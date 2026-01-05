import Header from './components/Header'
import UploadPanel from './components/UploadPanel'

function App() {
  return (
    <div className="app-shell">
      <main className="app-frame">
        <div className="frame-overlay" />
        <Header />
        <UploadPanel />
      </main>
    </div>
  )
}

export default App
