import Head from 'next/head'
import { useState, useEffect, useRef, useCallback } from 'react'

// ==============================
// 1. 公有领域维特塔罗牌面 (Wikimedia Commons)
// ==============================
const CARDS = {
  star: 'https://upload.wikimedia.org/wikipedia/commons/d/db/RWS_Tarot_17_Star.jpg',
  fool: 'https://upload.wikimedia.org/wikipedia/commons/9/90/RWS_Tarot_00_Fool.jpg',
  magician: 'https://upload.wikimedia.org/wikipedia/commons/d/de/RWS_Tarot_01_Magician.jpg',
  priestess: 'https://upload.wikimedia.org/wikipedia/commons/8/88/RWS_Tarot_02_High_Priestess.jpg',
  empress: 'https://upload.wikimedia.org/wikipedia/commons/d/d2/RWS_Tarot_03_Empress.jpg',
  emperor: 'https://upload.wikimedia.org/wikipedia/commons/c/c3/RWS_Tarot_04_Emperor.jpg',
  hierophant: 'https://upload.wikimedia.org/wikipedia/commons/8/83/RWS_Tarot_05_Hierophant.jpg',
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
// 小阿卡纳示例
const SUIT_EXAMPLES = {
  wands: 'https://upload.wikimedia.org/wikipedia/commons/4/4e/RWS_Tarot_01_Wands.jpg',
  cups: 'https://upload.wikimedia.org/wikipedia/commons/4/4a/RWS_Tarot_01_Cups.jpg',
  swords: 'https://upload.wikimedia.org/wikipedia/commons/2/28/RWS_Tarot_01_Swords.jpg',
  pentacles: 'https://upload.wikimedia.org/wikipedia/commons/f/f5/RWS_Tarot_01_Pentacles.jpg',
}

// 3D轮播用卡牌（5张经典大阿卡纳）
const heroCards = [
  { src: CARDS.fool, name:'愚人', num:'0', en:'The Fool', mean:'新的开始 · 冒险 · 纯真',
    desc:'站在悬崖边，手握白玫瑰，象征迈出未知的一步。行囊代表过往经验，小狗代表提醒与直觉。' },
  { src: CARDS.magician, name:'魔术师', num:'I', en:'The Magician', mean:'创造力 · 自信 · 技能',
    desc:'桌面上摆着四元素的象征物，代表掌握所有资源。头顶的无限符号∞代表无限潜力。' },
  { src: CARDS.priestess, name:'女祭司', num:'II', en:'The High Priestess', mean:'直觉 · 智慧 · 神秘',
    desc:'手持卷轴象征隐藏的知识，身后石榴与棕榈代表丰饶。静下来倾听内心，答案已在心中。' },
  { src: CARDS.star, name:'星星', num:'XVII', en:'The Star', mean:'希望 · 灵感 · 治愈',
    desc:'女子跪在河边，将水倒入池塘和地面。七颗小星和一颗大星代表各层次的能量与希望。' },
  { src: CARDS.world, name:'世界', num:'XXI', en:'The World', mean:'完成 · 圆满 · 整合',
    desc:'舞者在花环中象征完整的循环。四角动物代表四固定星座和四元素。阶段圆满结束。' },
]

// 画廊展示（12张）
const galleryCards = [
  { id:'fool', src:CARDS.fool, name:'愚人', num:'0', upright:'新的开始、冒险、信任、纯真', reversed:'鲁莽、轻率' },
  { id:'magician', src:CARDS.magician, name:'魔术师', num:'I', upright:'创造力、自信、技能、资源', reversed:'操纵、才能浪费' },
  { id:'priestess', src:CARDS.priestess, name:'女祭司', num:'II', upright:'直觉、内在智慧、神秘', reversed:'秘密、表面现象' },
  { id:'empress', src:CARDS.empress, name:'女皇', num:'III', upright:'丰饶、母性、自然、舒适', reversed:'依赖、创造受阻' },
  { id:'emperor', src:CARDS.emperor, name:'皇帝', num:'IV', upright:'权威、结构、稳定', reversed:'专制、僵化' },
  { id:'lovers', src:CARDS.lovers, name:'恋人', num:'VI', upright:'爱情、选择、和谐', reversed:'不合、失衡' },
  { id:'chariot', src:CARDS.chariot, name:'战车', num:'VII', upright:'胜利、意志力、决心', reversed:'方向不明、失控' },
  { id:'strength', src:CARDS.strength, name:'力量', num:'VIII', upright:'勇气、内在力量、慈悲', reversed:'自我怀疑' },
  { id:'death', src:CARDS.death, name:'死神', num:'XIII', upright:'结束、转变、放下、新生', reversed:'抗拒、恐惧' },
  { id:'tower', src:CARDS.tower, name:'高塔', num:'XVI', upright:'剧变、崩塌、觉醒', reversed:'抵抗改变' },
  { id:'moon', src:CARDS.moon, name:'月亮', num:'XVIII', upright:'直觉、恐惧、潜意识', reversed:'看清真相' },
  { id:'sun', src:CARDS.sun, name:'太阳', num:'XIX', upright:'喜悦、成功、活力、成就', reversed:'暂时低落' },
]

// 十二星座
const ZODIACS = [
  { sym:'♈', name:'白羊座', en:'Aries', date:'3.21-4.19', el:'火', color:'#E74C3C', planet:'火星', desc:'充满勇气与行动力的开拓者，热情直率，天生领导者。' },
  { sym:'♉', name:'金牛座', en:'Taurus', date:'4.20-5.20', el:'土', color:'#27AE60', planet:'金星', desc:'踏实稳重，追求物质与感官的享受，忠诚而坚韧。' },
  { sym:'♊', name:'双子座', en:'Gemini', date:'5.21-6.21', el:'风', color:'#F39C12', planet:'水星', desc:'聪明机智，善于沟通交际，好奇心旺盛的多面手。' },
  { sym:'♋', name:'巨蟹座', en:'Cancer', date:'6.22-7.22', el:'水', color:'#3498DB', planet:'月亮', desc:'温柔敏感，重视家庭与情感，具有强大的直觉力。' },
  { sym:'♌', name:'狮子座', en:'Leo', date:'7.23-8.22', el:'火', color:'#E67E22', planet:'太阳', desc:'自信阳光，天生的舞台者，慷慨热情富有魅力。' },
  { sym:'♍', name:'处女座', en:'Virgo', date:'8.23-9.22', el:'土', color:'#1ABC9C', planet:'水星', desc:'细致完美主义，理性务实，追求精益求精。' },
  { sym:'♎', name:'天秤座', en:'Libra', date:'9.23-10.23', el:'风', color:'#9B59B6', planet:'金星', desc:'追求平衡与和谐，优雅社交，具有审美天赋。' },
  { sym:'♏', name:'天蝎座', en:'Scorpio', date:'10.24-11.22', el:'水', color:'#E74C3C', planet:'冥王星', desc:'深沉敏锐，意志力极强，神秘而充满洞察力。' },
  { sym:'♐', name:'射手座', en:'Sagittarius', date:'11.23-12.21', el:'火', color:'#2E86C1', planet:'木星', desc:'热爱自由与冒险，乐观开朗，追求真理与智慧。' },
  { sym:'♑', name:'摩羯座', en:'Capricorn', date:'12.22-1.19', el:'土', color:'#7F8C8D', planet:'土星', desc:'坚韧务实，有强烈的责任感和事业心，稳扎稳打。' },
  { sym:'♒', name:'水瓶座', en:'Aquarius', date:'1.20-2.18', el:'风', color:'#00CEC9', planet:'天王星', desc:'独立创新，思想前卫，人道主义精神强烈。' },
  { sym:'♓', name:'双鱼座', en:'Pisces', date:'2.19-3.20', el:'水', color:'#A29BFE', planet:'海王星', desc:'富有想象力和同情心，艺术天赋高，感性浪漫。' },
]

/* ================================================================
   页面主组件
   ================================================================ */
export default function Home() {
  return (
    <>
      <Head>
        <title>星塔 · 塔罗牌占卜与星座运势</title>
        <meta name="description" content="基于维特塔罗经典体系，78张牌完整收录。每日一牌、塔罗占卜、星座运势。" />
      </Head>

      <GlobalStyles />
      <CosmicBackground />

      <div className="content">
        <NavBar />
        <HeroSection />
        <TarotIntro />
        <GallerySection />
        <FeaturesSection />
        <ZodiacCards />
        <ZodiacIntro />
        <FooterSection />
      </div>
    </>
  )
}

/* ================================================================
   全局样式
   ================================================================ */
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
      .f-serif { font-family: 'Cormorant Garamond', Georgia, serif; }

      ::-webkit-scrollbar { width:5px; }
      ::-webkit-scrollbar-track { background:#07060a; }
      ::-webkit-scrollbar-thumb { background:rgba(212,175,55,0.2); border-radius:3px; }

      /* 卡牌翻转 */
      .flip-card { perspective:1200px; }
      .flip-inner {
        position:relative; width:100%; height:100%;
        transition: transform 0.7s cubic-bezier(0.4,0,0.2,1);
        transform-style: preserve-3d;
      }
      .flip-inner.flipped { transform: rotateY(180deg); }
      .flip-front, .flip-back {
        position:absolute; inset:0;
        backface-visibility: hidden;
        border-radius:12px;
        overflow:hidden;
      }
      .flip-back {
        transform: rotateY(180deg);
        background: linear-gradient(145deg, #1a0f2a, #0f0818);
        border:1px solid rgba(212,175,55,0.12);
        display:flex; flex-direction:column; justify-content:center;
        padding:12px;
      }

      @media (max-width:768px) {
        .flip-back { padding:8px; }
        .flip-back p { font-size:10px !important; }
      }
    `}</style>
  )
}

/* ================================================================
   宇宙背景
   ================================================================ */
function CosmicBackground() {
  return (
    <>
      <div className="fixed inset-0 z-0 pointer-events-none"
        style={{
          background: `
            radial-gradient(ellipse 100% 60% at 20% 0%, #2a1040 0%, transparent 55%),
            radial-gradient(ellipse 80% 50% at 80% 10%, #1a0533 0%, transparent 45%),
            radial-gradient(ellipse 70% 60% at 50% 90%, #0f0818 0%, transparent 50%),
            #07060a
          `
        }}/>
      <div className="fixed inset-0 z-[1] pointer-events-none overflow-hidden">
        <StarCanvas />
        <NebulaOverlay />
      </div>
    </>
  )
}

function StarCanvas() {
  return (
    <canvas
      ref={el => {
        if (!el || el._inited) return
        el._inited = true
        const ctx = el.getContext('2d')
        let w, h, stars = [], meteors = []
        const STAR_COUNT = 180
        const METEOR_INTERVAL = 200

        function resize() {
          w = el.width = window.innerWidth
          h = el.height = window.innerHeight
        }
        resize()
        window.addEventListener('resize', resize)

        // 星空
        for (let i = 0; i < STAR_COUNT; i++) {
          const isBright = Math.random() > 0.85
          stars.push({
            x: Math.random() * w, y: Math.random() * h,
            r: isBright ? Math.random() * 2.5 + 1.5 : Math.random() * 1.5 + 0.3,
            a: isBright ? Math.random() * 0.9 + 0.5 : Math.random() * 0.6 + 0.1,
            speed: Math.random() * 0.3 + 0.08,
            phase: Math.random() * Math.PI * 2,
            bright: isBright,
            hue: isBright ? (Math.random() > 0.5 ? 40 + Math.random() * 20 : 0) : 0,
          })
        }

        let frame = 0
        function draw() {
          ctx.clearRect(0, 0, w, h)
          const t = Date.now() / 1000
          frame++

          // 普通星星
          stars.forEach(s => {
            const pulse = 0.5 + 0.5 * Math.sin(t * s.speed + s.phase)
            const alpha = s.a * (s.bright ? 0.6 + 0.4 * pulse : 0.6 + 0.4 * pulse)
            ctx.beginPath()
            ctx.arc(s.x, s.y, s.r * (s.bright ? 0.8 + 0.2 * pulse : 1), 0, Math.PI * 2)
            if (s.hue) {
              ctx.fillStyle = `hsla(${s.hue}, 80%, 80%, ${alpha})`
            } else {
              ctx.fillStyle = `rgba(255, 255, 255, ${alpha})`
            }
            ctx.fill()
            // 亮星加光晕
            if (s.bright && pulse > 0.7) {
              ctx.beginPath()
              ctx.arc(s.x, s.y, s.r * 3, 0, Math.PI * 2)
              ctx.fillStyle = s.hue
                ? `hsla(${s.hue}, 80%, 80%, ${alpha * 0.08})`
                : `rgba(255, 255, 255, ${alpha * 0.06})`
              ctx.fill()
            }
          })

          // 流星
          if (frame % METEOR_INTERVAL === 0 && Math.random() > 0.4) {
            meteors.push({
              x: Math.random() * w * 0.6,
              y: Math.random() * h * 0.2,
              len: Math.random() * 120 + 60,
              speed: Math.random() * 15 + 12,
              life: 1,
            })
          }
          for (let i = meteors.length - 1; i >= 0; i--) {
            const m = meteors[i]
            m.x += m.speed * 1.2
            m.y += m.speed * 0.3
            m.life -= 0.025
            if (m.life <= 0) { meteors.splice(i,1); continue }
            const tail = m.life * m.len
            ctx.beginPath()
            ctx.moveTo(m.x, m.y)
            ctx.lineTo(m.x - tail, m.y - tail * 0.3)
            const grad = ctx.createLinearGradient(m.x, m.y, m.x - tail, m.y - tail * 0.3)
            grad.addColorStop(0, `rgba(255, 240, 210, ${m.life * 0.7})`)
            grad.addColorStop(1, 'rgba(255, 240, 210, 0)')
            ctx.strokeStyle = grad
            ctx.lineWidth = 2
            ctx.stroke()
          }

          requestAnimationFrame(draw)
        }
        draw()
      }}
      className="absolute inset-0 w-full h-full"
    />
  )
}

function NebulaOverlay() {
  return (
    <>
      <div className="absolute top-[15%] left-[10%] w-[400px] h-[400px] rounded-full opacity-[0.03] pointer-events-none"
        style={{ background:'radial-gradient(circle, #D4AF37 0%, transparent 60%)' }}/>
      <div className="absolute top-[40%] right-[5%] w-[500px] h-[500px] rounded-full opacity-[0.02] pointer-events-none"
        style={{ background:'radial-gradient(circle, #8B5CF6 0%, transparent 60%)' }}/>
      <div className="absolute bottom-[20%] left-[30%] w-[350px] h-[350px] rounded-full opacity-[0.02] pointer-events-none"
        style={{ background:'radial-gradient(circle, #60A5FA 0%, transparent 60%)' }}/>
    </>
  )
}

/* ================================================================
   导航栏
   ================================================================ */
function NavBar() {
  const [scrolled, setScrolled] = useState(false)
  useEffect(() => {
    function onScroll() { setScrolled(window.scrollY > 60) }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
      scrolled
        ? 'py-3 bg-[rgba(7,6,10,0.88)] backdrop-blur-[24px] border-b border-[rgba(212,175,55,0.05)]'
        : 'py-5 bg-transparent'
    }`}>
      <div className="max-w-[1200px] mx-auto px-6 flex items-center justify-between">
        <a href="#" className="text-xl font-bold no-underline tracking-[5px] f-serif"
           style={{ color:'#FFF8E7' }}>
          ✦ 星<span style={{ color:'#D4AF37' }}>塔</span>
        </a>
        <div className="hidden md:flex gap-10">
          {[['塔罗','#tarot'],['牌库','#gallery'],['功能','#features'],['星座','#zodiac']].map(([t,h]) => (
            <a key={t} href={h}
              className="text-sm no-underline tracking-[2px] transition-all duration-300 hover:text-[#D4AF37]"
              style={{ color:'#8B7D9B' }}>
              {t}
            </a>
          ))}
        </div>
        <a href="#cta"
          className="py-2.5 px-6 rounded-lg text-sm font-medium no-underline tracking-[2px] transition-all duration-300 hover:shadow-[0_0_30px_rgba(212,175,55,0.25)]"
          style={{
            background: 'linear-gradient(135deg, #8B6914, #D4AF37)',
            color: '#07060a',
          }}>
          进入星塔
        </a>
      </div>
    </nav>
  )
}

/* ================================================================
   HERO · 3D立体旋转卡牌
   ================================================================ */
function HeroSection() {
  const [angle, setAngle] = useState(0)
  const [paused, setPaused] = useState(false)
  const animRef = useRef(null)
  const lastTime = useRef(0)
  const containerRef = useRef(null)
  const [selectedIdx, setSelectedIdx] = useState(0)

  const animate = useCallback((time) => {
    if (!lastTime.current) lastTime.current = time
    const delta = time - lastTime.current
    lastTime.current = time
    if (!paused) {
      setAngle(prev => (prev + delta * 0.015) % 360)
    }
    animRef.current = requestAnimationFrame(animate)
  }, [paused])

  useEffect(() => {
    animRef.current = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(animRef.current)
  }, [animate])

  const radius = 360
  const cards = heroCards
  const step = 360 / cards.length

  // 当前面向用户的卡牌索引
  useEffect(() => {
    const normalized = ((angle % 360) + 360) % 360
    const idx = Math.round(normalized / step) % cards.length
    setSelectedIdx(idx)
  }, [angle, step, cards.length])

  return (
    <section className="relative z-10 min-h-screen flex items-center pt-24 pb-16 overflow-hidden">
      <div className="max-w-[1200px] mx-auto px-6 w-full">
        <div className="flex items-center gap-12 max-lg:flex-col max-lg:text-center">

          {/* 左侧文字 */}
          <div className="flex-1 max-lg:order-2">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm tracking-[3px] mb-6"
              style={{
                background:'rgba(212,175,55,0.06)',
                border:'1px solid rgba(212,175,55,0.1)',
                color:'#D4AF37',
                fontSize:12,
              }}>
              ✦ 基于维特塔罗体系 · 1909
            </div>
            <h1 className="text-5xl max-md:text-3xl font-bold leading-tight mb-5 f-serif"
                style={{ color:'#FFF8E7' }}>
              塔罗是心灵的镜<br />
              照见你 <span style={{ color:'#D4AF37', fontStyle:'italic' }}>真实的内在</span>
            </h1>
            <p className="text-base leading-relaxed max-w-[500px] max-lg:mx-auto mb-8"
               style={{ color:'#A99BB8' }}>
              78张牌完整收录，12种经典牌阵。不迷信、不宿命。
              每一次抽牌都是一次与自己的深度对话。
            </p>
            <div className="flex gap-10 mb-10 max-lg:justify-center flex-wrap">
              {[['78','张完整牌库'],['22','张大阿卡纳'],['56','张小阿卡纳']].map(([n,l]) => (
                <div key={l}>
                  <div className="text-3xl font-bold f-serif" style={{ color:'#D4AF37' }}>{n}</div>
                  <div className="text-sm mt-1" style={{ color:'#7A6D8A' }}>{l}</div>
                </div>
              ))}
            </div>
            <div className="flex gap-4 flex-wrap max-lg:justify-center">
              <a href="#cta"
                className="inline-block py-4 px-10 rounded-xl text-base font-medium no-underline tracking-[3px] transition-all duration-300 hover:-translate-y-1"
                style={{
                  background:'linear-gradient(135deg, #8B6914, #D4AF37)',
                  color:'#07060a',
                  boxShadow:'0 8px 30px rgba(212,175,55,0.15)',
                }}>
                进入星塔
              </a>
              <a href="#tarot"
                className="inline-block py-4 px-10 rounded-xl text-base no-underline tracking-[2px] transition-all duration-300"
                style={{ border:'1px solid rgba(212,175,55,0.15)', color:'#D4AF37' }}>
                了解塔罗
              </a>
            </div>
          </div>

          {/* 右侧3D旋转卡牌 */}
          <div className="flex-[0_0_360px] max-lg:order-1 max-lg:flex-[0_0_220px]"
               ref={containerRef}
               onMouseEnter={() => setPaused(true)}
               onMouseLeave={() => setPaused(false)}>
            <div className="relative select-none"
                 style={{
                   width:'100%', height: 400,
                   perspective: 1000,
                 }}>
              {/* 3D车架 */}
              <div className="absolute inset-0 flex items-center justify-center"
                   style={{
                     transformStyle: 'preserve-3d',
                     transform: `rotateY(${angle}deg)`,
                     transition: paused ? 'none' : 'none',
                   }}>
                {cards.map((card, i) => {
                  const cardAngle = i * step
                  return (
                    <div key={card.num}
                      className="absolute"
                      style={{
                        width: 180,
                        height: 252,
                        transform: `rotateY(${cardAngle}deg) translateZ(${radius}px)`,
                        backfaceVisibility: 'visible',
                        transformStyle: 'preserve-3d',
                        transition: paused ? 'all 0.3s' : 'none',
                      }}>
                      {/* 卡牌本体 */}
                      <div className="w-full h-full rounded-xl overflow-hidden cursor-pointer"
                        style={{
                          border: '1px solid rgba(212,175,55,0.15)',
                          boxShadow: '0 8px 30px rgba(0,0,0,0.4)',
                          transform: 'rotateY(0deg)',
                        }}
                        onClick={() => {
                          const el = document.querySelector('#gallery')
                          if (el) el.scrollIntoView({ behavior: 'smooth' })
                        }}>
                        <img src={card.src} alt={card.name}
                          style={{ width:'100%', height:'100%', objectFit:'cover', display:'block' }}/>
                      </div>
                    </div>
                  )
                })}
              </div>

              {/* 当前卡牌信息 */}
              <div className="absolute left-1/2 -translate-x-1/2 text-center transition-all duration-500"
                   style={{ bottom: 20, opacity: paused ? 1 : 0.7 }}>
                <p className="text-xs tracking-[3px]" style={{ color:'#D4AF37' }}>
                  {heroCards[selectedIdx].num} · {heroCards[selectedIdx].en}
                </p>
                <p className="text-lg f-serif font-bold mt-0.5" style={{ color:'#FFF8E7' }}>
                  {heroCards[selectedIdx].name}
                </p>
                <p className="text-xs mt-0.5" style={{ color:'#7A6D8A' }}>
                  {heroCards[selectedIdx].mean}
                </p>
              </div>
            </div>

            <p className="text-center text-[10px] tracking-[3px] mt-2" style={{ color:'#5A4D6A' }}>
              {paused ? '✦ 悬停中 · 继续旋转以浏览 ✦' : '鼠标悬停查看详情'}
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ================================================================
   塔罗介绍 | 起源 + 构成
   ================================================================ */
function TarotIntro() {
  const suits = [
    { name:'圣杯', en:'Cups', icon:'🏆', el:'水 · 情感与关系', src:SUIT_EXAMPLES.cups },
    { name:'权杖', en:'Wands', icon:'🔥', el:'火 · 行动与创造', src:SUIT_EXAMPLES.wands },
    { name:'宝剑', en:'Swords', icon:'⚔️', el:'风 · 思想与挑战', src:SUIT_EXAMPLES.swords },
    { name:'星币', en:'Pentacles', icon:'💰', el:'土 · 物质与工作', src:SUIT_EXAMPLES.pentacles },
  ]

  return (
    <section id="tarot" className="relative z-10 py-24"
      style={{
        background:'rgba(212,175,55,0.012)',
        borderTop:'1px solid rgba(212,175,55,0.03)',
        borderBottom:'1px solid rgba(212,175,55,0.03)',
      }}>
      <div className="max-w-[1100px] mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-16">
          {/* 左：介绍文字 */}
          <div>
            <p className="text-xs tracking-[5px] mb-3" style={{ color:'#D4AF37' }}>ABOUT TAROT</p>
            <h2 className="text-3xl font-bold mb-4 f-serif" style={{ color:'#FFF8E7' }}>
              什么是塔罗？
            </h2>
            <div className="space-y-4 text-sm leading-relaxed" style={{ color:'#A99BB8' }}>
              <p>
                塔罗牌起源于15世纪的欧洲，最初是贵族玩的纸牌游戏。到了18世纪，它被赋予了神秘学的内涵，
                成为了一种自我探索与心灵指引的工具。
              </p>
              <p>
                塔罗牌不是"算命"，也不是宿命的判决。它的价值在于——当你凝视牌面的图案，
                那些古老的象征符号会触发你的潜意识，让你看清自己内心真实的渴望与恐惧。
                每一张牌都是一面镜子。
              </p>
            </div>
          </div>

          {/* 右：构成数据 */}
          <div>
            <p className="text-xs tracking-[5px] mb-4" style={{ color:'#D4AF37' }}>DECK STRUCTURE</p>
            <div className="flex gap-6 mb-6">
              <div className="flex-1 p-5 rounded-xl text-center"
                style={{ background:'rgba(212,175,55,0.03)', border:'1px solid rgba(212,175,55,0.06)' }}>
                <div className="text-3xl font-bold f-serif mb-1" style={{ color:'#D4AF37' }}>22</div>
                <div className="text-xs" style={{ color:'#7A6D8A' }}>大阿卡纳<br/>Major Arcana</div>
              </div>
              <div className="flex-1 p-5 rounded-xl text-center"
                style={{ background:'rgba(212,175,55,0.03)', border:'1px solid rgba(212,175,55,0.06)' }}>
                <div className="text-3xl font-bold f-serif mb-1" style={{ color:'#D4AF37' }}>56</div>
                <div className="text-xs" style={{ color:'#7A6D8A' }}>小阿卡纳<br/>Minor Arcana</div>
              </div>
              <div className="flex-1 p-5 rounded-xl text-center"
                style={{ background:'rgba(212,175,55,0.03)', border:'1px solid rgba(212,175,55,0.06)' }}>
                <div className="text-3xl font-bold f-serif mb-1" style={{ color:'#D4AF37' }}>78</div>
                <div className="text-xs" style={{ color:'#7A6D8A' }}>总计<br/>Total</div>
              </div>
            </div>

            <p className="text-xs mb-3 tracking-[2px]" style={{ color:'#D4AF37' }}>
              小阿卡纳 · 四牌组
            </p>
            <div className="grid grid-cols-4 gap-3">
              {suits.map(s => (
                <div key={s.name} className="text-center p-3 rounded-lg transition-all duration-300 hover:-translate-y-1"
                  style={{ background:'rgba(212,175,55,0.02)', border:'1px solid rgba(255,255,255,0.03)' }}>
                  <div className="mb-1" style={{ height:60, borderRadius:6, overflow:'hidden', border:'1px solid rgba(212,175,55,0.08)' }}>
                    <img src={s.src} alt={s.name}
                      style={{ width:'100%', height:'100%', objectFit:'cover' }}/>
                  </div>
                  <p className="text-xs font-bold mt-1" style={{ color:'#FFF8E7' }}>{s.name}</p>
                  <p className="text-[9px]" style={{ color:'#5A4D6A' }}>{s.en}</p>
                  <p className="text-[9px] mt-0.5" style={{ color:'#D4AF37' }}>{s.el}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ================================================================
   卡牌画廊 · 点击翻转
   ================================================================ */
function GallerySection() {
  const [flipped, setFlipped] = useState({})
  const toggleFlip = (id) => setFlipped(prev => ({ ...prev, [id]: !prev[id] }))

  return (
    <section id="gallery" className="relative z-10 py-24">
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="text-center mb-14">
          <p className="text-xs tracking-[5px] mb-3" style={{ color:'#D4AF37' }}>MAJOR ARCANA</p>
          <h2 className="text-3xl font-bold mb-3 f-serif" style={{ color:'#FFF8E7' }}>
            大阿卡纳 · 22 张
          </h2>
          <p className="text-sm" style={{ color:'#8B7D9B' }}>
            点击牌面翻转 · 查看正逆位含义
          </p>
        </div>

        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-5 max-w-[1100px] mx-auto">
          {galleryCards.map(card => (
            <div key={card.id}
              className="flip-card cursor-pointer"
              onClick={() => toggleFlip(card.id)}
              style={{ aspectRatio:'5/7' }}>
              <div className={`flip-inner ${flipped[card.id] ? 'flipped' : ''}`}>
                {/* 正面：完整牌面 */}
                <div className="flip-front"
                  style={{ border:'1px solid rgba(212,175,55,0.12)', boxShadow:'0 4px 16px rgba(0,0,0,0.3)' }}>
                  <img src={card.src} alt={card.name}
                    style={{ width:'100%', height:'100%', objectFit:'contain', display:'block' }}/>
                </div>
                {/* 背面：解读 */}
                <div className="flip-back">
                  <p className="text-center f-serif text-lg font-bold" style={{ color:'#D4AF37' }}>{card.num}</p>
                  <p className="text-center f-serif text-sm mb-2" style={{ color:'#FFF8E7' }}>{card.name}</p>
                  <div className="w-5 h-px mx-auto mb-2" style={{ background:'rgba(212,175,55,0.3)' }}/>
                  <div className="text-xs leading-relaxed px-1" style={{ color:'#B8A9C9' }}>
                    <span style={{ color:'#D4AF37' }}>正位</span><br/>{card.upright}
                  </div>
                  <div className="text-xs leading-relaxed mt-1 px-1" style={{ color:'#B8A9C9' }}>
                    <span style={{ color:'#8B6B5B' }}>逆位</span><br/>{card.reversed}
                  </div>
                  <p className="text-[9px] text-center mt-auto pt-1 tracking-[2px]" style={{ color:'#5A4D6A' }}>点击翻回</p>
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

/* ================================================================
   功能介绍
   ================================================================ */
function FeaturesSection() {
  const suits = [
    { name:'圣杯', en:'Cups', src:SUIT_EXAMPLES.cups },
    { name:'权杖', en:'Wands', src:SUIT_EXAMPLES.wands },
    { name:'宝剑', en:'Swords', src:SUIT_EXAMPLES.swords },
    { name:'星币', en:'Pentacles', src:SUIT_EXAMPLES.pentacles },
  ]
  return (
    <section id="features" className="relative z-10 py-24"
      style={{
        background:'rgba(212,175,55,0.012)',
        borderTop:'1px solid rgba(212,175,55,0.03)',
        borderBottom:'1px solid rgba(212,175,55,0.03)',
      }}>
      <div className="max-w-[1100px] mx-auto px-6">
        <div className="text-center mb-14">
          <p className="text-xs tracking-[5px] mb-3" style={{ color:'#D4AF37' }}>FEATURES</p>
          <h2 className="text-3xl font-bold mb-3 f-serif" style={{ color:'#FFF8E7' }}>核心功能</h2>
          <p className="text-sm" style={{ color:'#8B7D9B' }}>每个功能都用心做到位</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* 每日一牌 */}
          <div className="p-6 rounded-2xl transition-all duration-300 hover:-translate-y-0.5"
            style={{ background:'rgba(212,175,55,0.02)', border:'1px solid rgba(212,175,55,0.04)' }}>
            <p className="text-xs tracking-[4px] mb-1" style={{ color:'#D4AF37' }}>DAILY DRAW</p>
            <h3 className="text-lg font-bold mb-3 f-serif" style={{ color:'#FFF8E7' }}>每日一牌</h3>
            <div className="flex gap-4 items-start">
              <div className="w-[90px] shrink-0 rounded-lg overflow-hidden"
                style={{ border:'1px solid rgba(212,175,55,0.1)' }}>
                <img src={CARDS.fool} alt="每日一牌"
                  style={{ width:'100%', aspectRatio:'5/7', objectFit:'cover' }}/>
              </div>
              <div>
                <p className="text-sm f-serif font-bold" style={{ color:'#F1F0FB' }}>今日抽牌 · 愚人</p>
                <p className="text-xs mt-1" style={{ color:'#D4AF37' }}>正位 · 新的开始</p>
                <p className="text-xs mt-2 leading-relaxed" style={{ color:'#A99BB8', lineHeight:1.7 }}>
                  每天一张今日指引牌，翻牌动画、正逆位深度解读、生活建议。
                  每天30秒，养成与自己对话的习惯。
                </p>
              </div>
            </div>
          </div>

          {/* 多牌阵 */}
          <div className="p-6 rounded-2xl transition-all duration-300 hover:-translate-y-0.5"
            style={{ background:'rgba(212,175,55,0.02)', border:'1px solid rgba(212,175,55,0.04)' }}>
            <p className="text-xs tracking-[4px] mb-1" style={{ color:'#D4AF37' }}>SPREADS</p>
            <h3 className="text-lg font-bold mb-3 f-serif" style={{ color:'#FFF8E7' }}>多牌阵占卜</h3>
            <div className="flex items-end justify-center gap-2">
              {[
                { src:CARDS.fool, label:'过去' },
                { src:CARDS.magician, label:'现在' },
                { src:CARDS.world, label:'未来' },
              ].map((item,i) => (
                <div key={i} className="flex flex-col items-center gap-1">
                  <div className="rounded-lg overflow-hidden"
                    style={{
                      width: i===1 ? 80 : 65,
                      aspectRatio:'5/7',
                      border:'1px solid rgba(212,175,55,0.1)',
                      transform: i===1 ? 'translateY(-4px)' : 'none',
                    }}>
                    <img src={item.src} alt={item.label}
                      style={{ width:'100%', height:'100%', objectFit:'cover' }}/>
                  </div>
                  <span className="text-[10px] tracking-[2px]" style={{ color:'#5A4D6A' }}>{item.label}</span>
                </div>
              ))}
            </div>
            <p className="text-xs text-center mt-3" style={{ color:'#7A6D8A' }}>
              三牌阵 · 凯尔特十字 · 感情 · 事业 · 财运 · 学业
            </p>
          </div>

          {/* 78张牌库 */}
          <div className="p-6 rounded-2xl transition-all duration-300 hover:-translate-y-0.5"
            style={{ background:'rgba(212,175,55,0.02)', border:'1px solid rgba(212,175,55,0.04)' }}>
            <p className="text-xs tracking-[4px] mb-1" style={{ color:'#D4AF37' }}>LIBRARY</p>
            <h3 className="text-lg font-bold mb-3 f-serif" style={{ color:'#FFF8E7' }}>78张牌完整牌库</h3>
            <p className="text-sm mb-3 leading-relaxed" style={{ color:'#A99BB8' }}>
              大阿卡纳 + 小阿卡纳四牌组，每张牌都有正/逆位含义、
              牌面象征解读、关键词标签。支持搜索和收藏。
            </p>
            <div className="flex gap-2">
              {[CARDS.priestess, CARDS.justice, CARDS.tower, CARDS.sun, CARDS.world].map((src,i) => (
                <div key={i} className="flex-1 rounded overflow-hidden"
                  style={{ border:'1px solid rgba(212,175,55,0.06)' }}>
                  <img src={src} alt="" style={{ width:'100%', aspectRatio:'5/7', objectFit:'cover' }}/>
                </div>
              ))}
            </div>
          </div>

          {/* 星座运势 */}
          <div className="p-6 rounded-2xl transition-all duration-300 hover:-translate-y-0.5"
            style={{ background:'rgba(212,175,55,0.02)', border:'1px solid rgba(212,175,55,0.04)' }}>
            <p className="text-xs tracking-[4px] mb-1" style={{ color:'#D4AF37' }}>ZODIAC</p>
            <h3 className="text-lg font-bold mb-3 f-serif" style={{ color:'#FFF8E7' }}>星座运势</h3>
            <p className="text-sm mb-4 leading-relaxed" style={{ color:'#A99BB8' }}>
              每日/每周/每月运势、星座配对分析。每个星座结合塔罗牌解读，
              给你不一样的运势体验。
            </p>
            <div className="flex items-center justify-center gap-3 p-3 rounded-xl flex-wrap"
              style={{ background:'rgba(255,255,255,0.02)', border:'1px solid rgba(255,255,255,0.03)' }}>
              {ZODIACS.slice(0,12).map(z => (
                <span key={z.name} className="text-lg" style={{ color: `${z.color}55` }}>{z.sym}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ================================================================
   十二星座 · AI卡牌轮播（已生成3张，其余陆续补充）
   ================================================================ */
function ZodiacCards() {
  const scrollRef = useRef(null)
  const [paused, setPaused] = useState(false)
  const [activeIdx, setActiveIdx] = useState(null)

  useEffect(() => {
    if (paused) return
    const el = scrollRef.current
    if (!el) return
    const interval = setInterval(() => {
      el.scrollLeft += 1
      if (el.scrollLeft >= (el.scrollWidth - el.clientWidth)) {
        el.scrollLeft = 0
      }
    }, 25)
    return () => clearInterval(interval)
  }, [paused])

  // 3张已生成的AI图片
  const aiCards = {
    taurus: '/zodiac-taurus.jpg',
    aries: '/zodiac-aries.jpg',
    aquarius: '/zodiac-aquarius.jpg',
  }

  const allItems = [...ZODIACS, ...ZODIACS]

  return (
    <section id="zodiac" className="relative z-10 py-24 overflow-hidden">
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="text-center mb-14">
          <p className="text-xs tracking-[5px] mb-3" style={{ color:'#D4AF37' }}>ZODIAC</p>
          <h2 className="text-3xl font-bold mb-3 f-serif" style={{ color:'#FFF8E7' }}>
            十二星座
          </h2>
          <p className="text-sm" style={{ color:'#8B7D9B' }}>
            悬停查看详情 · 自动轮播
          </p>
        </div>
      </div>

      <div className="relative px-6 max-w-[1200px] mx-auto"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => { setPaused(false); setActiveIdx(null) }}>
        <div ref={scrollRef}
          className="overflow-x-auto"
          style={{ scrollbarWidth:'none', msOverflowStyle:'none', cursor:'grab' }}>
          <div className="inline-flex gap-5 py-4">
            {allItems.map((z, i) => {
              const signKey = z.en.toLowerCase()
              const hasImage = aiCards[signKey]
              return (
                <div key={i}
                  className="shrink-0 rounded-xl overflow-hidden transition-all duration-500 cursor-pointer relative"
                  style={{
                    width: 180,
                    aspectRatio: '5/7',
                    border: activeIdx === i
                      ? `2px solid ${z.color}`
                      : '1px solid rgba(255,255,255,0.06)',
                    transform: activeIdx === i ? 'translateY(-10px) scale(1.03)' : 'none',
                    boxShadow: activeIdx === i ? `0 16px 48px rgba(0,0,0,0.6)` : '0 4px 16px rgba(0,0,0,0.3)',
                  }}
                  onMouseEnter={() => setActiveIdx(i)}
                  onMouseLeave={() => setActiveIdx(null)}>

                  {hasImage ? (
                    <>
                      {/* AI生成的星座卡牌图片 */}
                      <img src={hasImage} alt={z.name}
                        style={{ width:'100%', height:'100%', objectFit:'cover', display:'block' }}/>
                      {/* 悬停遮罩 */}
                      <div className="absolute inset-0 transition-opacity duration-300"
                        style={{
                          background: 'linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.2) 40%, transparent 60%)',
                          opacity: activeIdx === i ? 1 : 0,
                        }}>
                        <div className="absolute bottom-0 left-0 right-0 p-4 text-center">
                          <p className="text-xs tracking-[3px]" style={{ color: z.color }}>{z.en.toUpperCase()}</p>
                          <p className="text-xs mt-1" style={{ color:'#B8A9C9' }}>{z.date}</p>
                          <p className="text-[10px] mt-0.5" style={{ color: z.color }}>{z.el} · {z.planet}</p>
                        </div>
                      </div>
                      {/* 卡牌底部名称条 */}
                      <div className="absolute bottom-0 left-0 right-0 p-3 text-center"
                        style={{
                          background: 'linear-gradient(to top, rgba(0,0,0,0.7), transparent)',
                          opacity: activeIdx === i ? 0 : 1,
                          transition: 'opacity 0.3s',
                        }}>
                        <p className="text-sm f-serif font-bold" style={{ color:'#FFF8E7' }}>{z.name}</p>
                        <p className="text-[10px] tracking-[2px]" style={{ color:'#7A6D8A' }}>{z.en}</p>
                      </div>
                    </>
                  ) : (
                    <>
                      {/* 占位卡牌——等待生成 */}
                      <div className="w-full h-full flex flex-col items-center justify-center p-5 text-center"
                        style={{
                          background: `linear-gradient(180deg, ${z.color}08 0%, ${z.color}03 50%, rgba(10,10,18,1) 100%)`,
                        }}>
                        <div className="text-5xl mb-2" style={{ color: `${z.color}66` }}>{z.sym}</div>
                        <p className="text-base f-serif font-bold" style={{ color:'#FFF8E7' }}>{z.name}</p>
                        <p className="text-[11px] tracking-[3px]" style={{ color:`${z.color}99` }}>{z.en}</p>
                        <div className="w-6 h-px my-2" style={{ background:`${z.color}44` }}/>

                        {/* 悬停详细信息 */}
                        <div className={`overflow-hidden transition-all duration-300 w-full ${
                          activeIdx === i ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'
                        }`}>
                          <p className="text-[10px]" style={{ color:'#8B7D9B' }}>{z.date}</p>
                          <p className="text-[10px] mt-0.5" style={{ color: z.color }}>{z.el} · {z.planet}</p>
                          <p className="text-[9px] mt-1 leading-relaxed px-1" style={{ color:'#7A6D8A' }}>{z.desc}</p>
                        </div>

                        {/* Coming Soon 标签 */}
                        <div className="mt-auto">
                          <span className="text-[8px] px-2 py-0.5 rounded-full tracking-[2px]"
                            style={{ background:'rgba(255,255,255,0.03)', border:'1px solid rgba(255,255,255,0.04)', color:'#5A4D6A' }}>
                            待生成
                          </span>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}

/* ================================================================
   星座介绍
   ================================================================ */
function ZodiacIntro() {
  const elements = [
    { name:'火象星座', signs:'白羊、狮子、射手', color:'#E74C3C', trait:'热情、行动力、冒险精神', emoji:'🔥' },
    { name:'土象星座', signs:'金牛、处女、摩羯', color:'#27AE60', trait:'务实、稳重、物质感', emoji:'🌍' },
    { name:'风象星座', signs:'双子、天秤、水瓶', color:'#F39C12', trait:'理性、沟通、社交', emoji:'💨' },
    { name:'水象星座', signs:'巨蟹、天蝎、双鱼', color:'#3498DB', trait:'感性、直觉、情感丰富', emoji:'🌊' },
  ]

  return (
    <section className="relative z-10 py-24"
      style={{
        background:'rgba(212,175,55,0.012)',
        borderTop:'1px solid rgba(212,175,55,0.03)',
      }}>
      <div className="max-w-[1100px] mx-auto px-6">
        <div className="text-center mb-14">
          <p className="text-xs tracking-[5px] mb-3" style={{ color:'#D4AF37' }}>ABOUT ZODIAC</p>
          <h2 className="text-3xl font-bold mb-3 f-serif" style={{ color:'#FFF8E7' }}>
            星座的由来
          </h2>
          <p className="text-sm max-w-2xl mx-auto leading-relaxed" style={{ color:'#A99BB8' }}>
            黄道十二宫（Zodiac）起源于古巴比伦时期，距今已有数千年的历史。
            古人将太阳在一年中经过的路径（黄道）分为十二段，每段对应一个星座。
            每个星座都有其独特的神话故事和象征意义，代表着不同的性格特质和能量倾向。
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          {elements.map(el => (
            <div key={el.name} className="p-5 rounded-xl text-center transition-all duration-300 hover:-translate-y-1"
              style={{ background:'rgba(255,255,255,0.015)', border:'1px solid rgba(255,255,255,0.03)' }}>
              <div className="text-2xl mb-2">{el.emoji}</div>
              <p className="text-sm font-bold f-serif" style={{ color:'#FFF8E7' }}>{el.name}</p>
              <p className="text-xs mt-1" style={{ color: el.color }}>{el.signs}</p>
              <p className="text-[11px] mt-2" style={{ color:'#8B7D9B' }}>{el.trait}</p>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div id="cta" className="text-center pt-8">
          <h3 className="text-2xl font-bold mb-3 f-serif" style={{ color:'#FFF8E7' }}>
            开始你的塔罗之旅
          </h3>
          <p className="text-sm mb-6" style={{ color:'#8B7D9B' }}>
            微信搜索「星塔」打开小程序 · 每日一牌 · 占卜 · 牌库 · 星座 · 全部免费
          </p>
          <a href="#"
            className="inline-block py-4 px-12 rounded-xl text-base font-medium no-underline tracking-[3px] transition-all duration-300 hover:-translate-y-1"
            style={{
              background: 'linear-gradient(135deg, #8B6914, #D4AF37)',
              color: '#07060a',
              boxShadow: '0 8px 30px rgba(212,175,55,0.15)',
            }}>
            进入星塔
          </a>
        </div>
      </div>
    </section>
  )
}

/* ================================================================
   Footer
   ================================================================ */
function FooterSection() {
  return (
    <footer className="relative z-10 py-12 text-center"
      style={{ borderTop:'1px solid rgba(212,175,55,0.03)' }}>
      <div className="max-w-[1100px] mx-auto px-6">
        <p className="text-lg mb-2 f-serif tracking-[6px]" style={{ color:'#FFF8E7' }}>
          ✦ 星塔
        </p>
        <p className="text-sm mb-4" style={{ color:'#7A6D8A' }}>
          塔罗是一面镜子，真正的答案在你心中
        </p>
        <div className="max-w-md mx-auto p-3 rounded-lg text-xs leading-relaxed"
          style={{ background:'rgba(212,175,55,0.015)', color:'#5A4D6A' }}>
          <strong>免责声明：</strong>所有占卜结果仅供娱乐参考，不构成决策建议。
          塔罗牌是自我探索的工具，帮助用户进行自我觉察与思考。
        </div>
        <p className="text-xs mt-5" style={{ color:'#3D304D' }}>
          © 2026 星塔
        </p>
      </div>
    </footer>
  )
}
