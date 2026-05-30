import Head from 'next/head'
import { useState, useEffect, useRef } from 'react'

/* ================================
   公有领域维特塔罗牌面
   ================================ */
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
  strength: 'https://upload.wikimedia.org/wikipedia/commons/f/f5/RWS_Tarot_08_Strength.jpg',
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
const SUIT_EXAMPLES = {
  wands: CARDS.chariot, cups: CARDS.moon,
  swords: CARDS.justice, pentacles: CARDS.star,
}

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

const ZODIACS = [
  { sym:'♈', name:'白羊座', en:'Aries', date:'3.21-4.19', el:'火', color:'#E84A3D', planet:'火星',
    desc:'充满勇气与行动力的开拓者', img:'/zodiac-aries.jpg' },
  { sym:'♉', name:'金牛座', en:'Taurus', date:'4.20-5.20', el:'土', color:'#5DBB63', planet:'金星',
    desc:'踏实稳重追求物质与感官', img:'/zodiac-taurus.jpg' },
  { sym:'♊', name:'双子座', en:'Gemini', date:'5.21-6.21', el:'风', color:'#F0C94D', planet:'水星',
    desc:'聪明机智善于沟通交际', img:null },
  { sym:'♋', name:'巨蟹座', en:'Cancer', date:'6.22-7.22', el:'水', color:'#B8C5D6', planet:'月亮',
    desc:'温柔敏感重视家庭情感', img:null },
  { sym:'♌', name:'狮子座', en:'Leo', date:'7.23-8.22', el:'火', color:'#F5A623', planet:'太阳',
    desc:'自信阳光天生的舞台者', img:null },
  { sym:'♍', name:'处女座', en:'Virgo', date:'8.23-9.22', el:'土', color:'#A079D6', planet:'水星',
    desc:'细致完美主义理性务实', img:null },
  { sym:'♎', name:'天秤座', en:'Libra', date:'9.23-10.23', el:'风', color:'#E8A0BF', planet:'金星',
    desc:'追求平衡与和谐优雅社交', img:null },
  { sym:'♏', name:'天蝎座', en:'Scorpio', date:'10.24-11.22', el:'水', color:'#CC3355', planet:'冥王星',
    desc:'深沉敏锐意志力极强', img:null },
  { sym:'♐', name:'射手座', en:'Sagittarius', date:'11.23-12.21', el:'火', color:'#4A90D9', planet:'木星',
    desc:'热爱自由与冒险乐观开朗', img:null },
  { sym:'♑', name:'摩羯座', en:'Capricorn', date:'12.22-1.19', el:'土', color:'#C49A6C', planet:'土星',
    desc:'坚韧务实有强烈责任感', img:null },
  { sym:'♒', name:'水瓶座', en:'Aquarius', date:'1.20-2.18', el:'风', color:'#5BC0DE', planet:'天王星',
    desc:'独立创新思想前卫', img:'/zodiac-aquarius.jpg' },
  { sym:'♓', name:'双鱼座', en:'Pisces', date:'2.19-3.20', el:'水', color:'#7EC8E3', planet:'海王星',
    desc:'富有想象力艺术天赋高', img:null },
]

/* ================================ 主页面 ================================ */
export default function Home() {
  return (
    <>
      <Head>
        <title>星塔 · 塔罗牌占卜与星座运势</title>
        <meta name="description" content="基于维特塔罗经典体系，78张牌完整收录。" />
      </Head>
      <GlobalStyles />
      <CosmicBackground />
      <div className="content">
        <NavBar />
        <HeroSection />
        <TarotIntro />
        <GallerySection />
        <FeaturesSection />
        <GuardianSection />
        <ZodiacSection />
        <CTASection />
        <FooterSection />
      </div>
    </>
  )
}

