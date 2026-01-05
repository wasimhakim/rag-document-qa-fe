import AppFrame from '../components/AppFrame'
import Header from '../components/Header'
import UploadPanel from '../components/UploadPanel'

function UploadPage() {
  return (
    <AppFrame>
      <Header
        badge="RAG document upload"
        title="RAG Document QA"
        subtitle="Drop your PDFs to prepare them for question-and-answer workflows."
      />
      <UploadPanel />
    </AppFrame>
  )
}

export default UploadPage
