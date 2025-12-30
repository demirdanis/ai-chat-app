import { render, screen } from '@testing-library/react'

import { ChatSidebar } from './ChatSidebar'

jest.mock('../chat-list/ChatList', () => {
  return {
    ChatList: () => {
      const React = require('react')
      return React.createElement('div', { 'data-testid': 'chat-list' })
    },
  }
})

describe('ChatSidebar', () => {
  it('renders title, new chat link, and chat list', async () => {
    render(await ChatSidebar())

    expect(screen.getByText('Chats')).toBeInTheDocument()
    expect(screen.getByRole('link', { name: '+ New' })).toHaveAttribute(
      'href',
      '/chat',
    )
    expect(screen.getByTestId('chat-list')).toBeInTheDocument()
  })
})
