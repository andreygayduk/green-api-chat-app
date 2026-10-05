import { useState, type FormEvent } from 'react'
import { DEFAULT_API_URL } from '../constants'
import { useAuth } from '../context/useAuth'
import {
  Field,
  LoginCard,
  LoginError,
  LoginLogo,
  LoginPage,
  LoginSubmit,
  LoginSubtitle,
  LoginTitle,
} from './LoginForm.styles'

export function LoginForm() {
  const { login } = useAuth()
  const [idInstance, setIdInstance] = useState('')
  const [apiTokenInstance, setApiTokenInstance] = useState('')
  const [apiUrl, setApiUrl] = useState(DEFAULT_API_URL)
  const [error, setError] = useState('')

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault()
    setError('')

    if (!idInstance.trim() || !apiTokenInstance.trim()) {
      setError('Заполните idInstance и apiTokenInstance')
      return
    }

    login({
      idInstance: idInstance.trim(),
      apiTokenInstance: apiTokenInstance.trim(),
      apiUrl: apiUrl.trim() || DEFAULT_API_URL,
    })
  }

  return (
    <LoginPage>
      <LoginCard onSubmit={handleSubmit}>
        <LoginLogo aria-hidden="true">
          <span>M</span>
        </LoginLogo>
        <LoginTitle>Вход в MAX Chat</LoginTitle>
        <LoginSubtitle>
          Введите данные инстанса из личного кабинета GREEN-API
        </LoginSubtitle>

        <Field>
          <span>idInstance</span>
          <input
            type="text"
            value={idInstance}
            onChange={(e) => setIdInstance(e.target.value)}
            placeholder="3100000001"
            autoComplete="off"
            required
          />
        </Field>

        <Field>
          <span>apiTokenInstance</span>
          <input
            type="password"
            value={apiTokenInstance}
            onChange={(e) => setApiTokenInstance(e.target.value)}
            placeholder="Токен инстанса"
            autoComplete="off"
            required
          />
        </Field>

        <Field>
          <span>apiUrl</span>
          <input
            type="url"
            value={apiUrl}
            onChange={(e) => setApiUrl(e.target.value)}
            placeholder={DEFAULT_API_URL}
          />
        </Field>

        {error ? <LoginError>{error}</LoginError> : null}

        <LoginSubmit type="submit">Войти</LoginSubmit>
      </LoginCard>
    </LoginPage>
  )
}
