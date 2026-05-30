import Head from 'next/head'
import { useState, useEffect, useRef } from 'react'

// ===== 公有领域维特塔罗牌面 =====
const CARDS = {
  star: 'https://upload.wikimedia.org/wikipedia/commons/d/db/RWS_Tarot_17_Star.jpg',
  fool: 'https://upload.wikimedia.org/wikipedia/commons/9/90/RWS_Tarot_00_Fool.jpg',
  magician: 'https://upload.wikimedia.org/wikipedia/commons/d/de/RWS_Tarot_01_Magician.jpg',
  priestess: 'https://upload.wikimedia.org/wikipedia/commons/8/88/RWS_Tarot_02_High_Priestess.jpg',
  empress: 'https://upload.wikimedia.org/wikipedia/commons/d/d2/RWS_Tarot_03_Empress.jpg',
  emperor: 'https://upload.wikimedia.org/wikipedia/commons/c/c3/RWS_Tarot_04_Emperor.jpg',
  lovers: 'https://upload.wikimedia.org/wikipedia/commons/d/db/RWS_Tarot_06_Lovers.jpg',
  chariot: 'https://upload.wikimedia.org/wikipedia/commons/9/9b/RWS_Tarot_07_Chariot.jpg',
  strength: 'https://upload.wikimedia.org/wikipedia/commons/2/2c/RWS_Tarot_08_Strength.jpg',
  hermit: 'https://upload.wikimedia.org/wikipedia/commons/6/68/RWS_Tarot_09_Hermit.jpg',
  wheel: 'https://upload.wikimedia.org/wikipedia/commons/2/2d/RWS_Tarot_10_Wheel.jpg',
  justice: 'https://upload.wikimedia.org/wikipedia/commons/e/e0/RWS_Tarot_11_Justice.jpg',
  hanged: 'https://upload.wikimedia.org/wikipedia/commons/5/52/RWS_Tarot_12_Hanged.jpg',
  death: 'https://upload.wikimedia.org/wikipedia/commons/d/d7/RWS_Tarot_13_Death.jpg',
  temperance: 'https://upload.wikimedia.org/wikipedia/commons/8/8b/RWS_Tarot_14_Temperance.jpg',
  devil: 'https://upload.wikimedia.org/wikipedia/commons/5/55/RWS_Tarot_15_Devil.jpg',
  tower: 'https://upload.wikimedia.org/wikipedia/commons/5/53/RWS_Tarot_16_Tower.jpg',
  moon: 'https://upload.wikimedia.org/wikipedia/commons/7/7f/RWS_Tarot_18_Moon.jpg',
  sun: 'https://upload.wikimedia.org/wikipedia/commons/1/17/RWS_Tarot_19_Sun.jpg',
  judgement: 'https://upload.wikimedia.org/wikipedia/commons/0/03/RWS_Tarot_20_Judgement.jpg',
  world: 'https://upload.wikimedia.org/wikipedia/commons/f/ff/RWS_Tarot_21_World.jpg',
}

const heroCards = [
  { src: CARDS.star, name: '星星', num: 'XVII', en: 'The Star', mean: '希望 · 灵感 · 治愈' },
  { src: CARDS.sun, name: '太阳', num: 'XIX', en: 'The Sun', mean: '喜悦 · 成功 · 活力' },
  { src: CARDS.moon, name: '月亮', num: 'XVIII', en: 'The Moon', mean: '直觉 · 幻象 · 潜意识' },
  { src: CARDS.world, name: '世界', num: 'XXI', en: 'The World', mean: '完成 · 圆满 · 整合' },
  { src: CARDS.justice, name: '正义', num: 'XI', en: 'Justice', mean: '公平 · 真相 · 因果' },
]

const zodiacs = [
  { sym: '♈', name: '白羊座', en: 'Aries', date: '3.21-4.19', el: '火', color: '#E74C3C' },
  { sym: '♉', name: '金牛座', en: 'Taurus', date: '4.20-5.20', el: '土', color: '#27AE60' },
  { sym: '♊', name: '双子座', en: 'Gemini', date: '5.21-6.21', el: '风', color: '#F39C12' },
  { sym: '♋', name: '巨蟹座', en: 'Cancer', date: '6.22-7.22', el: '水', color: '#3498DB' },
  { sym: '♌', name: '狮子座', en: 'Leo', date: '7.23-8.22', el: '火', color: '#E67E22' },
  { sym: '♍', name: '处女座', en: 'Virgo', date: '8.23-9.22', el: '土', color: '#1ABC9C' },
  { sym: '♎', name: '天秤座', en: 'Libra', date: '9.23-10.23', el: '风', color: '#9B59B6' },
  { sym: '♏', name: '天蝎座', en: 'Scorpio', date: '10.24-11.22', el: '水', color: '#E74C3C' },
  { sym: '♐', name: '射手座', en: 'Sagittarius', date: '11.23-12.21', el: '火', color: '#2E86C1' },
  { sym: '♑', name: '摩羯座', en: 'Capricorn', date: '12.22-1.19', el: '土', color: '#7F8C8D' },
  { sym: '♒', name: '水瓶座', en: 'Aquarius', date: '1.20-2.18', el: '风', color: '#00CEC9' },
  { sym: '♓', name: '双鱼座', en: 'Pisces', date: '2.19-3.20', el: '水', color: '#A29BFE' },
]

