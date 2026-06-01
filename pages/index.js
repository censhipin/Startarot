import Head from 'next/head'
import { useState, useEffect, useRef, useCallback } from 'react'

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
  hermit: 'https://upload.wikimedia.org/wikipedia/commons/4/4d/RWS_Tarot_09_Hermit.jpg',
  wheel: 'https://raw.githubusercontent.com/metabismuth/tarot-json/master/cards/m10.jpg',
  justice: 'https://upload.wikimedia.org/wikipedia/commons/e/e0/RWS_Tarot_11_Justice.jpg',
  hanged: 'https://upload.wikimedia.org/wikipedia/commons/5/52/RWS_Tarot_12_Hanged.jpg',
  death: 'https://upload.wikimedia.org/wikipedia/commons/d/d7/RWS_Tarot_13_Death.jpg',
  temperance: 'https://upload.wikimedia.org/wikipedia/commons/f/f8/RWS_Tarot_14_Temperance.jpg',
  devil: 'https://upload.wikimedia.org/wikipedia/commons/5/55/RWS_Tarot_15_Devil.jpg',
  tower: 'https://upload.wikimedia.org/wikipedia/commons/5/53/RWS_Tarot_16_Tower.jpg',
  moon: 'https://upload.wikimedia.org/wikipedia/commons/7/7f/RWS_Tarot_18_Moon.jpg',
  sun: 'https://upload.wikimedia.org/wikipedia/commons/1/17/RWS_Tarot_19_Sun.jpg',
  judgement: 'https://upload.wikimedia.org/wikipedia/commons/d/dd/RWS_Tarot_20_Judgement.jpg',
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
        <PopularSection />
        <TrendingSection />
        <ExampleSection />
        <SpreadSection />
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
      <div className="fixed inset-0 z-0 pointer-events-none"
        style={{
          background: `
            linear-gradient(180deg,
              #1E0A3E 0%,
              #180E38 18%,
              #0F1A3A 38%,
              #0E1A30 58%,
              #12102E 78%,
              #0A0820 100%
            )
          `
        }}>
        {/* 顶部深紫星云 */}
        <div className="absolute top-[-10%] left-[5%] w-[700px] h-[600px] rounded-full opacity-[0.20]"
          style={{ background:'radial-gradient(ellipse, #7A4DFF 0%, transparent 55%)' }}/>
        <div className="absolute top-[5%] right-[10%] w-[500px] h-[500px] rounded-full opacity-[0.15]"
          style={{ background:'radial-gradient(circle, #9B6DFF 0%, transparent 55%)' }}/>
        {/* 中部深蓝星云 */}
        <div className="absolute top-[30%] left-[15%] w-[600px] h-[450px] rounded-full opacity-[0.18]"
          style={{ background:'radial-gradient(ellipse, #2A5A9B 0%, transparent 50%)' }}/>
        <div className="absolute top-[40%] right-[5%] w-[550px] h-[450px] rounded-full opacity-[0.15]"
          style={{ background:'radial-gradient(ellipse, #1A4A8C 0%, transparent 50%)' }}/>
        {/* 底部深蓝紫 */}
        <div className="absolute bottom-[5%] left-[20%] w-[500px] h-[400px] rounded-full opacity-[0.12]"
          style={{ background:'radial-gradient(ellipse, #2A1A5A 0%, transparent 50%)' }}/>
        <div className="absolute bottom-[0%] right-[20%] w-[450px] h-[350px] rounded-full opacity-[0.10]"
          style={{ background:'radial-gradient(ellipse, #1A2A5A 0%, transparent 50%)' }}/>
      </div>
      <StarParticles />
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

