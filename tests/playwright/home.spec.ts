import { test, expect } from '@playwright/test'

test('homepage has main content and name', async ({ page }) => {
  await page.goto('http://localhost:3000')
  await expect(page.getByRole('main')).toBeVisible()
  await expect(page.getByText(/Naveen/i)).toBeVisible()
})
