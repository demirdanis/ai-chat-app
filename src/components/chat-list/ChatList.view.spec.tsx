import { render, screen } from '@testing-library/react'

import type { Chat } from './ChatList.types'
import { ChatListView } from './ChatList.view'

const scrollIntoView = jest.fn()

beforeAll(() => {
  Element.prototype.scrollIntoView = scrollIntoView
  globalThis.requestAnimationFrame = (cb: FrameRequestCallback): number => {
    cb(0)
    return 0
  }
})

const useParams = jest.fn()

jest.mock('next/navigation', () => {
  return {
    useParams: () => useParams(),
  }
})

describe('ChatListView', () => {
  beforeEach(() => {
    useParams.mockReset()
    scrollIntoView.mockReset()
  })

  it('renders chats with fallbacks and active styling', () => {
    useParams.mockReturnValue({ chatId: 'c2' })

    const chats: Chat[] = [
      {
        id: 'c1',
        title: null,
        created_at: new Date('2025-01-01T00:00:00Z').toISOString(),
        characters: (null as unknown) as Chat['characters'],
      },
      {
        id: 'c2',
        title: 'Hello',
        created_at: new Date('2025-01-02T00:00:00Z').toISOString(),
        characters: ({ name: 'Alice' } as unknown) as Chat['characters'],
      },
    ]

    render(
      <ChatListView
        chats={chats}
      />,
    )

    expect(screen.getByText('Untitled chat')).toBeInTheDocument()
    expect(screen.getByText('with Unknown')).toBeInTheDocument()

    const activeLink = screen.getByText('Hello').closest('a')
    expect(activeLink).not.toBeNull()
    expect(activeLink.getAttribute('href')).toBe('/chat/c2')
    expect(activeLink.className).toContain('bg-soft')
    expect(activeLink.className).toContain('text-primary')
  })

  it('scrolls active chat into view once', () => {
    useParams.mockReturnValue({ chatId: 'c2' })

    const chats: Chat[] = [
      {
        id: 'c1',
        title: 'A',
        created_at: new Date().toISOString(),
        characters: ({ name: 'X' } as unknown) as Chat['characters'],
      },
      {
        id: 'c2',
        title: 'B',
        created_at: new Date().toISOString(),
        characters: ({ name: 'Y' } as unknown) as Chat['characters'],
      },
    ]

    render(
      <ChatListView
        chats={chats}
      />,
    )

    expect(scrollIntoView).toHaveBeenCalledTimes(1)
  })
})
