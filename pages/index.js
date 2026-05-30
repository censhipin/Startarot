import Head from 'next/head'
import NavBar from '@/components/Navbar'

// 公有领域的维特塔罗牌面（Wikimedia Commons）
const CARDS = {
  star: 'https://upload.wikimedia.org/wikipedia/commons/d/db/RWS_Tarot_17_Star.jpg',
  fool: 'https://upload.wikimedia.org/wikipedia/commons/9/90/RWS_Tarot_00_Fool.jpg',
  magician: 'https://upload.wikimedia.org/wikipedia/commons/d/de/RWS_Tarot_01_Magician.jpg',
  priestess: 'https://upload.wikimedia.org/wikipedia/commons/8/88/RWS_Tarot_02_High_Priestess.jpg',
  empress: 'https://upload.wikimedia.org/wikipedia/commons/d/d2/RWS_Tarot_03_Empress.jpg',
  lovers: 'https://upload.wikimedia.org/wikipedia/commons/d/db/RWS_Tarot_06_Lovers.jpg',
  chariot: 'https://upload.wikimedia.org/wikipedia/commons/9/9b/RWS_Tarot_07_Chariot.jpg',
  justice: 'https://upload.wikimedia.org/wikipedia/commons/e/e0/RWS_Tarot_11_Justice.jpg',
  death: 'https://upload.wikimedia.org/wikipedia/commons/d/d7/RWS_Tarot_13_Death.jpg',
  tower: 'https://upload.wikimedia.org/wikipedia/commons/5/53/RWS_Tarot_16_Tower.jpg',
  moon: 'https://upload.wikimedia.org/wikipedia/commons/7/7f/RWS_Tarot_18_Moon.jpg',
  sun: 'https://upload.wikimedia.org/wikipedia/commons/1/17/RWS_Tarot_19_Sun.jpg',
  world: 'https://upload.wikimedia.org/wikipedia/commons/f/ff/RWS_Tarot_21_World.jpg',
}

const galleryCards = [
  { id: 'fool', src: CARDS.fool, name: '愚人', num: '0' },
  { id: 'magician', src: CARDS.magician, name: '魔术师', num: 'I' },
  { id: 'priestess', src: CARDS.priestess, name: '女祭司', num: 'II' },
  { id: 'empress', src: CARDS.empress, name: '女皇', num: 'III' },
  { id: 'lovers', src: CARDS.lovers, name: '恋人', num: 'VI' },
  { id: 'chariot', src: CARDS.chariot, name: '战车', num: 'VII' },
  { id: 'justice', src: CARDS.justice, name: '正义', num: 'XI' },
  { id: 'death', src: CARDS.death, name: '死神', num: 'XIII' },
  { id: 'tower', src: CARDS.tower, name: '高塔', num: 'XVI' },
  { id: 'star', src: CARDS.star, name: '星星', num: 'XVII' },
  { id: 'moon', src: CARDS.moon, name: '月亮', num: 'XVIII' },
  { id: 'sun', src: CARDS.sun, name: '太阳', num: 'XIX' },
]

export default function Home() {
  return (
    <>
      <Head>
        <title>星塔 · 塔罗牌占卜与星座运势</title>
        <meta name="description" content="基于维特塔罗经典体系，78张牌完整收录。每日一牌、塔罗占卜、星座运势——全部免费。" />
        <meta property="og:title" content="星塔 · 塔罗牌占卜与星座运势" />
        <meta property="og:description" content="基于维特塔罗经典体系，78张牌完整收录。" />
      </Head>

      <GlobalStyles />

      {/* 背景层 */}
      <div className="bg-layer" />
      <div className="glow-1" />
      <div className="glow-2" />
      <StarCanvas />

      <div className="page">
        <NavBar />
        <HeroSection />
        <GallerySection />
        <FeaturesSection />
        <StatsSection />
        <QRCodeSection />
        <FooterSection />
      </div>
    </>
  )
}

