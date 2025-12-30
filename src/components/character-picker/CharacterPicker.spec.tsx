import { render, screen, waitFor } from '@testing-library/react'

import type { Character } from './CharacterPicker.types'
import { CharacterPicker } from './CharacterPicker'
import userEvent from '@testing-library/user-event'

const push = jest.fn()

jest.mock('next/navigation', () => {
  return {
    useRouter: () => ({ push }),
  }
})

const createChat = jest.fn<Promise<string>, [characterId: string]>()

jest.mock('@/app/chat/actions', () => {
  return {
    createChat: (characterId: string) => createChat(characterId),
  }
})

describe('CharacterPicker', () => {
  beforeEach(() => {
    push.mockReset()
    createChat.mockReset()
  })

  it('disables start button until a character is selected', () => {
    const characters: Character[] = [
      {
        id: 'c1',
        name: 'Alice',
        avatar_url: null,
        system_prompt: 'p1',
      },
      {
        id: 'c2',
        name: 'Bob',
        avatar_url: null,
        system_prompt: 'p2',
      },
    ]

    render(
      <CharacterPicker characters={characters} />,
    )

    expect(screen.getByRole('button', { name: 'Start chat' })).toBeDisabled()
  })

  it('creates a chat and navigates when start is clicked', async () => {
    const user = userEvent.setup()
    createChat.mockResolvedValue('chat-123')

    const characters: Character[] = [
      {
        id: 'c1',
        name: 'Alice',
        avatar_url: null,
        system_prompt: 'p1',
      },
    ]

    render(
      <CharacterPicker characters={characters} />,
    )

    await user.click(screen.getByRole('button', { name: /Alice/i }))
    await user.click(screen.getByRole('button', { name: 'Start chat' }))

    await waitFor(() => expect(createChat).toHaveBeenCalledWith('c1'))
    await waitFor(() => expect(push).toHaveBeenCalledWith('/chat/chat-123'))
  })

  it('shows an error when createChat rejects with Error', async () => {
    const user = userEvent.setup()
    createChat.mockRejectedValue(new Error('boom'))

    const characters: Character[] = [
      {
        id: 'c1',
        name: 'Alice',
        avatar_url: null,
        system_prompt: 'p1',
      },
    ]

    render(
      <CharacterPicker characters={characters} />,
    )

    await user.click(screen.getByRole('button', { name: /Alice/i }))
    await user.click(screen.getByRole('button', { name: 'Start chat' }))

    expect(await screen.findByText('boom')).toBeInTheDocument()
  })

  it('shows a generic error when createChat rejects with non-Error', async () => {
    const user = userEvent.setup()
    createChat.mockRejectedValue('nope')

    const characters: Character[] = [
      {
        id: 'c1',
        name: 'Alice',
        avatar_url: null,
        system_prompt: 'p1',
      },
    ]

    render(
      <CharacterPicker characters={characters} />,
    )

    await user.click(screen.getByRole('button', { name: /Alice/i }))
    await user.click(screen.getByRole('button', { name: 'Start chat' }))

    expect(await screen.findByText('Failed to create chat')).toBeInTheDocument()
  })
})
