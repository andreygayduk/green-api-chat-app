import { createContext } from 'react'
import type { Credentials } from '../types'

export interface AuthContextValue {
  credentials: Credentials | null
  login: (credentials: Credentials) => void
  logout: () => void
}

export const AuthContext = createContext<AuthContextValue | null>(null)
