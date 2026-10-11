import { test, expect } from '@playwright/test'

const baseUrl = process.env.E2E_BASE_URL ?? 'http://localhost:3000'

test.beforeEach(async ({ page }, testInfo) => {
  await page.emulateMedia({ reducedMotion: 'reduce' })
  if (testInfo.title === 'carousel falls back when public images fail') return
  await page.goto(baseUrl)
})

test('homepage has main content and name', async ({ page }) => {
  await expect(page.getByRole('main')).toBeVisible()
  await expect(page.getByRole('heading', { name: "Hi, I'm Naveen K" })).toBeVisible()
  await expect(page.locator('.footer')).toHaveAttribute('data-build-id', /.+/)
})

test('theme switch toggles light and dark modes', async ({ page }) => {
  await page.getByLabel(/Switch to dark theme/i).click()
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark')

  await page.getByLabel(/Switch to light theme/i).click()
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'light')
})

test('defaults to light theme family 1 without saved preferences', async ({ page }) => {
  await page.evaluate(() => {
    window.localStorage.removeItem('theme')
    window.localStorage.removeItem('themeFamily')
  })
  await page.emulateMedia({ colorScheme: 'dark', reducedMotion: 'reduce' })
  await page.reload()

  await expect(page.locator('html')).toHaveAttribute('data-theme', 'light')
  await expect(page.locator('html')).toHaveAttribute('data-theme-family', '1')
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
  await expect(page.locator('#name')).toHaveAttribute('aria-invalid', 'true')
  await expect(page.locator('#email')).toHaveAttribute('aria-invalid', 'true')
  await expect(page.locator('#message')).toHaveAttribute('aria-invalid', 'true')
})

test('contact form validates email format before sending', async ({ page }) => {
  await page.locator('#contact').scrollIntoViewIfNeeded()
  await page.locator('#name').fill('Test Visitor')
  await page.locator('#email').fill('invalid-email')
  await page.locator('#message').fill('Checking validation behavior.')
  await page.getByRole('button', { name: /send message/i }).click()

  await expect(page.getByText('Please enter a valid email address.')).toBeVisible()
  await expect(page.locator('#email')).toHaveAttribute('aria-invalid', 'true')
})

test('contact form reports a delivered message when the acknowledgement fails', async ({ page }) => {
  const templateIds = []

  await page.route('https://api.emailjs.com/api/v1.0/email/send', async (route) => {
    const request = JSON.parse(route.request().postData() ?? '{}')
    templateIds.push(request.template_id)

    if (request.template_id === 'template_psfmd3n') {
      await route.fulfill({ status: 500, body: 'Auto-reply unavailable' })
      return
    }

    await route.fulfill({ status: 200, body: 'OK' })
  })

  await page.locator('#contact').scrollIntoViewIfNeeded()
  await page.locator('#name').fill('Test Visitor')
  await page.locator('#email').fill('visitor@example.com')
  await page.locator('#message').fill('Checking contact delivery.')
  await page.getByRole('button', { name: /send message/i }).click()

  await expect(page.getByText("Your message was sent, but we couldn't send the acknowledgement email.")).toBeVisible()
  await expect.poll(() => templateIds.length).toBe(2)
  expect(templateIds).toEqual(['template_grhlujf', 'template_psfmd3n'])
})

test('contact form reports a clear failure when owner delivery is rejected', async ({ page }) => {
  let requestCount = 0

  await page.route('https://api.emailjs.com/api/v1.0/email/send', async (route) => {
    requestCount += 1
    await route.fulfill({ status: 422, body: 'The recipients address is empty' })
  })

  await page.locator('#contact').scrollIntoViewIfNeeded()
  await page.locator('#name').fill('Test Visitor')
  await page.locator('#email').fill('visitor@example.com')
  await page.locator('#message').fill('Checking owner delivery failure.')
  await page.getByRole('button', { name: /send message/i }).click()

  await expect(page.getByRole('alert')).toHaveText(/contact inbox is temporarily unavailable/i)
  await expect.poll(() => requestCount).toBe(1)
})

test('carousel falls back when public images fail', async ({ page }) => {
  await page.route(/\/images\/(?:optimized\/)?carousel\//, (route) => route.abort())
  await page.goto(baseUrl, { waitUntil: 'networkidle' })

  await expect(page.getByText(/Carousel failed to load images/i)).toBeVisible()
})

test('key sections remain usable on small screens', async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 812 })

  await expect(page.locator('#hero')).toBeVisible()
  await expect(page.locator('#skills')).toBeVisible()
  await expect(page.locator('#projects')).toBeVisible()
  await expect(page.locator('#contact')).toBeVisible()
})
