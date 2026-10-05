import styled from 'styled-components'

export const LoginPage = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px;
  background:
    radial-gradient(ellipse 80% 60% at 50% -10%, rgba(59, 130, 246, 0.12), transparent),
    ${({ theme }) => theme.colors.surfaceAlt};
`

export const LoginCard = styled.form`
  width: 100%;
  max-width: 400px;
  background: ${({ theme }) => theme.colors.white};
  border-radius: ${({ theme }) => theme.radii['3xl']};
  padding: 36px 32px;
  box-shadow: ${({ theme }) => theme.shadows.card};
  display: flex;
  flex-direction: column;
  gap: 14px;
`

export const LoginLogo = styled.div`
  width: 56px;
  height: 56px;
  border-radius: ${({ theme }) => theme.radii.full};
  margin: 0 auto 4px;
  display: grid;
  place-items: center;
  background: ${({ theme }) => theme.gradients.brand};
  color: ${({ theme }) => theme.colors.white};
  font-size: 24px;
  font-weight: 700;
`

export const LoginTitle = styled.h1`
  margin: 0;
  text-align: center;
  font-size: 22px;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.text};
`

export const LoginSubtitle = styled.p`
  margin: 0 0 8px;
  text-align: center;
  font-size: 14px;
  color: ${({ theme }) => theme.colors.textMuted};
  line-height: 1.4;
`

export const Field = styled.label`
  display: flex;
  flex-direction: column;
  gap: 6px;
  font-size: 13px;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.textSecondary};

  input {
    border: 1px solid ${({ theme }) => theme.colors.border};
    border-radius: ${({ theme }) => theme.radii.lg};
    padding: 11px 14px;
    font-size: 15px;
    font-family: inherit;
    color: ${({ theme }) => theme.colors.text};
    background: ${({ theme }) => theme.colors.surface};
    outline: none;
    transition: border-color 0.15s, box-shadow 0.15s;

    &:focus {
      border-color: ${({ theme }) => theme.colors.primary};
      box-shadow: ${({ theme }) => theme.shadows.focus};
      background: ${({ theme }) => theme.colors.white};
    }
  }
`

export const LoginError = styled.p`
  margin: 0;
  font-size: 13px;
  color: ${({ theme }) => theme.colors.danger};
`

export const LoginSubmit = styled.button`
  margin-top: 8px;
  border: none;
  border-radius: ${({ theme }) => theme.radii.lg};
  padding: 12px 16px;
  font-size: 15px;
  font-weight: 600;
  font-family: inherit;
  color: ${({ theme }) => theme.colors.white};
  background: ${({ theme }) => theme.colors.primary};
  cursor: pointer;
  transition: background 0.15s;

  &:hover {
    background: ${({ theme }) => theme.colors.primaryHover};
  }
`