/* ================================ 全局样式 ================================ */
function GlobalStyles() {
  return (
    <style jsx global>{`
      @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;0,700;1,400&display=swap');
      * { margin:0; padding:0; box-sizing:border-box; }
      body {
        background: #05050C;
        color: #E2E8F0;
        font-family: -apple-system,'PingFang SC','Microsoft YaHei',sans-serif;
        overflow-x: hidden;
      }
      .f-serif { font-family: 'Cormorant Garamond', Georgia, serif; }
      ::-webkit-scrollbar { width:5px; }
      ::-webkit-scrollbar-track { background:#05050C; }
      ::-webkit-scrollbar-thumb { background:rgba(212,175,55,0.2); border-radius:3px; }

      .flip-card { perspective:1200px; }
      .flip-inner {
        position:relative; width:100%; height:100%;
        transition:transform 0.7s cubic-bezier(0.4,0,0.2,1);
        transform-style:preserve-3d;
      }
      .flip-inner.flipped { transform:rotateY(180deg); }
      .flip-front, .flip-back {
        position:absolute; inset:0;
        backface-visibility:hidden; border-radius:12px; overflow:hidden;
      }
      .flip-back {
        transform:rotateY(180deg);
        background:linear-gradient(145deg,#140627,#0A0A1E);
        border:1px solid rgba(212,175,55,0.12);
        display:flex; flex-direction:column; justify-content:center; padding:12px;
      }

      /* ---- 金色辉光动画 ---- */
      @keyframes goldenPulse {
        0%, 100% { box-shadow: 0 0 20px rgba(212,175,55,0.1), 0 0 40px rgba(212,175,55,0.05); }
        50% { box-shadow: 0 0 30px rgba(212,175,55,0.2), 0 0 60px rgba(212,175,55,0.1); }
      }

      @keyframes goldenFlow {
        0% { background-position: 0% 50%; }
        50% { background-position: 100% 50%; }
        100% { background-position: 0% 50%; }
      }

      @keyframes goldenGlowRotate {
        0% { filter: hue-rotate(0deg) brightness(1); }
        50% { filter: hue-rotate(5deg) brightness(1.1); }
        100% { filter: hue-rotate(0deg) brightness(1); }
      }

      /* ---- 星空纹理 ---- */
      .star-texture {
        background-image:
          radial-gradient(1px 1px at 10% 20%, rgba(255,255,255,0.08), transparent),
          radial-gradient(1px 1px at 25% 50%, rgba(255,255,255,0.06), transparent),
          radial-gradient(1.5px 1.5px at 40% 10%, rgba(212,175,55,0.08), transparent),
          radial-gradient(1px 1px at 55% 70%, rgba(255,255,255,0.05), transparent),
          radial-gradient(1px 1px at 70% 30%, rgba(212,175,55,0.06), transparent),
          radial-gradient(1.5px 1.5px at 85% 80%, rgba(255,255,255,0.07), transparent),
          radial-gradient(1px 1px at 15% 85%, rgba(110,200,255,0.06), transparent),
          radial-gradient(1px 1px at 60% 40%, rgba(255,255,255,0.05), transparent),
          radial-gradient(1.2px 1.2px at 90% 15%, rgba(212,175,55,0.07), transparent),
          radial-gradient(1px 1px at 35% 90%, rgba(110,200,255,0.05), transparent);
      }

      /* ---- 金色边框工具类 ---- */
      .golden-border {
        border: 1px solid rgba(212,175,55,0.12);
      }
      .golden-border-thick {
        border: 1.5px solid rgba(212,175,55,0.15);
      }

      /* ---- 悬停发光效果 ---- */
      .hover-glow {
        transition: all 0.4s ease;
      }
      .hover-glow:hover {
        border-color: rgba(212,175,55,0.25) !important;
        box-shadow: 0 0 20px rgba(212,175,55,0.1), 0 0 40px rgba(212,175,55,0.05);
        transform: translateY(-4px);
      }

      /* ---- 特性卡片 hover ---- */
      .feature-card {
        transition: all 0.4s ease;
        position: relative;
        overflow: hidden;
      }
      .feature-card::before {
        content: '';
        position: absolute;
        inset: -1px;
        border-radius: 16px;
        opacity: 0;
        transition: opacity 0.4s ease;
        border: 1.5px solid rgba(212,175,55,0.3);
        box-shadow: 0 0 25px rgba(212,175,55,0.12), 0 0 50px rgba(212,175,55,0.06);
        pointer-events: none;
      }
      .feature-card:hover::before {
        opacity: 1;
      }
      .feature-card:hover {
        transform: translateY(-6px);
      }

      /* ---- 星座卡牌 hover ---- */
      .zodiac-card {
        perspective: 800px;
        transition: all 0.5s cubic-bezier(0.23, 1, 0.32, 1);
      }
      .zodiac-card:hover {
        transform: perspective(800px) translateY(-12px) scale(1.04) rotateX(3deg) rotateY(-2deg);
        box-shadow: 0 0 30px rgba(212,175,55,0.25), 0 0 60px rgba(212,175,55,0.1);
      }

      /* ---- 占位星座卡 hover ---- */
      .zodiac-placeholder:hover {
        border-color: rgba(212,175,55,0.2) !important;
        box-shadow: 0 0 20px rgba(212,175,55,0.08), 0 0 40px rgba(212,175,55,0.04);
      }

      /* ---- 次要按钮 hover ---- */
      .secondary-btn {
        transition: all 0.3s ease;
      }
      .secondary-btn:hover {
        border-color: #D4AF37 !important;
        box-shadow: 0 0 20px rgba(212,175,55,0.15);
        transform: translateY(-2px);
      }
    `}</style>
  )
}

/* ================================ 宇宙背景 ================================ */
function CosmicBackground() {
  return (
    <>
      <div className="fixed inset-0 z-0 pointer-events-none"
        style={{
          background: 'linear-gradient(180deg, #140627 0%, #0A0A1E 40%, #05050C 100%)'
        }}>
        {/* 星云光晕 */}
        <div className="absolute top-[-5%] left-[10%] w-[500px] h-[500px] rounded-full opacity-[0.06]"
          style={{ background:'radial-gradient(circle, #7A4DFF 0%, transparent 60%)' }}/>
        <div className="absolute top-[20%] right-[5%] w-[600px] h-[600px] rounded-full opacity-[0.04]"
          style={{ background:'radial-gradient(circle, #D4AF37 0%, transparent 60%)' }}/>
        <div className="absolute bottom-[10%] left-[30%] w-[400px] h-[400px] rounded-full opacity-[0.05]"
          style={{ background:'radial-gradient(circle, #6EC8FF 0%, transparent 60%)' }}/>
        <div className="absolute top-[50%] left-[5%] w-[350px] h-[350px] rounded-full opacity-[0.03]"
          style={{ background:'radial-gradient(circle, #7A4DFF 0%, transparent 60%)' }}/>
      </div>
      <ThreeLayerParticles />
    </>
  )
}

