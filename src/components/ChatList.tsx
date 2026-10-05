import type { Chat } from '../types'
import './ChatList.css'

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
    <aside className="chat-list">
      <header className="chat-list-header">
        <h2>Чаты</h2>
        <button type="button" className="new-chat-btn" onClick={onNewChat} title="Новый чат">
          +
        </button>
      </header>

      <ul className="chat-list-items">
        {chats.length === 0 ? (
          <li className="chat-list-empty">Создайте новый чат</li>
        ) : (
          chats.map((chat) => (
            <li key={chat.chatId}>
              <button
                type="button"
                className={`chat-list-item${activeChatId === chat.chatId ? ' active' : ''}`}
                onClick={() => onSelect(chat.chatId)}
              >
                <span className="chat-avatar" aria-hidden="true">
                  {chat.name.slice(0, 1).toUpperCase()}
                </span>
                <span className="chat-meta">
                  <span className="chat-name">{chat.name}</span>
                  <span className="chat-preview">{lastPreview(chat)}</span>
                </span>
              </button>
            </li>
          ))
        )}
      </ul>
    </aside>
  )
}
