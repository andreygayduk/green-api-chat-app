import { useEffect, useRef } from 'react'
import { deleteNotification, receiveNotification } from '../api/greenApi'
import type { Credentials, Message } from '../types'

interface UseNotificationPollerOptions {
  credentials: Credentials | null
  enabled: boolean
  onIncomingMessage: (message: Message, chatName?: string) => void
}

export function useNotificationPoller({
  credentials,
  enabled,
  onIncomingMessage,
}: UseNotificationPollerOptions): void {
  const onMessageRef = useRef(onIncomingMessage)

  useEffect(() => {
    onMessageRef.current = onIncomingMessage
  }, [onIncomingMessage])

  useEffect(() => {
    if (!credentials || !enabled) return

    const abortController = new AbortController()
    let active = true

    const poll = async () => {
      while (active) {
        try {
          const notification = await receiveNotification(
            credentials,
            20,
            abortController.signal,
          )

          if (!active) break

          if (!notification?.receiptId) {
            continue
          }

          const { receiptId, body } = notification

          try {
            if (
              body?.typeWebhook === 'incomingMessageReceived' &&
              body.messageData?.typeMessage === 'textMessage' &&
              body.messageData.textMessageData?.textMessage &&
              body.senderData?.chatId
            ) {
              const message: Message = {
                id: body.idMessage,
                chatId: body.senderData.chatId,
                text: body.messageData.textMessageData.textMessage,
                timestamp: body.timestamp * 1000,
                direction: 'incoming',
              }

              onMessageRef.current(
                message,
                body.senderData.senderName || body.senderData.chatName,
              )
            }
          } finally {
            if (active) {
              await deleteNotification(credentials, receiptId)
            }
          }
        } catch (error) {
          if (!active || abortController.signal.aborted) break

          await new Promise((resolve) => setTimeout(resolve, 2000))
          console.error('Notification poll error:', error)
        }
      }
    }

    void poll()

    return () => {
      active = false
      abortController.abort()
    }
  }, [credentials, enabled])
}
