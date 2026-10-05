import { useState, type FormEvent } from 'react'
import './NewChatModal.css'

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
    <div className="modal-backdrop" onClick={onClose} role="presentation">
      <div
        className="modal-card"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-labelledby="new-chat-title"
      >
        <h2 id="new-chat-title">Новый чат</h2>
        <p className="modal-hint">
          Номер телефона (79991234567) или chatId получателя в MAX
        </p>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="79991234567"
            autoFocus
            disabled={loading}
          />

          {error ? <p className="modal-error">{error}</p> : null}

          <div className="modal-actions">
            <button type="button" className="btn-secondary" onClick={onClose} disabled={loading}>
              Отмена
            </button>
            <button type="submit" className="btn-primary" disabled={loading}>
              {loading ? 'Создание…' : 'Создать'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
