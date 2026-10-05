'use client'

import { ThemeProvider } from 'styled-components'
import { AuthProvider } from '../context/AuthContext'
import { GlobalStyle } from '../styles/GlobalStyle'
import { theme } from '../styles/theme'
import { StyledComponentsRegistry } from './registry'

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <StyledComponentsRegistry>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <AuthProvider>{children}</AuthProvider>
      </ThemeProvider>
    </StyledComponentsRegistry>
  )
}