/* ================================ 三层粒子系统 ================================ */
function ThreeLayerParticles() {
  return (
    <div className="fixed inset-0 z-[1] pointer-events-none overflow-hidden">
      {/* 第一层：小型星星 */}
      <canvas id="particle-layer-1" className="absolute inset-0 w-full h-full"
        ref={el => {
          if (!el || el.dataset.done) return
          el.dataset.done = '1'
          const ctx = el.getContext('2d')
          let w, h, stars = []
          const resize = () => { w = el.width = window.innerWidth; h = el.height = window.innerHeight }
          resize()
          window.addEventListener('resize', resize)
          for (let i = 0; i < 150; i++) {
            stars.push({
              x: Math.random() * w, y: Math.random() * h,
              r: Math.random() * 1.5 + 0.3,
              a: Math.random() * 0.6 + 0.1,
              speed: Math.random() * 0.15 + 0.05,
              phase: Math.random() * Math.PI * 2,
            })
          }
          let id
          function draw() {
            ctx.clearRect(0, 0, w, h)
            const t = Date.now() / 1000
            stars.forEach(s => {
              const alpha = s.a * (0.5 + 0.5 * Math.sin(t * s.speed + s.phase))
              ctx.beginPath(); ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2)
              ctx.fillStyle = `rgba(255,255,255,${alpha})`
              ctx.fill()
            })
            id = requestAnimationFrame(draw)
          }
          draw()
          el._cleanup = () => { cancelAnimationFrame(id); window.removeEventListener('resize', resize) }
        }}/>
      {/* 第二层：金色粒子 */}
      <canvas id="particle-layer-2" className="absolute inset-0 w-full h-full"
        ref={el => {
          if (!el || el.dataset.done) return
          el.dataset.done = '1'
          const ctx = el.getContext('2d')
          let w, h, parts = []
          const resize = () => { w = el.width = window.innerWidth; h = el.height = window.innerHeight }
          resize()
          window.addEventListener('resize', resize)
          for (let i = 0; i < 40; i++) {
            parts.push({
              x: Math.random() * w, y: Math.random() * h,
              r: Math.random() * 2.5 + 0.5,
              a: Math.random() * 0.3 + 0.05,
              speed: Math.random() * 0.08 + 0.02,
              driftX: (Math.random() - 0.5) * 0.2,
              driftY: (Math.random() - 0.5) * 0.15,
              phase: Math.random() * Math.PI * 2,
            })
          }
          let id
          function draw() {
            ctx.clearRect(0, 0, w, h)
            const t = Date.now() / 1000
            parts.forEach(p => {
              const px = p.x + Math.sin(t * 0.05 + p.phase) * p.driftX * 30
              const py = p.y + Math.cos(t * 0.05 + p.phase) * p.driftY * 30
              const pulse = 0.5 + 0.5 * Math.sin(t * p.speed + p.phase)
              ctx.beginPath()
              ctx.arc(px, py, p.r * (0.8 + 0.2 * pulse), 0, Math.PI * 2)
              ctx.fillStyle = `rgba(212,175,55,${p.a * pulse})`
              ctx.fill()
            })
            id = requestAnimationFrame(draw)
          }
          draw()
          el._cleanup = () => { cancelAnimationFrame(id); window.removeEventListener('resize', resize) }
        }}/>
      {/* 第三层：模糊光斑 */}
      <canvas id="particle-layer-3" className="absolute inset-0 w-full h-full blur-sm"
        ref={el => {
          if (!el || el.dataset.done) return
          el.dataset.done = '1'
          const ctx = el.getContext('2d')
          let w, h, blobs = []
          const resize = () => { w = el.width = window.innerWidth; h = el.height = window.innerHeight }
          resize()
          window.addEventListener('resize', resize)
          for (let i = 0; i < 12; i++) {
            blobs.push({
              x: Math.random() * w, y: Math.random() * h,
              r: Math.random() * 80 + 30,
              a: Math.random() * 0.06 + 0.02,
              speed: Math.random() * 0.04 + 0.01,
              hue: Math.random() > 0.5 ? 212 : (Math.random() > 0.5 ? 175 : 270),
              phase: Math.random() * Math.PI * 2,
            })
          }
          let id
          function draw() {
            ctx.clearRect(0, 0, w, h)
            const t = Date.now() / 1000
            blobs.forEach(b => {
              const pulse = 0.5 + 0.5 * Math.sin(t * b.speed + b.phase)
              const cx = b.x + Math.sin(t * 0.02 + b.phase) * 20
              const cy = b.y + Math.cos(t * 0.02 + b.phase) * 20
              const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, b.r)
              grad.addColorStop(0, `hsla(${b.hue}, 50%, 60%, ${b.a * pulse})`)
              grad.addColorStop(1, `hsla(${b.hue}, 50%, 60%, 0)`)
              ctx.fillStyle = grad
              ctx.fillRect(cx - b.r, cy - b.r, b.r * 2, b.r * 2)
            })
            id = requestAnimationFrame(draw)
          }
          draw()
          el._cleanup = () => { cancelAnimationFrame(id); window.removeEventListener('resize', resize) }
        }}/>
    </div>
  )
}

