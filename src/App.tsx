import { AuthProvider } from './context/AuthContext'
import { useAuth } from './context/useAuth'
import { LoginForm } from './components/LoginForm'
import { ChatLayout } from './components/ChatLayout'

function AppContent() {
  const { credentials } = useAuth()
  return credentials ? <ChatLayout /> : <LoginForm />
}

export default function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  )
}
