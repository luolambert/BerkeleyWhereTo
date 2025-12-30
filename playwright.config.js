import { defineConfig, devices } from '@playwright/test'

/**
 * Playwright E2E Test Configuration
 * Tests 4 viewports: Desktop, Mobile Portrait, iPad Portrait, iPad Landscape
 */
export default defineConfig({
  testDir: './e2e',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',
  
  use: {
    baseURL: 'http://localhost:5173',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
  },

  // 4 viewport configurations for responsive testing
  projects: [
    {
      name: 'Desktop',
      use: { ...devices['Desktop Chrome'], viewport: { width: 1440, height: 900 } },
    },
    {
      name: 'Mobile Portrait',
      use: { ...devices['iPhone 13 Pro'], viewport: { width: 390, height: 844 } },
    },
    {
      name: 'iPad Portrait',
      use: { ...devices['iPad Pro'], viewport: { width: 834, height: 1194 } },
    },
    {
      name: 'iPad Landscape',
      use: { ...devices['iPad Pro landscape'], viewport: { width: 1194, height: 834 } },
    },
  ],

  // Run dev server before tests
  webServer: {
    command: 'npm run dev',
    url: 'http://localhost:5173',
    reuseExistingServer: !process.env.CI,
  },
})