/* ================================ 热门测算 ================================ */
function PopularSection() {
  const cards = [
    { icon:'❤️', title:'爱情测算', questions:['他对我是什么感觉？','我们能复合吗？','我的正缘什么时候出现？'], color:'#F472B6' },
    { icon:'💼', title:'事业测算', questions:['我该跳槽吗？','创业时机是否成熟？','如何提升职场运势？'], color:'#60A5FA' },
    { icon:'💰', title:'财富测算', questions:['我的财运走向如何？','近期有投资机会吗？','如何提升收入？'], color:'#FBBF24' },
    { icon:'⭐', title:'综合运势', questions:['本周运势如何？','我的幸运方向在哪？','近期需要注意什么？'], color:'#A78BFA' },
    { icon:'💕', title:'关系匹配', questions:['我们是否合适？','如何改善关系？','对方在想什么？'], color:'#F472B6' },
    { icon:'🔮', title:'人生指引', questions:['我的人生方向是什么？','如何做出重要选择？','当下最需要什么？'], color:'#60A5FA' },
  ]

  return (
    <section className="relative z-10 py-20"
      style={{
        borderTop: '1px solid rgba(212,175,55,0.05)',
        borderBottom: '1px solid rgba(212,175,55,0.05)',
      }}>
      <div className="max-w-[1100px] mx-auto px-6">
        <div className="text-center mb-12">
          <p className="text-xs tracking-[5px] mb-3" style={{ color:'#D4AF37' }}>HOT READINGS</p>
          <h2 className="text-3xl font-bold mb-2 f-serif" style={{ color:'#FFF8E7' }}>你想获得什么答案？</h2>
          <p className="text-sm" style={{ color:'#8B7D9B' }}>爱情 · 事业 · 财富 · 未来方向</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {cards.map((card, i) => (
            <div key={i}
              className="p-5 rounded-xl transition-all duration-400 group cursor-pointer hover:-translate-y-1"
              style={{
                background: 'rgba(212,175,55,0.02)',
                border: '1px solid rgba(212,175,55,0.06)',
              }}>
              <div className="flex items-center gap-3 mb-3">
                <span className="text-2xl">{card.icon}</span>
                <h3 className="text-base f-serif font-bold" style={{ color:'#FFF8E7' }}>{card.title}</h3>
              </div>
              <ul className="space-y-1.5 mb-4">
                {card.questions.map((q, j) => (
                  <li key={j} className="text-xs flex items-start gap-2" style={{ color:'#7A6D8A' }}>
                    <span style={{ color: card.color }}>✦</span>
                    <span>{q}</span>
                  </li>
                ))}
              </ul>
              <a href="#cta"
                className="inline-block w-full text-center py-2 rounded-lg text-xs font-medium no-underline tracking-[2px] transition-all duration-300 hover:-translate-y-0.5"
                style={{
                  background: 'linear-gradient(135deg, #8B6914, #D4AF37)',
                  color: '#07060a',
                }}>
                立即测算 →
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ================================ 大家都在测 ================================ */
function TrendingSection() {
  const questions = [
    { q:'他还喜欢我吗？', icon:'💕', color:'#F472B6' },
    { q:'我们还有复合机会吗？', icon:'💫', color:'#A78BFA' },
    { q:'我的正缘什么时候出现？', icon:'❤️', color:'#FB7185' },
    { q:'最近财运会变好吗？', icon:'💰', color:'#FBBF24' },
    { q:'我该换工作吗？', icon:'💼', color:'#60A5FA' },
    { q:'未来三个月运势如何？', icon:'⭐', color:'#34D399' },
    { q:'今年能脱单吗？', icon:'🌈', color:'#F472B6' },
    { q:'TA是否在想我？', icon:'🔮', color:'#A78BFA' },
    { q:'我的事业会有突破吗？', icon:'🚀', color:'#60A5FA' },
    { q:'最近适合投资吗？', icon:'📈', color:'#FBBF24' },
  ]

  const scrollRef = useRef(null)
  const [paused, setPaused] = useState(false)

  useEffect(() => {
    if (paused) return
    const el = scrollRef.current
    if (!el) return
    const interval = setInterval(() => {
      el.scrollLeft += 0.6
      if (el.scrollLeft >= (el.scrollWidth - el.clientWidth)) el.scrollLeft = 0
    }, 30)
    return () => clearInterval(interval)
  }, [paused])

  return (
    <section className="relative z-10 py-20"
      style={{
        borderTop: '1px solid rgba(212,175,55,0.05)',
        borderBottom: '1px solid rgba(212,175,55,0.05)',
      }}>
      <div className="max-w-[1100px] mx-auto px-6">
        <div className="text-center mb-12">
          <p className="text-xs tracking-[5px] mb-3" style={{ color:'#D4AF37' }}>TRENDING</p>
          <h2 className="text-3xl font-bold mb-2 f-serif" style={{ color:'#FFF8E7' }}>大家都在测什么？</h2>
          <p className="text-sm" style={{ color:'#8B7D9B' }}>探索最受欢迎的塔罗问题</p>
        </div>
      </div>

      <div className="relative max-w-[1100px] mx-auto px-6"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}>
        <div ref={scrollRef}
          className="overflow-x-auto"
          style={{ scrollbarWidth:'none', msOverflowStyle:'none', cursor:'grab' }}>
          <div className="inline-flex gap-4 py-2">
            {[...questions, ...questions].map((item, i) => (
              <div key={i}
                className="shrink-0 w-[200px] p-5 rounded-xl transition-all duration-400 cursor-pointer hover:-translate-y-1 group flex flex-col"
                style={{
                  background: 'rgba(255,255,255,0.02)',
                  backdropFilter: 'blur(12px)',
                  border: '1px solid rgba(212,175,55,0.06)',
                  height: 200,
                }}>
                <div className="text-2xl mb-2">{item.icon}</div>
                <div className="flex-1 flex items-center justify-center">
                  <p className="text-sm truncate w-full text-center" style={{ color:'#B8A9C9' }}>「{item.q}」</p>
                </div>
                <a href="#cta"
                  className="inline-block w-full text-center py-2 rounded-lg text-xs font-medium no-underline tracking-[2px] transition-all duration-300 hover:-translate-y-0.5 mt-auto"
                  style={{
                    background: 'linear-gradient(135deg, #8B6914, #D4AF37)',
                    color: '#07060a',
                    opacity: 0.9,
                  }}>
                  立即测算 →
                </a>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

/* ================================ 测算结果示例 ================================ */
function ExampleSection() {
  const cases = [
    {
      icon:'❤️', title:'爱情测算',
      question:'他还喜欢我吗？',
      cards: [CARDS.lovers, CARDS.star, CARDS.sun],
      cardsNum: ['VI','XVII','XIX'],
      result:'恋人正位表明你们之间存在强烈的情感连接，星星牌带来希望与治愈，太阳牌预示光明的前景。整体来看，对方对你有感情，但需要主动沟通确认。',
      color:'#F472B6',
    },
    {
      icon:'💼', title:'事业测算',
      question:'我该跳槽吗？',
      cards: [CARDS.magician, CARDS.chariot, CARDS.world],
      cardsNum: ['I','VII','XXI'],
      result:'魔术师代表你拥有充足的能力与资源，战车预示需要坚定的意志去做出改变，世界牌象征圆满的完成。三张牌共同指向——现在是跳槽的好时机。',
      color:'#60A5FA',
    },
    {
      icon:'💰', title:'财富测算',
      question:'最近财运会变好吗？',
      cards: [CARDS.wheel, CARDS.empress, CARDS.strength],
      cardsNum: ['X','III','VIII'],
      result:'命运之轮预示运势即将迎来转机，女皇象征丰饶与收获，力量牌提醒你保持耐心与内在的坚定。财运正在回升，但要避免冲动投资。',
      color:'#FBBF24',
    },
    {
      icon:'🔮', title:'人生方向',
      question:'我接下来该怎么走？',
      cards: [CARDS.fool, CARDS.death, CARDS.judgement],
      cardsNum: ['0','XIII','XX'],
      result:'愚人代表新的开始与冒险，死神预示需要放下过去才能迎来新生，审判牌召唤你听从内心的声音。放下包袱，大胆走向新的阶段。',
      color:'#A78BFA',
    },
  ]

  return (
    <section className="relative z-10 py-20"
      style={{
        borderTop: '1px solid rgba(212,175,55,0.05)',
        borderBottom: '1px solid rgba(212,175,55,0.05)',
      }}>
      <div className="max-w-[1100px] mx-auto px-6">
        <div className="text-center mb-12">
          <p className="text-xs tracking-[5px] mb-3" style={{ color:'#D4AF37' }}>READING EXAMPLES</p>
          <h2 className="text-3xl font-bold mb-2 f-serif" style={{ color:'#FFF8E7' }}>测算结果示例</h2>
          <p className="text-sm" style={{ color:'#8B7D9B' }}>真实用户案例 · 每张牌都蕴藏着答案</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {cases.map((c, i) => (
            <div key={i}
              className="p-5 rounded-xl transition-all duration-400"
              style={{
                background: 'rgba(212,175,55,0.02)',
                border: '1px solid rgba(212,175,55,0.06)',
              }}>
              <div className="flex items-center gap-2 mb-3">
                <span className="text-xl">{c.icon}</span>
                <h3 className="text-base f-serif font-bold" style={{ color:'#FFF8E7' }}>{c.title}</h3>
              </div>

              <p className="text-xs mb-3" style={{ color:'#7A6D8A' }}>
                <span style={{ color: c.color }}>Q: </span>「{c.question}」
              </p>

              <div className="flex gap-2 mb-3">
                {c.cards.map((src, j) => (
                  <div key={j} className="flex-1 rounded-lg overflow-hidden transition-all duration-300 hover:scale-105"
                    style={{ border: '1px solid rgba(212,175,55,0.06)', background: 'transparent' }}>
                    <img src={src} alt=""
                      style={{ width:'100%', aspectRatio:'5/7', objectFit:'contain', display:'block' }}/>
                  </div>
                ))}
              </div>

              <div className="flex gap-1 justify-center mb-3">
                {c.cardsNum.map((num, j) => (
                  <span key={j} className="text-[9px] tracking-[2px] px-2 py-0.5 rounded"
                    style={{ background:'rgba(212,175,55,0.06)', color:'#D4AF37' }}>
                    {num}
                  </span>
                ))}
              </div>

              <p className="text-xs leading-relaxed mb-3 line-clamp-4" style={{ color:'#B8A9C9' }}>
                {c.result}
              </p>

              <a href="#cta"
                className="inline-block w-full text-center py-2 rounded-lg text-xs font-medium no-underline tracking-[2px] transition-all duration-300 hover:-translate-y-0.5"
                style={{
                  background: 'linear-gradient(135deg, #8B6914, #D4AF37)',
                  color: '#07060a',
                }}>
                我也要测算 →
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ================================ 热门牌阵 ================================ */
function SpreadSection() {
  const spreads = [
    { name:'爱情牌阵', desc:'感情走向、桃花运势、复合机会', cards:[CARDS.lovers, CARDS.star, CARDS.sun] },
    { name:'事业牌阵', desc:'职场发展、跳槽时机、创业方向', cards:[CARDS.magician, CARDS.chariot, CARDS.world] },
    { name:'学业牌阵', desc:'考试运势、专业选择、学业瓶颈', cards:[CARDS.priestess, CARDS.hermit, CARDS.strength] },
    { name:'运势牌阵', desc:'综合运势、近期提醒、能量指引', cards:[CARDS.wheel, CARDS.moon, CARDS.judgement] },
    { name:'人生方向牌阵', desc:'人生抉择、迷茫指引、目标规划', cards:[CARDS.fool, CARDS.death, CARDS.temperance] },
    { name:'财富牌阵', desc:'财运走势、投资时机、财务建议', cards:[CARDS.empress, CARDS.justice, CARDS.wheel] },
    { name:'关系匹配牌阵', desc:'两人契合度、关系走向、改善建议', cards:[CARDS.lovers, CARDS.priestess, CARDS.star] },
    { name:'每日指引牌阵', desc:'一日运势、今日提醒、能量聚焦', cards:[CARDS.star] },
  ]

  return (
    <section className="relative z-10 py-20"
      style={{
        borderTop: '1px solid rgba(212,175,55,0.05)',
        borderBottom: '1px solid rgba(212,175,55,0.05)',
      }}>
      <div className="max-w-[1100px] mx-auto px-6">
        <div className="text-center mb-12">
          <p className="text-xs tracking-[5px] mb-3" style={{ color:'#D4AF37' }}>POPULAR SPREADS</p>
          <h2 className="text-3xl font-bold mb-2 f-serif" style={{ color:'#FFF8E7' }}>热门牌阵</h2>
          <p className="text-sm" style={{ color:'#8B7D9B' }}>选择适合你的牌阵，开始占卜之旅</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {spreads.map((s, i) => (
            <div key={i}
              className="p-4 rounded-xl transition-all duration-400 hover:-translate-y-1 group"
              style={{
                background: 'rgba(255,255,255,0.02)',
                backdropFilter: 'blur(12px)',
                border: '1px solid rgba(212,175,55,0.06)',
              }}>
              <h3 className="text-sm f-serif font-bold mb-1" style={{ color:'#FFF8E7' }}>{s.name}</h3>
              <p className="text-[10px] mb-3 leading-relaxed line-clamp-2" style={{ color:'#7A6D8A' }}>{s.desc}</p>

              <div className="flex gap-1.5 mb-3 justify-center">
                {s.cards.map((src, j) => (
                  <div key={j} className="rounded overflow-hidden flex-1"
                    style={{ border:'1px solid rgba(212,175,55,0.06)', background:'transparent', maxWidth:70 }}>
                    <img src={src} alt=""
                      style={{ width:'100%', aspectRatio:'5/7', objectFit:'contain', display:'block' }}/>
                  </div>
                ))}
              </div>

              <a href="#cta"
                className="inline-block w-full text-center py-2 rounded-lg text-[10px] font-medium no-underline tracking-[2px] transition-all duration-300 hover:-translate-y-0.5"
                style={{
                  background: 'linear-gradient(135deg, #8B6914, #D4AF37)',
                  color: '#07060a',
                }}>
                立即抽牌 →
              </a>
            </div>
          ))}
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

/* ================================ 78张完整牌数据 ================================ */
const ALL_CARDS = [
  { id:'m0', name:'愚人', en:'The Fool', num:'0', src:CARDS.fool, upright:'新的开始、冒险、信任、纯真', reversed:'鲁莽、轻率', desc:'放下对未知的恐惧，勇敢迈出第一步。新的旅程正在等待你。' },
  { id:'m1', name:'魔术师', en:'The Magician', num:'I', src:CARDS.magician, upright:'创造力、自信、技能、资源', reversed:'操纵、才能浪费', desc:'你已拥有所需的一切资源，相信自己，去实现你的目标。' },
  { id:'m2', name:'女祭司', en:'The High Priestess', num:'II', src:CARDS.priestess, upright:'直觉、内在智慧、神秘', reversed:'秘密、表面现象', desc:'静下来倾听你的内心，答案已在心中。相信你的直觉。' },
  { id:'m3', name:'女皇', en:'The Empress', num:'III', src:CARDS.empress, upright:'丰饶、母性、自然、舒适', reversed:'依赖、创造受阻', desc:'允许自己享受生活的美好，滋养自己也滋养身边的人。' },
  { id:'m4', name:'皇帝', en:'The Emperor', num:'IV', src:CARDS.emperor, upright:'权威、结构、稳定', reversed:'专制、僵化', desc:'建立秩序和规则是必要的，但不要变得僵化和专制。' },
  { id:'m5', name:'教皇', en:'The Hierophant', num:'V', src:CARDS.hierophant, upright:'传统、精神指引、信仰', reversed:'非正统、个人信念', desc:'有时候需要遵循传统和权威的指引，但也要保持独立思考。' },
  { id:'m6', name:'恋人', en:'The Lovers', num:'VI', src:CARDS.lovers, upright:'爱情、选择、和谐', reversed:'不合、失衡', desc:'面对选择时，跟随你的内心，而不是被外界的期望左右。' },
  { id:'m7', name:'战车', en:'The Chariot', num:'VII', src:CARDS.chariot, upright:'胜利、意志力、决心', reversed:'方向不明、失控', desc:'用坚定的意志控制对立的力量，胜利属于你。' },
  { id:'m8', name:'力量', en:'Strength', num:'VIII', src:CARDS.strength, upright:'勇气、内在力量、慈悲', reversed:'自我怀疑', desc:'真正的力量来自内心的温柔与坚定，用爱化解恐惧。' },
  { id:'m9', name:'隐士', en:'The Hermit', num:'IX', src:CARDS.hermit, upright:'内省、智慧、寻找真理', reversed:'孤独、退缩', desc:'独处和反思是智慧的来源，给自己一些安静的时间。' },
  { id:'m10', name:'命运之轮', en:'Wheel of Fortune', num:'X', src:CARDS.wheel, upright:'变化、循环、转折点', reversed:'坏运气、抵制变化', desc:'变化是唯一不变的真理，新的阶段即将开启。' },
  { id:'m11', name:'正义', en:'Justice', num:'XI', src:CARDS.justice, upright:'公平、真相、因果报应', reversed:'不公、欺骗', desc:'真相终将浮出水面，做出对的选择，承担应有的责任。' },
  { id:'m12', name:'倒吊人', en:'The Hanged Man', num:'XII', src:CARDS.hanged, upright:'暂停、牺牲、新视角', reversed:'拖延、抗拒', desc:'有时候需要暂停和放下，才能获得全新的视角。' },
  { id:'m13', name:'死神', en:'Death', num:'XIII', src:CARDS.death, upright:'结束、转变、放下、新生', reversed:'抗拒改变', desc:'告别旧的才能迎接新的，放手是一种勇气也是一种智慧。' },
  { id:'m14', name:'节制', en:'Temperance', num:'XIV', src:CARDS.temperance, upright:'平衡、调和、耐心', reversed:'失衡、过度', desc:'保持平衡，找到中庸之道，耐心等待最好的时机。' },
  { id:'m15', name:'恶魔', en:'The Devil', num:'XV', src:CARDS.devil, upright:'束缚、欲望、成瘾', reversed:'觉醒、挣脱', desc:'认清是什么在束缚你——很多时候锁链是你自己戴上的。' },
  { id:'m16', name:'高塔', en:'The Tower', num:'XVI', src:CARDS.tower, upright:'剧变、崩塌、觉醒', reversed:'抵抗改变', desc:'当旧的结构崩塌时不要恐慌，这为新的建设腾出了空间。' },
  { id:'m17', name:'星星', en:'The Star', num:'XVII', src:CARDS.star, upright:'希望、灵感、治愈', reversed:'绝望、失去方向', desc:'保持希望，即使现在看不清前路，宇宙正在为你指引方向。' },
  { id:'m18', name:'月亮', en:'The Moon', num:'XVIII', src:CARDS.moon, upright:'直觉、恐惧、潜意识', reversed:'焦虑消散', desc:'你所恐惧的可能只是幻觉，面对你的潜意识，真相会浮现。' },
  { id:'m19', name:'太阳', en:'The Sun', num:'XIX', src:CARDS.sun, upright:'喜悦、成功、活力', reversed:'暂时低落', desc:'你正处在光明之中，享受这份喜悦和成功！' },
  { id:'m20', name:'审判', en:'Judgement', num:'XX', src:CARDS.judgement, upright:'重生、觉醒、清算', reversed:'自我怀疑', desc:'放下过去，迎接新生，现在是觉醒的时刻。' },
  { id:'m21', name:'世界', en:'The World', num:'XXI', src:CARDS.world, upright:'完成、成就、圆满', reversed:'未完成、拖延', desc:'一个阶段圆满结束，庆祝之后准备开始新的循环。' },
]

/* ================================ 核心功能 ================================ */
function FeaturesSection() {
  const [drawnCard, setDrawnCard] = useState(null)
  const [isDrawing, setIsDrawing] = useState(false)
  const [showResult, setShowResult] = useState(false)
  const [shuffleIdx, setShuffleIdx] = useState(0)

  const startDraw = () => {
    if (isDrawing) return
    setIsDrawing(true)
    setShowResult(false)
    setDrawnCard(null)

    let count = 0
    const interval = setInterval(() => {
      count++
      setShuffleIdx(Math.floor(Math.random() * ALL_CARDS.length))
      if (count >= 20) {
        clearInterval(interval)
        const final = ALL_CARDS[Math.floor(Math.random() * ALL_CARDS.length)]
        setDrawnCard(final)
        setIsDrawing(false)
        setShowResult(true)
      }
    }, 100)
  }

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

          {/* 1. 每日一牌 · 交互抽牌 */}
          <div className="p-6 rounded-2xl transition-all duration-300 hover:-translate-y-0.5 group"
            style={{ background:'rgba(212,175,55,0.02)', border:'1px solid rgba(212,175,55,0.04)' }}>
            <p className="text-xs tracking-[4px] mb-1" style={{ color:'#D4AF37' }}>DAILY DRAW</p>
            <h3 className="text-lg font-bold mb-2 f-serif" style={{ color:'#FFF8E7' }}>每日一牌</h3>
            <p className="text-sm mb-4 leading-relaxed" style={{ color:'#A99BB8' }}>
              点击卡牌，从78张塔罗牌中抽取今日指引
            </p>

            <div className="flex gap-5 items-start">
              {/* 左侧卡牌（加大到135px） */}
              <div className="shrink-0" style={{ width:135 }}>
                <div onClick={startDraw}
                  className="rounded-xl overflow-hidden cursor-pointer transition-all duration-300 hover:-translate-y-1 relative"
                  style={{
                    aspectRatio:'5/7',
                    border: showResult ? '1.5px solid rgba(212,175,55,0.25)' : '1px solid rgba(212,175,55,0.12)',
                    boxShadow: showResult ? '0 0 30px rgba(212,175,55,0.12)' : '0 4px 12px rgba(0,0,0,0.3)',
                  }}>
                  {isDrawing ? (
                    <div className="w-full h-full flex items-center justify-center relative overflow-hidden"
                      style={{ background:'linear-gradient(145deg, #1a0f2a, #0f0818)' }}>
                      <div key={shuffleIdx} className="absolute inset-0 flex items-center justify-center"
                        style={{ animation:'fadeInFast 0.08s ease-out forwards' }}>
                        <span className="text-xs tracking-[3px]" style={{ color:'rgba(212,175,55,0.6)' }}>
                          {ALL_CARDS[shuffleIdx]?.num}
                        </span>
                      </div>
                    </div>
                  ) : showResult && drawnCard ? (
                    <img src={drawnCard.src} alt={drawnCard.name}
                      style={{ width:'100%', height:'100%', objectFit:'contain', display:'block' }}/>
                  ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center gap-2"
                      style={{ background:'linear-gradient(145deg, #1a0f2a, #0f0818)' }}>
                      <span className="text-xl" style={{ color:'rgba(212,175,55,0.3)' }}>✦</span>
                      <span className="text-[10px] tracking-[3px]" style={{ color:'rgba(212,175,55,0.4)' }}>点击抽牌</span>
                    </div>
                  )}
                </div>
                {!showResult && !isDrawing && (
                  <button onClick={startDraw}
                    className="w-full mt-2 py-2 rounded-lg text-xs font-medium tracking-[2px] cursor-pointer transition-all border-none hover:-translate-y-0.5"
                    style={{ background:'linear-gradient(135deg, #8B6914, #D4AF37)', color:'#07060a' }}>
                    抽一张
                  </button>
                )}
                {showResult && (
                  <button onClick={() => { setShowResult(false); setDrawnCard(null) }}
                    className="w-full mt-2 py-1.5 rounded-lg text-[10px] tracking-[2px] cursor-pointer transition-all border-none"
                    style={{ background:'rgba(212,175,55,0.06)', color:'#7A6D8A', border:'1px solid rgba(212,175,55,0.06)' }}>
                    再抽一次
                  </button>
                )}
              </div>

              {/* 右侧结果信息 */}
              <div className="flex-1 min-w-0">
                {showResult && drawnCard ? (
                  <div className="animate-fadeIn">
                    <p className="text-sm f-serif font-bold" style={{ color:'#F1F0FB' }}>
                      {drawnCard.num} · {drawnCard.name}
                    </p>
                    <p className="text-xs mt-0.5" style={{ color:'#D4AF37' }}>{drawnCard.en}</p>
                    <div className="w-6 h-px my-2" style={{ background:'rgba(212,175,55,0.3)' }}/>
                    <p className="text-xs leading-relaxed" style={{ color:'#B8A9C9' }}>
                      <span style={{ color:'#D4AF37' }}>今日运势 · </span>
                      {drawnCard.desc}
                    </p>
                    <p className="text-xs mt-2 leading-relaxed" style={{ color:'#A99BB8' }}>
                      <span style={{ color:'#D4AF37' }}>正位 · </span>
                      {drawnCard.upright}
                    </p>
                    <p className="text-[10px] mt-2" style={{ color:'#5A4D6A' }}>
                      点击下方查看完整卡牌解读
                    </p>
                    <a href="#cta"
                      className="inline-block mt-3 py-2 px-5 rounded-lg text-xs font-medium no-underline tracking-[2px] transition-all duration-300 hover:-translate-y-0.5"
                      style={{
                        background:'linear-gradient(135deg, #8B6914, #D4AF37)',
                        color:'#07060a',
                      }}>
                      查看完整解读 →
                    </a>
                  </div>
                ) : !isDrawing ? (
                  <div className="flex flex-col justify-center h-full">
                    <p className="text-sm" style={{ color:'#7A6D8A' }}>
                      点击左侧卡牌，从78张塔罗牌中抽取你的今日指引
                    </p>
                    <p className="text-xs mt-2" style={{ color:'#5A4D6A' }}>
                      ✦ 22张大阿卡纳 + 56张小阿卡纳
                    </p>
                  </div>
                ) : (
                  <div className="flex items-center justify-center h-full">
                    <div className="text-center">
                      <div className="inline-block w-6 h-6 rounded-full mb-2"
                        style={{
                          border:'2px solid rgba(212,175,55,0.15)',
                          borderTopColor:'#D4AF37',
                          animation:'spin 1s linear infinite',
                        }}/>
                      <p className="text-xs" style={{ color:'#D4AF37' }}>正在抽取...</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* 2. 多牌阵占卜 */}
          <div className="p-6 rounded-2xl transition-all duration-300 hover:-translate-y-0.5 group"
            style={{ background:'rgba(212,175,55,0.02)', border:'1px solid rgba(212,175,55,0.04)' }}>
            <p className="text-xs tracking-[4px] mb-1" style={{ color:'#D4AF37' }}>SPREADS</p>
            <h3 className="text-lg font-bold mb-3 f-serif" style={{ color:'#FFF8E7' }}>多牌阵占卜</h3>
            <p className="text-sm mb-4 leading-relaxed" style={{ color:'#A99BB8' }}>
              三牌阵、凯尔特十字、感情/事业/财运/学业——覆盖生活各个领域。自定义牌阵也支持。
            </p>
            <div className="flex items-end justify-center gap-2">
              {[{ src:CARDS.fool, label:'过去' },{ src:CARDS.magician, label:'现在' },{ src:CARDS.world, label:'未来' }].map((item,i) => (
                <div key={i} className="flex flex-col items-center gap-1">
                  <div className="rounded-lg overflow-hidden"
                    style={{ width:i===1?80:65, aspectRatio:'5/7', border:'1px solid rgba(212,175,55,0.1)', transform:i===1?'translateY(-4px)':'none' }}>
                    <img src={item.src} alt={item.label} style={{ width:'100%', height:'100%', objectFit:'cover' }}/>
                  </div>
                  <span className="text-[10px] tracking-[2px]" style={{ color:'#5A4D6A' }}>{item.label}</span>
                </div>
              ))}
            </div>
            <p className="text-xs text-center mt-3" style={{ color:'#7A6D8A' }}>三牌阵 · 凯尔特十字 · 感情 · 事业 · 财运 · 学业</p>
          </div>

          {/* 3. 78张牌完整牌库 */}
          <div className="p-6 rounded-2xl transition-all duration-300 hover:-translate-y-0.5 group"
            style={{ background:'rgba(212,175,55,0.02)', border:'1px solid rgba(212,175,55,0.04)' }}>
            <p className="text-xs tracking-[4px] mb-1" style={{ color:'#D4AF37' }}>LIBRARY</p>
            <h3 className="text-lg font-bold mb-3 f-serif" style={{ color:'#FFF8E7' }}>78张牌完整牌库</h3>
            <p className="text-sm mb-3 leading-relaxed" style={{ color:'#A99BB8' }}>
              大阿卡纳 + 小阿卡纳四牌组，每张牌都有正/逆位含义、牌面象征解读、关键词标签。支持搜索和收藏。
            </p>
            <div className="flex gap-2">
              {[CARDS.priestess, CARDS.justice, CARDS.tower, CARDS.sun, CARDS.world].map((src,i) => (
                <div key={i} className="flex-1 rounded overflow-hidden" style={{ border:'1px solid rgba(212,175,55,0.06)' }}>
                  <img src={src} alt="" style={{ width:'100%', aspectRatio:'5/7', objectFit:'cover' }}/>
                </div>
              ))}
            </div>
          </div>

          {/* 4. 星座运势 */}
          <div className="p-6 rounded-2xl transition-all duration-300 hover:-translate-y-0.5 group"
            style={{ background:'rgba(212,175,55,0.02)', border:'1px solid rgba(212,175,55,0.04)' }}>
            <p className="text-xs tracking-[4px] mb-1" style={{ color:'#D4AF37' }}>ZODIAC</p>
            <h3 className="text-lg font-bold mb-3 f-serif" style={{ color:'#FFF8E7' }}>星座运势</h3>
            <p className="text-sm mb-4 leading-relaxed" style={{ color:'#A99BB8' }}>
              每日/每周/每月运势、星座配对分析。每个星座结合塔罗牌解读，给你不一样的运势体验।
            </p>
            <div className="flex items-center justify-center gap-2 p-3 rounded-xl flex-wrap"
              style={{ background:'rgba(255,255,255,0.02)', border:'1px solid rgba(255,255,255,0.03)' }}>
              {ZODIACS.map(z => (
                <span key={z.name} className="text-lg" style={{ color: `${z.color}55` }}>{z.sym}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
      <style>{`
        @keyframes shuffle {
          0%,100% { transform: translateY(0) rotateY(0deg); }
          25% { transform: translateY(-4px) rotateY(10deg); }
          50% { transform: translateY(2px) rotateY(-5deg); }
          75% { transform: translateY(-2px) rotateY(5deg); }
        }
        .animate-shuffle {
          animation: shuffle 0.15s ease-in-out infinite;
        }
        @keyframes fadeIn {
          0% { opacity:0; transform:translateY(8px); }
          100% { opacity:1; transform:translateY(0); }
        }
        @keyframes fadeInFast {
          0% { opacity:0; }
          100% { opacity:1; }
        }
        .animate-fadeIn {
          animation: fadeIn 0.5s ease-out forwards;
        }
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </section>
  )
}

/* ================================ 星座长廊 ================================ */
function ZodiacSection() {
  const scrollRef = useRef(null)
  const [paused, setPaused] = useState(false)
  const [activeIdx, setActiveIdx] = useState(null)
  const [flipped, setFlipped] = useState({})
  const [cardWidth, setCardWidth] = useState(200)
  const cardRefs = useRef({})
  const rafRef = useRef(null)

  const toggleFlip = (key) => setFlipped(prev => ({...prev, [key]: !prev[key]}))

  useEffect(() => {
    function updateWidth() {
      if (window.innerWidth < 768) setCardWidth(140)
      else setCardWidth(200)
    }
    updateWidth()
    window.addEventListener('resize', updateWidth)
    return () => window.removeEventListener('resize', updateWidth)
  }, [])

  // 滚动弧形计算 - 直接操作DOM，不触发React渲染
  const updateArc = useCallback(() => {
    const container = scrollRef.current
    if (!container) return
    if (rafRef.current) cancelAnimationFrame(rafRef.current)
    rafRef.current = requestAnimationFrame(() => {
      const cr = container.getBoundingClientRect()
      const centerX = cr.left + cr.width / 2
      const maxDist = cr.width * 0.7
      Object.entries(cardRefs.current).forEach(([key, el]) => {
        if (!el) return
        const rect = el.getBoundingClientRect()
        const cardCenter = rect.left + rect.width / 2
        const dist = Math.min(Math.abs(cardCenter - centerX) / maxDist, 2)
        const yOffset = Math.pow(dist, 1.8) * 25
        const scale = Math.max(0.55, 1 - dist * 0.3)
        const brightness = Math.max(0.35, 1 - dist * 0.4)
        el.style.marginTop = `${yOffset}px`
        el.style.width = `${cardWidth * scale}px`
        el.style.zIndex = Math.round(scale * 100)
        el.style.opacity = brightness
        el.style.filter = scale < 0.7 ? 'blur(0.3px)' : 'none'
      })
    })
  }, [cardWidth])

  useEffect(() => {
    const container = scrollRef.current
    if (!container) return
    const handler = () => updateArc()
    container.addEventListener('scroll', handler, { passive: true })
    updateArc()
    return () => {
      container.removeEventListener('scroll', handler)
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [cardWidth, updateArc])

  useEffect(() => {
    if (paused) return
    const el = scrollRef.current
    if (!el) return
    const interval = setInterval(() => {
      el.scrollLeft += 1.0
      if (el.scrollLeft >= (el.scrollWidth - el.clientWidth)) el.scrollLeft = 0
    }, 30)
    return () => clearInterval(interval)
  }, [paused])

  const items = [...ZODIACS, ...ZODIACS]

  return (
    <section id="zodiac" className="relative z-10 py-28 overflow-hidden">
      {/* 占星法阵背景 */}
      <div className="absolute inset-0 pointer-events-none z-0 flex items-center justify-center overflow-hidden">
        <div className="relative w-full max-w-[900px] aspect-square"
          style={{ transform:'translateY(-8%)' }}>
          {/* 背景光晕 */}
          <div className="absolute inset-[10%] rounded-full opacity-[0.06]"
            style={{ background:'radial-gradient(circle, #D4AF37 0%, transparent 60%)' }}/>
          {/* 圆环 - 提高透明度 */}
          <div className="absolute inset-[3%] rounded-full opacity-[0.15]"
            style={{ border:'1.5px solid #D4AF37' }}/>
          <div className="absolute inset-[13%] rounded-full opacity-[0.12]"
            style={{ border:'1.5px solid #D4AF37', borderStyle:'dashed' }}/>
          <div className="absolute inset-[23%] rounded-full opacity-[0.15]"
            style={{ border:'1.5px solid #D4AF37' }}/>
          {/* 刻度 - 清晰可见 */}
          <div className="absolute inset-[8%] rounded-full opacity-[0.15]"
            style={{ background:'repeating-conic-gradient(#D4AF37 0deg 1.5deg, transparent 1.5deg 8deg)' }}/>
          {/* 星轨射线 */}
          <div className="absolute inset-[2%] opacity-[0.08]"
            style={{ background:'radial-gradient(circle at center, transparent 40%, #D4AF37 40.2%, transparent 41%)' }}/>
          {/* 十二宫符号 - 更亮 */}
          {ZODIACS.map((z, i) => {
            const rad = ((i / 12) * 360 - 90) * Math.PI / 180
            return (
              <span key={i} className="absolute text-sm"
                style={{
                  left:`${50 + 38 * Math.cos(rad)}%`,
                  top:`${50 + 38 * Math.sin(rad)}%`,
                  transform:'translate(-50%,-50%)',
                  color:'#D4AF37', opacity:0.35,
                }}>
                {z.sym}
              </span>
            )
          })}
        </div>
      </div>

      <div className="relative z-10 max-w-[1200px] mx-auto px-6">
        <div className="text-center mb-14">
          <p className="text-xs tracking-[5px] mb-3" style={{ color:'#D4AF37' }}>ZODIAC</p>
          <h2 className="text-3xl font-bold mb-3 f-serif" style={{ color:'#FFF8E7' }}>星座长廊</h2>
          <p className="text-sm" style={{ color:'#8B7D9B' }}>选择你的守护星座 · 探索属于你的命运力量</p>
        </div>
      </div>

      <div className="relative z-10 px-6 max-w-[1200px] mx-auto"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => { setPaused(false); setActiveIdx(null) }}>
        <div ref={scrollRef}
          className="overflow-x-auto"
          style={{ scrollbarWidth:'none', msOverflowStyle:'none', cursor:'grab' }}>
          <div className="inline-flex gap-4 py-8 px-8 items-start"
            style={{ minHeight: cardWidth * 1.5 }}>
            {items.map((z, i) => {
              const isActive = activeIdx === i
              const flipKey = `zodiac-${i}`
              const isFlipped = flipped[flipKey] || false
              // 初始值（无state，首次渲染后由DOM操作更新）
              const initW = cardWidth
              return (
                <div key={i}
                  ref={el => cardRefs.current[i] = el}
                  className={`shrink-0 rounded-xl overflow-hidden transition-opacity duration-300 cursor-pointer relative ${!z.img ? 'zodiac-placeholder' : ''}`}
                  style={{
                    width: initW,
                    aspectRatio: '5/7',
                    perspective: '1200px',
                    marginTop: 0,
                    zIndex: 100,
                    opacity: 1,
                  }}
                  onMouseEnter={() => setActiveIdx(i)}
                  onMouseLeave={() => setActiveIdx(null)}
                  onClick={() => { if (z.img) toggleFlip(flipKey) }}>
                  {/* 底部金色光晕 */}
                  <div className="absolute -bottom-5 left-0 right-0 h-10 rounded-full pointer-events-none z-0"
                    style={{
                      background:'radial-gradient(ellipse, rgba(212,175,55,0.2) 0%, transparent 60%)',
                      opacity: isActive ? 0.35 : 0.12,
                      transition:'opacity 0.4s',
                    }}/>
                  <div className="relative w-full h-full transition-all duration-700"
                    style={{
                      transformStyle: 'preserve-3d',
                      transform: isFlipped ? 'rotateY(180deg)' : 'none',
                      zIndex: 1,
                    }}>
                    {z.img ? (
                      <>
                        {/* 正面 */}
                        <div className="absolute inset-0 rounded-xl overflow-hidden"
                          style={{
                            backfaceVisibility: 'hidden',
                            border: isActive ? `1.5px solid ${z.color}` : '1px solid rgba(212,175,55,0.06)',
                            transform: isActive ? 'translateY(-6px) scale(1.02)' : 'none',
                            boxShadow: isActive
                              ? `0 0 25px rgba(212,175,55,0.15), 0 0 50px rgba(212,175,55,0.06)`
                              : '0 4px 12px rgba(0,0,0,0.3)',
                            transition: 'all 0.4s',
                          }}>
                          <img src={z.img} alt={z.name}
                            style={{ width:'100%', height:'100%', objectFit:'contain', display:'block' }}/>
                          <div className="absolute inset-0 transition-opacity duration-300"
                            style={{
                              background:'linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.15) 40%, transparent 60%)',
                              opacity: isActive ? 1 : 0,
                            }}>
                            <div className="absolute bottom-0 left-0 right-0 p-4 text-center">
                              <p className="text-xs" style={{ color:'#B8A9C9' }}>{z.date}</p>
                              <p className="text-[10px] mt-0.5" style={{ color: z.color }}>{z.el} · {z.planet}</p>
                              <p className="text-[10px] mt-1 leading-relaxed" style={{ color:'#8B7D9B' }}>{z.desc}</p>
                            </div>
                          </div>
                        </div>
                        {/* 背面 */}
                        <div className="absolute inset-0 rounded-xl overflow-hidden p-4 flex flex-col justify-center text-center"
                          style={{
                            backfaceVisibility: 'hidden',
                            transform: 'rotateY(180deg)',
                            background: `linear-gradient(145deg, ${z.color}18, ${z.color}08, #0A0A1E)`,
                            border: `1px solid ${z.color}30`,
                          }}>
                          <div className="text-2xl mb-1" style={{ color: z.color }}>{z.sym}</div>
                          <p className="text-sm f-serif font-bold" style={{ color:'#FFF8E7' }}>{z.name}</p>
                          <p className="text-[10px] tracking-[3px] mb-2" style={{ color: `${z.color}AA` }}>{z.en}</p>
                          <div className="w-6 h-px mx-auto mb-2" style={{ background: `${z.color}55` }}/>
                          <p className="text-[10px]" style={{ color:'#B8A9C9' }}>{z.date}</p>
                          <p className="text-[9px] mt-0.5" style={{ color: z.color }}>{z.el} · {z.planet}</p>
                          <div className="mt-1.5 p-1.5 rounded-lg" style={{ background:'rgba(0,0,0,0.2)' }}>
                            <p className="text-[9px] leading-relaxed italic" style={{ color:'#D4AF37' }}>{z.desc}</p>
                          </div>
                          <p className="text-[8px] mt-2 tracking-[2px]" style={{ color:'#5A4D6A' }}>点击翻回</p>
                        </div>
                      </>
                    ) : (
                        <div className="w-full h-full flex flex-col items-center justify-center p-4 text-center"
                          style={{ background:`linear-gradient(180deg, ${z.color}08 0%, ${z.color}03 50%, rgba(10,10,18,1) 100%)` }}>
                          <div className="text-4xl mb-1" style={{ color:`${z.color}55` }}>{z.sym}</div>
                          <p className="text-sm f-serif font-bold" style={{ color:'#FFF8E7' }}>{z.name}</p>
                          <p className="text-[10px] tracking-[2px]" style={{ color:`${z.color}88` }}>{z.en}</p>
                          <div className="w-5 h-px my-1.5" style={{ background:`${z.color}33` }}/>
                          <div className="mt-auto">
                            <span className="text-[7px] px-2 py-0.5 rounded-full tracking-[2px]"
                              style={{ background:'rgba(255,255,255,0.02)', border:'1px solid rgba(255,255,255,0.03)', color:'#5A4D6A' }}>
                              待生成
                            </span>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}

/* ================================ CTA ================================ */
function CTASection() {
  return (
    <section id="cta" className="relative z-10 overflow-hidden"
      style={{
        minHeight: '85vh',
        background: `
          linear-gradient(180deg,
            #0A0820 0%,
            #0F0A2E 20%,
            #12052B 45%,
            #0F0A2E 70%,
            #080D24 100%
          )
        `
      }}>
      {/* 大型星云 */}
      <div className="absolute pointer-events-none" style={{ inset:0 }}>
        <div className="absolute top-[15%] left-[20%] w-[600px] h-[500px] rounded-full opacity-[0.10]"
          style={{ background:'radial-gradient(ellipse, #7A4DFF 0%, transparent 55%)' }}/>
        <div className="absolute top-[30%] right-[10%] w-[500px] h-[400px] rounded-full opacity-[0.08]"
          style={{ background:'radial-gradient(ellipse, #1A3A6B 0%, transparent 55%)' }}/>
        <div className="absolute top-[60%] left-[10%] w-[450px] h-[350px] rounded-full opacity-[0.06]"
          style={{ background:'radial-gradient(ellipse, #2A1A5A 0%, transparent 50%)' }}/>
        {/* 金色光晕（用opacity动画，不用transform） */}
        <div className="absolute top-[45%] left-[50%] w-[500px] h-[500px] rounded-full"
          style={{
            background:'radial-gradient(circle, #D4AF37 0%, rgba(212,175,55,0.03) 40%, transparent 65%)',
            transform:'translate(-50%,-50%)',
            animation: 'goldenPulse 6s ease-in-out infinite',
          }}/>
      </div>

      {/* 金色粒子 */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-[1]">
        <canvas ref={el => {
          if (!el || el.dataset.done) return
          el.dataset.done = '1'
          const ctx = el.getContext('2d')
          let w, h
          const resize = () => { w = el.width = window.innerWidth; h = el.height = window.innerHeight }
          resize()
          window.addEventListener('resize', resize)
          const particles = []
          for (let i = 0; i < 30; i++) {
            particles.push({
              x: Math.random() * w, y: Math.random() * h,
              r: Math.random() * 2 + 0.5, a: Math.random() * 0.3 + 0.05,
              speed: Math.random() * 0.08 + 0.02,
              driftX: (Math.random() - 0.5) * 0.2,
              driftY: (Math.random() - 0.5) * 0.2,
              phase: Math.random() * Math.PI * 2,
            })
          }
          let animId
          function draw() {
            ctx.clearRect(0, 0, w, h)
            const t = Date.now() / 1000
            particles.forEach(p => {
              const px = p.x + Math.sin(t * 0.05 + p.phase) * p.driftX * 30
              const py = p.y + Math.cos(t * 0.05 + p.phase) * p.driftY * 30
              const pulse = 0.4 + 0.6 * Math.sin(t * p.speed + p.phase)
              ctx.beginPath()
              ctx.arc(px, py, p.r * (0.7 + 0.3 * pulse), 0, Math.PI * 2)
              ctx.fillStyle = `rgba(212, 175, 55, ${p.a * pulse})`
              ctx.fill()
            })
            animId = requestAnimationFrame(draw)
          }
          draw()
        }} className="absolute inset-0 w-full h-full"/>
      </div>

      <div className="relative z-10 min-h-[85vh] flex flex-col items-center justify-center text-center px-6 py-20">
        {/* 发光塔罗牌 */}
        <div className="relative mb-8">
          {/* 卡牌本体 */}
          <div className="w-24 h-32 md:w-28 md:h-40 rounded-xl overflow-hidden mx-auto relative"
            style={{
              border:'2px solid rgba(212,175,55,0.25)',
              boxShadow:'0 0 50px rgba(212,175,55,0.1), 0 0 100px rgba(212,175,55,0.04)',
              animation: 'cardFloat 4s ease-in-out infinite',
            }}>
            <img src={CARDS.star} alt="星星"
              style={{ width:'100%', height:'100%', objectFit:'cover', display:'block' }}/>
          </div>
        </div>

        {/* 标题 */}
        <h2 className="text-3xl md:text-4xl font-bold mb-4 f-serif leading-snug" style={{ color:'#FFF8E7' }}>
          你的答案已经隐藏在牌阵之中
        </h2>

        <p className="text-sm leading-relaxed mb-6 max-w-md" style={{ color:'#B8A9C9' }}>
          爱情 · 事业 · 财富 · 学业 · 未来方向
        </p>
        <p className="text-xs leading-relaxed mb-12 italic" style={{ color:'#7A6D8A' }}>
          「每一次抽牌，都是一次与命运的对话」
        </p>

        {/* 按钮 */}
        <div className="flex gap-4 justify-center flex-wrap">
          <a href="#"
            className="inline-block py-4 px-10 rounded-xl text-base font-medium no-underline tracking-[3px] transition-all duration-500 hover:-translate-y-1"
            style={{
              background: 'linear-gradient(135deg, #8B6914, #D4AF37)',
              color: '#07060a',
              boxShadow: '0 8px 30px rgba(212,175,55,0.15), 0 0 60px rgba(212,175,55,0.05)',
            }}>
            立即开始测算
          </a>
          <a href="#gallery"
            className="inline-block py-4 px-10 rounded-xl text-base no-underline tracking-[3px] transition-all duration-500"
            style={{
              border:'1px solid rgba(212,175,55,0.15)',
              color:'#D4AF37',
            }}>
            浏览完整牌库
          </a>
        </div>
      </div>

      <style>{`
        @keyframes cardFloat {
          0%,100% { transform: translateY(0px); }
          50% { transform: translateY(-8px); }
        }
        @keyframes goldenPulse {
          0%,100% { opacity:0.08; }
          50% { opacity:0.14; }
        }
      `}</style>
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