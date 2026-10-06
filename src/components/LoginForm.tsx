import { useForm } from 'react-hook-form'
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

interface LoginFormValues {
  idInstance: string
  apiTokenInstance: string
  apiUrl: string
}

export function LoginForm() {
  const { login } = useAuth()
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<LoginFormValues>({
    defaultValues: {
      idInstance: '',
      apiTokenInstance: '',
      apiUrl: DEFAULT_API_URL,
    },
  })

  const onSubmit = (data: LoginFormValues) => {
    const idInstance = data.idInstance.trim()
    const apiTokenInstance = data.apiTokenInstance.trim()

    if (!idInstance || !apiTokenInstance) {
      setError('root', { message: 'Заполните idInstance и apiTokenInstance' })
      return
    }

    login({
      idInstance,
      apiTokenInstance,
      apiUrl: data.apiUrl.trim() || DEFAULT_API_URL,
    })
  }

  return (
    <LoginPage>
      <LoginCard noValidate={true} onSubmit={handleSubmit(onSubmit)}>
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
            placeholder="3100000001"
            autoComplete="off"
            {...register('idInstance', { required: true })}
          />
        </Field>

        <Field>
          <span>apiTokenInstance</span>
          <input
            type="password"
            placeholder="Токен инстанса"
            autoComplete="off"
            {...register('apiTokenInstance', { required: true })}
          />
        </Field>

        <Field>
          <span>apiUrl</span>
          <input
            type="url"
            placeholder={DEFAULT_API_URL}
            {...register('apiUrl')}
          />
        </Field>

        {errors.root || errors.idInstance || errors.apiTokenInstance ? (
          <LoginError>
            {errors.root?.message ?? 'Заполните idInstance и apiTokenInstance'}
          </LoginError>
        ) : null}

        <LoginSubmit type="submit">Войти</LoginSubmit>
      </LoginCard>
    </LoginPage>
  )
}
