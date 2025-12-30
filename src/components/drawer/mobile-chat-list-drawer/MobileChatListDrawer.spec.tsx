import { render, screen } from '@testing-library/react'

import { MobileChatListDrawer } from './MobileChatListDrawer'
import userEvent from '@testing-library/user-event'

const setOpen = jest.fn()
const useDrawer = jest.fn()
const usePathname = jest.fn()
const useSearchParams = jest.fn()

jest.mock('@/components/provider/DrawerProvider', () => {
  return {
    useDrawer: () => useDrawer(),
  }
})

jest.mock('next/navigation', () => {
  return {
    usePathname: () => usePathname(),
    useSearchParams: () => useSearchParams(),
  }
})

describe('MobileChatListDrawer', () => {
  beforeEach(() => {
    setOpen.mockReset()
    useDrawer.mockReset()
    usePathname.mockReset()
    useSearchParams.mockReset()

    useDrawer.mockReturnValue({ open: false, setOpen })
    usePathname.mockReturnValue('/chat')
    useSearchParams.mockReturnValue(new URLSearchParams('a=1'))
  })

  it('closes drawer on route/search change', () => {
    const { rerender } = render(
      <MobileChatListDrawer>
        <div>list</div>
      </MobileChatListDrawer>,
    )

    expect(setOpen).toHaveBeenCalledWith(false)

    usePathname.mockReturnValue('/chat/1')
    rerender(
      <MobileChatListDrawer>
        <div>list</div>
      </MobileChatListDrawer>,
    )

    expect(setOpen).toHaveBeenCalledWith(false)
  })

  it('opens drawer when open button is clicked', async () => {
    const user = userEvent.setup()

    render(
      <MobileChatListDrawer>
        <div>list</div>
      </MobileChatListDrawer>,
    )

    await user.click(screen.getByRole('button', { name: 'Open chats' }))
    expect(setOpen).toHaveBeenCalledWith(true)
  })
})
