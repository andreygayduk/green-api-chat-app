'use client'

import {
  useCallback,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import { CREDENTIALS_STORAGE_KEY, DEFAULT_API_URL } from '../constants'
import type { Credentials } from '../types'
import { AuthContext } from './authContextValue'

function loadCredentials(): Credentials | null {
  try {
    const raw = localStorage.getItem(CREDENTIALS_STORAGE_KEY)
    if (!raw) return null
    const parsed = JSON.parse(raw) as Credentials
    if (!parsed.idInstance || !parsed.apiTokenInstance) return null
    return {
      idInstance: parsed.idInstance,
      apiTokenInstance: parsed.apiTokenInstance,
      apiUrl: parsed.apiUrl || DEFAULT_API_URL,
    }
  } catch {
    return null
  }
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [credentials, setCredentials] = useState<Credentials | null>(null)
  const [ready, setReady] = useState(false)

  useEffect(() => {
    setCredentials(loadCredentials())
    setReady(true)
  }, [])

  const login = useCallback((next: Credentials) => {
    const normalized: Credentials = {
      idInstance: next.idInstance.trim(),
      apiTokenInstance: next.apiTokenInstance.trim(),
      apiUrl: (next.apiUrl || DEFAULT_API_URL).replace(/\/$/, ''),
    }
    localStorage.setItem(CREDENTIALS_STORAGE_KEY, JSON.stringify(normalized))
    setCredentials(normalized)
  }, [])

  const logout = useCallback(() => {
    localStorage.removeItem(CREDENTIALS_STORAGE_KEY)
    setCredentials(null)
  }, [])

  const value = useMemo(
    () => ({ credentials, ready, login, logout }),
    [credentials, ready, login, logout],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
