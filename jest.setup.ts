import '@testing-library/jest-dom'

import type { AnchorHTMLAttributes, PropsWithChildren } from 'react'

import type { ImageProps } from 'next/image'
import type { LinkProps } from 'next/link'

Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: (query: string) => {
    return {
      matches: false,
      media: query,
      onchange: null,
      addListener: () => {},
      removeListener: () => {},
      addEventListener: () => {},
      removeEventListener: () => {},
      dispatchEvent: () => false,
    }
  },
})

Object.defineProperty(window, 'scrollTo', {
  writable: true,
  value: () => {},
})

if (!('ResizeObserver' in globalThis)) {
  const globalWithResizeObserver = globalThis as typeof globalThis & {
    ResizeObserver?: typeof ResizeObserver
  }

  globalWithResizeObserver.ResizeObserver = class ResizeObserver {
    observe() {}
    unobserve() {}
    disconnect() {}
  }
}

jest.mock('next/image', () => {
  return {
    __esModule: true,
    default: (props: ImageProps) => {
      const React = require('react')
      const src =
        typeof props.src === 'string'
          ? props.src
          : props.src?.src ?? props.src?.default ?? ''

      return React.createElement('img', {
        ...props,
        src,
      })
    },
  }
})

jest.mock('next/link', () => {
  type NextLinkMockProps = PropsWithChildren<
    LinkProps & AnchorHTMLAttributes<HTMLAnchorElement>
  >

  return {
    __esModule: true,
    default: (props: NextLinkMockProps) => {
      const React = require('react')
      const href =
        typeof props.href === 'string'
          ? props.href
          : props.href?.pathname ?? ''

      return React.createElement(
        'a',
        {
          ...props,
          href,
        },
        props.children,
      )
    },
  }
})
