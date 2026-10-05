import type {
  CheckAccountResponse,
  Credentials,
  ReceiveNotificationResponse,
  SendMessageResponse,
} from '../types'

const DEFAULT_HOST = 'https://api.green-api.com'

function resolveBaseUrl(apiUrl: string): string {
  const base = apiUrl.replace(/\/$/, '')

  // In Next.js dev, route default GREEN-API host through rewrite to avoid CORS
  if (process.env.NODE_ENV === 'development' && base === DEFAULT_HOST) {
    return '/green-api'
  }

  return base
}

function buildUrl(
  credentials: Credentials,
  method: string,
  suffix = '',
): string {
  const base = resolveBaseUrl(credentials.apiUrl)
  return `${base}/waInstance${credentials.idInstance}/${method}/${credentials.apiTokenInstance}${suffix}`
}

async function parseJson<T>(response: Response): Promise<T> {
  if (!response.ok) {
    const text = await response.text()
    throw new Error(text || `HTTP ${response.status}`)
  }

  const text = await response.text()
  if (!text) {
    return null as T
  }

  return JSON.parse(text) as T
}

export async function sendMessage(
  credentials: Credentials,
  chatId: string,
  message: string,
): Promise<SendMessageResponse> {
  const response = await fetch(buildUrl(credentials, 'sendMessage'), {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ chatId, message }),
  })

  return parseJson<SendMessageResponse>(response)
}

export async function receiveNotification(
  credentials: Credentials,
  receiveTimeout = 20,
  signal?: AbortSignal,
): Promise<ReceiveNotificationResponse | null> {
  const response = await fetch(
    buildUrl(credentials, 'receiveNotification', `?receiveTimeout=${receiveTimeout}`),
    {
      method: 'GET',
      signal,
    },
  )

  return parseJson<ReceiveNotificationResponse | null>(response)
}

export async function deleteNotification(
  credentials: Credentials,
  receiptId: number,
): Promise<void> {
  const response = await fetch(
    buildUrl(credentials, 'deleteNotification', `/${receiptId}`),
    { method: 'DELETE' },
  )

  await parseJson(response)
}

export async function checkAccount(
  credentials: Credentials,
  phoneNumber: number,
): Promise<CheckAccountResponse> {
  const response = await fetch(buildUrl(credentials, 'checkAccount'), {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ phoneNumber }),
  })

  return parseJson<CheckAccountResponse>(response)
}

/** Normalize phone input to digits only (7… / 375…). */
export function normalizePhone(input: string): string {
  let digits = input.replace(/\D/g, '')

  if (digits.startsWith('8') && digits.length === 11) {
    digits = `7${digits.slice(1)}`
  }

  return digits
}

/** Returns true if the value looks like a phone number rather than a raw chatId. */
export function looksLikePhone(input: string): boolean {
  const digits = normalizePhone(input)
  return /^\d{11,12}$/.test(digits) && (digits.startsWith('7') || digits.startsWith('375'))
}
