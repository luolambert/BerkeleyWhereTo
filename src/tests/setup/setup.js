import '@testing-library/jest-dom'
import { cleanup } from '@testing-library/react'
import { afterEach, vi } from 'vitest'
import createGoogleMapsMock from './mocks/googleMaps'

// Cleanup after each test
afterEach(() => {
  cleanup()
})

// Mock window.matchMedia (Responsive testing core)
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(), // deprecated
    removeListener: vi.fn(), // deprecated
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
})

// Mock window for Framer Motion
if (typeof window !== 'undefined') {
  // Ensure addEventListener exists
  if (!window.addEventListener) {
    window.addEventListener = vi.fn()
    window.removeEventListener = vi.fn()
  }
}

// Mock document for Framer Motion (critical!)
if (typeof document !== 'undefined' && !document.addEventListener) {
  document.addEventListener = vi.fn()
  document.removeEventListener = vi.fn()
}

// Additional window properties for Framer Motion
Object.defineProperty(window, 'scrollX', { writable: true, value: 0 })
Object.defineProperty(window, 'scrollY', { writable: true, value: 0 })
Object.defineProperty(window, 'pageXOffset', { writable: true, value: 0 })
Object.defineProperty(window, 'pageYOffset', { writable: true, value: 0 })

// Mock IntersectionObserver
const IntersectionObserverMock = vi.fn(() => ({
  disconnect: vi.fn(),
  observe: vi.fn(),
  takeRecords: vi.fn(),
  unobserve: vi.fn(),
}))
vi.stubGlobal('IntersectionObserver', IntersectionObserverMock)

// Mock ResizeObserver
const ResizeObserverMock = vi.fn(() => ({
  observe: vi.fn(),
  unobserve: vi.fn(),
  disconnect: vi.fn(),
}))
vi.stubGlobal('ResizeObserver', ResizeObserverMock)

// Mock Google Maps API
vi.stubGlobal('google', createGoogleMapsMock())

// Skip Framer Motion animations
import { MotionGlobalConfig } from 'framer-motion'
MotionGlobalConfig.skipAnimations = true
