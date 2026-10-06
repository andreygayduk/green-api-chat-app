import { useForm } from 'react-hook-form'
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

interface NewChatFormValues {
  value: string
}

export function NewChatModal({ onClose, onCreate }: NewChatModalProps) {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<NewChatFormValues>({
    defaultValues: { value: '' },
  })

  const onSubmit = async (data: NewChatFormValues) => {
    try {
      await onCreate(data.value.trim())
      onClose()
    } catch (err) {
      setError('root', {
        message: err instanceof Error ? err.message : 'Не удалось создать чат',
      })
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

        <form onSubmit={handleSubmit(onSubmit)}>
          <ModalInput
            type="text"
            placeholder="79991234567"
            autoFocus
            disabled={isSubmitting}
            {...register('value', {
              required: 'Введите номер телефона или chatId',
            })}
          />

          {errors.value || errors.root ? (
            <ModalError>{errors.value?.message ?? errors.root?.message}</ModalError>
          ) : null}

          <ModalActions>
            <BtnSecondary type="button" onClick={onClose} disabled={isSubmitting}>
              Отмена
            </BtnSecondary>
            <BtnPrimary type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Создание…' : 'Создать'}
            </BtnPrimary>
          </ModalActions>
        </form>
      </ModalCard>
    </ModalBackdrop>
  )
}