// 12张展示卡
const galleryCards = [
  { id:'fool', src: CARDS.fool, name:'愚人', num:'0', upright:'新的开始、冒险、信任', reversed:'鲁莽、轻率' },
  { id:'magician', src: CARDS.magician, name:'魔术师', num:'I', upright:'创造力、自信、技能', reversed:'操纵、浪费' },
  { id:'priestess', src: CARDS.priestess, name:'女祭司', num:'II', upright:'直觉、内在智慧', reversed:'表面、秘密' },
  { id:'empress', src: CARDS.empress, name:'女皇', num:'III', upright:'丰饶、母性、自然', reversed:'依赖、阻碍' },
  { id:'lovers', src: CARDS.lovers, name:'恋人', num:'VI', upright:'爱情、选择、和谐', reversed:'不合、失衡' },
  { id:'chariot', src: CARDS.chariot, name:'战车', num:'VII', upright:'胜利、意志力', reversed:'失控、方向' },
  { id:'strength', src: CARDS.strength, name:'力量', num:'VIII', upright:'勇气、内在力量', reversed:'自我怀疑' },
  { id:'hermit', src: CARDS.hermit, name:'隐士', num:'IX', upright:'内省、智慧、孤独', reversed:'退缩、迷失' },
  { id:'death', src: CARDS.death, name:'死神', num:'XIII', upright:'结束、转变、新生', reversed:'抗拒、恐惧' },
  { id:'tower', src: CARDS.tower, name:'高塔', num:'XVI', upright:'剧变、觉醒、重塑', reversed:'抵抗、避免' },
  { id:'star', src: CARDS.star, name:'星星', num:'XVII', upright:'希望、灵感、治愈', reversed:'绝望、迷失' },
  { id:'sun', src: CARDS.sun, name:'太阳', num:'XIX', upright:'喜悦、成功、成就', reversed:'低落、阻碍' },
]

/* ==================== 页面主组件 ==================== */
export default function Home() {
  return (
    <>
      <Head>
        <title>星塔 · 塔罗牌占卜与星座运势</title>
        <meta name="description" content="基于维特塔罗经典体系，78张牌完整收录。每日一牌、塔罗占卜、星座运势——全部免费。" />
      </Head>
      <GlobalStyles />
      <CosmicBg />
      <div className="page">
        <NavBar />
        <HeroSection />
        <GallerySection />
        <FeaturesSection />
        <ZodiacSection />
        <CTASection />
        <FooterSection />
      </div>
    </>
  )
}

/* ==================== 全局样式 ==================== */
function GlobalStyles() {
  return (
    <style jsx global>{`
      @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;0,700;1,400&display=swap');
      * { margin:0; padding:0; box-sizing:border-box; }
      body {
        background: #07060a;
        color: #E2E8F0;
        font-family: -apple-system, 'PingFang SC', 'Microsoft YaHei', sans-serif;
        overflow-x: hidden;
      }
      .font-serif-en { font-family: 'Cormorant Garamond', Georgia, serif; }

      ::-webkit-scrollbar { width:6px; }
      ::-webkit-scrollbar-track { background:#07060a; }
      ::-webkit-scrollbar-thumb { background:rgba(212,175,55,0.25); border-radius:3px; }

      @keyframes float {
        0%,100% { transform: translateY(0px); }
        50% { transform: translateY(-10px); }
      }
      @keyframes twinkle {
        0%,100% { opacity:0.3; }
        50% { opacity:1; }
      }
      @keyframes shimmer {
        0% { background-position:-200% 0; }
        100% { background-position:200% 0; }
      }
      @keyframes slideLeft {
        0% { transform:translateX(0); }
        100% { transform:translateX(-50%); }
      }
    `}</style>
  )
}

