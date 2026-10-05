'use client'

import { LoginForm } from '../components/LoginForm'
import { ChatLayout } from '../components/ChatLayout'
import { useAuth } from '../context/useAuth'

export default function HomePage() {
  const { credentials, ready } = useAuth()

  if (!ready) {
    return null
  }

  return credentials ? <ChatLayout /> : <LoginForm />
}
