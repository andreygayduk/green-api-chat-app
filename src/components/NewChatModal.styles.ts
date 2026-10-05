import styled from 'styled-components'

export const ModalBackdrop = styled.div`
  position: fixed;
  inset: 0;
  background: ${({ theme }) => theme.colors.overlay};
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 100;
  padding: 16px;
`

export const ModalCard = styled.div`
  width: 100%;
  max-width: 400px;
  background: ${({ theme }) => theme.colors.white};
  border-radius: ${({ theme }) => theme.radii['2xl']};
  padding: 24px;
  box-shadow: ${({ theme }) => theme.shadows.modal};

  h2 {
    margin: 0 0 6px;
    font-size: 18px;
    color: ${({ theme }) => theme.colors.text};
  }
`

export const ModalHint = styled.p`
  margin: 0 0 16px;
  font-size: 13px;
  color: ${({ theme }) => theme.colors.textMuted};
  line-height: 1.4;
`

export const ModalInput = styled.input`
  width: 100%;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.lg};
  padding: 11px 14px;
  font-size: 15px;
  font-family: inherit;
  color: ${({ theme }) => theme.colors.text};
  background: ${({ theme }) => theme.colors.surface};
  outline: none;
  box-sizing: border-box;

  &:focus {
    border-color: ${({ theme }) => theme.colors.primary};
    box-shadow: ${({ theme }) => theme.shadows.focus};
    background: ${({ theme }) => theme.colors.white};
  }
`

export const ModalError = styled.p`
  margin: 10px 0 0;
  font-size: 13px;
  color: ${({ theme }) => theme.colors.danger};
`

export const ModalActions = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 8px;
  margin-top: 16px;
`

const ModalButton = styled.button`
  border: none;
  border-radius: ${({ theme }) => theme.radii.md};
  padding: 9px 16px;
  font-size: 14px;
  font-weight: 600;
  font-family: inherit;
  cursor: pointer;

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`

export const BtnPrimary = styled(ModalButton)`
  background: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.white};

  &:hover:not(:disabled) {
    background: ${({ theme }) => theme.colors.primaryHover};
  }
`

export const BtnSecondary = styled(ModalButton)`
  background: ${({ theme }) => theme.colors.surfaceMuted};
  color: ${({ theme }) => theme.colors.textSecondary};

  &:hover:not(:disabled) {
    background: ${({ theme }) => theme.colors.border};
  }
`
