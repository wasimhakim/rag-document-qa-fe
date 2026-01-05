import {
  useRef,
  useState,
  type ChangeEvent,
  type DragEvent,
  type KeyboardEvent,
  type MouseEvent,
} from 'react'
import { useNavigate } from 'react-router-dom'
import Toast from './Toast'
import { uploadDocument } from '../lib/api'

function UploadPanel() {
  const fileInputRef = useRef<HTMLInputElement>(null)
  const navigate = useNavigate()
  const [isDragging, setIsDragging] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)
  const [status, setStatus] = useState('Select or drop a PDF to prepare it for QA.')
  const [toastMessage, setToastMessage] = useState('')

  const handleFile = async (file: File) => {
    if (isProcessing) return

    if (file.type !== 'application/pdf' && !file.name.toLowerCase().endsWith('.pdf')) {
      setStatus('Only PDF files are supported.')
      return
    }

    setIsProcessing(true)
    setStatus(`Processing ${file.name}...`)
    setToastMessage('')

    try {
      const response = await uploadDocument(file)
      setStatus('Upload complete.')
      setToastMessage(response.message || 'Upload finished.')
      navigate('/chat', { state: { fileName: file.name } })
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Upload failed.'
      setStatus(message)
      setToastMessage(message)
    } finally {
      setIsProcessing(false)
    }
  }

  const onBrowseClick = () => {
    fileInputRef.current?.click()
  }

  const onDrop = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault()
    event.stopPropagation()
    setIsDragging(false)
    const [file] = Array.from(event.dataTransfer.files)
    if (file) handleFile(file)
  }

  const onDragOver = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault()
    event.stopPropagation()
    if (!isDragging) setIsDragging(true)
  }

  const onDragLeave = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault()
    event.stopPropagation()
    setIsDragging(false)
  }

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files?.[0]) {
      handleFile(event.target.files[0])
      event.target.value = ''
    }
  }

  const onZoneClick = (_event: MouseEvent<HTMLDivElement>) => {
    if (isProcessing) return
    onBrowseClick()
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
        onClick={onZoneClick}
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
          className="sr-only"
          multiple={false}
          onChange={onChange}
          aria-label="Upload PDF"
        />
        <div className="upload-title">Upload a PDF</div>
        <p className="upload-hint">Click to browse or drag and drop your file here.</p>
        <div className="upload-actions">
          <button
            type="button"
            className="button-primary"
            onClick={(event) => {
              event.stopPropagation()
              onBrowseClick()
            }}
            disabled={isProcessing}
          >
            {isProcessing ? 'Processing…' : 'Choose PDF'}
          </button>
          <span className="upload-note">PDF files only. One file at a time.</span>
        </div>
        <p className={`upload-status ${isProcessing ? 'processing' : ''}`}>{status}</p>
      </div>
      {toastMessage ? <Toast message={toastMessage} onClose={() => setToastMessage('')} /> : null}
    </section>
  )
}

export default UploadPanel
