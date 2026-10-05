import styled from 'styled-components'

export const MessageInputForm = styled.form`
  display: flex;
  align-items: flex-end;
  gap: 10px;
  padding: 12px 16px 16px;
  background: ${({ theme }) => theme.colors.white};
  border-top: 1px solid ${({ theme }) => theme.colors.borderAlt};
`

export const MessageTextarea = styled.textarea`
  flex: 1;
  resize: none;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.pill};
  padding: 10px 16px;
  font-size: 15px;
  font-family: inherit;
  line-height: 1.4;
  max-height: 120px;
  outline: none;
  background: ${({ theme }) => theme.colors.surface};
  color: ${({ theme }) => theme.colors.text};

  &:focus {
    border-color: ${({ theme }) => theme.colors.primary};
    background: ${({ theme }) => theme.colors.white};
  }
`

export const SendBtn = styled.button`
  width: 44px;
  height: 44px;
  border: none;
  border-radius: ${({ theme }) => theme.radii.full};
  background: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.white};
  cursor: pointer;
  display: grid;
  place-items: center;
  flex-shrink: 0;
  transition: background 0.15s, opacity 0.15s;

  &:hover:not(:disabled) {
    background: ${({ theme }) => theme.colors.primaryHover};
  }

  &:disabled {
    opacity: 0.45;
    cursor: not-allowed;
  }
`
