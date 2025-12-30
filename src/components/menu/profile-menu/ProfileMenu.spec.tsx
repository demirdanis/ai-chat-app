import { render, screen, waitFor } from '@testing-library/react'

import { ProfileMenu } from './ProfileMenu'
import userEvent from '@testing-library/user-event'

const replace = jest.fn()
const refresh = jest.fn()

jest.mock('next/navigation', () => {
  return {
    useRouter: () => ({ replace, refresh }),
  }
})

const signOut = jest.fn()

jest.mock('@/services/auth.client.service', () => {
  return {
    signOut: () => signOut(),
  }
})

const setTheme = jest.fn()
const useTheme = jest.fn()

jest.mock('next-themes', () => {
  return {
    useTheme: () => useTheme(),
  }
})

describe('ProfileMenu', () => {
  beforeEach(() => {
    replace.mockReset()
    refresh.mockReset()
    signOut.mockReset()
    setTheme.mockReset()
    useTheme.mockReset()
  })

  it('toggles theme to dark when currently light', async () => {
    const user = userEvent.setup()
    useTheme.mockReturnValue({ setTheme, resolvedTheme: 'light' })

    render(<ProfileMenu email="a@b.com" fullName="Alice" avatarUrl={null} />)

    const trigger = await screen.findByRole('button', { name: 'Profile Menu' })
    await user.click(trigger)

    const sw = await screen.findByRole('switch')
    await user.click(sw)
    expect(setTheme).toHaveBeenCalledWith('dark')
  })

  it('toggles theme to light when currently dark', async () => {
    const user = userEvent.setup()
    useTheme.mockReturnValue({ setTheme, resolvedTheme: 'dark' })

    render(<ProfileMenu email="a@b.com" fullName="Alice" avatarUrl={null} />)

    const trigger = await screen.findByRole('button', { name: 'Profile Menu' })
    await user.click(trigger)

    const sw = await screen.findByRole('switch')
    await user.click(sw)
    expect(setTheme).toHaveBeenCalledWith('light')
  })

  it('signs out and navigates to login', async () => {
    const user = userEvent.setup()
    useTheme.mockReturnValue({ setTheme, resolvedTheme: 'light' })

    let resolveSignOut!: (value?: void) => void
    const signOutPromise = new Promise<void>((r) => {
      resolveSignOut = r
    })
    signOut.mockReturnValue(signOutPromise)

    render(<ProfileMenu email="a@b.com" fullName="Alice" avatarUrl={null} />)

    const trigger = await screen.findByRole('button', { name: 'Profile Menu' })
    await user.click(trigger)

    const logout = await screen.findByRole('button', { name: 'Logout' })
    await user.click(logout)

    expect(signOut).toHaveBeenCalledTimes(1)
    expect(await screen.findByRole('button', { name: 'Logging out...' })).toBeDisabled()

    resolveSignOut()

    await waitFor(() => expect(replace).toHaveBeenCalledWith('/login'))
    await waitFor(() => expect(refresh).toHaveBeenCalled())
  })
})
