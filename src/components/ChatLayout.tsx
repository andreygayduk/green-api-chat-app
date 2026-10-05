import { useCallback, useState } from 'react'
import {
  checkAccount,
  looksLikePhone,
  normalizePhone,
  sendMessage,
} from '../api/greenApi'
import { useAuth } from '../context/useAuth'
import { useNotificationPoller } from '../hooks/useNotificationPoller'
import type { Chat, Message } from '../types'
import {
  BackBtn,
  BrandMark,
  ChatApp,
  ChatHeader,
  ChatHeaderAvatar,
  ChatHeaderInfo,
  ChatMain,
  ChatPlaceholder,
  ChatSidebar,
  LogoutBtn,
  PlaceholderLogo,
  SendError,
  SidebarBrand,
  SidebarTop,
} from './ChatLayout.styles'
import { ChatList } from './ChatList'
import { MessageInput } from './MessageInput'
import { MessageList } from './MessageList'
import { NewChatModal } from './NewChatModal'

function createOutgoingMessage(chatId: string, text: string, idMessage: string): Message {
  return {
    id: idMessage,
    chatId,
    text,
    timestamp: Date.now(),
    direction: 'outgoing',
  }
}

export function ChatLayout() {
  const { credentials, logout } = useAuth()
  const [chats, setChats] = useState<Chat[]>([])
  const [activeChatId, setActiveChatId] = useState<string | null>(null)
  const [showNewChat, setShowNewChat] = useState(false)
  const [sendError, setSendError] = useState('')
  const [mobileShowChat, setMobileShowChat] = useState(false)

  const activeChat = chats.find((c) => c.chatId === activeChatId) ?? null

  const handleIncomingMessage = useCallback((message: Message, chatName?: string) => {
    setChats((prev) => {
      const existing = prev.find((c) => c.chatId === message.chatId)

      if (existing) {
        if (existing.messages.some((m) => m.id === message.id)) {
          return prev
        }

        return prev.map((chat) =>
          chat.chatId === message.chatId
            ? {
                ...chat,
                name: chatName || chat.name,
                messages: [...chat.messages, message],
              }
            : chat,
        )
      }

      return [
        ...prev,
        {
          chatId: message.chatId,
          name: chatName || message.chatId,
          messages: [message],
        },
      ]
    })
  }, [])

  useNotificationPoller({
    credentials,
    enabled: Boolean(credentials),
    onIncomingMessage: handleIncomingMessage,
  })

  const createChat = async (phoneOrChatId: string) => {
    if (!credentials) return

    let chatId: string
    let phoneNumber: string | undefined
    let name: string

    if (looksLikePhone(phoneOrChatId)) {
      const phone = normalizePhone(phoneOrChatId)
      const result = await checkAccount(credentials, Number(phone))

      if (result.exist === false) {
        throw new Error('Аккаунт MAX на этом номере не найден')
      }

      if (!result.chatId) {
        throw new Error(result.reason || 'Не удалось получить chatId')
      }

      chatId = result.chatId
      phoneNumber = phone
      name = phone
    } else {
      chatId = phoneOrChatId.trim()
      name = chatId
    }

    setChats((prev) => {
      if (prev.some((c) => c.chatId === chatId)) {
        return prev
      }
      return [...prev, { chatId, phoneNumber, name, messages: [] }]
    })

    setActiveChatId(chatId)
    setMobileShowChat(true)
  }

  const handleSend = async (text: string) => {
    if (!credentials || !activeChat) return

    setSendError('')

    try {
      const { idMessage } = await sendMessage(credentials, activeChat.chatId, text)
      const message = createOutgoingMessage(activeChat.chatId, text, idMessage)

      setChats((prev) =>
        prev.map((chat) =>
          chat.chatId === activeChat.chatId
            ? { ...chat, messages: [...chat.messages, message] }
            : chat,
        ),
      )
    } catch (err) {
      setSendError(err instanceof Error ? err.message : 'Ошибка отправки')
      throw err
    }
  }

  const selectChat = (chatId: string) => {
    setActiveChatId(chatId)
    setSendError('')
    setMobileShowChat(true)
  }

  return (
    <ChatApp>
      <ChatSidebar $hiddenMobile={mobileShowChat}>
        <SidebarTop>
          <SidebarBrand>
            <BrandMark>M</BrandMark>
            <span>MAX</span>
          </SidebarBrand>
          <LogoutBtn type="button" onClick={logout}>
            Выйти
          </LogoutBtn>
        </SidebarTop>
        <ChatList
          chats={chats}
          activeChatId={activeChatId}
          onSelect={selectChat}
          onNewChat={() => setShowNewChat(true)}
        />
      </ChatSidebar>

      <ChatMain $visibleMobile={mobileShowChat}>
        {activeChat ? (
          <>
            <ChatHeader>
              <BackBtn
                type="button"
                onClick={() => setMobileShowChat(false)}
                aria-label="Назад к списку"
              >
                ←
              </BackBtn>
              <ChatHeaderAvatar aria-hidden="true">
                {activeChat.name.slice(0, 1).toUpperCase()}
              </ChatHeaderAvatar>
              <ChatHeaderInfo>
                <strong>{activeChat.name}</strong>
                <span>{activeChat.chatId}</span>
              </ChatHeaderInfo>
            </ChatHeader>

            <MessageList messages={activeChat.messages} />

            {sendError ? <SendError>{sendError}</SendError> : null}

            <MessageInput onSend={handleSend} />
          </>
        ) : (
          <ChatPlaceholder>
            <PlaceholderLogo>M</PlaceholderLogo>
            <p>Выберите чат или создайте новый</p>
          </ChatPlaceholder>
        )}
      </ChatMain>

      {showNewChat ? (
        <NewChatModal onClose={() => setShowNewChat(false)} onCreate={createChat} />
      ) : null}
    </ChatApp>
  )
}
