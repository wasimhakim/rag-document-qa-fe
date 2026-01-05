import ReactMarkdown from 'react-markdown'
import { normalizeMarkdown } from '../lib/format'

type Message = {
  id: string
  role: 'user' | 'bot'
  content: string
}

type ChatMessagesProps = {
  messages: Message[]
  fileName?: string
}

function ChatMessages({ messages, fileName }: ChatMessagesProps) {
  return (
    <div className="chat-card">
      <div className="chat-scroll" aria-live="polite">
        <div className="message bot">
          <div className="bubble">
            <div className="message-meta">System</div>
            <p className="text-sm text-slate-700">
              Chat is ready. Ask about your document to get grounded responses.
            </p>
            {fileName ? <span className="file-pill">File: {fileName}</span> : null}
          </div>
        </div>
        {messages.map((message) => (
          <div key={message.id} className={`message ${message.role}`}>
            <div className="bubble">
              <div className="message-meta">{message.role === 'user' ? 'You' : 'Assistant'}</div>
              {message.role === 'bot' ? (
                <div className="markdown-body">
                  <ReactMarkdown>{normalizeMarkdown(message.content)}</ReactMarkdown>
                </div>
              ) : (
                <p className="text-sm leading-relaxed whitespace-pre-wrap">{message.content}</p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export type { Message }
export default ChatMessages
