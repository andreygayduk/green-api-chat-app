import type { Chat } from '../types'
import {
  ChatAvatar,
  ChatListEmpty,
  ChatListHeader,
  ChatListItem,
  ChatListItems,
  ChatListRoot,
  ChatMeta,
  ChatName,
  ChatPreview,
  NewChatBtn,
} from './ChatList.styles'

interface ChatListProps {
  chats: Chat[]
  activeChatId: string | null
  onSelect: (chatId: string) => void
  onNewChat: () => void
}

function lastPreview(chat: Chat): string {
  const last = chat.messages[chat.messages.length - 1]
  return last?.text || 'Нет сообщений'
}

export function ChatList({ chats, activeChatId, onSelect, onNewChat }: ChatListProps) {
  return (
    <ChatListRoot>
      <ChatListHeader>
        <h2>Чаты</h2>
        <NewChatBtn type="button" onClick={onNewChat} title="Новый чат">
          +
        </NewChatBtn>
      </ChatListHeader>

      <ChatListItems>
        {chats.length === 0 ? (
          <ChatListEmpty>Создайте новый чат</ChatListEmpty>
        ) : (
          chats.map((chat) => (
            <li key={chat.chatId}>
              <ChatListItem
                type="button"
                $active={activeChatId === chat.chatId}
                onClick={() => onSelect(chat.chatId)}
              >
                <ChatAvatar aria-hidden="true">
                  {chat.name.slice(0, 1).toUpperCase()}
                </ChatAvatar>
                <ChatMeta>
                  <ChatName>{chat.name}</ChatName>
                  <ChatPreview>{lastPreview(chat)}</ChatPreview>
                </ChatMeta>
              </ChatListItem>
            </li>
          ))
        )}
      </ChatListItems>
    </ChatListRoot>
  )
}
