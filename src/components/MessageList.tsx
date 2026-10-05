import { useEffect, useRef } from 'react'
import type { Message } from '../types'
import {
  MessageBubble,
  MessageListEmpty,
  MessageListRoot,
  MessageRow,
  MessageText,
  MessageTime,
} from './MessageList.styles'

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
    <MessageListRoot>
      {messages.length === 0 ? (
        <MessageListEmpty>Напишите первое сообщение</MessageListEmpty>
      ) : (
        messages.map((message) => (
          <MessageRow key={message.id} $direction={message.direction}>
            <MessageBubble $direction={message.direction}>
              <MessageText>{message.text}</MessageText>
              <MessageTime>{formatTime(message.timestamp)}</MessageTime>
            </MessageBubble>
          </MessageRow>
        ))
      )}
      <div ref={bottomRef} />
    </MessageListRoot>
  )
}