/* ==================== 宇宙背景 ==================== */
function CosmicBg() {
  return (
    <>
      {/* 基础深空 */}
      <div className="fixed inset-0 z-0 pointer-events-none" style={{
        background: `
          radial-gradient(ellipse 120% 70% at 20% 0%, #281a4a 0%, transparent 60%),
          radial-gradient(ellipse 80% 60% at 80% 20%, #1a0a2e 0%, transparent 50%),
          radial-gradient(ellipse 60% 50% at 50% 100%, #0f0a18 0%, transparent 60%),
          radial-gradient(ellipse 50% 40% at 30% 60%, #2a1a3a 0%, transparent 40%),
          #07060a
        `,
      }}/>
      {/* 金色光晕 */}
      <div className="fixed top-[-15%] left-[-5%] w-[70%] h-[70%] z-0 pointer-events-none"
        style={{ background:'radial-gradient(circle, rgba(212,175,55,0.04) 0%, transparent 60%)' }}/>
      <div className="fixed bottom-[-10%] right-[-5%] w-[60%] h-[60%] z-0 pointer-events-none"
        style={{ background:'radial-gradient(circle, rgba(180,140,200,0.04) 0%, transparent 60%)' }}/>
      <div className="fixed top-[40%] left-[60%] w-[40%] h-[40%] z-0 pointer-events-none"
        style={{ background:'radial-gradient(circle, rgba(100,60,180,0.04) 0%, transparent 50%)' }}/>
      {/* 粒子星空 */}
      <StarField />
    </>
  )
}

function StarField() {
  return (
    <canvas className="fixed inset-0 z-[1] pointer-events-none"
      ref={el => {
        if (!el || el.dataset.initialized) return
        el.dataset.initialized = '1'
        const ctx = el.getContext('2d')
        let w, h
        const stars = [], shooting = []

        function resize() {
          w = el.width = window.innerWidth
          h = el.height = document.body.scrollHeight
        }
        resize()
        window.addEventListener('resize', resize)

        for (let i = 0; i < 150; i++) {
          stars.push({
            x: Math.random() * w, y: Math.random() * h,
            r: Math.random() * 2 + 0.3,
            a: Math.random() * 0.8 + 0.1,
            speed: Math.random() * 0.2 + 0.05,
            phase: Math.random() * Math.PI * 2,
            hue: Math.random() > 0.8 ? (Math.random() * 60 + 30) : 0, // 部分星星暖色
          })
        }

        let frame = 0
        function draw() {
          ctx.clearRect(0, 0, w, h)
          const t = Date.now() / 1000
          frame++

          stars.forEach(s => {
            const alpha = s.a * (0.5 + 0.5 * Math.sin(t * s.speed + s.phase))
            ctx.beginPath()
            ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2)
            if (s.hue) {
              ctx.fillStyle = `hsla(${s.hue}, 80%, 70%, ${alpha * 0.6})`
            } else {
              ctx.fillStyle = `rgba(255, 255, 255, ${alpha})`
            }
            ctx.fill()
          })

          // 流星（随机出现）
          if (frame % 180 === 0 && Math.random() > 0.5) {
            shooting.push({
              x: Math.random() * w * 0.8,
              y: Math.random() * h * 0.3,
              len: Math.random() * 80 + 40,
              speed: Math.random() * 12 + 8,
              life: 1,
            })
          }
          for (let i = shooting.length - 1; i >= 0; i--) {
            const s = shooting[i]
            s.x += s.speed
            s.y += s.speed * 0.3
            s.life -= 0.02
            if (s.life <= 0) { shooting.splice(i,1); continue }
            ctx.beginPath()
            ctx.moveTo(s.x, s.y)
            ctx.lineTo(s.x - s.len * (1-s.life), s.y - s.len * (1-s.life) * 0.3)
            ctx.strokeStyle = `rgba(255, 240, 220, ${s.life * 0.6})`
            ctx.lineWidth = 1.5
            ctx.stroke()
          }

          requestAnimationFrame(draw)
        }
        draw()
      }}
    />
  )
}