/* ===== 背景粒子 ===== */
function StarCanvas() {
  return (
    <canvas id="star-canvas" className="fixed inset-0 pointer-events-none z-[1]"
      ref={(el) => {
        if (!el) return
        const ctx = el.getContext('2d')
        let w, h, particles = []
        let animId = null

        function resize() {
          w = el.width = window.innerWidth
          h = el.height = document.body.scrollHeight
        }
        resize()
        window.addEventListener('resize', resize)

        for (let i = 0; i < 80; i++) {
          particles.push({
            x: Math.random() * w,
            y: Math.random() * h,
            r: Math.random() * 2 + 0.5,
            a: Math.random() * 0.6 + 0.1,
            speed: Math.random() * 0.15 + 0.05,
            phase: Math.random() * Math.PI * 2,
          })
        }

        function draw() {
          ctx.clearRect(0, 0, w, h)
          const t = Date.now() / 1000
          particles.forEach((p) => {
            const alpha = p.a * (0.6 + 0.4 * Math.sin(t * p.speed + p.phase))
            ctx.beginPath()
            ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
            ctx.fillStyle = `rgba(255, 230, 200, ${alpha})`
            ctx.fill()
          })
          animId = requestAnimationFrame(draw)
        }
        draw()

        const obs = new MutationObserver(() => {
          resize()
        })
        obs.observe(document.body, { childList: true, subtree: true })

        // cleanup on unmount:
        el._cleanup = () => {
          cancelAnimationFrame(animId)
          window.removeEventListener('resize', resize)
          obs.disconnect()
        }
      }}
    />
  )
}