/* ================================ 导航栏 ================================ */
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
        ? 'py-3 bg-[rgba(5,5,12,0.88)] backdrop-blur-[24px] border-b border-[rgba(212,175,55,0.04)]'
        : 'py-5 bg-transparent'
    }`}>
      <div className="max-w-[1200px] mx-auto px-6 flex items-center justify-between">
        <a href="#" className="text-xl font-bold no-underline tracking-[5px] f-serif" style={{ color:'#FFF8E7' }}>
          ✦ 星<span style={{ color:'#D4AF37' }}>塔</span>
        </a>
        <div className="hidden md:flex gap-10">
          {[['塔罗','#tarot'],['牌库','#gallery'],['功能','#features'],['星座','#zodiac']].map(([t,h]) => (
            <a key={t} href={h}
              className="text-sm no-underline tracking-[2px] transition-all duration-300 hover:text-[#D4AF37]"
              style={{ color:'#8B7D9B' }}>{t}</a>
          ))}
        </div>
        <a href="#cta"
          className="py-2.5 px-6 rounded-lg text-sm font-medium no-underline tracking-[2px] transition-all duration-300"
          style={{
            background: 'linear-gradient(135deg, #8B6914, #D4AF37)',
            color: '#07060a',
            boxShadow: '0 0 20px rgba(212,175,55,0.1)',
          }}>
          开始抽牌
        </a>
      </div>
    </nav>
  )
}

/* ================================ HERO · 景深卡牌漂浮阵 + 鼠标跟随 ================================ */
function HeroSection() {
  const containerRef = useRef(null)
  const [tilt, setTilt] = useState({ x: 0, y: 0 })
  const [mouseInside, setMouseInside] = useState(false)

  // 鼠标跟随：卡牌轻微偏转 2°~5°
  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    let frameId
    function onMouseMove(e) {
      const rect = container.getBoundingClientRect()
      const centerX = rect.left + rect.width / 2
      const centerY = rect.top + rect.height / 2
      const deltaX = (e.clientX - centerX) / (rect.width / 2)
      const deltaY = (e.clientY - centerY) / (rect.height / 2)
      cancelAnimationFrame(frameId)
      frameId = requestAnimationFrame(() => {
        setTilt({ x: -deltaY * 2, y: deltaX * 2 })
      })
    }

    function onMouseEnter() { setMouseInside(true) }
    function onMouseLeave() {
      setMouseInside(false)
      cancelAnimationFrame(frameId)
      setTilt({ x: 0, y: 0 })
    }

    container.addEventListener('mouseenter', onMouseEnter)
    container.addEventListener('mousemove', onMouseMove)
    container.addEventListener('mouseleave', onMouseLeave)
    return () => {
      container.removeEventListener('mouseenter', onMouseEnter)
      container.removeEventListener('mousemove', onMouseMove)
      container.removeEventListener('mouseleave', onMouseLeave)
      cancelAnimationFrame(frameId)
    }
  }, [])

  // 3D扇面布局：卡牌展开成半扇形，类似展开的扑克牌
  const CARD_H = 260                                     // 统一卡牌高度
  const CARD_W = Math.round(CARD_H / 7 * 5)               // 5:7比例 → 186px

  // 金色辉光强度
  const glowScale = mouseInside ? 1 + (Math.abs(tilt.x) + Math.abs(tilt.y)) / 10 * 0.3 : 1

  // 扇面卡片：三张卡牌以不同角度旋转展开，形成半扇形
  // 中间牌最大最亮，两侧牌向外展开+缩小+模糊
  const cards = [
    {
      id:'left',
      src:'/zodiac-taurus.jpg',
      name:'金牛座',
      en:'Taurus',
      w:CARD_W, h:CARD_H,
      angle: -28,
      scale: 0.82,
      z:1,
      blur:1.2,
      brightness:0.55,
      opacity:0.5,
    },
    {
      id:'main',
      src:CARDS.star,
      name:'星星',
      en:'The Star',
      w:CARD_W, h:CARD_H,
      angle: 0,
      scale: 1,
      z:3,
      blur:0,
      brightness:1,
      opacity:1,
    },
    {
      id:'right',
      src:'/zodiac-aquarius.jpg',
      name:'水瓶座',
      en:'Aquarius',
      w:CARD_W, h:CARD_H,
      angle: 28,
      scale: 0.82,
      z:1,
      blur:1.2,
      brightness:0.55,
      opacity:0.5,
    },
  ]

  const FLEX_RIGHT = 'flex-[0_0_360px] max-lg:flex-[0_0_240px] max-lg:mb-8'

  return (
    <section className="relative z-10 min-h-screen flex items-center pt-24 pb-16 overflow-hidden">
      <div className="max-w-[1200px] mx-auto px-6 w-full">
        <div className="flex items-center gap-12 max-lg:flex-col max-lg:text-center">

          {/* 左侧文字 */}
          <div className="flex-1 max-lg:order-2">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm tracking-[3px] mb-6"
              style={{ background:'rgba(212,175,55,0.06)', border:'1px solid rgba(212,175,55,0.1)', color:'#D4AF37', fontSize:12 }}>
              ✦ 基于维特塔罗体系 · 1909
            </div>
            <h1 className="text-5xl max-md:text-3xl font-bold leading-tight mb-5 f-serif" style={{ color:'#FFF8E7' }}>
              塔罗是心灵的镜<br />
              照见你 <span style={{ color:'#D4AF37', fontStyle:'italic' }}>真实的内在</span>
            </h1>
            <p className="text-base leading-relaxed max-w-[500px] max-lg:mx-auto mb-8" style={{ color:'#A99BB8' }}>
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
                进入星塔占卜
              </a>
              <a href="#gallery"
                className="inline-block py-4 px-10 rounded-xl text-base no-underline tracking-[2px] transition-all duration-300"
                style={{ border:'1px solid rgba(212,175,55,0.15)', color:'#D4AF37' }}>
                浏览78张塔罗牌
              </a>
            </div>
          </div>

          {/* 右侧 · 扇面展开塔罗牌阵 */}
          <div className={FLEX_RIGHT} ref={containerRef}>
            <div
              className="relative select-none mx-auto flex items-center justify-center"
              style={{
                width:'100%', maxWidth:360, height:CARD_H + 80,
                transform: mouseInside ? `rotateX(${tilt.x * 0.5}deg) rotateY(${tilt.y * 0.5}deg)` : 'none',
                transition: 'transform 0.2s ease-out',
              }}>
              {/* 后方辉光 */}
              <div className="absolute pointer-events-none"
                style={{
                  width:CARD_W * 2.5, height:CARD_H * 1.3,
                  background:`radial-gradient(ellipse, rgba(212,175,55,${0.08 * glowScale}) 0%, rgba(212,175,55,0.015) 35%, transparent 60%)`,
                  transition:'all 0.4s ease',
                }}/>
              <div className="absolute pointer-events-none"
                style={{
                  width:CARD_W * 1.5, height:CARD_H * 0.8,
                  background:'radial-gradient(circle, rgba(122,77,255,0.03) 0%, transparent 50%)',
                }}/>

              {/* 3张牌以主牌为中心展开成扇面 */}
              {cards.map((card, i) => {
                const isMain = card.id === 'main'
                const mainGlow = isMain
                  ? `0 20px 60px rgba(0,0,0,0.4), 0 0 ${mouseInside ? 60 * glowScale : 40}px rgba(212,175,55,${mouseInside ? 0.12 * glowScale : 0.06})`
                  : '0 8px 24px rgba(0,0,0,0.3)'
                const mainBorder = isMain
                  ? `1.5px solid rgba(212,175,55,${mouseInside ? 0.2 * glowScale : 0.15})`
                  : '1px solid rgba(212,175,55,0.04)'

                // 扇形偏移：每张牌旋转+平移，形成扇面
                // 左牌：向左下旋转展开，右牌：向右下旋转展开
                const tx = Math.sin(card.angle * Math.PI / 180) * (CARD_W * 0.45)
                const ty = Math.abs(Math.cos(card.angle * Math.PI / 180) * (CARD_W * 0.2))

                return (
                  <div
                    key={card.id}
                    className="absolute"
                    style={{
                      width: card.w,
                      height: card.h,
                      transform: `
                        rotate(${card.angle}deg)
                        translate(${card.id === 'left' ? -tx : card.id === 'right' ? tx : 0}px, ${ty}px)
                      `,
                      transformOrigin: 'bottom center',
                      filter: `blur(${card.blur}px) brightness(${card.brightness})`,
                      opacity: card.opacity,
                      border: mainBorder,
                      boxShadow: mainGlow,
                      zIndex: card.z,
                      transition: 'border 0.3s ease, box-shadow 0.3s ease',
                    }}>
                    <img
                      src={card.src}
                      alt={card.name}
                      draggable={false}
                      style={{
                        width:'100%', height:'100%',
                        objectFit:'cover', display:'block',
                        borderRadius:'12px',
                      }}/>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ================================ 塔罗介绍 ================================ */
function TarotIntro() {
  const suits = [
    { name:'圣杯', en:'Cups', el:'水 · 情感与关系', src:SUIT_EXAMPLES.cups },
    { name:'权杖', en:'Wands', el:'火 · 行动与创造', src:SUIT_EXAMPLES.wands },
    { name:'宝剑', en:'Swords', el:'风 · 思想与挑战', src:SUIT_EXAMPLES.swords },
    { name:'星币', en:'Pentacles', el:'土 · 物质与工作', src:SUIT_EXAMPLES.pentacles },
  ]
  return (
    <section id="tarot" className="relative z-10 py-24 star-texture"
      style={{
        background: 'linear-gradient(180deg, rgba(20,6,39,0.95) 0%, rgba(10,10,30,0.98) 50%, rgba(5,5,12,0.95) 100%), radial-gradient(1px 1px at 10% 20%, rgba(255,255,255,0.08), transparent)',
        borderTop: '1px solid rgba(212,175,55,0.08)',
        borderBottom: '1px solid rgba(212,175,55,0.08)',
      }}>
      <div className="max-w-[1100px] mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-16">
          <div
            className="p-6 rounded-2xl golden-border-thick"
            style={{
              background: 'rgba(212,175,55,0.02)',
              boxShadow: '0 0 30px rgba(212,175,55,0.03)',
            }}>
            <p className="text-xs tracking-[5px] mb-3" style={{ color:'#D4AF37' }}>ABOUT TAROT</p>
            <h2 className="text-3xl font-bold mb-4 f-serif" style={{ color:'#FFF8E7' }}>什么是塔罗？</h2>
            <div className="space-y-4 text-sm leading-relaxed" style={{ color:'#A99BB8' }}>
              <p>塔罗牌起源于15世纪的欧洲，最初是贵族玩的纸牌游戏。到了18世纪，它被赋予了神秘学的内涵，成为了一种自我探索与心灵指引的工具。</p>
              <p>塔罗牌不是"算命"，也不是宿命的判决。它的价值在于——当你凝视牌面的图案，那些古老的象征符号会触发你的潜意识，让你看清自己内心真实的渴望与恐惧。每一张牌都是一面镜子。</p>
            </div>
          </div>
          <div>
            <p className="text-xs tracking-[5px] mb-4" style={{ color:'#D4AF37' }}>DECK STRUCTURE</p>
            <div className="flex gap-6 mb-6">
              {[['22','大阿卡纳','Major Arcana'],['56','小阿卡纳','Minor Arcana'],['78','总计','Total']].map(([n,t,s]) => (
                <div key={t} className="flex-1 p-5 rounded-xl text-center hover-glow"
                  style={{ background:'rgba(212,175,55,0.03)', border:'1px solid rgba(212,175,55,0.06)' }}>
                  <div className="text-3xl font-bold f-serif mb-1" style={{ color:'#D4AF37' }}>{n}</div>
                  <div className="text-xs" style={{ color:'#7A6D8A' }}>{t}<br/>{s}</div>
                </div>
              ))}
            </div>
            <p className="text-xs mb-3 tracking-[2px]" style={{ color:'#D4AF37' }}>小阿卡纳 · 四牌组</p>
            <div className="grid grid-cols-4 gap-3">
              {suits.map(s => (
                <div key={s.name} className="text-center p-3 rounded-lg transition-all duration-300 hover:-translate-y-2 hover-glow"
                  style={{ background:'rgba(212,175,55,0.02)', border:'1px solid rgba(255,255,255,0.03)' }}>
                  <div className="mb-1 rounded overflow-hidden" style={{ border:'1px solid rgba(212,175,55,0.08)' }}>
                    <img src={s.src} alt={s.name} style={{ width:'100%', aspectRatio:'5/7', objectFit:'cover' }}/>
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

/* ================================ 卡牌画廊 ================================ */
function GallerySection() {
  const [flipped, setFlipped] = useState({})
  const toggleFlip = (id) => setFlipped(p => ({...p, [id]:!p[id]}))
  return (
    <section id="gallery" className="relative z-10 py-24">
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="text-center mb-14">
          <p className="text-xs tracking-[5px] mb-3" style={{ color:'#D4AF37' }}>MAJOR ARCANA</p>
          <h2 className="text-3xl font-bold mb-3 f-serif" style={{ color:'#FFF8E7' }}>大阿卡纳 · 22 张</h2>
          <p className="text-sm" style={{ color:'#8B7D9B' }}>点击牌面翻转 · 查看正逆位含义</p>
        </div>
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-5 max-w-[1100px] mx-auto">
          {galleryCards.map(card => (
            <div key={card.id} className="flip-card cursor-pointer" onClick={() => toggleFlip(card.id)}
              style={{ aspectRatio:'5/7' }}>
              <div className={`flip-inner ${flipped[card.id] ? 'flipped' : ''}`}>
                <div className="flip-front" style={{ border:'1px solid rgba(212,175,55,0.12)', boxShadow:'0 4px 16px rgba(0,0,0,0.3)' }}>
                  <img src={card.src} alt={card.name} style={{ width:'100%', height:'100%', objectFit:'contain', display:'block' }}/>
                </div>
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

/* ================================ 核心功能 ================================ */
function FeaturesSection() {
  return (
    <section id="features" className="relative z-10 py-24 star-texture"
      style={{
        background: 'linear-gradient(180deg, rgba(20,6,39,0.9) 0%, rgba(10,10,30,0.95) 50%, rgba(5,5,12,0.9) 100%)',
        borderTop: '1px solid rgba(212,175,55,0.08)',
        borderBottom: '1px solid rgba(212,175,55,0.08)',
      }}>
      <div className="max-w-[1100px] mx-auto px-6">
        <div className="text-center mb-14">
          <p className="text-xs tracking-[5px] mb-3" style={{ color:'#D4AF37' }}>FEATURES</p>
          <h2 className="text-3xl font-bold mb-3 f-serif" style={{ color:'#FFF8E7' }}>核心功能</h2>
          <p className="text-sm" style={{ color:'#8B7D9B' }}>每个功能都用心做到位</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            { tag:'DAILY DRAW', title:'每日一牌',
              desc:'每天一张今日指引牌，翻牌动画、正逆位深度解读、生活建议。每天30秒，养成与自己对话的习惯。',
              img:CARDS.fool, label:'每日抽牌 · 愚人', sub:'正位 · 新的开始' },
            { tag:'SPREADS', title:'多牌阵占卜',
              desc:'三牌阵、凯尔特十字、感情/事业/财运/学业——覆盖生活各个领域。自定义牌阵也支持。',
              extra:'三牌阵 · 凯尔特十字 · 感情 · 事业 · 财运 · 学业' },
            { tag:'LIBRARY', title:'78张牌完整牌库',
              desc:'大阿卡纳 + 小阿卡纳四牌组，每张牌都有正/逆位含义、牌面象征解读、关键词标签。支持搜索和收藏。',
              imgs:[CARDS.priestess, CARDS.justice, CARDS.tower, CARDS.sun, CARDS.world] },
            { tag:'ZODIAC', title:'星座运势',
              desc:'每日/每周/每月运势、星座配对分析。每个星座结合塔罗牌解读，给你不一样的运势体验。',
              zodiac: true },
          ].map((f, i) => (
            <div key={i} className="feature-card p-6 rounded-2xl transition-all duration-300 group"
              style={{
                background:'rgba(212,175,55,0.02)',
                border:'1px solid rgba(212,175,55,0.04)',
              }}>
              <p className="text-xs tracking-[4px] mb-1" style={{ color:'#D4AF37' }}>{f.tag}</p>
              <h3 className="text-lg font-bold mb-3 f-serif" style={{ color:'#FFF8E7' }}>{f.title}</h3>
              <p className="text-sm mb-4 leading-relaxed" style={{ color:'#A99BB8' }}>{f.desc}</p>

              {f.img && <div className="flex gap-4 items-start">
                <div className="w-[80px] shrink-0 rounded-lg overflow-hidden" style={{ border:'1px solid rgba(212,175,55,0.1)' }}>
                  <img src={f.img} alt="" style={{ width:'100%', aspectRatio:'5/7', objectFit:'cover' }}/>
                </div>
                <div>
                  <p className="text-sm f-serif font-bold" style={{ color:'#F1F0FB' }}>{f.label}</p>
                  <p className="text-xs mt-1" style={{ color:'#D4AF37' }}>{f.sub}</p>
                </div>
              </div>}

              {f.extra && <p className="text-xs" style={{ color:'#7A6D8A' }}>{f.extra}</p>}

              {f.imgs && <div className="flex gap-2">
                {f.imgs.map((src, j) => (
                  <div key={j} className="flex-1 rounded overflow-hidden" style={{ border:'1px solid rgba(212,175,55,0.06)' }}>
                    <img src={src} alt="" style={{ width:'100%', aspectRatio:'5/7', objectFit:'cover' }}/>
                  </div>
                ))}
              </div>}

              {f.zodiac && <div className="flex items-center justify-center gap-2 p-3 rounded-xl flex-wrap"
                style={{ background:'rgba(255,255,255,0.02)', border:'1px solid rgba(255,255,255,0.03)' }}>
                {ZODIACS.map(z => (
                  <span key={z.name} className="text-lg" style={{ color: `${z.color}55` }}>{z.sym}</span>
                ))}
              </div>}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ================================ 星塔守护者 ================================ */
function GuardianSection() {
  return (
    <section className="relative z-10 py-24 overflow-hidden">
      <div className="max-w-[1100px] mx-auto px-6">
        <div className="text-center mb-14">
          <p className="text-xs tracking-[5px] mb-3" style={{ color:'#D4AF37' }}>GUARDIAN</p>
          <h2 className="text-3xl font-bold mb-3 f-serif" style={{ color:'#FFF8E7' }}>星塔守护者</h2>
          <p className="text-sm max-w-xl mx-auto" style={{ color:'#8B7D9B' }}>
            每一张塔罗牌、每一个星座，都有一位星塔守护者守护着它的能量与智慧
          </p>
        </div>
        <div className="flex flex-col md:flex-row items-center gap-12 max-w-4xl mx-auto">
          {/* 守护者形象 */}
          <div className="relative shrink-0">
            {/* 外层光晕 */}
            <div className="absolute inset-0 rounded-full"
              style={{
                background: 'radial-gradient(circle, rgba(212,175,55,0.15) 0%, rgba(212,175,55,0.05) 40%, transparent 70%)',
                transform: 'scale(1.35)',
              }} />
            {/* 金色边框圆形头像 */}
            <div
              className="w-[200px] h-[200px] md:w-[260px] md:h-[260px] rounded-full overflow-hidden relative"
              style={{
                border: '2px solid rgba(212,175,55,0.3)',
                boxShadow: '0 0 40px rgba(212,175,55,0.15), 0 0 80px rgba(212,175,55,0.05), 0 0 120px rgba(212,175,55,0.03)',
                animation: 'goldenPulse 4s ease-in-out infinite',
              }}>
              <img src="/zodiac-aries.jpg" alt="星塔守护者"
                style={{ width:'100%', height:'100%', objectFit:'cover' }} />
            </div>
            {/* 装饰性星芒 */}
            <div className="absolute -top-3 -right-3 text-2xl" style={{ color:'#D4AF37', opacity:0.3 }}>✦</div>
            <div className="absolute -bottom-2 -left-2 text-xl" style={{ color:'#6EC8FF', opacity:0.25 }}>✦</div>
          </div>

          {/* 品牌文案 */}
          <div className="flex-1 text-center md:text-left">
            <h3 className="text-2xl font-bold mb-4 f-serif" style={{ color:'#FFF8E7' }}>
              ✦ 星塔守护者 ✦
            </h3>
            <p className="text-sm leading-relaxed mb-4" style={{ color:'#A99BB8' }}>
              在星塔之中，每一张塔罗牌、每一颗星辰都有一位守护者。
              白羊座的守护者，以火焰般的勇气守护着「力量」牌的智慧，
              指引着每一位到访者探寻内心深处的答案。
            </p>
            <p className="text-sm leading-relaxed" style={{ color:'#7A6D8A' }}>
              星塔守护者是宇宙能量的化身，连接着星座与塔罗的神秘纽带。
              当你凝视他们的形象，便能感受到那份来自星辰的指引与守护。
            </p>
            <div className="mt-6 flex gap-4 text-xs justify-center md:justify-start" style={{ color:'#7A6D8A' }}>
              <span className="hover:text-[#D4AF37] transition-colors">✦ 塔罗</span>
              <span className="hover:text-[#D4AF37] transition-colors">✦ 星座</span>
              <span className="hover:text-[#D4AF37] transition-colors">✦ 宇宙</span>
              <span className="hover:text-[#D4AF37] transition-colors">✦ 内心</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ================================ 十二星座守护者卡牌长廊 ================================ */
function ZodiacSection() {
  const scrollRef = useRef(null)
  const [paused, setPaused] = useState(false)
  const [activeIdx, setActiveIdx] = useState(null)
  const [cardWidth, setCardWidth] = useState(260)

  // 响应式卡牌宽度：桌面端3-4张，移动端1张
  useEffect(() => {
    function updateWidth() {
      if (window.innerWidth < 768) {
        setCardWidth(Math.min(window.innerWidth * 0.75, 280))
      } else {
        setCardWidth(260)
      }
    }
    updateWidth()
    window.addEventListener('resize', updateWidth)
    return () => window.removeEventListener('resize', updateWidth)
  }, [])

  useEffect(() => {
    if (paused) return
    const el = scrollRef.current
    if (!el) return
    const interval = setInterval(() => {
      el.scrollLeft += 0.8
      if (el.scrollLeft >= (el.scrollWidth - el.clientWidth)) el.scrollLeft = 0
    }, 25)
    return () => clearInterval(interval)
  }, [paused])

  const items = [...ZODIACS, ...ZODIACS]

  return (
    <section id="zodiac" className="relative z-10 py-24 overflow-hidden">
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="text-center mb-14">
          <p className="text-xs tracking-[5px] mb-3" style={{ color:'#D4AF37' }}>ZODIAC GALLERY</p>
          <h2 className="text-3xl font-bold mb-3 f-serif" style={{ color:'#FFF8E7' }}>星座守护者卡牌长廊</h2>
          <p className="text-sm" style={{ color:'#8B7D9B' }}>悬停查看详情 · 自动轮播</p>
        </div>
      </div>
      <div className="relative px-6 max-w-[1200px] mx-auto"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => { setPaused(false); setActiveIdx(null) }}>
        <div ref={scrollRef}
          className="overflow-x-auto"
          style={{ scrollbarWidth:'none', msOverflowStyle:'none', cursor:'grab' }}>
          <div className="inline-flex gap-5 py-4">
            {items.map((z, i) => {
              const isActive = activeIdx === i
              return (
                <div key={i}
                  className={`shrink-0 rounded-xl overflow-hidden transition-all duration-500 cursor-pointer relative zodiac-card ${!z.img ? 'zodiac-placeholder' : ''}`}
                  style={{
                    width: cardWidth,
                    aspectRatio: '5/7',
                    border: isActive
                      ? `2px solid ${z.color}`
                      : z.img
                        ? '1px solid rgba(212,175,55,0.05)'
                        : '1px solid rgba(255,255,255,0.06)',
                    transform: isActive
                      ? `perspective(800px) translateY(-12px) scale(1.04) rotateX(3deg) rotateY(-2deg)`
                      : 'none',
                    boxShadow: isActive
                      ? `0 0 30px rgba(212,175,55,0.25), 0 0 60px rgba(212,175,55,0.1)`
                      : '0 4px 16px rgba(0,0,0,0.3)',
                  }}
                  onMouseEnter={() => setActiveIdx(i)}
                  onMouseLeave={() => setActiveIdx(null)}>
                  {z.img ? (
                    <>
                      <img src={z.img} alt={z.name}
                        style={{ width:'100%', height:'100%', objectFit:'cover', display:'block' }}/>
                      <div className="absolute inset-0 transition-opacity duration-300"
                        style={{
                          background:'linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.2) 40%, transparent 60%)',
                          opacity: isActive ? 1 : 0,
                        }}>
                        <div className="absolute bottom-0 left-0 right-0 p-4 text-center">
                          <p className="text-xs tracking-[3px]" style={{ color: z.color }}>{z.en.toUpperCase()}</p>
                          <p className="text-xs mt-1" style={{ color:'#B8A9C9' }}>{z.date}</p>
                          <p className="text-[10px] mt-0.5" style={{ color: z.color }}>{z.el} · {z.planet}</p>
                          <p className="text-[10px] mt-1 leading-relaxed" style={{ color:'#8B7D9B' }}>{z.desc}</p>
                        </div>
                      </div>
                      <div className="absolute bottom-0 left-0 right-0 p-3 text-center"
                        style={{
                          background:'linear-gradient(to top, rgba(0,0,0,0.7), transparent)',
                          opacity: isActive ? 0 : 1,
                          transition:'opacity 0.3s',
                        }}>
                        <p className="text-sm f-serif font-bold" style={{ color:'#FFF8E7' }}>{z.name}</p>
                        <p className="text-[10px] tracking-[2px]" style={{ color:'#7A6D8A' }}>{z.en}</p>
                      </div>
                    </>
                  ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center p-5 text-center"
                      style={{
                        background: `linear-gradient(180deg, ${z.color}08 0%, ${z.color}03 50%, rgba(10,10,18,1) 100%)`,
                        transition: 'all 0.4s ease',
                        border: isActive ? 'none' : undefined,
                      }}>
                      <div className="text-5xl mb-2" style={{ color:`${z.color}66` }}>{z.sym}</div>
                      <p className="text-base f-serif font-bold" style={{ color:'#FFF8E7' }}>{z.name}</p>
                      <p className="text-[11px] tracking-[3px]" style={{ color:`${z.color}99` }}>{z.en}</p>
                      <div className="w-6 h-px my-2" style={{ background:`${z.color}44` }}/>
                      <div className={`overflow-hidden transition-all duration-300 w-full ${isActive ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'}`}>
                        <p className="text-[10px]" style={{ color:'#8B7D9B' }}>{z.date}</p>
                        <p className="text-[10px] mt-0.5" style={{ color: z.color }}>{z.el} · {z.planet}</p>
                        <p className="text-[10px] mt-1 leading-relaxed" style={{ color:'#6A5D7A' }}>{z.desc}</p>
                      </div>
                      <div className="mt-auto">
                        <span className="text-[8px] px-2 py-0.5 rounded-full tracking-[2px]"
                          style={{
                            background: isActive ? 'rgba(212,175,55,0.08)' : 'rgba(255,255,255,0.03)',
                            border: isActive ? '1px solid rgba(212,175,55,0.15)' : '1px solid rgba(255,255,255,0.04)',
                            color: isActive ? '#D4AF37' : '#5A4D6A',
                            transition: 'all 0.3s ease',
                          }}>
                          待生成
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </div>
      </div>
      <div className="text-center mt-10">
        <p className="text-xs tracking-[3px]" style={{ color:'#5A4D6A' }}>
          ✦ 最终将替换为12张AI生成的星座守护者卡牌 ✦
        </p>
      </div>
    </section>
  )
}

