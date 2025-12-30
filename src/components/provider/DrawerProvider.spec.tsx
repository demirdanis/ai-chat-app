import { DrawerProvider, useDrawer } from './DrawerProvider'
import { render, screen } from '@testing-library/react'

import userEvent from '@testing-library/user-event'

describe('DrawerProvider', () => {
  it('throws if used outside provider', () => {
    const Probe = () => {
      useDrawer()
      return null
    }

    expect(() => render(<Probe />)).toThrow('useDrawer must be used within DrawerProvider')
  })

  it('provides open state and allows updates', async () => {
    const user = userEvent.setup()

    const Probe = () => {
      const { open, setOpen } = useDrawer()
      return (
        <div>
          <div data-testid="open">{open ? 'yes' : 'no'}</div>
          <button type="button" onClick={() => setOpen(true)}>
            open
          </button>
          <button type="button" onClick={() => setOpen(false)}>
            close
          </button>
        </div>
      )
    }

    render(
      <DrawerProvider>
        <Probe />
      </DrawerProvider>,
    )

    expect(screen.getByTestId('open')).toHaveTextContent('no')
    await user.click(screen.getByRole('button', { name: 'open' }))
    expect(screen.getByTestId('open')).toHaveTextContent('yes')
    await user.click(screen.getByRole('button', { name: 'close' }))
    expect(screen.getByTestId('open')).toHaveTextContent('no')
  })
})
