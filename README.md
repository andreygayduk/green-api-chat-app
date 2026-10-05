# MAX Chat — GREEN-API

Простой React-чат для отправки и получения текстовых сообщений в мессенджере [MAX](https://green-api.com/max) через [GREEN-API](https://green-api.com/v3/docs/).

Интерфейс повторяет минимальный вид [web.max.ru](https://web.max.ru): список чатов слева, диалог справа.

## Возможности

- Вход по `idInstance` и `apiTokenInstance`
- Создание чата по номеру телефона (через `checkAccount`) или по `chatId`
- Отправка текста методом [SendMessage](https://green-api.com/v3/docs/api/sending/SendMessage/)
- Получение входящих через [ReceiveNotification](https://green-api.com/v3/docs/api/receiving/technology-http-api/ReceiveNotification/) + [DeleteNotification](https://green-api.com/v3/docs/api/receiving/technology-http-api/DeleteNotification/)

## Подготовка GREEN-API

1. Зарегистрируйтесь в [личном кабинете](https://console.green-api.com/) и создайте инстанс MAX.
2. Авторизуйте инстанс по QR-коду в приложении MAX.
3. Скопируйте `idInstance`, `apiTokenInstance` и `apiUrl`.
4. Для приёма через HTTP API очистите `webhookUrl` в настройках инстанса и включите уведомления о входящих сообщениях (`incomingWebhook = yes`).

## Запуск

```bash
npm install
npm run dev
```

Откройте адрес из терминала (обычно http://localhost:5173).

## Как пользоваться

1. Введите `idInstance`, `apiTokenInstance` и при необходимости `apiUrl`.
2. Нажмите **+** и создайте чат: номер вида `79991234567` или готовый `chatId`.
3. Отправьте текстовое сообщение.
4. Ответьте с телефона в MAX — сообщение появится в чате.

## Стек

- React 19 + TypeScript
- Vite
- CSS без UI-библиотек
