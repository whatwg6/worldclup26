import focusBrazil from './assets/focus-brazil.png'
import focusBrazilPreview from './assets/focus-brazil-preview.png'
import focusCroatia from './assets/focus-croatia.png'
import focusFrance from './assets/focus-france.png'
import focusSpain from './assets/focus-spain.png'
import navAbout from './assets/xhs-nav-about.svg'
import navChat from './assets/xhs-nav-chat.svg'
import navCreator from './assets/xhs-nav-creator.svg'
import navHome from './assets/xhs-nav-home.svg'
import navLive from './assets/xhs-nav-live.svg'
import navMenu from './assets/xhs-nav-menu.svg'
import navNotification from './assets/xhs-nav-notification.svg'
import navRed from './assets/xhs-nav-red.svg'
import xhsLogo from './assets/xhs-logo.png'
import worldcupBg from './assets/xhs-worldcup-bg-live.webp'
import worldcupNavIcon from './assets/xhs-worldcup-nav-icon-dark.webp'
import worldcupNavText from './assets/xhs-worldcup-nav-text-dark.webp'
import worldcupTitle from './assets/xhs-worldcup-title.png'
import wordclubReference from './assets/wordclub26-reference.png'
import './App.css'

const navItems = [
  { icon: 'home', label: '首页' },
  { icon: 'worldcup', label: '世界杯', active: true },
  { icon: 'chat', label: '点点', badge: 'ai' },
  { icon: 'play', label: 'RED' },
  { icon: 'video', label: '直播' },
  { icon: 'plus', label: '发布' },
  { icon: 'bell', label: '消息' },
]

type Match = {
  time: string
  stage: string
  home: string
  away: string
  homeFlag: string
  awayFlag: string
  score?: string
  replay?: boolean
}

const matches: Match[] = [
  {
    time: '06月12日 03:00',
    stage: '小组赛 A组',
    home: '墨西哥',
    away: '南非',
    homeFlag: '🇲🇽',
    awayFlag: '🇿🇦',
  },
  {
    time: '06月12日 10:00',
    stage: '小组赛 A组',
    home: '韩国',
    away: '捷克',
    homeFlag: '🇰🇷',
    awayFlag: '🇨🇿',
  },
  {
    time: '06月13日 03:00',
    stage: '小组赛 B组',
    home: '加拿大',
    away: '波黑',
    homeFlag: '🇨🇦',
    awayFlag: '🇧🇦',
  },
  {
    time: '06月13日 09:00',
    stage: '小组赛 D组',
    home: '美国',
    away: '巴拉圭',
    homeFlag: '🇺🇸',
    awayFlag: '🇵🇾',
  },
]

const focusCards = [
  { title: '内讧？', image: focusFrance },
  { title: '莫德里奇', image: focusCroatia },
  { title: '世界杯前瞻 西班牙', image: focusSpain },
  { title: '皇巴西', image: focusBrazil },
  { title: '世界杯前瞻 巴西', image: focusBrazilPreview },
]

const navIconAssets: Record<string, string> = {
  bell: navNotification,
  chat: navChat,
  home: navHome,
  info: navAbout,
  menu: navMenu,
  play: navRed,
  plus: navCreator,
  video: navLive,
}

function NavIcon({ name }: { name: string }) {
  if (name === 'worldcup') {
    return (
      <span className="worldcup-icon worldcup-asset" aria-hidden="true">
        <img src={worldcupNavIcon} alt="" />
      </span>
    )
  }

  const icon = navIconAssets[name]

  return (
    <span className="nav-icon-asset" aria-hidden="true">
      <img src={icon} alt="" />
    </span>
  )
}

