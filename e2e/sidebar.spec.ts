import { expect, test } from '@playwright/test'

test('matches the provided World Cup sidebar crop', async ({ page }) => {
  await page.setViewportSize({ width: 1702, height: 926 })
  await page.goto('/')

  await expect(page.getByRole('navigation', { name: '频道' })).toBeVisible()
  await expect(page).toHaveScreenshot('worldcup-sidebar.png', {
    animations: 'disabled',
    caret: 'hide',
    clip: { x: 0, y: 0, width: 179, height: 926 },
    fullPage: false,
    scale: 'device',
    maxDiffPixelRatio: 0.01,
  })
})
