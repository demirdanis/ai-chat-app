import { render, screen, waitFor } from '@testing-library/react'

import LoginPage from './LoginPage'
import userEvent from '@testing-library/user-event'

const signInWithOAuth = jest.fn()

jest.mock('@/services/auth.client.service', () => {
  return {
    signInWithOAuth: () => signInWithOAuth(),
  }
})

const toastFn = jest.fn()

jest.mock('@/components/ui/use-toast', () => {
  return {
    useToast: () => ({ toast: toastFn }),
  }
})

describe('LoginPage', () => {
  beforeEach(() => {
    signInWithOAuth.mockReset()
    toastFn.mockReset()
  })

  it('disables button and shows redirecting state on click', async () => {
    const user = userEvent.setup()
    signInWithOAuth.mockResolvedValue({ error: null })

    render(<LoginPage />)

    const btn = screen.getByRole('button', { name: 'Sign in with Google' })
    await user.click(btn)

    expect(signInWithOAuth).toHaveBeenCalledTimes(1)
    expect(screen.getByRole('button', { name: 'Redirecting...' })).toBeDisabled()
  })

  it('shows toast and re-enables button on error', async () => {
    const user = userEvent.setup()
    const consoleError = jest.spyOn(console, 'error').mockImplementation(() => {})
    signInWithOAuth.mockResolvedValue({ error: new Error('bad') })

    render(<LoginPage />)

    await user.click(screen.getByRole('button', { name: 'Sign in with Google' }))

    await waitFor(() =>
      expect(toastFn).toHaveBeenCalledWith(
        expect.objectContaining({
          title: 'Sign in failed',
          description: "We couldn't sign you in with Google. Please try again.",
        }),
      ),
    )

    expect(screen.getByRole('button', { name: 'Sign in with Google' })).not.toBeDisabled()
    consoleError.mockRestore()
  })
})
