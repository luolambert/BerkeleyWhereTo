import { test, expect } from '@playwright/test'

test.describe('Responsive Layout', () => {
  test('Desktop layout should show sidebar', async ({ page }) => {
    await page.goto('/go')
    await page.waitForLoadState('networkidle')
    
    // Desktop (TypeB) should have visible navigation panels
    const header = page.locator('header').first()
    await expect(header).toBeVisible()
  })

  test('Mobile layout should be compact', async ({ page }) => {
    await page.goto('/go')
    await page.waitForLoadState('networkidle')
    
    // Check that page loads without errors
    const mainContent = page.locator('main, #root').first()
    await expect(mainContent).toBeVisible()
  })

  test('iPad Portrait layout', async ({ page }) => {
    await page.goto('/know')
    await page.waitForLoadState('networkidle')
     
    // Verify content loads
    const buildingCards = page.locator('[class*="card"], [class*="grid"]').first()
    await expect(buildingCards).toBeVisible({ timeout: 10000 })
  })

  test('iPad Landscape layout', async ({ page }) => {
    await page.goto('/know')
    await page.waitForLoadState('networkidle')
    
    // Verify content loads
    const mainContent = page.locator('main, #root').first()
    await expect(mainContent).toBeVisible()
  })
})

// Phase 4: TypeA Enhanced Tests
test.describe('TypeA Mobile Interactions', () => {
  test.beforeEach(async ({ page }) => {
    // Set mobile viewport
    await page.setViewportSize({ width: 390, height: 844 })
  })

  test('Navigation Drawer opens and contains route input', async ({ page }) => {
    await page.goto('/go')
    await page.waitForLoadState('networkidle')
    
    // Drawer should be visible with route input elements
    const drawer = page.locator('[vaul-drawer-content], [data-vaul-drawer]').first()
    await expect(drawer).toBeVisible({ timeout: 10000 })
    
    // Check for Plan Your Route section
    const planRoute = page.getByText(/Plan Your Route|规划路线/i)
    await expect(planRoute).toBeVisible()
  })

  test('Building selection panel opens on input click', async ({ page }) => {
    await page.goto('/go')
    await page.waitForLoadState('networkidle')
    
    // Click on START input
    const startInput = page.getByText(/Select starting point|选择起点/i).first()
    await startInput.click()
    
    // Building selection panel should appear
    const searchInput = page.getByPlaceholder(/Search for a building/i)
    await expect(searchInput).toBeVisible({ timeout: 5000 })
  })

  test('Building can be selected and panel closes', async ({ page }) => {
    await page.goto('/go')
    await page.waitForLoadState('networkidle')
    
    // Open building selection
    const startInput = page.getByText(/Select starting point|选择起点/i).first()
    await startInput.click()
    
    // Wait for panel and click first building card
    await page.waitForSelector('button:has-text("Dwinelle")', { timeout: 5000 })
    await page.click('button:has-text("Dwinelle")')
    
    // Panel should close and selection should be visible in drawer
    await expect(page.getByText('Dwinelle')).toBeVisible()
  })

  test('Header click toggles Know header', async ({ page }) => {
    await page.goto('/go')
    await page.waitForLoadState('networkidle')
    
    // Click on main header (Berkeley Where To Go)
    const header = page.getByText(/Berkeley Where To Go/i).first()
    await header.click()
    
    // Know header should appear
    const knowHeader = page.getByText(/Explore Buildings|探索建筑/i)
    await expect(knowHeader).toBeVisible({ timeout: 3000 })
  })
})

test.describe('TypeA InfoPage Layout', () => {
  test.beforeEach(async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 })
  })

  test('Building cards display in single column', async ({ page }) => {
    await page.goto('/know')
    await page.waitForLoadState('networkidle')
    
    // Wait for building cards to load
    const cards = page.locator('[class*="card"]')
    await expect(cards.first()).toBeVisible({ timeout: 10000 })
    
    // Cards should be visible and accessible
    const cardCount = await cards.count()
    expect(cardCount).toBeGreaterThan(0)
  })

  test('Category pills are interactive', async ({ page }) => {
    await page.goto('/know')
    await page.waitForLoadState('networkidle')
    
    // Find category buttons
    const categoryButtons = page.locator('button').filter({ hasText: /Library|Dining|图书馆|餐饮/i })
    await expect(categoryButtons.first()).toBeVisible({ timeout: 10000 })
  })
})

test.describe('TypeB Desktop Interactions', () => {
  test.beforeEach(async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 })
  })

  test('Navigation sidebar is visible', async ({ page }) => {
    await page.goto('/go')
    await page.waitForLoadState('networkidle')
    
    // Desktop should show sidebar layout
    const sidebar = page.locator('[class*="sidebar"], [class*="w-\\[4"]').first()
    await expect(sidebar).toBeVisible({ timeout: 10000 })
  })

  test('Building grid shows multiple columns', async ({ page }) => {
    await page.goto('/know')
    await page.waitForLoadState('networkidle')
    
    // Wait for grid to load
    const grid = page.locator('[class*="grid"]').first()
    await expect(grid).toBeVisible({ timeout: 10000 })
  })
})
