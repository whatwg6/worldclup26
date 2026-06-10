import { expect, test } from '@playwright/test'

test('loads the app and updates the counter', async ({ page }) => {
  await page.goto('/')

  await expect(page.getByRole('heading', { name: 'Get started' })).toBeVisible()

  const button = page.getByRole('button', { name: /count is 0/i })
  await button.click()

  await expect(page.getByRole('button', { name: /count is 1/i })).toBeVisible()
})
