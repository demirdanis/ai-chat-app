import { render, screen } from '@testing-library/react'

import { MarkdownMessage } from './MarkdownMessage'

const reactMarkdownMock = jest.fn()

type ReactMarkdownMockProps = {
  children: unknown
  remarkPlugins?: unknown
  components?: unknown
}

jest.mock('react-markdown', () => {
  return {
    __esModule: true,
    default: (props: ReactMarkdownMockProps) => {
      reactMarkdownMock(props)
      const React = require('react')
      return React.createElement('div', { 'data-testid': 'react-markdown' }, props.children)
    },
  }
})

jest.mock('remark-gfm', () => {
  return {
    __esModule: true,
    default: jest.fn(),
  }
})


describe('MarkdownMessage', () => {
  beforeEach(() => {
    reactMarkdownMock.mockReset()
    const mod = require('remark-gfm')
    mod.default?.mockReset?.()
  })

  it('wires react-markdown with remark-gfm and custom components', () => {
    render(<MarkdownMessage content={'hello'} />)

    expect(screen.getByTestId('react-markdown')).toHaveTextContent('hello')
    expect(reactMarkdownMock).toHaveBeenCalledTimes(1)

    const props = reactMarkdownMock.mock.calls[0]?.[0] as unknown as {
      children: string
      remarkPlugins: unknown[]
      components: Record<string, unknown>
    }
    expect(props.children).toBe('hello')
    expect(Array.isArray(props.remarkPlugins)).toBe(true)
    expect(typeof props.remarkPlugins[0]).toBe('function')
    expect(typeof props.components.a).toBe('function')
    expect(typeof props.components.ul).toBe('function')
    expect(typeof props.components.ol).toBe('function')
    expect(typeof props.components.code).toBe('function')
    expect(typeof props.components.blockquote).toBe('function')
    expect(typeof props.components.h1).toBe('function')
    expect(typeof props.components.h2).toBe('function')
    expect(typeof props.components.h3).toBe('function')
    expect(typeof props.components.p).toBe('function')
  })

  it('renders a link element with target blank and noreferrer', () => {
    render(<MarkdownMessage content={'x'} />)
    const props = reactMarkdownMock.mock.calls[0]?.[0] as unknown as {
      components: {
        a: (p: { children: string; href?: string }) => React.ReactElement
      }
    }

    render(
      props.components.a({
        children: 'hello',
        href: 'https://example.com',
      }),
    )

    const link = screen.getByRole('link', { name: 'hello' })
    expect(link).toHaveAttribute('target', '_blank')
    expect(link).toHaveAttribute('rel', 'noreferrer')
  })

  it('renders inline and block code with different class styles', () => {
    render(<MarkdownMessage content={'x'} />)
    const props = reactMarkdownMock.mock.calls[0]?.[0] as unknown as {
      components: {
        code: (p: { children: string; className?: string }) => React.ReactElement
      }
    }

    render(props.components.code({ children: 'a', className: undefined }))
    expect(screen.getByText('a').className).toContain('px-1')

    render(props.components.code({ children: 'b', className: 'language-ts' }))
    expect(screen.getByText('b').className).toContain('block')
  })
})
