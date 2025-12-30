import { render, screen, waitFor } from '@testing-library/react'

import { ChatClient } from './ChatClient'
import type { MessageRow } from './ChatClient.types'
import userEvent from '@testing-library/user-event'

jest.mock('@/components/markdown-message/MarkdownMessage', () => {
  return {
    MarkdownMessage: ({ content }: { content: string }) => {
      const React = require('react')
      return React.createElement('div', { 'data-testid': 'markdown' }, content)
    },
  }
})

const refresh = jest.fn()

jest.mock('next/navigation', () => {
  return {
    useRouter: () => ({ refresh }),
  }
})

const sendMessage = jest.fn<Promise<MessageRow>, [chatId: string, content: string]>()
const saveAssistantMessage = jest.fn<
  Promise<MessageRow>,
  [chatId: string, assistantContent: string]
>()

jest.mock('@/app/chat/[chatId]/actions', () => {
  return {
    sendMessage: (chatId: string, content: string) => sendMessage(chatId, content),
    saveAssistantMessage: (chatId: string, assistantContent: string) =>
      saveAssistantMessage(chatId, assistantContent),
  }
})

const streamChat = jest.fn<
  Promise<string>,
  [chatId: string, message: string, onChunk: (text: string) => void]
>()

jest.mock('@/lib/stream', () => {
  return {
    streamChat: (chatId: string, message: string, onChunk: (text: string) => void) =>
      streamChat(chatId, message, onChunk),
  }
})

describe('ChatClient', () => {
  beforeEach(() => {
    refresh.mockReset()
    sendMessage.mockReset()
    saveAssistantMessage.mockReset()
    streamChat.mockReset()

    const cryptoLike = globalThis.crypto as unknown as { randomUUID?: () => string }
    if (!cryptoLike.randomUUID) {
      cryptoLike.randomUUID = () => 'uuid'
    }

    globalThis.requestAnimationFrame = (cb: FrameRequestCallback): number => {
      cb(0)
      return 0
    }

    Element.prototype.scrollIntoView = jest.fn()
  })

  it('renders empty state when there are no messages', () => {
    render(<ChatClient chatId="c1" initialMessages={[]} />)

    expect(screen.getByText('Start a conversation')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('Type a message…')).toBeInTheDocument()
  })

  it('renders user messages and typing state for empty assistant message', () => {
    const initialMessages: MessageRow[] = [
      {
        id: 'm1',
        chat_id: 'c1',
        role: 'user',
        content: 'hello',
        created_at: new Date().toISOString(),
      } as unknown as MessageRow,
      {
        id: 'm2',
        chat_id: 'c1',
        role: 'assistant',
        content: '   ',
        created_at: new Date().toISOString(),
      } as unknown as MessageRow,
    ]

    render(
      <ChatClient
        chatId="c1"
        initialMessages={initialMessages}
      />,
    )

    expect(screen.getByText('hello')).toBeInTheDocument()
    expect(screen.getAllByText('', { selector: 'span' }).length).toBeGreaterThan(0)
  })

  it('sends a message, streams assistant response, and persists assistant message', async () => {
    const user = userEvent.setup()

    const savedUser: MessageRow = {
      id: 'saved-user-1',
      chat_id: 'c1',
      role: 'user',
      content: 'Hi',
      created_at: new Date().toISOString(),
    } as unknown as MessageRow

    const savedAssistant: MessageRow = {
      id: 'saved-assistant-1',
      chat_id: 'c1',
      role: 'assistant',
      content: 'Hello world',
      created_at: new Date().toISOString(),
    } as unknown as MessageRow

    sendMessage.mockResolvedValue(savedUser)
    streamChat.mockImplementation(async (_chatId: string, _text: string, onChunk: (text: string) => void) => {
      onChunk('Hello')
      onChunk(' world')
      return 'Hello world'
    })
    saveAssistantMessage.mockResolvedValue(savedAssistant)

    render(<ChatClient chatId="c1" initialMessages={[]} />)

    await user.type(screen.getByPlaceholderText('Type a message…'), '  Hi  ')
    await user.click(screen.getByRole('button', { name: 'Send' }))

    await waitFor(() => expect(sendMessage).toHaveBeenCalledWith('c1', 'Hi'))
    await waitFor(() => expect(refresh).toHaveBeenCalled())
    await waitFor(() => expect(streamChat).toHaveBeenCalled())
    await waitFor(() => expect(saveAssistantMessage).toHaveBeenCalledWith('c1', 'Hello world'))

    expect(await screen.findByText('Hello world')).toBeInTheDocument()
  })

  it('shows an error and removes optimistic assistant message when streaming fails', async () => {
    const user = userEvent.setup()

    sendMessage.mockResolvedValue(
      {
        id: 'saved-user-1',
        chat_id: 'c1',
        role: 'user',
        content: 'Hi',
        created_at: new Date().toISOString(),
      } as unknown as MessageRow,
    )
    streamChat.mockRejectedValue(new Error('no stream'))

    render(<ChatClient chatId="c1" initialMessages={[]} />)

    await user.type(screen.getByPlaceholderText('Type a message…'), 'Hi')
    await user.click(screen.getByRole('button', { name: 'Send' }))

    expect(await screen.findByText('no stream')).toBeInTheDocument()
    await waitFor(() => expect(saveAssistantMessage).not.toHaveBeenCalled())
  })
})
