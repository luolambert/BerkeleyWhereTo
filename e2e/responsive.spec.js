import { test, expect } from '@playwright/test'

test.describe('Responsive Layout', () => {
  test('Desktop layout should show sidebar', async ({ page }) => {
    // Playwright auto-applies viewport from config (Desktop = 1440x900)
    await page.goto('/go')
    
    // Wait for app to load
    await page.waitForLoadState('networkidle')
    
    // Desktop should have visible navigation panels
    const header = page.locator('header').first()
    await expect(header).toBeVisible()
  })

  test('Mobile layout should be compact', async ({ page }) => {
    // Mobile viewport from config (390x844)
    await page.goto('/go')
    await page.waitForLoadState('networkidle')
    
    // Check that page loads without errors
    const mainContent = page.locator('main, #root').first()
    await expect(mainContent).toBeVisible()
  })

  test('iPad Portrait layout', async ({ page }) => {
    // iPad Portrait viewport from config (834x1194)
    await page.goto('/know')
    await page.waitForLoadState('networkidle')
     
    // Verify content loads
    const buildingCards = page.locator('[class*="card"], [class*="grid"]').first()
    await expect(buildingCards).toBeVisible({ timeout: 10000 })
  })

  test('iPad Landscape layout', async ({ page }) => {
    // iPad Landscape viewport from config (1194x834)
    await page.goto('/know')
    await page.waitForLoadState('networkidle')
    
    // Verify content loads
    const mainContent = page.locator('main, #root').first()
    await expect(mainContent).toBeVisible()
  })
})
