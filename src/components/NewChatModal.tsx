import { useState, type FormEvent } from 'react'
import {
  BtnPrimary,
  BtnSecondary,
  ModalActions,
  ModalBackdrop,
  ModalCard,
  ModalError,
  ModalHint,
  ModalInput,
} from './NewChatModal.styles'

interface NewChatModalProps {
  onClose: () => void
  onCreate: (phoneOrChatId: string) => Promise<void>
}

export function NewChatModal({ onClose, onCreate }: NewChatModalProps) {
  const [value, setValue] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault()
    setError('')

    const trimmed = value.trim()
    if (!trimmed) {
      setError('Введите номер телефона или chatId')
      return
    }

    setLoading(true)
    try {
      await onCreate(trimmed)
      onClose()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Не удалось создать чат')
    } finally {
      setLoading(false)
    }
  }

  return (
    <ModalBackdrop onClick={onClose} role="presentation">
      <ModalCard
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-labelledby="new-chat-title"
      >
        <h2 id="new-chat-title">Новый чат</h2>
        <ModalHint>
          Номер телефона (79991234567) или chatId получателя в MAX
        </ModalHint>

        <form onSubmit={handleSubmit}>
          <ModalInput
            type="text"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="79991234567"
            autoFocus
            disabled={loading}
          />

          {error ? <ModalError>{error}</ModalError> : null}

          <ModalActions>
            <BtnSecondary type="button" onClick={onClose} disabled={loading}>
              Отмена
            </BtnSecondary>
            <BtnPrimary type="submit" disabled={loading}>
              {loading ? 'Создание…' : 'Создать'}
            </BtnPrimary>
          </ModalActions>
        </form>
      </ModalCard>
    </ModalBackdrop>
  )
}
