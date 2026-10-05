import { useState, type FormEvent, type KeyboardEvent } from 'react'
import { MessageInputForm, MessageTextarea, SendBtn } from './MessageInput.styles'

interface MessageInputProps {
  disabled?: boolean
  onSend: (text: string) => Promise<void>
}

export function MessageInput({ disabled, onSend }: MessageInputProps) {
  const [text, setText] = useState('')
  const [sending, setSending] = useState(false)

  const submit = async () => {
    const trimmed = text.trim()
    if (!trimmed || sending || disabled) return

    setSending(true)
    try {
      await onSend(trimmed)
      setText('')
    } finally {
      setSending(false)
    }
  }

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault()
    void submit()
  }

  const handleKeyDown = (event: KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault()
      void submit()
    }
  }

  return (
    <MessageInputForm onSubmit={handleSubmit}>
      <MessageTextarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Сообщение"
        rows={1}
        disabled={disabled || sending}
        maxLength={4000}
      />
      <SendBtn
        type="submit"
        disabled={disabled || sending || !text.trim()}
        aria-label="Отправить"
      >
        <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" aria-hidden="true">
          <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
        </svg>
      </SendBtn>
    </MessageInputForm>
  )
}
