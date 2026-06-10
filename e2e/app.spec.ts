import { expect, test } from '@playwright/test'

test('loads the World Cup page', async ({ page }) => {
  await page.goto('/')

  await expect(page.getByRole('heading', { name: /来小红书\s*看世界杯直播/ })).toBeVisible()
  await expect(page.getByText('墨西哥')).toBeVisible()
  await expect(page.getByText('全部赛程')).toBeVisible()
  await expect(page.getByRole('heading', { name: /赛事聚焦/ })).toBeVisible()
})
