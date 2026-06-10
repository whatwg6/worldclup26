import { defineConfig, devices } from '@playwright/test'

const localBypass = '127.0.0.1,localhost'
process.env.NO_PROXY = [process.env.NO_PROXY, localBypass].filter(Boolean).join(',')
process.env.no_proxy = [process.env.no_proxy, localBypass].filter(Boolean).join(',')

export default defineConfig({
  testDir: './e2e',
  fullyParallel: true,
  reporter: 'html',
  use: {
    baseURL: 'http://127.0.0.1:4173',
    trace: 'on-first-retry',
  },
  webServer: {
    command: 'pnpm preview --host 127.0.0.1 --port 4173',
    url: 'http://127.0.0.1:4173',
    reuseExistingServer: false,
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
})
