import styled from 'styled-components'

export const ChatApp = styled.div`
  display: flex;
  height: 100vh;
  background: ${({ theme }) => theme.colors.surfaceApp};
  overflow: hidden;
`

export const ChatSidebar = styled.div<{ $hiddenMobile?: boolean }>`
  display: flex;
  flex-direction: column;
  background: ${({ theme }) => theme.colors.white};
  border-right: 1px solid ${({ theme }) => theme.colors.borderAlt};
  width: 320px;
  min-width: 280px;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    width: 100%;
    min-width: 0;
    border-right: none;
    display: ${({ $hiddenMobile }) => ($hiddenMobile ? 'none' : 'flex')};
  }
`

export const SidebarTop = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 14px 0;
`

export const SidebarBrand = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  font-weight: 700;
  font-size: 16px;
  color: ${({ theme }) => theme.colors.text};
  padding: 4px 4px 0;
`

export const BrandMark = styled.span`
  width: 28px;
  height: 28px;
  border-radius: ${({ theme }) => theme.radii.full};
  background: ${({ theme }) => theme.gradients.brand};
  color: ${({ theme }) => theme.colors.white};
  display: grid;
  place-items: center;
  font-size: 13px;
`

export const LogoutBtn = styled.button`
  border: none;
  background: transparent;
  color: ${({ theme }) => theme.colors.textMuted};
  font-size: 13px;
  font-family: inherit;
  cursor: pointer;
  padding: 6px 8px;
  border-radius: ${({ theme }) => theme.radii.sm};

  &:hover {
    background: ${({ theme }) => theme.colors.surfaceMuted};
    color: ${({ theme }) => theme.colors.text};
  }
`

export const ChatMain = styled.main<{ $visibleMobile?: boolean }>`
  flex: 1;
  display: flex;
  flex-direction: column;
  min-width: 0;
  background: ${({ theme }) => theme.colors.surfaceChat};

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    display: ${({ $visibleMobile }) => ($visibleMobile ? 'flex' : 'none')};
    width: ${({ $visibleMobile }) => ($visibleMobile ? '100%' : 'auto')};
  }
`

export const ChatHeader = styled.header`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 20px;
  background: ${({ theme }) => theme.colors.white};
  border-bottom: 1px solid ${({ theme }) => theme.colors.borderAlt};
  min-height: 64px;
  box-sizing: border-box;
`

export const BackBtn = styled.button`
  display: none;
  border: none;
  background: transparent;
  font-size: 20px;
  cursor: pointer;
  color: ${({ theme }) => theme.colors.primary};
  padding: 4px 8px;
  font-family: inherit;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    display: block;
  }
`

export const ChatHeaderAvatar = styled.span`
  width: 40px;
  height: 40px;
  border-radius: ${({ theme }) => theme.radii.full};
  background: ${({ theme }) => theme.gradients.avatar};
  color: ${({ theme }) => theme.colors.white};
  display: grid;
  place-items: center;
  font-weight: 700;
  flex-shrink: 0;
`

export const ChatHeaderInfo = styled.div`
  display: flex;
  flex-direction: column;
  min-width: 0;

  strong {
    font-size: 15px;
    color: ${({ theme }) => theme.colors.text};
  }

  span {
    font-size: 12px;
    color: ${({ theme }) => theme.colors.textFaint};
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`

export const ChatPlaceholder = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 12px;
  color: ${({ theme }) => theme.colors.textFaint};
`

export const PlaceholderLogo = styled.div`
  width: 72px;
  height: 72px;
  border-radius: ${({ theme }) => theme.radii.full};
  background: ${({ theme }) => theme.gradients.brand};
  color: ${({ theme }) => theme.colors.white};
  display: grid;
  place-items: center;
  font-size: 32px;
  font-weight: 700;
  opacity: 0.85;
`

export const SendError = styled.p`
  margin: 0;
  padding: 8px 16px;
  font-size: 13px;
  color: ${({ theme }) => theme.colors.danger};
  background: ${({ theme }) => theme.colors.dangerBg};
  border-top: 1px solid ${({ theme }) => theme.colors.dangerBorder};
`
