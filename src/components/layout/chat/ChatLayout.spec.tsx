import { render, screen } from '@testing-library/react'

import ChatLayout from './ChatLayout'
import type { HeaderProps } from '../header/Header.types'
import type { ReactNode } from 'react'

const requireUser = jest.fn()

jest.mock('@/app/auth/callback/requireUser', () => {
  return {
    requireUser: () => requireUser(),
  }
})

jest.mock('@/components/chat-sidebar/ChatSidebar', () => {
  return {
    ChatSidebar: () => {
      const React = require('react')
      return React.createElement('aside', { 'data-testid': 'sidebar' })
    },
  }
})

jest.mock('@/components/chat-list/ChatList', () => {
  return {
    ChatList: () => {
      const React = require('react')
      return React.createElement('div', { 'data-testid': 'chat-list' })
    },
  }
})

jest.mock('@/components/drawer/mobile-chat-list-drawer/MobileChatListDrawer', () => {
  return {
    MobileChatListDrawer: ({ children }: { children?: ReactNode }) => {
      const React = require('react')
      return React.createElement('div', { 'data-testid': 'mobile-drawer' }, children)
    },
  }
})

const headerMock = jest.fn()

jest.mock('@/components/layout/header/Header', () => {
  return {
    Header: (props: HeaderProps) => {
      headerMock(props)
      const React = require('react')
      return React.createElement(
        'header',
        { 'data-testid': 'header' },
        props.leftSlot,
      )
    },
  }
})

describe('ChatLayout', () => {
  beforeEach(() => {
    requireUser.mockReset()
    headerMock.mockReset()
  })

  it('derives user info from metadata with fallbacks', async () => {
    requireUser.mockResolvedValue({
      user: {
        email: 'a@b.com',
        user_metadata: {
          name: 'N',
          full_name: 'Full',
          picture: '/p.png',
          avatar_url: '/a.png',
        },
      },
    })

    render(await ChatLayout({ children: <div>child</div> }))

    expect(screen.getByTestId('header')).toBeInTheDocument()
    expect(screen.getByTestId('sidebar')).toBeInTheDocument()
    expect(screen.getByText('child')).toBeInTheDocument()
    expect(screen.getByTestId('mobile-drawer')).toBeInTheDocument()
    expect(screen.getByTestId('chat-list')).toBeInTheDocument()
    expect(headerMock).toHaveBeenCalledWith(
      expect.objectContaining({
        email: 'a@b.com',
        fullName: 'Full',
        avatarUrl: '/a.png',
      }),
    )
  })

  it('uses default fullName and avatarUrl when metadata missing', async () => {
    requireUser.mockResolvedValue({
      user: {
        email: null,
        user_metadata: {},
      },
    })

    render(await ChatLayout({ children: <div>child</div> }))

    expect(headerMock).toHaveBeenCalledWith(
      expect.objectContaining({
        email: '',
        fullName: 'Kullanıcı',
        avatarUrl: null,
      }),
    )
  })
})