/* ===== HERO ===== */
function HeroSection() {
  return (
    <section className="relative z-10 min-h-screen flex items-center pt-28 pb-16">
      <div className="max-w-[1200px] mx-auto px-6 w-full">
        <div className="flex items-center gap-16 max-lg:flex-col max-lg:text-center">
          <div className="flex-1 max-lg:order-2">
            <div
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm tracking-[2px] mb-6"
              style={{
                background: 'rgba(212,175,55,0.08)',
                border: '1px solid rgba(212,175,55,0.15)',
                color: '#D4AF37',
              }}
            >
              <span style={{ fontSize: 10 }}>✦</span>
              基于维特塔罗经典体系 · 1909
            </div>

            <h1
              className="text-5xl max-md:text-3xl font-bold leading-tight mb-5"
              style={{ fontFamily: "'Georgia','Times New Roman',serif", color: '#FFF8E7' }}
            >
              塔罗是心灵的镜<br />
              照见你 <span style={{ color: '#D4AF37', fontStyle: 'italic' }}>真实的内在</span>
            </h1>

            <p className="text-base leading-relaxed max-w-[540px] max-lg:mx-auto mb-8" style={{ color: '#B8A9C9' }}>
              78张牌完整收录，12种经典牌阵。不迷信、不宿命。每一次抽牌都是一次与自己的深度对话。
            </p>

            <div className="flex gap-8 mb-9 max-lg:justify-center flex-wrap">
              {[
                ['78', '张完整牌库'],
                ['12+', '种经典牌阵'],
                ['∞', '次自我探索'],
              ].map(([n, l]) => (
                <div key={l}>
                  <div className="text-3xl font-bold" style={{ fontFamily: "'Georgia',serif", color: '#D4AF37' }}>
                    {n}
                  </div>
                  <div className="text-sm mt-1" style={{ color: '#8B7D9B' }}>{l}</div>
                </div>
              ))}
            </div>

            <div className="flex gap-4 flex-wrap max-lg:justify-center">
              <a
                href="#qrcode"
                className="inline-block py-3.5 px-8 rounded-xl text-base font-medium no-underline transition-all hover:-translate-y-0.5"
                style={{
                  background: 'linear-gradient(135deg, #8B6914, #D4AF37)',
                  color: '#0a0510',
                  boxShadow: '0 8px 30px rgba(212,175,55,0.2)',
                }}
              >
                微信打开 →
              </a>
              <a
                href="#gallery"
                className="inline-block py-3.5 px-8 rounded-xl text-base no-underline transition-all"
                style={{ border: '1px solid rgba(212,175,55,0.2)', color: '#D4AF37' }}
              >
                浏览牌库
              </a>
            </div>
          </div>

          {/* 右侧卡牌大图 */}
          <div className="flex-[0_0_300px] max-lg:order-1 max-lg:flex-[0_0_200px]">
            <div className="tarot-card" style={{ width: 260, margin: '0 auto' }}>
              <img src={CARDS.star} alt="星星 · The Star" loading="eager" />
            </div>
            <p className="text-center mt-3 text-sm tracking-[2px]" style={{ color: '#8B7D9B' }}>
              XVII · THE STAR <span style={{ color: '#D4AF37' }}>✦</span> 希望与灵感
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ===== 卡牌画廊 ===== */
function GallerySection() {
  return (
    <section id="gallery" className="relative z-10 py-24">
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="text-center mb-16">
          <p className="text-xs tracking-[4px] mb-3" style={{ color: '#D4AF37' }}>
            THE DECK
          </p>
          <h2
            className="text-3xl font-bold mb-3"
            style={{ fontFamily: "'Georgia',serif", color: '#FFF8E7' }}
          >
            大阿卡纳 · 22 张
          </h2>
          <p className="text-sm" style={{ color: '#8B7D9B' }}>
            每张牌都是一个生命课题
          </p>
        </div>

        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-5">
          {galleryCards.map((card) => (
            <div key={card.id} className="tarot-card cursor-pointer group">
              <img src={card.src} alt={card.name} loading="lazy" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-3">
                <div>
                  <p className="text-xs" style={{ color: '#D4AF37' }}>
                    {card.num}
                  </p>
                  <p className="text-sm font-medium" style={{ color: '#FFF8E7' }}>
                    {card.name}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <p className="text-center mt-8 text-sm" style={{ color: '#6B5D7B' }}>
          ⋮ 还有 56 张小阿卡纳 · 圣杯 · 权杖 · 宝剑 · 星币 ⋮
        </p>
      </div>
    </section>
  )
}

/* ===== 功能介绍 ===== */
function FeaturesSection() {
  return (
    <section
      id="features"
      className="relative z-10 py-24"
      style={{
        background: 'rgba(212,175,55,0.02)',
        borderTop: '1px solid rgba(212,175,55,0.06)',
        borderBottom: '1px solid rgba(212,175,55,0.06)',
      }}
    >
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="text-center mb-16">
          <p className="text-xs tracking-[4px] mb-3" style={{ color: '#D4AF37' }}>
            FEATURES
          </p>
          <h2
            className="text-3xl font-bold mb-3"
            style={{ fontFamily: "'Georgia',serif", color: '#FFF8E7' }}
          >
            一样不少，样样扎实
          </h2>
          <p className="text-sm" style={{ color: '#8B7D9B' }}>
            该有的功能都有，每个都做到位
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* 每日一牌 */}
          <FeatureCard
            tag="DAILY DRAW"
            title="每日一牌"
            desc="每天抽一张今日指引牌，翻牌动画、正逆位解读、生活建议。30秒完成，适合每天的习惯。"
          >
            <div className="flex items-center gap-4">
              <div
                className="rounded-lg flex items-center justify-center"
                style={{
                  width: 80,
                  height: 112,
                  background: 'linear-gradient(145deg, #2d1b4e, #1a0a2e)',
                  border: '1px solid rgba(212,175,55,0.2)',
                  color: 'rgba(212,175,55,0.4)',
                  fontSize: 16,
                }}
              >
                ✦
              </div>
              <div style={{ flex: 1 }}>
                <div className="h-2 rounded mb-2" style={{ background: 'rgba(212,175,55,0.1)', width: '60%' }} />
                <div className="h-2 rounded mb-2" style={{ background: 'rgba(212,175,55,0.06)', width: '80%' }} />
                <div className="h-2 rounded" style={{ background: 'rgba(212,175,55,0.06)', width: '40%' }} />
              </div>
            </div>
          </FeatureCard>

          {/* 多牌阵 */}
          <FeatureCard
            tag="SPREADS"
            title="多牌阵占卜"
            desc="三牌阵、凯尔特十字、感情事业财运学业——覆盖生活各个领域。自定义牌阵也支持。"
          >
            <div className="flex justify-center items-end gap-4">
              {[CARDS.fool, CARDS.magician, CARDS.world].map((src, i) => (
                <div
                  key={i}
                  className="rounded overflow-hidden"
                  style={{
                    width: i === 1 ? 80 : 70,
                    aspectRatio: '5/7',
                    marginBottom: i === 1 ? -8 : 0,
                    border: '1px solid rgba(212,175,55,0.12)',
                  }}
                >
                  <img src={src} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
              ))}
            </div>
            <p className="text-center text-xs mt-2 tracking-[2px]" style={{ color: '#6B5D7B' }}>
              三牌阵 · 过去 · 现在 · 未来
            </p>
          </FeatureCard>

          {/* 78张牌库 */}
          <FeatureCard
            tag="LIBRARY"
            title="78张牌完整牌库"
            desc="大阿卡纳 + 小阿卡纳四牌组，每张牌都有正/逆位含义、牌面象征解读、生活建议。"
          >
            <div className="flex gap-2">
              {[CARDS.priestess, CARDS.justice, CARDS.death, CARDS.sun, CARDS.moon].map((src, i) => (
                <div
                  key={i}
                  className="rounded overflow-hidden"
                  style={{
                    width: '18%',
                    aspectRatio: '5/7',
                    border: '1px solid rgba(212,175,55,0.08)',
                  }}
                >
                  <img src={src} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
              ))}
            </div>
          </FeatureCard>

          {/* 星座运势 */}
          <FeatureCard
            tag="HOROSCOPE"
            title="星座运势"
            desc="每日/每周/每月运势、星座配对分析。每个运势都结合塔罗牌，给你不一样的体验。"
          >
            <div
              className="flex items-center justify-center gap-3 p-4 rounded-xl flex-wrap"
              style={{ background: 'rgba(212,175,55,0.04)', border: '1px solid rgba(212,175,55,0.06)' }}
            >
              {'♈♉♊♋♌♍♎♏♐♑♒♓'.split('').map((s, i) => (
                <span
                  key={i}
                  className="text-lg"
                  style={{ color: i === 2 ? '#D4AF37' : 'rgba(255,255,255,0.15)' }}
                >
                  {s}
                </span>
              ))}
            </div>
          </FeatureCard>
        </div>
      </div>
    </section>
  )
}

function FeatureCard({ tag, title, desc, children }) {
  return (
    <div
      className="p-8 rounded-2xl transition-all duration-300"
      style={{ background: 'rgba(212,175,55,0.03)', border: '1px solid rgba(212,175,55,0.06)' }}
    >
      <p className="text-xs tracking-[3px] mb-1" style={{ color: '#D4AF37' }}>
        {tag}
      </p>
      <h3 className="text-xl font-bold mb-3" style={{ fontFamily: "'Georgia',serif", color: '#FFF8E7' }}>
        {title}
      </h3>
      <p className="text-sm leading-relaxed mb-5" style={{ color: '#B8A9C9' }}>
        {desc}
      </p>
      {children}
    </div>
  )
}

/* ===== 数据统计 ===== */
function StatsSection() {
  return (
    <section className="relative z-10 py-20">
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="flex justify-center gap-20 flex-wrap">
          {[
            ['78', '张牌完整收录'],
            ['22', '张大阿卡纳'],
            ['56', '张小阿卡纳'],
            ['12+', '种牌阵'],
            ['100%', '免费使用'],
          ].map(([n, l]) => (
            <div key={l} className="text-center">
              <div
                className="text-4xl font-bold mb-1"
                style={{ fontFamily: "'Georgia',serif", color: '#D4AF37' }}
              >
                {n}
              </div>
              <div className="text-sm" style={{ color: '#8B7D9B' }}>
                {l}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ===== 小程序码 ===== */
function QRCodeSection() {
  return (
    <section
      id="qrcode"
      className="relative z-10 py-20"
      style={{ background: 'rgba(212,175,55,0.02)', borderTop: '1px solid rgba(212,175,55,0.06)' }}
    >
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="flex items-center justify-center gap-16 flex-wrap">
          <div className="w-44 h-44 bg-white rounded-2xl p-3 shadow-lg">
            <div
              className="w-full h-full rounded-xl flex items-center justify-center text-xs"
              style={{ background: '#f5f0e8', color: '#999' }}
            >
              小程序码<br />（待替换）
            </div>
          </div>
          <div className="max-w-sm text-center md:text-left">
            <h3
              className="text-2xl font-bold mb-2"
              style={{ fontFamily: "'Georgia',serif", color: '#FFF8E7' }}
            >
              ✦ 星塔 小程序
            </h3>
            <p className="text-sm leading-relaxed" style={{ color: '#B8A9C9' }}>
              微信扫码或搜索「星塔」打开。<br />
              每日一牌 · 占卜 · 牌库 · 星座 · 全部免费
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ===== Footer ===== */
function FooterSection() {
  return (
    <footer className="relative z-10 py-12 text-center" style={{ borderTop: '1px solid rgba(212,175,55,0.06)' }}>
      <div className="max-w-[1200px] mx-auto px-6">
        <p
          className="text-lg mb-2"
          style={{ fontFamily: "'Georgia',serif", color: '#FFF8E7', letterSpacing: '4px' }}
        >
          ✦ 星塔
        </p>
        <p className="text-sm mb-4" style={{ color: '#8B7D9B' }}>
          塔罗是一面镜子，真正的答案在你心中
        </p>
        <div
          className="max-w-lg mx-auto p-3 rounded-lg text-xs leading-relaxed"
          style={{ background: 'rgba(212,175,55,0.03)', color: '#6B5D7B' }}
        >
          <strong>免责声明：</strong>星塔提供的所有占卜结果及内容仅供娱乐参考，不构成任何决策建议。
          塔罗牌是一种自我探索的工具，帮助用户进行自我觉察与思考。
        </div>
        <p className="text-xs mt-5" style={{ color: '#4A3D5B' }}>
          © 2026 星塔 · 内容仅供娱乐参考
        </p>
      </div>
    </footer>
  )
}

/* ===== 全局样式（注入到页面的style） ===== */
function GlobalStyles() {
  return (
    <style jsx global>{`
      * { margin: 0; padding: 0; box-sizing: border-box; }
      body {
        background: #0f1923;
        color: #E2E8F0;
        font-family: -apple-system, 'PingFang SC', 'Microsoft YaHei', sans-serif;
        overflow-x: hidden;
      }
      /* 背景层 */
      .bg-layer {
        position: fixed; top: 0; left: 0; width: 100%; height: 100%;
        z-index: 0; pointer-events: none;
        background:
          radial-gradient(ellipse 100% 80% at 30% 0%, #2d1b4e 0%, transparent 60%),
          radial-gradient(ellipse 80% 60% at 70% 30%, #1a0a2e 0%, transparent 50%),
          radial-gradient(ellipse 70% 50% at 50% 100%, #0f1923 0%, transparent 60%);
      }
      .glow-1 {
        position: fixed; top: -20%; left: -10%; width: 60%; height: 60%;
        z-index: 0; pointer-events: none;
        background: radial-gradient(circle, rgba(212,175,55,0.06) 0%, transparent 70%);
      }
      .glow-2 {
        position: fixed; bottom: -10%; right: -10%; width: 50%; height: 50%;
        z-index: 0; pointer-events: none;
        background: radial-gradient(circle, rgba(201,169,110,0.04) 0%, transparent 70%);
      }
      .page { position: relative; z-index: 1; min-height: 100vh; }

      /* 卡牌 */
      .tarot-card {
        border-radius: 12px;
        overflow: hidden;
        border: 1px solid rgba(212,175,55,0.15);
        transition: all 0.4s;
        box-shadow: 0 4px 20px rgba(0,0,0,0.3);
        aspect-ratio: 5/7;
        position: relative;
      }
      .tarot-card:hover {
        transform: translateY(-6px) scale(1.02);
        border-color: rgba(212,175,55,0.4);
        box-shadow: 0 12px 40px rgba(212,175,55,0.15);
      }
      .tarot-card img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        display: block;
      }

      /* 滚动条 */
      ::-webkit-scrollbar { width: 6px; }
      ::-webkit-scrollbar-track { background: #0f1923; }
      ::-webkit-scrollbar-thumb { background: rgba(212,175,55,0.3); border-radius: 3px; }

      @media (max-width: 768px) {
        .bg-layer {
          background:
            radial-gradient(ellipse 100% 80% at 30% 0%, #2d1b4e 0%, transparent 60%),
            radial-gradient(ellipse 80% 60% at 70% 30%, #1a0a2e 0%, transparent 60%),
            #0f1923;
        }
      }
    `}</style>
  )
}
