import { render, screen } from '@testing-library/react'

import { Header } from './Header'
import type { ProfileMenuProps } from '@/components/menu/profile-menu/ProfileMenu.types'

const profileMenuMock = jest.fn()

jest.mock('@/components/menu/profile-menu/ProfileMenu', () => {
  return {
    ProfileMenu: (props: ProfileMenuProps) => {
      profileMenuMock(props)
      const React = require('react')
      return React.createElement('div', { 'data-testid': 'profile-menu' })
    },
  }
})

describe('Header', () => {
  beforeEach(() => {
    profileMenuMock.mockReset()
  })

  it('renders logo, left slot, and profile menu props', () => {
    render(
      <Header
        email="a@b.com"
        fullName="Alice"
        avatarUrl="/a.png"
        leftSlot={<div data-testid="left">left</div>}
      />,
    )

    expect(screen.getByAltText('Logo')).toBeInTheDocument()
    expect(screen.getByTestId('left')).toBeInTheDocument()
    expect(screen.getByTestId('profile-menu')).toBeInTheDocument()
    expect(profileMenuMock).toHaveBeenCalledWith(
      expect.objectContaining({
        email: 'a@b.com',
        fullName: 'Alice',
        avatarUrl: '/a.png',
      }),
    )
  })
})
