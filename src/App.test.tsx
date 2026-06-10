import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import App from './App'

describe('App', () => {
  it('renders the World Cup landing UI', () => {
    render(<App />)

    expect(screen.getByRole('heading', { name: /来小红书\s*看世界杯直播/i })).toBeVisible()
    expect(screen.getByRole('heading', { name: /比赛预约/i })).toBeVisible()
    expect(screen.getByRole('heading', { name: /赛事聚焦/i })).toBeVisible()
    expect(screen.getByText('预约揭幕战直播')).toBeVisible()
  })
})
