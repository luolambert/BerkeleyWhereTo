import { test, expect } from '@playwright/test'

test.describe('Landing Page', () => {
  test('should load homepage successfully', async ({ page }) => {
    await page.goto('/')
    
    // Check main title exists
    await expect(page.locator('h1').first()).toBeVisible()
    
    // Check navigation options
    await expect(page.getByText(/where to go/i)).toBeVisible()
    await expect(page.getByText(/where to know/i)).toBeVisible()
  })

  test('should navigate to Go page', async ({ page }) => {
    await page.goto('/')
    
    // Click "Where To Go" button/link
    await page.getByRole('link', { name: /where to go/i }).first().click()
    
    // Verify URL changed to /go
    await expect(page).toHaveURL(/\/go/)
  })

  test('should navigate to Know page', async ({ page }) => {
    await page.goto('/')
    
    // Click "Where To Know" button/link
    await page.getByRole('link', { name: /where to know/i }).first().click()
    
    // Verify URL changed to /know
    await expect(page).toHaveURL(/\/know/)
  })
})