/* ================================ CTA ================================ */
function CTASection() {
  return (
    <section id="cta" className="relative z-10 py-28 text-center"
      style={{ background:'rgba(212,175,55,0.012)', borderTop:'1px solid rgba(212,175,55,0.03)' }}>
      <div className="max-w-[800px] mx-auto px-6">
        <p className="text-xs tracking-[5px] mb-4" style={{ color:'#D4AF37' }}>BEGIN YOUR JOURNEY</p>
        <h2 className="text-4xl font-bold mb-4 f-serif" style={{ color:'#FFF8E7' }}>
          开始你的塔罗之旅
        </h2>
        <p className="text-sm mb-10 max-w-md mx-auto" style={{ color:'#8B7D9B' }}>
          微信搜索「星塔」打开小程序 · 每日一牌 · 占卜 · 牌库 · 星座 · 全部免费
        </p>
        <div className="flex gap-4 justify-center flex-wrap">
          <a href="#"
            className="inline-block py-4 px-12 rounded-xl text-base font-medium no-underline tracking-[3px] transition-all duration-300 hover:-translate-y-1"
            style={{
              background: 'linear-gradient(135deg, #8B6914, #D4AF37, #FFF8E7, #D4AF37, #8B6914)',
              backgroundSize: '200% 200%',
              color: '#07060a',
              boxShadow: '0 8px 30px rgba(212,175,55,0.15), 0 0 60px rgba(212,175,55,0.05)',
              animation: 'ctaPulse 3s ease-in-out infinite, goldenFlow 4s ease-in-out infinite',
            }}
            onMouseEnter={e => { e.currentTarget.style.boxShadow = '0 8px 50px rgba(212,175,55,0.35), 0 0 80px rgba(212,175,55,0.15)' }}
            onMouseLeave={e => { e.currentTarget.style.boxShadow = '0 8px 30px rgba(212,175,55,0.15), 0 0 60px rgba(212,175,55,0.05)' }}>
            进入星塔占卜
          </a>
          <a href="#gallery"
            className="secondary-btn inline-block py-4 px-12 rounded-xl text-base no-underline tracking-[3px] transition-all duration-300"
            style={{ border:'1px solid rgba(212,175,55,0.15)', color:'#D4AF37' }}>
            浏览78张塔罗牌
          </a>
        </div>
        <style>{`
          @keyframes ctaPulse {
            0%,100% { box-shadow: 0 8px 30px rgba(212,175,55,0.15), 0 0 60px rgba(212,175,55,0.05); }
            50% { box-shadow: 0 8px 40px rgba(212,175,55,0.25), 0 0 80px rgba(212,175,55,0.1); }
          }
        `}</style>
      </div>
    </section>
  )
}

/* ================================ Footer ================================ */
function FooterSection() {
  return (
    <footer className="relative z-10 py-12 text-center" style={{ borderTop:'1px solid rgba(212,175,55,0.03)' }}>
      <div className="max-w-[1100px] mx-auto px-6">
        <p className="text-lg mb-2 f-serif tracking-[6px]" style={{ color:'#FFF8E7' }}>✦ 星塔</p>
        <p className="text-sm mb-4" style={{ color:'#7A6D8A' }}>塔罗是一面镜子，真正的答案在你心中</p>
        <div className="max-w-md mx-auto p-3 rounded-lg text-xs leading-relaxed"
          style={{ background:'rgba(212,175,55,0.015)', color:'#5A4D6A' }}>
          <strong>免责声明：</strong>所有占卜结果仅供娱乐参考，不构成决策建议。
          塔罗牌是自我探索的工具，帮助用户进行自我觉察与思考。
        </div>
        <p className="text-xs mt-5" style={{ color:'#3D304D' }}>© 2026 星塔</p>
      </div>
    </footer>
  )
}
