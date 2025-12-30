import { render, screen } from '@testing-library/react'

import type { ChatClientProps } from '@/components/chat-client/ChatClient.types'
import ChatDetailPage from './ChatDetailPage'
import type { ChatDetailPageProps } from './ChatDetailPage.types'
import type { MessageRow } from '@/components/chat-client/ChatClient.types'
import type { getAllMessagesByChatId as getAllMessagesByChatIdFn } from '@/services/messages.service'
import type { getChatAndOwner as getChatAndOwnerFn } from '@/services/chat.service'

const requireUser = jest.fn()
const getChatAndOwner = jest.fn<ReturnType<typeof getChatAndOwnerFn>, Parameters<typeof getChatAndOwnerFn>>()
const getAllMessagesByChatId = jest.fn<
  ReturnType<typeof getAllMessagesByChatIdFn>,
  Parameters<typeof getAllMessagesByChatIdFn>
>()

jest.mock('@/app/auth/callback/requireUser', () => {
  return {
    requireUser: () => requireUser(),
  }
})

jest.mock('@/services/chat.service', () => {
  return {
    getChatAndOwner: (...args: Parameters<typeof getChatAndOwnerFn>) => getChatAndOwner(...args),
  }
})

jest.mock('@/services/messages.service', () => {
  return {
    getAllMessagesByChatId: (...args: Parameters<typeof getAllMessagesByChatIdFn>) =>
      getAllMessagesByChatId(...args),
  }
})

const chatClientMock = jest.fn()

jest.mock('@/components/chat-client/ChatClient', () => {
  return {
    ChatClient: (props: ChatClientProps) => {
      chatClientMock(props)
      const React = require('react')
      return React.createElement('div', { 'data-testid': 'chat-client' })
    },
  }
})

describe('ChatDetailPage', () => {
  beforeEach(() => {
    requireUser.mockReset()
    getChatAndOwner.mockReset()
    getAllMessagesByChatId.mockReset()
    chatClientMock.mockReset()
  })

  it('renders not found when chat is missing or access denied', async () => {
    requireUser.mockResolvedValue({ user: {} })
    getChatAndOwner.mockResolvedValue({ data: null, error: null })

    const props: ChatDetailPageProps = {
      params: Promise.resolve({ chatId: 'c1' }),
    }

    render(
      await ChatDetailPage(props),
    )

    expect(
      screen.getByText('Chat not found or you don’t have access.'),
    ).toBeInTheDocument()
  })

  it('renders message load error', async () => {
    requireUser.mockResolvedValue({ user: {} })
    getChatAndOwner.mockResolvedValue({ data: { id: 'c1', user_id: 'u1' }, error: null })
    getAllMessagesByChatId.mockResolvedValue({ data: null, error: new Error('oops') })

    const props: ChatDetailPageProps = {
      params: Promise.resolve({ chatId: 'c1' }),
    }

    render(
      await ChatDetailPage(props),
    )

    expect(
      screen.getByText('Failed to load messages: oops'),
    ).toBeInTheDocument()
  })

  it('renders ChatClient with messages on success', async () => {
    requireUser.mockResolvedValue({ user: {} })
    getChatAndOwner.mockResolvedValue({ data: { id: 'c1', user_id: 'u1' }, error: null })

    const messages: MessageRow[] = [
      {
        id: 'm1',
        chat_id: 'c1',
        role: 'assistant',
        content: 'hi',
        created_at: new Date(0).toISOString(),
      },
    ]
    getAllMessagesByChatId.mockResolvedValue({ data: messages, error: null })

    const props: ChatDetailPageProps = {
      params: Promise.resolve({ chatId: 'c1' }),
    }

    render(
      await ChatDetailPage(props),
    )

    expect(screen.getByTestId('chat-client')).toBeInTheDocument()
    expect(chatClientMock).toHaveBeenCalledWith(
      expect.objectContaining({ chatId: 'c1', initialMessages: messages }),
    )
  })
})
