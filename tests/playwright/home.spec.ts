import { test, expect } from '@playwright/test'

test.beforeEach(async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' })
  await page.goto('http://localhost:3000')
})

test('homepage has main content and name', async ({ page }) => {
  await expect(page.getByRole('main')).toBeVisible()
  await expect(page.locator('.hero__title .gradient-text')).toHaveText('Naveen K')
  await expect(page.locator('.footer')).toHaveAttribute('data-build-id', /.+/)
})

test('theme switch toggles light and dark modes', async ({ page }) => {
  await page.getByLabel(/Switch to dark theme/i).click()
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark')

  await page.getByLabel(/Switch to light theme/i).click()
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'light')
})

test('theme family switch keeps the current display mode', async ({ page }) => {
  const html = page.locator('html')
  const initialTheme = await html.getAttribute('data-theme')

  await page.getByLabel(/Switch to theme family/i).click()
  await expect(html).toHaveAttribute('data-theme-family', '2')
  await expect(html).toHaveAttribute('data-theme', initialTheme ?? 'light')
})

test('mobile navigation opens and scrolls to contact', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 780 })
  await page.getByRole('button', { name: /toggle navigation/i }).click()
  await expect(page.getByRole('link', { name: 'Contact' })).toBeVisible()

  await page.keyboard.press('Escape')
  await expect(page.locator('.site-header__links')).not.toHaveClass(/is-open/)

  await page.getByRole('button', { name: /toggle navigation/i }).click()
  await page.getByRole('link', { name: 'Contact' }).click()
  await expect(page.locator('#contact')).toBeInViewport()
})

test('contact form validates all required fields', async ({ page }) => {
  await page.locator('#contact').scrollIntoViewIfNeeded()
  await page.getByRole('button', { name: /send message/i }).click()

  await expect(page.getByText('Name is required.')).toBeVisible()
  await expect(page.getByText('Email is required.')).toBeVisible()
  await expect(page.getByText('Message is required.')).toBeVisible()
})

test('carousel falls back when public images fail', async ({ page }) => {
  await page.route(/\/images\/(?:optimized\/)?carousel\//, (route) => route.abort())
  await page.reload({ waitUntil: 'networkidle' })

  await expect(page.getByText(/Carousel failed to load images/i)).toBeVisible()
})

test('key sections remain usable on small screens', async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 812 })

  await expect(page.locator('#hero')).toBeVisible()
  await expect(page.locator('#skills')).toBeVisible()
  await expect(page.locator('#projects')).toBeVisible()
  await expect(page.locator('#contact')).toBeVisible()
})
