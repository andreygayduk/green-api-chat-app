import { useState, type FormEvent } from 'react'
import { DEFAULT_API_URL } from '../constants'
import { useAuth } from '../context/useAuth'
import './LoginForm.css'

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
    <div className="login-page">
      <form className="login-card" onSubmit={handleSubmit}>
        <div className="login-logo" aria-hidden="true">
          <span>M</span>
        </div>
        <h1 className="login-title">Вход в MAX Chat</h1>
        <p className="login-subtitle">
          Введите данные инстанса из личного кабинета GREEN-API
        </p>

        <label className="field">
          <span>idInstance</span>
          <input
            type="text"
            value={idInstance}
            onChange={(e) => setIdInstance(e.target.value)}
            placeholder="3100000001"
            autoComplete="off"
            required
          />
        </label>

        <label className="field">
          <span>apiTokenInstance</span>
          <input
            type="password"
            value={apiTokenInstance}
            onChange={(e) => setApiTokenInstance(e.target.value)}
            placeholder="Токен инстанса"
            autoComplete="off"
            required
          />
        </label>

        <label className="field">
          <span>apiUrl</span>
          <input
            type="url"
            value={apiUrl}
            onChange={(e) => setApiUrl(e.target.value)}
            placeholder={DEFAULT_API_URL}
          />
        </label>

        {error ? <p className="login-error">{error}</p> : null}

        <button type="submit" className="login-submit">
          Войти
        </button>
      </form>
    </div>
  )
}
