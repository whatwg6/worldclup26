import { expect, test } from '@playwright/test'

test('matches the provided World Cup screenshot crop', async ({ page }) => {
  await page.setViewportSize({ width: 1702, height: 926 })
  await page.goto('/')

  await expect(page.getByRole('heading', { name: /来小红书\s*看世界杯直播/ })).toBeVisible()
  await expect(page).toHaveScreenshot('worldcup-reference.png', {
    animations: 'disabled',
    caret: 'hide',
    fullPage: false,
    scale: 'device',
    maxDiffPixelRatio: 0.02,
    threshold: 0.2,
  })
})
