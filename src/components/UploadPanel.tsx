import { useRef, useState, type ChangeEvent, type DragEvent, type KeyboardEvent } from 'react'

function UploadPanel() {
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [isDragging, setIsDragging] = useState(false)
  const [status, setStatus] = useState('Select or drop PDFs to prepare them for QA.')

  const handleFiles = (files: FileList | File[]) => {
    const pdfs = Array.from(files).filter(
      (file) => file.type === 'application/pdf' || file.name.toLowerCase().endsWith('.pdf'),
    )

    if (!pdfs.length) {
      setStatus('Only PDF files are supported.')
      return
    }

    const count = pdfs.length
    const summary = pdfs.slice(0, 2).map((file) => file.name).join(', ')
    const more = count > 2 ? ` +${count - 2} more` : ''
    setStatus(`${count} PDF${count > 1 ? 's' : ''} ready: ${summary}${more}`)
  }

  const onBrowseClick = () => {
    fileInputRef.current?.click()
  }

  const onDrop = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault()
    setIsDragging(false)
    handleFiles(event.dataTransfer.files)
  }

  const onDragOver = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault()
    if (!isDragging) setIsDragging(true)
  }

  const onDragLeave = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault()
    setIsDragging(false)
  }

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      handleFiles(event.target.files)
      event.target.value = ''
    }
  }

  return (
    <section className="upload-panel">
      <div
        className={`upload-zone ${isDragging ? 'is-dragging' : ''}`}
        onDragOver={onDragOver}
        onDragLeave={onDragLeave}
        onDrop={onDrop}
        role="button"
        tabIndex={0}
        onClick={onBrowseClick}
        onKeyDown={(event: KeyboardEvent<HTMLDivElement>) => {
          if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault()
            onBrowseClick()
          }
        }}
        aria-label="Upload PDFs"
      >
        <input
          ref={fileInputRef}
          type="file"
          accept="application/pdf"
          multiple
          className="sr-only"
          onChange={onChange}
        />
        <div className="upload-title">Upload PDFs</div>
        <p className="upload-hint">Click to browse or drag and drop your files here.</p>
        <div className="upload-actions">
          <button type="button" className="button-primary">
            Choose PDFs
          </button>
          <span className="upload-note">PDF files only. Multiple files supported.</span>
        </div>
        <p className="upload-note">{status}</p>
      </div>
    </section>
  )
}

export default UploadPanel
