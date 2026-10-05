import styled from 'styled-components'

/* Embedded in sidebar: full width, no own border (sidebar owns layout width) */
export const ChatListRoot = styled.aside`
  width: 100%;
  min-width: 0;
  display: flex;
  flex-direction: column;
  background: ${({ theme }) => theme.colors.white};
  border-right: none;
  flex: 1;
`

export const ChatListHeader = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 18px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.borderAlt};

  h2 {
    margin: 0;
    font-size: 18px;
    font-weight: 700;
    color: ${({ theme }) => theme.colors.text};
  }
`

export const NewChatBtn = styled.button`
  width: 36px;
  height: 36px;
  border: none;
  border-radius: ${({ theme }) => theme.radii.full};
  background: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.white};
  font-size: 22px;
  line-height: 1;
  cursor: pointer;
  display: grid;
  place-items: center;

  &:hover {
    background: ${({ theme }) => theme.colors.primaryHover};
  }
`

export const ChatListItems = styled.ul`
  list-style: none;
  margin: 0;
  padding: 8px;
  overflow-y: auto;
  flex: 1;
`

export const ChatListEmpty = styled.li`
  padding: 24px 12px;
  text-align: center;
  color: ${({ theme }) => theme.colors.textFaint};
  font-size: 14px;
`

export const ChatListItem = styled.button<{ $active?: boolean }>`
  width: 100%;
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px;
  border: none;
  border-radius: ${({ theme }) => theme.radii.xl};
  background: ${({ theme, $active }) =>
    $active ? theme.colors.primarySoft : 'transparent'};
  cursor: pointer;
  text-align: left;
  font-family: inherit;

  &:hover {
    background: ${({ theme, $active }) =>
      $active ? theme.colors.primarySoft : theme.colors.surfaceMuted};
  }
`

export const ChatAvatar = styled.span`
  width: 44px;
  height: 44px;
  border-radius: ${({ theme }) => theme.radii.full};
  background: ${({ theme }) => theme.gradients.avatar};
  color: ${({ theme }) => theme.colors.white};
  display: grid;
  place-items: center;
  font-weight: 700;
  font-size: 16px;
  flex-shrink: 0;
`

export const ChatMeta = styled.span`
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: 2px;
`

export const ChatName = styled.span`
  font-size: 15px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`

export const ChatPreview = styled.span`
  font-size: 13px;
  color: ${({ theme }) => theme.colors.textFaint};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`
