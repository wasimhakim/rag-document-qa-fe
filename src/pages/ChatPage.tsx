import { useLocation, useNavigate } from 'react-router-dom'
import { useMemo, useState } from 'react'
import AppFrame from '../components/AppFrame'
import Header from '../components/Header'
import ChatMessages, { type Message } from '../components/ChatMessages'
import ChatInput from '../components/ChatInput'

type ChatLocationState = {
  fileName?: string
}

function ChatPage() {
  const location = useLocation()
  const navigate = useNavigate()
  const { fileName } = (location.state as ChatLocationState) || {}
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')

  const placeholderReply = useMemo(
    () =>
      'Thanks for your question. I will analyze the document and respond with grounded answers when the backend is connected.',
    [],
  )

  const handleSend = () => {
    const trimmed = input.trim()
    if (!trimmed) return

    const userMessage: Message = {
      id: crypto.randomUUID(),
      role: 'user',
      content: trimmed,
    }

    const botMessage: Message = {
      id: crypto.randomUUID(),
      role: 'bot',
      content: placeholderReply,
    }

    setMessages((prev) => [...prev, userMessage, botMessage])
    setInput('')
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
        <ChatMessages messages={messages} fileName={fileName} />
        <ChatInput value={input} onChange={setInput} onSend={handleSend} />
      </div>
    </AppFrame>
  )
}

export default ChatPage
