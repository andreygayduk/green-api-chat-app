import styled, { css } from 'styled-components'
import type { Message } from '../types'

export const MessageListRoot = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 20px 24px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  background:
    radial-gradient(circle at 20% 20%, rgba(59, 130, 246, 0.04), transparent 40%),
    radial-gradient(circle at 80% 80%, rgba(99, 102, 241, 0.05), transparent 40%),
    ${({ theme }) => theme.colors.surfaceChat};
`

export const MessageListEmpty = styled.p`
  margin: auto;
  color: ${({ theme }) => theme.colors.textFaint};
  font-size: 14px;
`

export const MessageRow = styled.div<{ $direction: Message['direction'] }>`
  display: flex;
  justify-content: ${({ $direction }) =>
    $direction === 'outgoing' ? 'flex-end' : 'flex-start'};
`

export const MessageBubble = styled.div<{ $direction: Message['direction'] }>`
  max-width: min(70%, 480px);
  padding: 10px 12px 6px;
  border-radius: ${({ theme }) => theme.radii['2xl']};
  box-shadow: ${({ theme }) => theme.shadows.bubble};

  ${({ theme, $direction }) =>
    $direction === 'outgoing'
      ? css`
          background: ${theme.colors.primary};
          color: ${theme.colors.white};
          border-bottom-right-radius: 4px;
        `
      : css`
          background: ${theme.colors.white};
          color: ${theme.colors.text};
          border-bottom-left-radius: 4px;
        `}
`

export const MessageText = styled.p`
  margin: 0;
  font-size: 15px;
  line-height: 1.4;
  white-space: pre-wrap;
  word-break: break-word;
`

export const MessageTime = styled.time`
  display: block;
  margin-top: 4px;
  font-size: 11px;
  text-align: right;
  opacity: 0.7;
`
