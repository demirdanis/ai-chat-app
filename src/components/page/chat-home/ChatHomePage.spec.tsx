import { render, screen } from '@testing-library/react'

import type { Character } from '@/components/character-picker/CharacterPicker.types'
import type { CharacterPickerProps } from '@/components/character-picker/CharacterPicker.types'
import ChatHomePage from './ChatHomePage'

const getAllCharacters = jest.fn()

jest.mock('@/services/characters.service', () => {
  return {
    getAllCharacters: () => getAllCharacters(),
  }
})

const characterPickerMock = jest.fn()

jest.mock('@/components/character-picker/CharacterPicker', () => {
  return {
    CharacterPicker: (props: CharacterPickerProps) => {
      characterPickerMock(props)
      const React = require('react')
      return React.createElement('div', { 'data-testid': 'character-picker' })
    },
  }
})

describe('ChatHomePage', () => {
  beforeEach(() => {
    getAllCharacters.mockReset()
    characterPickerMock.mockReset()
  })

  it('renders an error state when characters fail to load', async () => {
    getAllCharacters.mockResolvedValue({
      data: null,
      error: new Error('no'),
    })

    render(await ChatHomePage())

    expect(
      screen.getByText('Failed to load characters: no'),
    ).toBeInTheDocument()
  })

  it('renders CharacterPicker with characters when successful', async () => {
    const characters: Character[] = [
      { id: 'c1', name: 'C1', avatar_url: null, system_prompt: '' },
      { id: 'c2', name: 'C2', avatar_url: null, system_prompt: '' },
    ]
    getAllCharacters.mockResolvedValue({
      data: characters,
      error: null,
    })

    render(await ChatHomePage())

    expect(screen.getByText('Start a conversation')).toBeInTheDocument()
    expect(screen.getByTestId('character-picker')).toBeInTheDocument()
    expect(characterPickerMock).toHaveBeenCalledWith(
      expect.objectContaining({ characters }),
    )
  })

  it('passes empty array when characters is null', async () => {
    getAllCharacters.mockResolvedValue({
      data: null,
      error: null,
    })

    render(await ChatHomePage())
    expect(characterPickerMock).toHaveBeenCalledWith(
      expect.objectContaining({ characters: [] }),
    )
  })
})
