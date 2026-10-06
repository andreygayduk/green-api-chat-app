import { type KeyboardEvent } from 'react'
import { useForm } from 'react-hook-form'
import { MessageInputForm, MessageTextarea, SendBtn } from './MessageInput.styles'

interface MessageInputProps {
  disabled?: boolean
  onSend: (text: string) => Promise<void>
}

interface MessageFormValues {
  text: string
}

export function MessageInput({ disabled, onSend }: MessageInputProps) {
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { isSubmitting },
  } = useForm<MessageFormValues>({
    defaultValues: { text: '' },
  })

  const text = watch('text')
  const { onChange, onBlur, name, ref } = register('text', {
    required: true,
    maxLength: 4000,
  })

  const onSubmit = async (data: MessageFormValues) => {
    const trimmed = data.text.trim()
    if (!trimmed || disabled) return

    await onSend(trimmed)
    reset({ text: '' })
  }

  const submit = handleSubmit(onSubmit)

  const handleKeyDown = (event: KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault()
      void submit()
    }
  }

  return (
    <MessageInputForm onSubmit={submit}>
      <MessageTextarea
        name={name}
        ref={ref}
        onChange={onChange}
        onBlur={onBlur}
        onKeyDown={handleKeyDown}
        placeholder="Сообщение"
        rows={1}
        disabled={disabled || isSubmitting}
        maxLength={4000}
      />
      <SendBtn
        type="submit"
        disabled={disabled || isSubmitting || !text.trim()}
        aria-label="Отправить"
      >
        <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" aria-hidden="true">
          <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
        </svg>
      </SendBtn>
    </MessageInputForm>
  )
}