/* ==================== 导航 ==================== */
function NavBar() {
  const [scrolled, setScrolled] = useState(false)
  useEffect(() => {
    function onScroll() { setScrolled(window.scrollY > 60) }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])
  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
      scrolled ? 'py-3 bg-[rgba(7,6,10,0.85)] backdrop-blur-[24px] border-b border-[rgba(212,175,55,0.06)]' : 'py-5 bg-transparent'
    }`}>
      <div className="max-w-[1200px] mx-auto px-6 flex items-center justify-between">
        <a href="#" className="text-xl font-bold no-underline tracking-[5px] font-serif-en"
           style={{ color:'#FFF8E7' }}>
          ✦ 星<span style={{ color:'#D4AF37' }}>塔</span>
        </a>
        <div className="hidden md:flex gap-10">
          {[
            ['牌库', '#gallery'],
            ['功能', '#features'],
            ['星座', '#zodiac'],
            ['开始', '#cta'],
          ].map(([t,h]) => (
            <a key={t} href={h}
              className="text-sm no-underline tracking-[2px] transition-all duration-300 hover:text-[#D4AF37]"
              style={{ color:'#8B7D9B' }}>
              {t}
            </a>
          ))}
        </div>
        <a href="#cta"
          className="py-2.5 px-6 rounded-lg text-sm font-medium no-underline tracking-[2px] transition-all duration-300 hover:shadow-[0_0_30px_rgba(212,175,55,0.3)]"
          style={{
            background: 'linear-gradient(135deg, #8B6914, #D4AF37)',
            color: '#07060a',
          }}>
          启 程
        </a>
      </div>
    </nav>
  )
}

/* ==================== HERO 旋转卡牌区 ==================== */
function HeroSection() {
  const [idx, setIdx] = useState(0)
  const [paused, setPaused] = useState(false)
  const timerRef = useRef(null)
  const containerRef = useRef(null)

  useEffect(() => {
    if (paused) {
      clearInterval(timerRef.current)
      return
    }
    timerRef.current = setInterval(() => {
      setIdx(prev => (prev + 1) % heroCards.length)
    }, 2800)
    return () => clearInterval(timerRef.current)
  }, [paused])

  const card = heroCards[idx]

  return (
    <section className="relative z-10 min-h-screen flex items-center pt-28 pb-16 overflow-hidden">
      {/* 装饰光效 */}
      <div className="absolute top-1/2 left-1/3 w-[300px] h-[300px] rounded-full -translate-y-1/2 pointer-events-none"
        style={{ background:'radial-gradient(circle, rgba(212,175,55,0.06) 0%, transparent 60%)' }}/>

      <div className="max-w-[1200px] mx-auto px-6 w-full">
        <div className="flex items-center gap-20 max-lg:flex-col max-lg:text-center">

          {/* 左侧 */}
          <div className="flex-1 max-lg:order-2">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm tracking-[3px] mb-6"
              style={{
                background: 'rgba(212,175,55,0.06)',
                border: '1px solid rgba(212,175,55,0.1)',
                color: '#D4AF37',
                fontSize: 12,
              }}>
              ✦ 基于维特塔罗 · 1909
            </div>

            <h1 className="text-5xl max-md:text-3xl font-bold leading-tight mb-5 font-serif-en"
                style={{ color: '#FFF8E7' }}>
              塔罗是心灵的镜<br />
              照见你 <span style={{ color:'#D4AF37', fontStyle:'italic' }}>真实的内在</span>
            </h1>

            <p className="text-base leading-relaxed max-w-[520px] max-lg:mx-auto mb-8"
               style={{ color:'#A99BB8' }}>
              78张牌完整收录，12种经典牌阵。不迷信、不宿命。
              每一次抽牌都是一次与自己的深度对话。
            </p>

            <div className="flex gap-10 mb-10 max-lg:justify-center flex-wrap">
              {[
                ['78', '张完整牌库'],
                ['12+', '种经典牌阵'],
                ['∞', '次无限探索'],
              ].map(([n,l]) => (
                <div key={l}>
                  <div className="text-3xl font-bold font-serif-en" style={{ color:'#D4AF37' }}>{n}</div>
                  <div className="text-sm mt-1" style={{ color:'#7A6D8A' }}>{l}</div>
                </div>
              ))}
            </div>

            <div className="flex gap-4 flex-wrap max-lg:justify-center">
              <a href="#cta"
                className="inline-block py-4 px-10 rounded-xl text-base font-medium no-underline tracking-[3px] transition-all duration-300 hover:-translate-y-1"
                style={{
                  background: 'linear-gradient(135deg, #8B6914, #D4AF37)',
                  color: '#07060a',
                  boxShadow: '0 8px 30px rgba(212,175,55,0.15)',
                }}>
                进 入 星 塔
              </a>
              <a href="#gallery"
                className="inline-block py-4 px-10 rounded-xl text-base no-underline tracking-[2px] transition-all duration-300"
                style={{ border:'1px solid rgba(212,175,55,0.15)', color:'#D4AF37' }}>
                览 牌
              </a>
            </div>
          </div>

          {/* 右侧旋转卡牌 */}
          <div className="flex-[0_0_320px] max-lg:order-1 max-lg:flex-[0_0_220px]"
               ref={containerRef}
               onMouseEnter={() => setPaused(true)}
               onMouseLeave={() => setPaused(false)}>
            <div className="relative" style={{ width:260, margin:'0 auto', height:380 }}>
              {heroCards.map((c, i) => (
                <div key={c.num}
                  className="absolute inset-0 transition-all duration-700 ease-[cubic-bezier(0.4,0,0.2,1)]"
                  style={{
                    opacity: i === idx ? 1 : 0,
                    transform: `translateY(${i === idx ? 0 : 20}px) scale(${i === idx ? 1 : 0.95})`,
                    zIndex: i === idx ? 10 : 0,
                  }}>
                  <div className="tarot-card-glow mx-auto" style={{
                    width:'100%', aspectRatio:'5/7', borderRadius:14,
                    overflow:'hidden',
                    border:'1px solid rgba(212,175,55,0.25)',
                    boxShadow: i === idx
                      ? '0 20px 60px rgba(212,175,55,0.15), 0 0 40px rgba(212,175,55,0.05)'
                      : '0 4px 20px rgba(0,0,0,0.3)',
                    transition: 'box-shadow 0.7s',
                  }}>
                    <img src={c.src} alt={c.name}
                      style={{ width:'100%', height:'100%', objectFit:'cover', display:'block' }}/>
                  </div>
                  {/* 卡牌信息 */}
                  <div className="text-center mt-4 transition-opacity duration-500"
                    style={{ opacity: i === idx ? 1 : 0 }}>
                    <p className="text-xs tracking-[3px]" style={{ color:'#D4AF37' }}>{c.num} · {c.en}</p>
                    <p className="text-lg font-serif-en font-bold mt-1" style={{ color:'#FFF8E7' }}>{c.name}</p>
                    <p className="text-sm mt-1" style={{ color:'#7A6D8A' }}>{c.mean}</p>
                  </div>
                </div>
              ))}
              {/* 底部指示点 */}
              <div className="flex justify-center gap-2 mt-4 absolute -bottom-8 left-0 right-0">
                {heroCards.map((_, i) => (
                  <button key={i} onClick={() => setIdx(i)}
                    className="rounded-full transition-all duration-300 border-none cursor-pointer"
                    style={{
                      width: i === idx ? 24 : 6,
                      height: 6,
                      background: i === idx ? '#D4AF37' : 'rgba(255,255,255,0.1)',
                    }}/>
                ))}
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}

/* ==================== 卡牌画廊（点击翻转） ==================== */
function GallerySection() {
  const [flipped, setFlipped] = useState({})
  const toggleFlip = (id) => setFlipped(prev => ({ ...prev, [id]: !prev[id] }))

  return (
    <section id="gallery" className="relative z-10 py-28">
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="text-center mb-16">
          <p className="text-xs tracking-[5px] mb-3" style={{ color:'#D4AF37' }}>THE MAJOR ARCANA</p>
          <h2 className="text-4xl font-bold mb-3 font-serif-en" style={{ color:'#FFF8E7' }}>
            大阿卡纳 · 22 张
          </h2>
          <p className="text-sm" style={{ color:'#8B7D9B' }}>点击牌面翻转 · 查看正逆位含义</p>
        </div>

        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-5">
          {galleryCards.map(card => (
            <div key={card.id}
              className="card-flip-container cursor-pointer"
              onClick={() => toggleFlip(card.id)}
              style={{
                perspective: 1000,
                aspectRatio: '5/7',
              }}>
              <div className={`card-flip-inner ${flipped[card.id] ? 'flipped' : ''}`}
                style={{
                  width:'100%', height:'100%',
                  transition: 'transform 0.6s cubic-bezier(0.4,0,0.2,1)',
                  transformStyle: 'preserve-3d',
                  position: 'relative',
                  transform: flipped[card.id] ? 'rotateY(180deg)' : 'rotateY(0deg)',
                }}>
                {/* 正面：牌面 */}
                <div className="absolute inset-0" style={{ backfaceVisibility:'hidden' }}>
                  <div className="rounded-xl overflow-hidden h-full"
                    style={{
                      border:'1px solid rgba(212,175,55,0.12)',
                      boxShadow: '0 4px 16px rgba(0,0,0,0.3)',
                    }}>
                    <img src={card.src} alt={card.name}
                      style={{ width:'100%', height:'100%', objectFit:'cover', display:'block' }}/>
                  </div>
                </div>
                {/* 背面：解读 */}
                <div className="absolute inset-0 rounded-xl p-3 flex flex-col justify-center"
                  style={{
                    backfaceVisibility:'hidden',
                    transform: 'rotateY(180deg)',
                    background: 'linear-gradient(145deg, #1a0f2a, #0f0818)',
                    border: '1px solid rgba(212,175,55,0.15)',
                  }}>
                  <p className="text-center font-serif-en text-lg font-bold" style={{ color:'#D4AF37' }}>{card.num}</p>
                  <p className="text-center font-serif-en text-sm mb-2" style={{ color:'#FFF8E7' }}>{card.name}</p>
                  <div className="w-6 h-px mx-auto mb-2" style={{ background:'rgba(212,175,55,0.3)' }}/>
                  <p className="text-xs leading-relaxed" style={{ color:'#B8A9C9' }}>
                    <span style={{ color:'#D4AF37' }}>正位</span> {card.upright}
                  </p>
                  <p className="text-xs leading-relaxed mt-1" style={{ color:'#B8A9C9' }}>
                    <span style={{ color:'#8B6B5B' }}>逆位</span> {card.reversed}
                  </p>
                  <p className="text-[10px] text-center mt-2 tracking-[2px]" style={{ color:'#5A4D6A' }}>点击翻回</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <p className="text-center mt-10 text-sm tracking-[3px]" style={{ color:'#5A4D6A' }}>
          ✦ 另有 56 张小阿卡纳 · 圣杯 · 权杖 · 宝剑 · 星币 ✦
        </p>
      </div>
    </section>
  )
}

/* ==================== 功能介绍（彻底重做） ==================== */
function FeaturesSection() {
  return (
    <section id="features" className="relative z-10 py-28"
      style={{
        background:'rgba(212,175,55,0.015)',
        borderTop:'1px solid rgba(212,175,55,0.04)',
        borderBottom:'1px solid rgba(212,175,55,0.04)',
      }}>
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="text-center mb-16">
          <p className="text-xs tracking-[5px] mb-3" style={{ color:'#D4AF37' }}>FEATURES</p>
          <h2 className="text-4xl font-bold mb-3 font-serif-en" style={{ color:'#FFF8E7' }}>
            功能与体验
          </h2>
          <p className="text-sm" style={{ color:'#8B7D9B' }}>每一个功能，都用心做到位</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* 1. 每日一牌 */}
          <FeatureCard
            tag="DAILY DRAW"
            title="每日一牌"
            desc="每天一张今日指引牌，翻牌动画、正逆位深度解读。30秒完成，适合每日习惯。"
            highlight="每天都不一样"
            extra={
              <div className="flex items-center gap-5">
                <div className="w-[88px] aspect-[5/7] rounded-lg overflow-hidden flex-shrink-0"
                  style={{ border:'1px solid rgba(212,175,55,0.15)', boxShadow:'0 4px 16px rgba(0,0,0,0.3)' }}>
                  <img src={CARDS.fool} alt="每日一牌示例"
                    style={{ width:'100%', height:'100%', objectFit:'cover', display:'block' }}/>
                </div>
                <div style={{ flex:1 }}>
                  <p className="text-sm font-bold font-serif-en" style={{ color:'#FFF8E7' }}>今日抽牌 · 愚人</p>
                  <p className="text-xs mt-1" style={{ color:'#D4AF37' }}>正位 · 新的开始</p>
                  <p className="text-xs mt-2 leading-relaxed" style={{ color:'#A99BB8' }}>
                    放下对未知的恐惧，勇敢迈出第一步。新的旅程正在等待你，保持纯真的心去探索。
                  </p>
                </div>
              </div>
            }/>

          {/* 2. 多牌阵 */}
          <FeatureCard
            tag="SPREADS"
            title="多牌阵占卜"
            desc="三牌阵、凯尔特十字、感情/事业/财运/学业——覆盖生活每个领域。"
            highlight="覆盖生活全部领域"
            extra={
              <div className="flex items-end justify-center gap-3 pt-1">
                {[
                  { src:CARDS.fool, label:'过去' },
                  { src:CARDS.magician, label:'现在' },
                  { src:CARDS.world, label:'未来' },
                ].map((item,i) => (
                  <div key={i} className="flex flex-col items-center gap-1.5">
                    <div className="rounded-lg overflow-hidden"
                      style={{
                        width: i===1 ? 90 : 76,
                        aspectRatio:'5/7',
                        border:'1px solid rgba(212,175,55,0.12)',
                        boxShadow:'0 4px 16px rgba(0,0,0,0.25)',
                        transform: i===1 ? 'translateY(-8px)' : 'none',
                      }}>
                      <img src={item.src} alt={item.label}
                        style={{ width:'100%', height:'100%', objectFit:'cover', display:'block' }}/>
                    </div>
                    <span className="text-xs tracking-[2px]" style={{ color:'#7A6D8A' }}>{item.label}</span>
                  </div>
                ))}
              </div>
            }/>

          {/* 3. 78张牌库 */}
          <FeatureCard
            tag="LIBRARY"
            title="78张牌完整牌库"
            desc="大阿卡纳 + 小阿卡纳四牌组（圣杯、权杖、宝剑、星币），每张牌都有正/逆位深度解读。"
            highlight="每张牌都有完整解读"
            extra={
              <div className="flex flex-col gap-3">
                <div className="flex gap-2">
                  {[CARDS.priestess, CARDS.justice, CARDS.death, CARDS.sun, CARDS.moon, CARDS.world].map((src,i) => (
                    <div key={i} className="rounded-md overflow-hidden flex-1"
                      style={{ border:'1px solid rgba(212,175,55,0.08)', minWidth:0 }}>
                      <img src={src} alt=""
                        style={{ width:'100%', aspectRatio:'5/7', objectFit:'cover', display:'block' }}/>
                    </div>
                  ))}
                </div>
                <div className="flex justify-between text-xs tracking-[3px] px-1" style={{ color:'#5A4D6A' }}>
                  <span>圣杯</span><span>权杖</span><span>宝剑</span><span>星币</span>
                </div>
              </div>
            }/>

          {/* 4. 星座运势 */}
          <FeatureCard
            tag="ZODIAC"
            title="星座运势"
            desc="每日/每周/每月运势、星座配对分析。每个星座结合塔罗牌解读，给你不一样的体验。"
            highlight="十二星座全覆盖"
            extra={
              <div className="flex flex-wrap justify-center gap-2">
                {zodiacs.slice(0,12).map(z => (
                  <div key={z.name}
                    className="flex flex-col items-center gap-1 p-2 rounded-lg transition-all duration-300 hover:scale-110"
                    style={{ width:'14%', minWidth:44 }}>
                    <span className="text-xl" style={{ color: z.color }}>{z.sym}</span>
                    <span className="text-[10px] tracking-[1px]" style={{ color:'#7A6D8A' }}>{z.name}</span>
                  </div>
                ))}
              </div>
            }/>
        </div>
      </div>
    </section>
  )
}

function FeatureCard({ tag, title, desc, highlight, extra }) {
  return (
    <div className="p-8 rounded-2xl transition-all duration-500 hover:-translate-y-1 group"
      style={{
        background: 'rgba(212,175,55,0.02)',
        border: '1px solid rgba(212,175,55,0.04)',
      }}>
      <div className="flex items-center justify-between mb-3">
        <p className="text-xs tracking-[4px]" style={{ color:'#D4AF37' }}>{tag}</p>
        <span className="text-[10px] px-2 py-0.5 rounded-full tracking-[1px]"
          style={{
            background:'rgba(212,175,55,0.06)',
            border:'1px solid rgba(212,175,55,0.08)',
            color:'#D4AF37',
          }}>
          {highlight}
        </span>
      </div>
      <h3 className="text-xl font-bold mb-2 font-serif-en" style={{ color:'#FFF8E7' }}>{title}</h3>
      <p className="text-sm leading-relaxed mb-5" style={{ color:'#A99BB8' }}>{desc}</p>
      {extra}
    </div>
  )
}

/* ==================== 星座滚动区 ==================== */
function ZodiacSection() {
  const [hoveredZodiac, setHoveredZodiac] = useState(null)
  const scrollRef = useRef(null)
  const [isPaused, setIsPaused] = useState(false)

  useEffect(() => {
    if (isPaused) return
    const el = scrollRef.current
    if (!el) return

    const interval = setInterval(() => {
      el.scrollLeft += 1
      // 无缝循环：到达复制内容起点时跳回
      if (el.scrollLeft >= el.scrollWidth / 2) {
        el.scrollLeft = 0
      }
    }, 30)
    return () => clearInterval(interval)
  }, [isPaused])

  const items = [...zodiacs, ...zodiacs] // 双倍实现无缝

  return (
    <section id="zodiac" className="relative z-10 py-24 overflow-hidden">
      <div className="text-center mb-14 px-6">
        <p className="text-xs tracking-[5px] mb-3" style={{ color:'#D4AF37' }}>ZODIAC</p>
        <h2 className="text-4xl font-bold mb-3 font-serif-en" style={{ color:'#FFF8E7' }}>
          十二星座
        </h2>
        <p className="text-sm" style={{ color:'#8B7D9B' }}>
          悬停查看详情 · 自动滚动
        </p>
      </div>

      {/* 星座滚动条 */}
      <div className="relative"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => { setIsPaused(false); setHoveredZodiac(null) }}>
        <div ref={scrollRef}
          className="overflow-x-auto whitespace-nowrap py-4"
          style={{
            scrollbarWidth:'none', msOverflowStyle:'none',
            WebkitOverflowScrolling:'touch',
            cursor:'grab',
          }}>
          <div className="inline-flex gap-3 px-6">
            {items.map((z, i) => (
              <div key={i}
                className="inline-flex flex-col items-center gap-2 p-4 rounded-xl transition-all duration-300"
                style={{
                  width: 100,
                  background: hoveredZodiac === i ? 'rgba(212,175,55,0.06)' : 'rgba(255,255,255,0.01)',
                  border: hoveredZodiac === i
                    ? '1px solid rgba(212,175,55,0.2)'
                    : '1px solid rgba(255,255,255,0.03)',
                  transform: hoveredZodiac === i ? 'translateY(-6px) scale(1.05)' : 'none',
                }}
                onMouseEnter={() => setHoveredZodiac(i)}
                onMouseLeave={() => setHoveredZodiac(null)}>
                <span className="text-3xl" style={{ color: z.color }}>{z.sym}</span>
                <span className="text-sm font-bold font-serif-en" style={{ color:'#FFF8E7' }}>{z.name}</span>
                {hoveredZodiac === i && (
                  <div className="text-center mt-1 animate-fadeIn">
                    <p className="text-[10px]" style={{ color:'#D4AF37' }}>{z.en}</p>
                    <p className="text-[10px] mt-0.5" style={{ color:'#7A6D8A' }}>{z.date}</p>
                    <p className="text-[10px]" style={{ color:'#A99BB8' }}>元素: {z.el}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

/* ==================== CTA ==================== */
function CTASection() {
  return (
    <section id="cta" className="relative z-10 py-28"
      style={{
        background:'rgba(212,175,55,0.015)',
        borderTop:'1px solid rgba(212,175,55,0.04)',
      }}>
      <div className="max-w-[1200px] mx-auto px-6 text-center">
        <p className="text-xs tracking-[5px] mb-4" style={{ color:'#D4AF37' }}>JOIN US</p>
        <h2 className="text-4xl font-bold mb-4 font-serif-en" style={{ color:'#FFF8E7' }}>
          开始你的塔罗之旅
        </h2>
        <p className="text-sm mb-10 max-w-md mx-auto" style={{ color:'#8B7D9B' }}>
          微信内扫码打开星塔小程序，或直接搜索「星塔」<br/>
          每日一牌 · 占卜 · 牌库 · 星座 · 全部免费
        </p>

        <div className="flex flex-col items-center gap-6">
          {/* 小程序码 */}
          <div className="w-40 h-40 bg-white rounded-2xl p-3 shadow-lg">
            <div className="w-full h-full rounded-xl flex items-center justify-center text-xs"
              style={{ background:'#f0ebe0', color:'#999' }}>
              小程序码<br/>（替换）
            </div>
          </div>
          <p className="text-xs tracking-[2px]" style={{ color:'#5A4D6A' }}>
            微信扫描上方二维码 · 即刻进入星塔
          </p>
        </div>
      </div>
    </section>
  )
}

/* ==================== Footer ==================== */
function FooterSection() {
  return (
    <footer className="relative z-10 py-14 text-center"
      style={{ borderTop:'1px solid rgba(212,175,55,0.04)' }}>
      <div className="max-w-[1200px] mx-auto px-6">
        <p className="text-lg mb-3 font-serif-en tracking-[6px]" style={{ color:'#FFF8E7' }}>
          ✦ 星塔
        </p>
        <p className="text-sm mb-5" style={{ color:'#7A6D8A' }}>
          塔罗是一面镜子，真正的答案在你心中
        </p>
        <div className="max-w-lg mx-auto p-3 rounded-lg text-xs leading-relaxed"
          style={{ background:'rgba(212,175,55,0.02)', color:'#5A4D6A' }}>
          <strong>免责声明：</strong>所有占卜结果及内容仅供娱乐参考，不构成任何决策建议。
          塔罗牌是一种自我探索的工具，帮助用户进行自我觉察与思考。
        </div>
        <p className="text-xs mt-5" style={{ color:'#3D304D' }}>
          © 2026 星塔 · 内容仅供娱乐参考
        </p>
      </div>
    </footer>
  )
}
