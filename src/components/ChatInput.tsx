import { type FormEvent } from 'react'

type ChatInputProps = {
  value: string
  onChange: (value: string) => void
  onSend: () => void
  disabled?: boolean
}

function ChatInput({ value, onChange, onSend, disabled }: ChatInputProps) {
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!value.trim() || disabled) return
    onSend()
  }

  return (
    <form className="chat-card chat-input" onSubmit={handleSubmit}>
      <label className="sr-only" htmlFor="chat-input">
        Ask a question
      </label>
      <textarea
        id="chat-input"
        className="chat-textarea"
        placeholder="Ask a question about your document..."
        value={value}
        onChange={(event) => onChange(event.target.value)}
        rows={3}
        disabled={disabled}
      />
      <div className="chat-actions">
        <span className="upload-note">Enter to send. Keep prompts clear and focused.</span>
        <button type="submit" className="button-primary" disabled={disabled || !value.trim()}>
          Send
        </button>
      </div>
    </form>
  )
}

export default ChatInput
