import { useEffect, useRef } from 'react'
import type { Message } from '../types'
import './MessageList.css'

interface MessageListProps {
  messages: Message[]
}

function formatTime(timestamp: number): string {
  return new Date(timestamp).toLocaleTimeString('ru-RU', {
    hour: '2-digit',
    minute: '2-digit',
  })
}

export function MessageList({ messages }: MessageListProps) {
  const bottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  return (
    <div className="message-list">
      {messages.length === 0 ? (
        <p className="message-list-empty">Напишите первое сообщение</p>
      ) : (
        messages.map((message) => (
          <div
            key={message.id}
            className={`message-row ${message.direction}`}
          >
            <div className="message-bubble">
              <p className="message-text">{message.text}</p>
              <time className="message-time">{formatTime(message.timestamp)}</time>
            </div>
          </div>
        ))
      )}
      <div ref={bottomRef} />
    </div>
  )
}
