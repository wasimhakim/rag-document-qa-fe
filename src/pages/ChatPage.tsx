import { useLocation, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import AppFrame from '../components/AppFrame'
import Header from '../components/Header'
import ChatMessages, { type Message } from '../components/ChatMessages'
import ChatInput from '../components/ChatInput'
import { askQuestion } from '../lib/api'
import { normalizeMarkdown } from '../lib/format'

type ChatLocationState = {
  fileName?: string
}

function ChatPage() {
  const location = useLocation()
  const navigate = useNavigate()
  const { fileName } = (location.state as ChatLocationState) || {}
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [isSending, setIsSending] = useState(false)

  const handleSend = () => {
    const trimmed = input.trim()
    if (!trimmed) return

    const userMessage: Message = {
      id: crypto.randomUUID(),
      role: 'user',
      content: trimmed,
    }

    setMessages((prev) => [...prev, userMessage])
    setInput('')
    setIsSending(true)

    askQuestion(trimmed)
      .then((response) => {
        const content = normalizeMarkdown(response.data)
        const botMessage: Message = {
          id: crypto.randomUUID(),
          role: 'bot',
          content: content || 'No response received.',
        }
        setMessages((prev) => [...prev, botMessage])
      })
      .catch((error) => {
        const message = error instanceof Error ? error.message : 'Unable to get a response.'
        const botMessage: Message = {
          id: crypto.randomUUID(),
          role: 'bot',
          content: message,
        }
        setMessages((prev) => [...prev, botMessage])
      })
      .finally(() => setIsSending(false))
  }

  const onBackToUpload = () => navigate('/', { replace: true })

  return (
    <AppFrame>
      <Header
        badge="Chat ready"
        title="RAG Document QA"
        subtitle="Ask about your uploaded document. Responses will show here."
      />
      <div className="chat-wrapper">
        <div className="flex items-center justify-center gap-3">
          {fileName ? <span className="file-pill">File: {fileName}</span> : null}
          <button type="button" className="button-ghost" onClick={onBackToUpload}>
            Upload another file
          </button>
        </div>
        <ChatMessages messages={messages} fileName={fileName} isTyping={isSending} />
        <ChatInput value={input} onChange={setInput} onSend={handleSend} disabled={isSending} />
      </div>
    </AppFrame>
  )
}

export default ChatPage
