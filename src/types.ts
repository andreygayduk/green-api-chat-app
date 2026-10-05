export interface Credentials {
  idInstance: string
  apiTokenInstance: string
  apiUrl: string
}

export interface Message {
  id: string
  chatId: string
  text: string
  timestamp: number
  direction: 'incoming' | 'outgoing'
}

export interface Chat {
  chatId: string
  phoneNumber?: string
  name: string
  messages: Message[]
}

export interface SendMessageResponse {
  idMessage: string
}

export interface CheckAccountResponse {
  exist?: boolean
  chatId?: string
  fromCache?: boolean
  status?: boolean
  reason?: string
}

export interface NotificationBody {
  typeWebhook: string
  timestamp: number
  idMessage: string
  senderData?: {
    chatId: string
    chatName?: string
    sender?: string
    senderName?: string
  }
  messageData?: {
    typeMessage: string
    textMessageData?: {
      textMessage: string
    }
  }
}

export interface ReceiveNotificationResponse {
  receiptId: number
  body: NotificationBody
}
