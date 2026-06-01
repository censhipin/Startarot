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
    desc:'聪明机智善于沟通交际', img:'/zodiac-gemini.jpg' },
  { sym:'♋', name:'巨蟹座', en:'Cancer', date:'6.22-7.22', el:'水', color:'#B8C5D6', planet:'月亮',
    desc:'温柔敏感重视家庭情感', img:'/zodiac-cancer.jpg' },
  { sym:'♌', name:'狮子座', en:'Leo', date:'7.23-8.22', el:'火', color:'#F5A623', planet:'太阳',
    desc:'自信阳光天生的舞台者', img:'/zodiac-leo.jpg' },
  { sym:'♍', name:'处女座', en:'Virgo', date:'8.23-9.22', el:'土', color:'#A079D6', planet:'水星',
    desc:'细致完美主义理性务实', img:'/zodiac-virgo.jpg' },
  { sym:'♎', name:'天秤座', en:'Libra', date:'9.23-10.23', el:'风', color:'#E8A0BF', planet:'金星',
    desc:'追求平衡与和谐优雅社交', img:'/zodiac-libra.jpg' },
  { sym:'♏', name:'天蝎座', en:'Scorpio', date:'10.24-11.22', el:'水', color:'#CC3355', planet:'冥王星',
    desc:'深沉敏锐意志力极强', img:'/zodiac-scorpio.jpg' },
  { sym:'♐', name:'射手座', en:'Sagittarius', date:'11.23-12.21', el:'火', color:'#4A90D9', planet:'木星',
    desc:'热爱自由与冒险乐观开朗', img:null },
  { sym:'♑', name:'摩羯座', en:'Capricorn', date:'12.22-1.19', el:'土', color:'#C49A6C', planet:'土星',
    desc:'坚韧务实有强烈责任感', img:'/zodiac-capricorn.jpg' },
  { sym:'♒', name:'水瓶座', en:'Aquarius', date:'1.20-2.18', el:'风', color:'#5BC0DE', planet:'天王星',
    desc:'独立创新思想前卫', img:'/zodiac-aquarius.jpg' },
  { sym:'♓', name:'双鱼座', en:'Pisces', date:'2.19-3.20', el:'水', color:'#7EC8E3', planet:'海王星',
    desc:'富有想象力艺术天赋高', img:'/zodiac-pisces.jpg' },
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
        background: #050B1A;
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
    `}</style>
  )
}

/* ================================ 宇宙背景 ================================ */
function CosmicBackground() {
  return (
    <>
      {/* 底色 + 线性渐变 */}
      <div className="fixed inset-0 z-0 pointer-events-none"
        style={{
          background: `
            linear-gradient(180deg,
              #1A0A3A 0%,
              #150E38 20%,
              #0F2040 45%,
              #0E1A38 55%,
              #0D1230 70%,
              #080A18 100%
            )
          `
        }}>
        {/* 银河光带（横向穿过页面中部） */}
        <div className="absolute w-[900px] h-[350px] opacity-[0.12]"
          style={{
            left:'50%', top:'48%',
            background:'radial-gradient(ellipse, #3A6AB5 0%, rgba(58,106,181,0.05) 40%, rgba(42,90,150,0.02) 65%, transparent 80%)',
            transform:'translate(-50%,-50%) rotate(-8deg)',
          }}/>
        <div className="absolute w-[1100px] h-[250px] opacity-[0.08]"
          style={{
            left:'50%', top:'48%',
            background:'radial-gradient(ellipse, #6B8FC5 0%, rgba(107,143,197,0.03) 35%, transparent 65%)',
            transform:'translate(-50%,-50%) rotate(-6deg)',
          }}/>
        {/* 银河中心亮区 */}
        <div className="absolute w-[400px] h-[200px] opacity-[0.10]"
          style={{
            left:'50%', top:'48%',
            background:'radial-gradient(ellipse, #8BAFE8 0%, rgba(139,175,232,0.04) 35%, transparent 60%)',
            transform:'translate(-50%,-50%)',
          }}/>
        {/* 上方紫色星云 */}
        <div className="absolute w-[500px] h-[350px] rounded-full opacity-[0.10]"
          style={{
            left:'30%', top:'18%',
            background:'radial-gradient(ellipse, #7A4DFF 0%, transparent 55%)',
            animation: 'nebulaA 14s ease-in-out infinite',
          }}/>
        <div className="absolute w-[400px] h-[300px] rounded-full opacity-[0.07]"
          style={{
            left:'65%', top:'22%',
            background:'radial-gradient(ellipse, #5B3A9B 0%, transparent 50%)',
            animation: 'nebulaB 12s ease-in-out infinite',
          }}/>
        {/* 金色光晕 - 浮动 */}
        <div className="absolute w-[500px] h-[500px] rounded-full opacity-[0.10]"
          style={{
            left:'45%', top:'44%',
            background:'radial-gradient(circle, #D4AF37 0%, rgba(212,175,55,0.03) 35%, transparent 55%)',
            transform:'translate(-50%,-50%)',
            animation: 'goldenA 9s ease-in-out infinite',
          }}/>
        <div className="absolute w-[350px] h-[350px] rounded-full opacity-[0.06]"
          style={{
            left:'52%', top:'52%',
            background:'radial-gradient(circle, #D4AF37 0%, rgba(212,175,55,0.02) 40%, transparent 50%)',
            transform:'translate(-50%,-50%)',
            animation: 'goldenB 11s ease-in-out infinite',
          }}/>
        {/* 底部蓝紫 */}
        <div className="absolute w-[450px] h-[300px] rounded-full opacity-[0.08]"
          style={{
            left:'40%', top:'78%',
            background:'radial-gradient(ellipse, #2A1A5A 0%, transparent 50%)',
            animation: 'nebulaC 15s ease-in-out infinite',
          }}/>
      </div>
      <StarParticles />
      <style>{`
        @keyframes nebulaA {
          0%,100% { left:30%; top:18%; opacity:0.10; }
          50% { left:33%; top:20%; opacity:0.14; }
        }
        @keyframes nebulaB {
          0%,100% { left:65%; top:22%; opacity:0.07; }
          50% { left:62%; top:19%; opacity:0.11; }
        }
        @keyframes nebulaC {
          0%,100% { left:40%; top:78%; opacity:0.08; }
          50% { left:43%; top:75%; opacity:0.12; }
        }
        @keyframes goldenA {
          0%,100% { left:45%; top:44%; opacity:0.10; }
          50% { left:48%; top:46%; opacity:0.14; }
        }
        @keyframes goldenB {
          0%,100% { left:52%; top:52%; opacity:0.06; }
          50% { left:49%; top:50%; opacity:0.10; }
        }
      `}</style>
    </>
  )
}

/* ================================ 星空粒子 ================================ */
function StarParticles() {
  return (
    <div className="fixed inset-0 z-[1] pointer-events-none overflow-hidden">
      <canvas className="absolute inset-0 w-full h-full"
        ref={el => {
          if (!el || el.dataset.done) return
          el.dataset.done = '1'
          const ctx = el.getContext('2d')
          let w, h, stars = [], meteors = [], frame = 0
          const resize = () => { w = el.width = window.innerWidth; h = el.height = window.innerHeight }
          resize()
          window.addEventListener('resize', resize)
          for (let i = 0; i < 130; i++) {
            const isBright = Math.random() > 0.8
            const isGold = Math.random() > 0.75
            stars.push({
              x: Math.random() * w, y: Math.random() * h,
              r: isBright ? Math.random() * 2 + 1.5 : Math.random() * 1.5 + 0.3,
              a: isBright ? Math.random() * 0.8 + 0.4 : Math.random() * 0.5 + 0.15,
              speed: Math.random() * 0.2 + 0.03,
              phase: Math.random() * Math.PI * 2,
              twinkle: Math.random() > 0.5,
              hue: isGold ? 45 : (Math.random() > 0.7 ? 0 : null),
            })
          }
          let id
          function draw() {
            ctx.clearRect(0, 0, w, h)
            const t = Date.now() / 1000
            frame++
            stars.forEach(s => {
              let alpha = s.a
              if (s.twinkle) {
                alpha = s.a * (0.4 + 0.6 * Math.abs(Math.sin(t * s.speed + s.phase)))
              }
              ctx.beginPath()
              ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2)
              if (s.hue) {
                ctx.fillStyle = `hsla(${s.hue}, 70%, 70%, ${alpha * 0.5})`
              } else {
                ctx.fillStyle = `rgba(255, 255, 255, ${alpha})`
              }
              ctx.fill()
            })
            // 流星
            if (frame % 150 === 0 && Math.random() > 0.5) {
              meteors.push({
                x: Math.random() * w * 0.6, y: Math.random() * h * 0.3,
                len: Math.random() * 100 + 50, speed: Math.random() * 14 + 10, life: 1,
              })
            }
            for (let i = meteors.length - 1; i >= 0; i--) {
              const m = meteors[i]
              m.x += m.speed * 1.2; m.y += m.speed * 0.3; m.life -= 0.02
              if (m.life <= 0) { meteors.splice(i, 1); continue }
              const tail = m.life * m.len
              ctx.beginPath()
              ctx.moveTo(m.x, m.y)
              ctx.lineTo(m.x - tail, m.y - tail * 0.3)
              const grad = ctx.createLinearGradient(m.x, m.y, m.x - tail, m.y - tail * 0.3)
              grad.addColorStop(0, `rgba(255, 240, 210, ${m.life * 0.7})`)
              grad.addColorStop(1, 'rgba(255, 240, 210, 0)')
              ctx.strokeStyle = grad; ctx.lineWidth = 1.8; ctx.stroke()
            }
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

/* ================================ HERO · 椭圆轨道漂浮卡牌 ================================ */
function HeroSection() {
  const [t, setT] = useState(0)
  const [paused, setPaused] = useState(false)
  const animRef = useRef(null)
  const lastTime = useRef(0)

  const cards = [
    { src: CARDS.fool, name:'愚人', num:'0', en:'The Fool', mean:'新的开始 · 冒险 · 纯真' },
    { src: CARDS.magician, name:'魔术师', num:'I', en:'The Magician', mean:'创造力 · 自信 · 技能' },
    { src: CARDS.priestess, name:'女祭司', num:'II', en:'The High Priestess', mean:'直觉 · 智慧 · 神秘' },
    { src: CARDS.star, name:'星星', num:'XVII', en:'The Star', mean:'希望 · 灵感 · 治愈' },
    { src: CARDS.world, name:'世界', num:'XXI', en:'The World', mean:'完成 · 圆满 · 整合' },
  ]

  const CARD_COUNT = cards.length
  const STEP = (2 * Math.PI) / CARD_COUNT
  const ORBIT_X = 160
  const ORBIT_Y = 100
  const TILT_Y = 65
  const BASE_W = 150
  const SCALE_MIN = 0.5
  const SCALE_MAX = 1.4

  useEffect(() => {
    if (paused) return
    let last = 0
    function animate(time) {
      if (!last) last = time
      const delta = time - last
      last = time
      setT(prev => (prev + delta * 0.00035) % (2 * Math.PI))
      animRef.current = requestAnimationFrame(animate)
    }
    animRef.current = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(animRef.current)
  }, [paused])

  function getCardProps(index) {
    const angle = t + index * STEP
    const cosA = Math.cos(angle)
    const sinA = Math.sin(angle)
    const depth = (cosA + 1) / 2
    const x = sinA * ORBIT_X
    const y = -cosA * TILT_Y + sinA * 6
    const scale = SCALE_MIN + (SCALE_MAX - SCALE_MIN) * depth
    const brightness = 0.3 + 0.7 * depth
    const blur = (1 - depth) * 3.5
    const zIndex = Math.round(100 + depth * 50)
    return { x, y, scale, brightness, blur, zIndex, depth }
  }

  const frontIdx = (() => {
    let maxDepth = -1, idx = 0
    for (let i = 0; i < CARD_COUNT; i++) {
      const p = getCardProps(i)
      if (p.depth > maxDepth) { maxDepth = p.depth; idx = i }
    }
    return idx
  })()

  const frontCard = cards[frontIdx]

  return (
    <section className="relative z-10 min-h-screen flex items-center pt-24 pb-16 overflow-hidden">
      <div className="max-w-[1200px] mx-auto px-6 w-full">
        <div className="flex items-center gap-8 max-lg:flex-col max-lg:text-center">

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

          <div className="flex-[0_0_360px] max-lg:order-1 max-lg:flex-[0_0_260px]"
               onMouseEnter={() => setPaused(true)}
               onMouseLeave={() => setPaused(false)}>
            <div className="relative select-none mx-auto mt-8" style={{ width:360, height:440, overflow:'visible' }}>
              <div className="absolute pointer-events-none rounded-full"
                style={{
                  left:'50%', top:'50%', width:300, height:240,
                  transform:'translate(-50%,-50%)',
                  background:'radial-gradient(ellipse, rgba(212,175,55,0.04) 0%, transparent 55%)',
                  zIndex:0,
                }}/>

              {cards.map((card, i) => {
                const { x, y, scale, brightness, blur, zIndex } = getCardProps(i)
                const w = BASE_W * scale
                return (
                  <div key={card.num}
                    className="absolute"
                    style={{
                      left: `calc(50% + ${x}px)`,
                      top: `calc(50% + ${y}px)`,
                      zIndex,
                      transform: 'translate(-50%,-50%)',
                    }}>
                    <div className="rounded-xl overflow-hidden cursor-pointer transition-shadow duration-500"
                      style={{
                        width: w,
                        height: w * 1.4,
                        filter: `brightness(${brightness}) blur(${blur}px)`,
                        border: '1px solid rgba(212,175,55,0.12)',
                        boxShadow: '0 8px 30px rgba(0,0,0,0.4)',
                      }}>
                      <img src={card.src} alt={card.name}
                        style={{ width:'100%', height:'100%', objectFit:'contain', display:'block' }}/>
                    </div>
                  </div>
                )
              })}
            </div>

            <div className="text-center mt-2">
              <p className="text-xs tracking-[3px]" style={{ color:'#D4AF37' }}>
                {frontCard.num} · {frontCard.en}
              </p>
              <p className="text-lg f-serif font-bold mt-0.5" style={{ color:'#FFF8E7' }}>
                {frontCard.name}
              </p>
              <p className="text-xs mt-0.5" style={{ color:'#7A6D8A' }}>
                {frontCard.mean}
              </p>
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
    <section id="tarot" className="relative z-10 py-24"
      style={{
        borderTop: '1px solid rgba(212,175,55,0.05)',
        borderBottom: '1px solid rgba(212,175,55,0.05)',
      }}>
      <div className="max-w-[1100px] mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-16">
          <div>
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
                <div key={t} className="flex-1 p-5 rounded-xl text-center"
                  style={{ background:'rgba(212,175,55,0.03)', border:'1px solid rgba(212,175,55,0.06)' }}>
                  <div className="text-3xl font-bold f-serif mb-1" style={{ color:'#D4AF37' }}>{n}</div>
                  <div className="text-xs" style={{ color:'#7A6D8A' }}>{t}<br/>{s}</div>
                </div>
              ))}
            </div>
            <p className="text-xs mb-3 tracking-[2px]" style={{ color:'#D4AF37' }}>小阿卡纳 · 四牌组</p>
            <div className="grid grid-cols-4 gap-3">
              {suits.map(s => (
                <div key={s.name} className="text-center p-3 rounded-lg transition-all duration-300 hover:-translate-y-1"
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
    <section id="features" className="relative z-10 py-24"
      style={{
        borderTop: '1px solid rgba(212,175,55,0.05)',
        borderBottom: '1px solid rgba(212,175,55,0.05)',
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
              desc:'三牌阵、凯尔特十字、感情/事业/财运/学业——覆盖生活各个领域。自定义牌阵也支持。' },
            { tag:'LIBRARY', title:'78张牌完整牌库',
              desc:'大阿卡纳 + 小阿卡纳四牌组，每张牌都有正/逆位含义、牌面象征解读、关键词标签。支持搜索和收藏。',
              imgs:[CARDS.priestess, CARDS.justice, CARDS.tower, CARDS.sun, CARDS.world] },
            { tag:'ZODIAC', title:'星座运势',
              desc:'每日/每周/每月运势、星座配对分析。每个星座结合塔罗牌解读，给你不一样的运势体验।',
              zodiac: true },
          ].map((f, i) => (
            <div key={i} className="p-6 rounded-2xl transition-all duration-300 hover:-translate-y-0.5 group"
              style={{ background:'rgba(212,175,55,0.02)', border:'1px solid rgba(212,175,55,0.04)' }}>
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

/* ================================ 星座长廊 ================================ */
function ZodiacSection() {
  const scrollRef = useRef(null)
  const [paused, setPaused] = useState(false)
  const [activeIdx, setActiveIdx] = useState(null)
  const [flipped, setFlipped] = useState({})
  const [cardWidth, setCardWidth] = useState(260)

  const toggleFlip = (key) => setFlipped(prev => ({...prev, [key]: !prev[key]}))

  useEffect(() => {
    function updateWidth() {
      if (window.innerWidth < 768) setCardWidth(Math.min(window.innerWidth * 0.75, 280))
      else setCardWidth(260)
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
      el.scrollLeft += 1.3
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
          <h2 className="text-3xl font-bold mb-3 f-serif" style={{ color:'#FFF8E7' }}>星座长廊</h2>
          <p className="text-sm" style={{ color:'#8B7D9B' }}>点击卡牌翻转查看详情</p>
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
              const flipKey = `zodiac-${i}`
              const isFlipped = flipped[flipKey] || false
              return (
                <div key={i}
                  className={`shrink-0 rounded-xl overflow-hidden transition-all duration-500 cursor-pointer relative ${!z.img ? 'zodiac-placeholder' : ''}`}
                  style={{
                    width: cardWidth,
                    aspectRatio: '5/7',
                    perspective: '1200px',
                  }}
                  onMouseEnter={() => setActiveIdx(i)}
                  onMouseLeave={() => setActiveIdx(null)}
                  onClick={() => { if (z.img) toggleFlip(flipKey) }}>
                  <div className="relative w-full h-full transition-all duration-700"
                    style={{
                      transformStyle: 'preserve-3d',
                      transform: isFlipped ? 'rotateY(180deg)' : 'none',
                    }}>
                    <div className="absolute inset-0 rounded-xl overflow-hidden"
                      style={{
                        backfaceVisibility: 'hidden',
                        border: isActive ? `2px solid ${z.color}` : z.img ? '1px solid rgba(212,175,55,0.05)' : '1px solid rgba(255,255,255,0.06)',
                        transform: isActive ? `perspective(800px) translateY(-12px) scale(1.04)` : 'none',
                        boxShadow: isActive ? `0 0 30px rgba(212,175,55,0.25), 0 0 60px rgba(212,175,55,0.1)` : '0 4px 16px rgba(0,0,0,0.3)',
                        transition: 'all 0.4s',
                      }}>
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
                              <p className="text-xs mt-1" style={{ color:'#B8A9C9' }}>{z.date}</p>
                              <p className="text-[10px] mt-0.5" style={{ color: z.color }}>{z.el} · {z.planet}</p>
                              <p className="text-[10px] mt-1 leading-relaxed" style={{ color:'#8B7D9B' }}>{z.desc}</p>
                              <p className="text-[9px] mt-2 tracking-[2px]" style={{ color:'#D4AF37' }}>点击翻转看详情</p>
                            </div>
                          </div>
                        </>
                      ) : (
                        <div className="w-full h-full flex flex-col items-center justify-center p-5 text-center"
                          style={{ background:`linear-gradient(180deg, ${z.color}08 0%, ${z.color}03 50%, rgba(10,10,18,1) 100%)` }}>
                          <div className="text-5xl mb-2" style={{ color:`${z.color}66` }}>{z.sym}</div>
                          <p className="text-base f-serif font-bold" style={{ color:'#FFF8E7' }}>{z.name}</p>
                          <p className="text-[11px] tracking-[3px]" style={{ color:`${z.color}99` }}>{z.en}</p>
                          <div className="w-6 h-px my-2" style={{ background:`${z.color}44` }}/>
                          <div className={`overflow-hidden transition-all duration-300 w-full ${isActive ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'}`}>
                            <p className="text-[10px]" style={{ color:'#8B7D9B' }}>{z.date}</p>
                            <p className="text-[10px] mt-0.5" style={{ color: z.color }}>{z.el} · {z.planet}</p>
                          </div>
                          <div className="mt-auto">
                            <span className="text-[8px] px-2 py-0.5 rounded-full tracking-[2px]"
                              style={{ background:'rgba(255,255,255,0.03)', border:'1px solid rgba(255,255,255,0.04)', color:'#5A4D6A' }}>
                              待生成
                            </span>
                          </div>
                        </div>
                      )}
                    </div>
                    <div className="absolute inset-0 rounded-xl overflow-hidden p-5 flex flex-col justify-center text-center"
                      style={{
                        backfaceVisibility: 'hidden',
                        transform: 'rotateY(180deg)',
                        background: `linear-gradient(145deg, ${z.color}15, ${z.color}08, #0A0A1E)`,
                        border: `1px solid ${z.color}30`,
                      }}>
                      <div className="text-3xl mb-2" style={{ color: z.color }}>{z.sym}</div>
                      <p className="text-lg f-serif font-bold" style={{ color:'#FFF8E7' }}>{z.name}</p>
                      <p className="text-[11px] tracking-[4px] mb-3" style={{ color: `${z.color}AA` }}>{z.en}</p>
                      <div className="w-8 h-px mx-auto mb-3" style={{ background: `${z.color}55` }}/>
                      <p className="text-[11px] leading-relaxed" style={{ color:'#B8A9C9' }}>{z.date}</p>
                      <p className="text-[10px] mt-0.5" style={{ color: z.color }}>{z.el} · 守护星: {z.planet}</p>
                      <div className="mt-2 p-2 rounded-lg" style={{ background:'rgba(0,0,0,0.2)' }}>
                        <p className="text-[10px] leading-relaxed italic" style={{ color:'#D4AF37' }}>{z.desc}</p>
                      </div>
                      <p className="text-[9px] mt-3 tracking-[2px]" style={{ color:'#5A4D6A' }}>点击翻回</p>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
      <div className="text-center mt-10">
        <p className="text-xs tracking-[3px]" style={{ color:'#5A4D6A' }}>
          ✦ 点击卡牌翻转 · 查看星座详情 ✦
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
              background: 'linear-gradient(135deg, #8B6914, #D4AF37)',
              color: '#07060a',
              boxShadow: '0 8px 30px rgba(212,175,55,0.15), 0 0 60px rgba(212,175,55,0.05)',
              animation: 'ctaPulse 3s ease-in-out infinite',
            }}>
            进入星塔占卜
          </a>
          <a href="#gallery"
            className="inline-block py-4 px-12 rounded-xl text-base no-underline tracking-[3px] transition-all duration-300"
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