function App() {
  return (
    <main className="worldcup-shell">
      <img className="reference-shot" src={wordclubReference} alt="" aria-hidden="true" />
      <img className="page-backdrop" src={worldcupBg} alt="" aria-hidden="true" />
      <aside className="sidebar" aria-label="小红书世界杯导航">
        <a className="sidebar-logo" href="#worldcup" aria-label="小红书">
          <img src={xhsLogo} alt="" />
        </a>
        <nav className="primary-nav" aria-label="频道">
          {navItems.map((item) => (
            <a
              className={item.active ? 'nav-item active' : 'nav-item'}
              href="#worldcup"
              key={item.label}
              aria-current={item.active ? 'page' : undefined}
            >
              <span className="nav-icon">
                <NavIcon name={item.icon} />
              </span>
              {item.active ? (
                <img className="worldcup-label-image" src={worldcupNavText} alt="" aria-hidden="true" />
              ) : (
                <span className="nav-label">{item.label}</span>
              )}
              {item.badge ? <small>{item.badge}</small> : null}
            </a>
          ))}
        </nav>
        <button className="login-button" type="button">
          登录
        </button>
        <div className="sidebar-footer">
          <a href="#more">
            <span className="footer-icon">
              <NavIcon name="menu" />
            </span>
            更多
          </a>
          <a href="#about">
            <span className="footer-icon">
              <NavIcon name="info" />
            </span>
            关于我们
          </a>
        </div>
      </aside>

      <section className="cup-page" id="worldcup">
        <div className="stadium" aria-hidden="true">
          <div className="lights light-left"></div>
          <div className="lights light-right"></div>
          <div className="stands"></div>
          <div className="pitch"></div>
          <div className="confetti confetti-a"></div>
          <div className="confetti confetti-b"></div>
          <div className="confetti confetti-c"></div>
          <div className="confetti confetti-d"></div>
        </div>

        <section className="hero-panel" aria-labelledby="hero-title">
          <div className="hero-title-wrap">
            <h1 id="hero-title">来小红书 看世界杯直播</h1>
            <img src={worldcupTitle} alt="" className="hero-title-image" />
          </div>
          <p>距2026年美加墨世界杯开幕</p>
          <div className="countdown" aria-label="倒计时">
            {['00', '22', '39', '29'].map((value, index) => (
              <span className="time-group" key={value}>
                <strong>{value}</strong>
                <em>{['天', '时', '分', '秒'][index]}</em>
              </span>
            ))}
          </div>
          <button className="reserve-hero" type="button">
            预约揭幕战直播
          </button>
        </section>

        <section className="match-section" aria-labelledby="match-title">
          <h2 id="match-title">
            <span>📣</span> 比赛预约
          </h2>
          <div className="match-carousel">
            <button className="rail-button" type="button" aria-label="上一组比赛">
              ‹
            </button>
            <div className="match-list">
              {matches.map((match) => (
                <article className="match-card" key={`${match.home}-${match.away}`}>
                  <div className="match-meta">
                    <span>{match.time}</span>
                    <span>{match.stage}</span>
                  </div>
                  <div className="teams">
                    <div>
                      <span className="flag">{match.homeFlag}</span>
                      <small>{match.home}</small>
                    </div>
                    <strong>{match.score ?? 'VS'}</strong>
                    <div>
                      <span className="flag">{match.awayFlag}</span>
                      <small>{match.away}</small>
                    </div>
                  </div>
                  <button type="button">{match.replay ? '▣ 查看回放' : '▦ 预约'}</button>
                </article>
              ))}
            </div>
            <article className="all-schedule">
              <span>▦</span>
              <strong>全部赛程</strong>
              <small>105场</small>
            </article>
            <button className="rail-button" type="button" aria-label="下一组比赛">
              ›
            </button>
          </div>
        </section>

        <section className="focus-section" aria-labelledby="focus-title">
          <div className="section-heading">
            <h2 id="focus-title">
              <span>🗓</span> 赛事聚焦
            </h2>
            <a href="#more-focus">查看更多 »</a>
          </div>
          <div className="focus-grid">
            {focusCards.map((card) => (
              <article className="focus-card" key={card.title}>
                <img src={card.image} alt={card.title} />
                <span aria-hidden="true">▶</span>
              </article>
            ))}
          </div>
        </section>
      </section>
    </main>
  )
}

export default App
