import { render, screen } from '@testing-library/react'

import { ChatList } from './ChatList'
import type { ChatListPorps } from './ChatList.types'

type GetAllChatsResult = {
  data: Array<{ id: string }> | null
  error: unknown
}

const getAllChats = jest.fn<Promise<GetAllChatsResult>, [limit: number]>()

jest.mock('@/services/chat.service', () => {
  return {
    getAllChats: (limit: number) => getAllChats(limit),
  }
})

const chatListViewMock = jest.fn<void, [ChatListPorps]>()

jest.mock('./ChatList.view', () => {
  return {
    ChatListView: (props: ChatListPorps) => {
      chatListViewMock(props)
      const React = require('react')
      return React.createElement('div', { 'data-testid': 'chat-list-view' })
    },
  }
})

describe('ChatList', () => {
  beforeEach(() => {
    getAllChats.mockReset()
    chatListViewMock.mockReset()
  })

  it('fetches chats and passes them to ChatListView', async () => {
    getAllChats.mockResolvedValue({
      data: [{ id: 'c1' }, { id: 'c2' }],
      error: null,
    })

    render(await ChatList())

    expect(getAllChats).toHaveBeenCalledWith(50)
    expect(screen.getByTestId('chat-list-view')).toBeInTheDocument()
    expect(chatListViewMock).toHaveBeenCalledWith(
      expect.objectContaining({ chats: [{ id: 'c1' }, { id: 'c2' }] }),
    )
  })

  it('passes empty array when chats is null', async () => {
    getAllChats.mockResolvedValue({
      data: null,
      error: null,
    })

    render(await ChatList())

    expect(chatListViewMock).toHaveBeenCalledWith(
      expect.objectContaining({ chats: [] }),
    )
  })
})
