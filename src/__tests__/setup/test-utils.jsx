import React from 'react'
import { render } from '@testing-library/react'
import { NavigationProvider } from '../../context/NavigationContext'
import { PreloadProvider } from '../../context/PreloadContext'
import { MemoryRouter } from 'react-router-dom'

// Wrapper that includes all providers
const AllTheProviders = ({ children }) => {
  return (
    <MemoryRouter>
      <PreloadProvider>
        <NavigationProvider>
          {children}
        </NavigationProvider>
      </PreloadProvider>
    </MemoryRouter>
  )
}

const customRender = (ui, options) =>
  render(ui, { wrapper: AllTheProviders, ...options })

// re-export everything
export * from '@testing-library/react'

// override render method
export { customRender as render }
