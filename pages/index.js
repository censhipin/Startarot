import Head from 'next/head'
import { useState, useEffect, useRef, useCallback } from 'react'

/* ================================ 数据定义 ================================ */

const CARD_IMG = 'https://raw.githubusercontent.com/metabismuth/tarot-json/master/cards'

const SUIT_EXAMPLES = [
  { suit:'圣杯', en:'Cups', element:'水', keyword:'情感、直觉、关系', src:`${CARD_IMG}/c01.jpg` },
  { suit:'权杖', en:'Wands', element:'火', keyword:'行动、热情、事业', src:`${CARD_IMG}/w01.jpg` },
  { suit:'宝剑', en:'Swords', element:'风', keyword:'思维、冲突、决策', src:`${CARD_IMG}/s01.jpg` },
  { suit:'星币', en:'Pentacles', element:'土', keyword:'物质、健康、财富', src:`${CARD_IMG}/p01.jpg` },
]

const galleryCards = [
  { id:'m00', name:'愚人', en:'The Fool', src:`${CARD_IMG}/m00.jpg`, upright:'新的开始、冒险、信任', reversed:'鲁莽、轻率' },
  { id:'m01', name:'魔术师', en:'The Magician', src:`${CARD_IMG}/m01.jpg`, upright:'创造力、自信、技能', reversed:'操纵、才能浪费' },
  { id:'m06', name:'恋人', en:'The Lovers', src:`${CARD_IMG}/m06.jpg`, upright:'爱情、选择、和谐', reversed:'不合、失衡' },
  { id:'m10', name:'命运之轮', en:'Wheel of Fortune', src:`${CARD_IMG}/m10.jpg`, upright:'变化、循环、转折点', reversed:'坏运气' },
  { id:'m13', name:'死神', en:'Death', src:`${CARD_IMG}/m13.jpg`, upright:'结束、转变、新生', reversed:'抗拒改变' },
  { id:'m17', name:'星星', en:'The Star', src:`${CARD_IMG}/m17.jpg`, upright:'希望、灵感、治愈', reversed:'绝望' },
  { id:'m19', name:'太阳', en:'The Sun', src:`${CARD_IMG}/m19.jpg`, upright:'喜悦、成功、活力', reversed:'暂时低落' },
  { id:'m21', name:'世界', en:'The World', src:`${CARD_IMG}/m21.jpg`, upright:'完成、成就、圆满', reversed:'未完成' },
  { id:'w01', name:'权杖Ace', en:'Ace of Wands', src:`${CARD_IMG}/w01.jpg`, upright:'新的开始、创造力', reversed:'延迟、阻碍' },
  { id:'c01', name:'圣杯Ace', en:'Ace of Cups', src:`${CARD_IMG}/c01.jpg`, upright:'爱的开始、情感满溢', reversed:'情感空虚' },
  { id:'s01', name:'宝剑Ace', en:'Ace of Swords', src:`${CARD_IMG}/s01.jpg`, upright:'真理、突破、清晰', reversed:'混乱、误解' },
  { id:'p10', name:'星币十', en:'Ten of Pentacles', src:`${CARD_IMG}/p10.jpg`, upright:'财富、传承、家族', reversed:'财务损失' },
]

const ZODIACS = [
  { id:'aries', name:'白羊座', nameEn:'Aries', date:'3.21-4.19', element:'火', emoji:'♈', color:'#E74C3C', desc:'热情勇敢，充满行动力的开拓者', fortune:'本周事业运旺盛，适合主动出击。' },
  { id:'taurus', name:'金牛座', nameEn:'Taurus', date:'4.20-5.20', element:'土', emoji:'♉', color:'#27AE60', desc:'踏实稳重，追求物质与感官享受', fortune:'财运稳步上升，投资理财有不错的机会。' },
  { id:'gemini', name:'双子座', nameEn:'Gemini', date:'5.21-6.21', element:'风', emoji:'♊', color:'#F1C40F', desc:'机智灵活，好奇心旺盛的沟通者', fortune:'社交运极佳，适合拓展人脉与合作。' },
  { id:'cancer', name:'巨蟹座', nameEn:'Cancer', date:'6.22-7.22', element:'水', emoji:'♋', color:'#3498DB', desc:'温柔敏感，重视家庭与安全感', fortune:'家庭运良好，适合与家人共度时光。' },
  { id:'leo', name:'狮子座', nameEn:'Leo', date:'7.23-8.22', element:'火', emoji:'♌', color:'#E67E22', desc:'自信大方，天生的领导者与表演者', fortune:'爱情运旺盛，有机会遇到心仪的对象。' },
  { id:'virgo', name:'处女座', nameEn:'Virgo', date:'8.23-9.22', element:'土', emoji:'♍', color:'#1ABC9C', desc:'细致完美，追求极致的分析者', fortune:'工作运稳步推进，注意细节就能出成果。' },
  { id:'libra', name:'天秤座', nameEn:'Libra', date:'9.23-10.23', element:'风', emoji:'♎', color:'#9B59B6', desc:'优雅平衡，追求和谐与美感', fortune:'人际关系运上升，适合调解矛盾。' },
  { id:'scorpio', name:'天蝎座', nameEn:'Scorpio', date:'10.24-11.22', element:'水', emoji:'♏', color:'#2C3E50', desc:'深沉神秘，意志力极强的探索者', fortune:'事业运有突破性进展，坚持就有回报。' },
  { id:'sagittarius', name:'射手座', nameEn:'Sagittarius', date:'11.23-12.21', element:'火', emoji:'♐', color:'#16A085', desc:'乐观自由，热爱冒险的哲学家', fortune:'出行运佳，旅行或学习中会有收获。' },
  { id:'capricorn', name:'摩羯座', nameEn:'Capricorn', date:'12.22-1.19', element:'土', emoji:'♑', color:'#7F8C8D', desc:'坚韧务实，目标感极强的事业家', fortune:'财运亨通，之前的努力即将见到回报。' },
  { id:'aquarius', name:'水瓶座', nameEn:'Aquarius', date:'1.20-2.18', element:'风', emoji:'♒', color:'#2980B9', desc:'独立创新，思想前卫的人道主义者', fortune:'创意运爆棚，适合开启新项目或创作。' },
  { id:'pisces', name:'双鱼座', nameEn:'Pisces', date:'2.19-3.20', element:'水', emoji:'♓', color:'#8E44AD', desc:'梦幻浪漫，富有想象力的艺术家', fortune:'直觉敏锐，适合做重要的内心决定。' },
]

/* ================================ 78张完整牌数据 ================================ */
const IMG = 'https://raw.githubusercontent.com/metabismuth/tarot-json/master/cards'
const ALL_CARDS = (() => {
  const major = [
    { id:'m0', name:'愚人', en:'The Fool', num:'0', src:`${IMG}/m00.jpg`,
      upright:'新的开始、冒险、信任、纯真', reversed:'鲁莽、轻率',
      desc:'放下对未知的恐惧，勇敢迈出第一步。新的旅程正在等待你，保持纯真的心去探索。' },
    { id:'m1', name:'魔术师', en:'The Magician', num:'I', src:`${IMG}/m01.jpg`,
      upright:'创造力、自信、技能、资源', reversed:'操纵、才能浪费',
      desc:'你已拥有所需的一切资源，相信自己，去实现你的目标。宇宙正在回应你的召唤。' },
    { id:'m2', name:'女祭司', en:'The High Priestess', num:'II', src:`${IMG}/m02.jpg`,
      upright:'直觉、内在智慧、神秘', reversed:'秘密、表面现象',
      desc:'静下来倾听你的内心，答案已在心中。相信你的直觉，它比理智更接近真相。' },
    { id:'m3', name:'女皇', en:'The Empress', num:'III', src:`${IMG}/m03.jpg`,
      upright:'丰饶、母性、自然、舒适', reversed:'依赖、创造受阻',
      desc:'允许自己享受生活的美好，滋养自己也滋养身边的人。丰饶的季节已经到来。' },
    { id:'m4', name:'皇帝', en:'The Emperor', num:'IV', src:`${IMG}/m04.jpg`,
      upright:'权威、结构、稳定', reversed:'专制、僵化',
      desc:'建立秩序和规则是必要的，但不要变得僵化和专制。真正的权威来自智慧。' },
    { id:'m5', name:'教皇', en:'The Hierophant', num:'V', src:`${IMG}/m05.jpg`,
      upright:'传统、精神指引、信仰', reversed:'非正统、个人信念',
      desc:'有时候需要遵循传统和权威的指引，但也要保持自己的判断和独立思考。' },
    { id:'m6', name:'恋人', en:'The Lovers', num:'VI', src:`${IMG}/m06.jpg`,
      upright:'爱情、选择、和谐', reversed:'不合、失衡',
      desc:'面对选择时，跟随你的内心而非外界的期望。真正的和谐来自忠于自我。' },
    { id:'m7', name:'战车', en:'The Chariot', num:'VII', src:`${IMG}/m07.jpg`,
      upright:'胜利、意志力、决心', reversed:'方向不明、失控',
      desc:'用坚定的意志控制对立的力理，胜利属于你。但首先要明确你的方向。' },
    { id:'m8', name:'力量', en:'Strength', num:'VIII', src:`${IMG}/m08.jpg`,
      upright:'勇气、内在力量、慈悲', reversed:'自我怀疑',
      desc:'真正的力量来自内心的温柔与坚定，而非外在的强硬。用爱化解恐惧。' },
    { id:'m9', name:'隐士', en:'The Hermit', num:'IX', src:`${IMG}/m09.jpg`,
      upright:'内省、智慧、寻找真理', reversed:'孤独、退缩',
      desc:'独处和反思是智慧的来源。给自己一些安静的时间，答案会在寂静中浮现。' },
    { id:'m10', name:'命运之轮', en:'Wheel of Fortune', num:'X', src:`${IMG}/m10.jpg`,
      upright:'变化、循环、转折点', reversed:'坏运气、抵制变化',
      desc:'变化是唯一不变的真理。顺应命运流转，新的阶段即将开启。' },
    { id:'m11', name:'正义', en:'Justice', num:'XI', src:`${IMG}/m11.jpg`,
      upright:'公平、真相、因果报应', reversed:'不公、欺骗',
      desc:'真相终将浮出水面。做出对的选择，承担应有的责任，平衡终将恢复。' },
    { id:'m12', name:'倒吊人', en:'The Hanged Man', num:'XII', src:`${IMG}/m12.jpg`,
      upright:'暂停、牺牲、新视角', reversed:'拖延、抗拒',
      desc:'有时候需要暂停和放下，才能获得全新的视角。换一个角度看问题。' },
    { id:'m13', name:'死神', en:'Death', num:'XIII', src:`${IMG}/m13.jpg`,
      upright:'结束、转变、放下、新生', reversed:'抗拒改变',
      desc:'告别旧的才能迎接新的。放手是一种勇气，也是一种智慧，新生已在路上。' },
    { id:'m14', name:'节制', en:'Temperance', num:'XIV', src:`${IMG}/m14.jpg`,
      upright:'平衡、调和、耐心', reversed:'失衡、过度',
      desc:'保持平衡，找到中庸之道。不要走极端，耐心等待最好的时机。' },
    { id:'m15', name:'恶魔', en:'The Devil', num:'XV', src:`${IMG}/m15.jpg`,
      upright:'束缚、欲望、成瘾', reversed:'觉醒、挣脱',
      desc:'认清是什么在束缚你——很多时候锁链是你自己戴上的。你有力量挣脱。' },
    { id:'m16', name:'高塔', en:'The Tower', num:'XVI', src:`${IMG}/m16.jpg`,
      upright:'剧变、崩塌、觉醒', reversed:'抵抗改变',
      desc:'当旧的结构崩塌时不要恐慌。这为新的建设腾出了空间，重建即是新生。' },
    { id:'m17', name:'星星', en:'The Star', num:'XVII', src:`${IMG}/m17.jpg`,
      upright:'希望、灵感、治愈', reversed:'绝望、失去方向',
      desc:'保持希望，即使现在看不清前路。宇宙正在为你指引方向，光明即将到来。' },
    { id:'m18', name:'月亮', en:'The Moon', num:'XVIII', src:`${IMG}/m18.jpg`,
      upright:'直觉、恐惧、潜意识', reversed:'焦虑消散',
      desc:'你所恐惧的可能只是幻觉。面对你的潜意识，真相会逐渐浮现。' },
    { id:'m19', name:'太阳', en:'The Sun', num:'XIX', src:`${IMG}/m19.jpg`,
      upright:'喜悦、成功、活力', reversed:'暂时低落',
      desc:'你正处在光明之中！享受这份喜悦和成功，你是值得被爱的。' },
    { id:'m20', name:'审判', en:'Judgement', num:'XX', src:`${IMG}/m20.jpg`,
      upright:'重生、觉醒、清算', reversed:'自我怀疑',
      desc:'你被召唤去面对真实的自己。放下过去，迎接新生，现在是觉醒的时刻。' },
    { id:'m21', name:'世界', en:'The World', num:'XXI', src:`${IMG}/m21.jpg`,
      upright:'完成、成就、圆满', reversed:'未完成、拖延',
      desc:'一个阶段圆满结束，你完成了重要的旅程。庆祝之后，新的循环即将开始。' },
  ]
  const suitCfg = [
    { prefix:'w', name:'权杖', en:'Wands' },
    { prefix:'c', name:'圣杯', en:'Cups' },
    { prefix:'s', name:'宝剑', en:'Swords' },
    { prefix:'p', name:'星币', en:'Pentacles' },
  ]
  const numNames = ['Ace','II','III','IV','V','VI','VII','VIII','IX','X','Page','Knight','Queen','King']
  const minor = []
  suitCfg.forEach(suit => {
    for (let i = 1; i <= 14; i++) {
      const num = numNames[i - 1]
      const id = `${suit.prefix}${String(i).padStart(2,'0')}`
      minor.push({
        id, name:`${suit.name}${num}`, en:`${num} of ${suit.en}`, num,
        src:`${IMG}/${suit.prefix}${String(i).padStart(2,'0')}.jpg`,
        upright:'正位：代表该领域的积极能量与建设性发展',
        reversed:'逆位：注意该领域的阻碍或失衡',
        desc:`${num} · ${suit.name}——关注${suit.name}牌组带来的能量与启示。`,
      })
    }
  })
  return [...major, ...minor]
})()

/* ================================ GlobalStyles ================================ */
function GlobalStyles() {
  return (
    <style jsx global>{`
      @import url('https://fonts.googleapis.com/css2?family=Noto+Serif+SC:wght@400;600;700&family=Inter:wght@300;400;500;600&display=swap');

      * { box-sizing: border-box; margin: 0; padding: 0; }
      html { scroll-behavior: smooth; }
      body {
        font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
        background: #0a0612;
        color: #E2E8F0;
        overflow-x: hidden;
        -webkit-font-smoothing: antialiased;
      }
      ::-webkit-scrollbar { width: 6px; }
      ::-webkit-scrollbar-track { background: #0a0612; }
      ::-webkit-scrollbar-thumb { background: #2a1f3d; border-radius: 3px; }
      ::selection { background: rgba(201,169,110,0.3); color: #fff; }

      @keyframes float {
        0%, 100% { transform: translateY(0) rotate(0deg); }
        33% { transform: translateY(-12px) rotate(1deg); }
        66% { transform: translateY(6px) rotate(-1deg); }
      }
      @keyframes twinkle {
        0%, 100% { opacity: 0.3; transform: scale(1); }
        50% { opacity: 1; transform: scale(1.3); }
      }
      @keyframes orbit {
        0% { transform: rotate(0deg) translateX(var(--orbit-r)) rotate(0deg); }
        100% { transform: rotate(360deg) translateX(var(--orbit-r)) rotate(-360deg); }
      }
      @keyframes meteor {
        0% { transform: translateX(0) translateY(0); opacity: 1; }
        100% { transform: translateX(-600px) translateY(400px); opacity: 0; }
      }
      @keyframes cardGlow {
        0%, 100% { box-shadow: 0 0 20px rgba(201,169,110,0.1); }
        50% { box-shadow: 0 0 40px rgba(201,169,110,0.25); }
      }
      @keyframes fadeInUp {
        from { opacity: 0; transform: translateY(30px); }
        to { opacity: 1; transform: translateY(0); }
      }
      @keyframes fadeInScale {
        from { opacity: 0; transform: scale(0.9); }
        to { opacity: 1; transform: scale(1); }
      }
      @keyframes shimmer {
        0% { background-position: -200% center; }
        100% { background-position: 200% center; }
      }
      .animate-fade-in-up { animation: fadeInUp 0.8s ease forwards; }
      .animate-fade-scale { animation: fadeInScale 0.5s ease forwards; }

      .flip-card { perspective: 1200px; }
      .flip-card-inner {
        position: relative;
        width: 100%;
        height: 100%;
        transition: transform 0.6s cubic-bezier(0.4, 0, 0.2, 1);
        transform-style: preserve-3d;
      }
      .flip-card.flipped .flip-card-inner { transform: rotateY(180deg); }
      .flip-card-front, .flip-card-back {
        position: absolute;
        inset: 0;
        backface-visibility: hidden;
        -webkit-backface-visibility: hidden;
        border-radius: 12px;
        overflow: hidden;
      }
      .flip-card-back { transform: rotateY(180deg); }

      .text-gradient {
        background: linear-gradient(135deg, #C9A96E, #F5E6B8, #C9A96E);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
      }
    `}</style>
  )
}

/* ================================ StarParticles (流星版) ================================ */
function StarParticles() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    let animId
    let w, h

    function resize() {
      w = canvas.width = window.innerWidth
      h = canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener('resize', resize)

    const stars = Array.from({ length: 180 }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      r: Math.random() * 1.6 + 0.2,
      a: Math.random() * 0.6 + 0.15,
      speed: Math.random() * 0.2 + 0.05,
      phase: Math.random() * Math.PI * 2,
    }))

    const meteors = Array.from({ length: 3 }, () => ({
      x: Math.random() * w,
      y: Math.random() * h * 0.3,
      len: Math.random() * 120 + 60,
      speed: Math.random() * 2 + 1,
      a: Math.random() * 0.4 + 0.1,
      delay: Math.random() * 10,
    }))

    let startTime = Date.now()

    function draw() {
      ctx.clearRect(0, 0, w, h)
      const elapsed = (Date.now() - startTime) / 1000

      stars.forEach(s => {
        const alpha = s.a * (0.5 + 0.5 * Math.sin(elapsed * s.speed + s.phase))
        ctx.beginPath()
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(255,255,255,${alpha})`
        ctx.fill()
      })

      meteors.forEach(m => {
        const cycle = (elapsed + m.delay) % 12
        if (cycle < 1.5) {
          const t = cycle / 1.5
          const progress = t * w * 1.2
          const mx = w - progress
          const my = m.y + progress * 0.6
          const alpha = m.a * (1 - t)
          const grad = ctx.createLinearGradient(mx, my, mx - m.len, my + m.len * 0.6)
          grad.addColorStop(0, `rgba(255,255,255,${alpha})`)
          grad.addColorStop(1, `rgba(255,255,255,0)`)
          ctx.beginPath()
          ctx.moveTo(mx, my)
          ctx.lineTo(mx - m.len, my + m.len * 0.6)
          ctx.strokeStyle = grad
          ctx.lineWidth = 1.2
          ctx.stroke()
        }
      })

      animId = requestAnimationFrame(draw)
    }
    draw()

    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-0" />
}

/* ================================ CosmicBackground ================================ */
function CosmicBackground() {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none" style={{ background: 'linear-gradient(180deg, #0a0612 0%, #120b1e 30%, #1a0f2e 60%, #0f0a1a 100%)' }}>
      <StarParticles />
    </div>
  )
}

/* ================================ NavBar ================================ */
function NavBar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const links = [
    ['功能介绍', '#features'],
    ['牌库', '#gallery'],
    ['星座', '#zodiac'],
    ['小程序', '#cta'],
  ]

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-400 ${
      scrolled
        ? 'py-3 bg-[rgba(10,6,18,0.85)] backdrop-blur-[20px] border-b border-[rgba(201,169,110,0.08)]'
        : 'py-5 bg-transparent'
    }`}>
      <div className="max-w-[1200px] mx-auto px-6 flex items-center justify-between">
        <a href="#" className="text-xl font-bold no-underline tracking-[4px]" style={{ fontFamily:"'Georgia',serif", color:'#FFF8E7' }}>
          {'✦'} 星<span style={{ color:'#C9A96E' }}>塔</span>
        </a>
        <div className="hidden md:flex gap-8">
          {links.map(([text, href]) => (
            <a key={text} href={href}
               className="text-sm no-underline tracking-[1px] transition-colors hover:text-[#FFF8E7]"
               style={{ color:'#8B7D9B' }}>
              {text}
            </a>
          ))}
        </div>
        <a href="#cta"
           className="py-2.5 px-6 rounded-lg text-sm font-medium no-underline transition-all tracking-[1px] hover:-translate-y-0.5"
           style={{
             background: 'linear-gradient(135deg, #8B6914, #C9A96E)',
             color: '#0a0612',
             boxShadow: '0 4px 16px rgba(201,169,110,0.2)',
           }}>
          打开小程序
        </a>
        <button className="md:hidden bg-none border-none text-[#C9A96E] text-2xl cursor-pointer"
                onClick={() => setMobileOpen(!mobileOpen)}>
          {mobileOpen ? '✕' : '☰'}
        </button>
      </div>
      {mobileOpen && (
        <div className="md:hidden bg-[rgba(10,6,18,0.95)] backdrop-blur-[20px] border-t border-[rgba(201,169,110,0.08)]">
          <div className="flex flex-col gap-4 px-6 py-6">
            {links.map(([text, href]) => (
              <a key={text} href={href}
                 className="text-sm no-underline tracking-[1px] py-2"
                 style={{ color:'#8B7D9B' }}
                 onClick={() => setMobileOpen(false)}>
                {text}
              </a>
            ))}
          </div>
        </div>
      )}
    </nav>
  )
}

/* ================================ HeroSection (椭圆轨道浮动卡牌) ================================ */
function HeroSection() {
  const orbitCards = [
    { id:'m10', name:'命运之轮', src:`${CARD_IMG}/m10.jpg`, en:'Wheel of Fortune', delay:0, r:140 },
    { id:'m17', name:'星星', src:`${CARD_IMG}/m17.jpg`, en:'The Star', delay:2, r:110 },
    { id:'m06', name:'恋人', src:`${CARD_IMG}/m06.jpg`, en:'The Lovers', delay:4, r:130 },
    { id:'m19', name:'太阳', src:`${CARD_IMG}/m19.jpg`, en:'The Sun', delay:1, r:100 },
  ]

  return (
    <section id="hero" className="relative min-h-screen flex items-center pt-24 pb-16 overflow-hidden">
      {/* 背景光晕 */}
      <div className="absolute top-1/3 right-1/4 w-[500px] h-[500px] rounded-full opacity-[0.08]"
           style={{ background:'radial-gradient(circle, #C9A96E, transparent 70%)', pointerEvents:'none' }} />
      <div className="absolute bottom-1/4 left-1/4 w-[400px] h-[400px] rounded-full opacity-[0.05]"
           style={{ background:'radial-gradient(circle, #8B5CF6, transparent 70%)', pointerEvents:'none' }} />

      <div className="max-w-[1200px] mx-auto px-6 w-full">
        <div className="flex items-center gap-16 max-lg:flex-col max-lg:text-center">
          {/* 左侧文字 */}
          <div className="flex-1 z-10 max-lg:order-2">
            <span className="inline-block px-4 py-1.5 rounded-full text-sm tracking-[2px] mb-6"
                  style={{ background:'rgba(201,169,110,0.1)', border:'1px solid rgba(201,169,110,0.15)', color:'#C9A96E' }}>
              {'✦'} 塔罗牌自我探索工具
            </span>

            <h1 className="font-serif text-5xl max-md:text-3xl font-bold leading-tight text-[#F1F0FB] mb-5">
              塔罗是心灵的镜<br />
              照见你 <span className="text-gradient">真实的内在</span>
            </h1>

            <p className="text-base leading-relaxed text-[#94A3B8] max-w-[520px] max-lg:max-w-full mb-8">
              基于维特塔罗经典体系，78张牌完整收录。每一次抽牌都是一次与自己的深度对话，
              不迷信、不宿命，只为你提供内心的指引与启发。
            </p>

            <div className="flex gap-10 mb-9 max-md:justify-center max-md:gap-6">
              {[
                { num:'78', label:'张完整牌库' },
                { num:'12', label:'种经典牌阵' },
                { num:'∞', label:'次自我探索' },
              ].map((s, i) => (
                <div key={i}>
                  <div className="font-serif text-3xl font-bold" style={{ color:'#C9A96E' }}>{s.num}</div>
                  <div className="text-sm text-[#64748B] mt-1">{s.label}</div>
                </div>
              ))}
            </div>

            <div className="flex gap-4 flex-wrap max-md:justify-center">
              <a href="#cta"
                 className="py-3.5 px-8 rounded-xl border-none text-base font-medium cursor-pointer transition-all tracking-[1px] no-underline hover:-translate-y-0.5 inline-block"
                 style={{
                   background: 'linear-gradient(135deg, #8B6914, #C9A96E)',
                   color: '#0F1923',
                   boxShadow: '0 8px 24px rgba(201,169,110,0.25)',
                 }}>
                微信打开 {'→'}
              </a>
              <a href="#features"
                 className="py-3.5 px-8 rounded-xl text-base cursor-pointer transition-all no-underline hover:bg-[rgba(255,255,255,0.02)] inline-block"
                 style={{ border:'1px solid rgba(255,255,255,0.1)', color:'#E2E8F0' }}>
                了解详情
              </a>
            </div>
          </div>

          {/* 右侧椭圆轨道卡牌 */}
          <div className="flex-[0_0_320px] h-[400px] relative max-lg:order-1 max-lg:flex-[0_0_280px] max-lg:h-[320px] max-md:hidden">
            {/* 中心装饰 */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 rounded-full flex items-center justify-center"
                 style={{
                   background:'radial-gradient(circle, rgba(201,169,110,0.2), transparent 70%)',
                   border:'1px solid rgba(201,169,110,0.15)',
                 }}>
              <span className="text-3xl">{'✦'}</span>
            </div>
            {/* 轨道卡牌 */}
            {orbitCards.map((card, i) => (
              <div key={card.id}
                   className="absolute top-1/2 left-1/2"
                   style={{
                     animation: `orbit 12s ${card.delay}s linear infinite`,
                     '--orbit-r': `${card.r}px`,
                     marginTop: -50,
                     marginLeft: -35,
                   }}>
                <div className="w-[70px] aspect-[5/7] rounded-lg overflow-hidden shadow-lg"
                     style={{
                       animation: 'cardGlow 3s ease-in-out infinite',
                       border: '1px solid rgba(201,169,110,0.2)',
                       transform: `rotate(${i * 15 - 10}deg)`,
                     }}>
                  <img src={card.src} alt={card.name}
                       className="w-full h-full object-cover"
                       loading="lazy" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

/* ================================ TarotIntro ================================ */
function TarotIntro() {
  const [activeSuit, setActiveSuit] = useState(0)

  const introData = [
    { title:'什么是塔罗？', content:'塔罗牌并非神秘的算命工具，而是一面映照内心的镜子。78张牌分为大阿卡纳（22张）和小阿卡纳（56张），每一张都象征着人生旅途中的一个面向或阶段。通过随机抽牌与解读，塔罗帮助我们跳出固有的思维模式，从新的视角审视问题。' },
    { title:'大阿卡纳', content:'22张大牌讲述了一个完整的生命旅程——从愚人的天真出发，经历各种挑战与成长，最终抵达世界的圆满。每一张都对应着人生的重要课题，如命运之轮代表变化、死神象征转变、星星带来希望。' },
    { title:'小阿卡纳', content:'56张小牌反映日常生活的具体面向，分为四组牌组：圣杯（情感）、权杖（行动）、宝剑（思维）、星币（物质）。每组从王牌到十是渐进的过程，而侍从、骑士、王后、国王则代表不同的人格特质。' },
  ]

  return (
    <section className="py-24 relative">
      <div className="max-w-[1100px] mx-auto px-6">
        <div className="text-center mb-16">
          <div className="text-xs tracking-[4px] mb-3" style={{ color:'#C9A96E' }}>ABOUT TAROT</div>
          <h2 className="font-serif text-[34px] max-md:text-[26px] font-bold text-[#F1F0FB] mb-3">认识塔罗</h2>
          <p className="text-sm text-[#64748B]">了解这门古老而深邃的智慧体系</p>
        </div>

        <div className="grid grid-cols-3 max-md:grid-cols-1 gap-6 mb-20">
          {introData.map((item, i) => (
            <div key={i}
                 className="p-8 rounded-2xl transition-all duration-300 hover:-translate-y-1"
                 style={{
                   background: 'rgba(255,255,255,0.02)',
                   border: '1px solid rgba(255,255,255,0.04)',
                 }}>
              <div className="font-serif text-xl text-[#C9A96E] mb-4">{item.title}</div>
              <p className="text-sm text-[#94A3B8] leading-relaxed">{item.content}</p>
            </div>
          ))}
        </div>

        {/* 四牌组展示 */}
        <div className="text-center mb-10">
          <h3 className="font-serif text-2xl text-[#F1F0FB] mb-2">四组牌组</h3>
          <p className="text-sm text-[#64748B]">点击切换了解每组牌的象征意义</p>
        </div>

        <div className="flex flex-wrap justify-center gap-3 mb-10">
          {SUIT_EXAMPLES.map((s, i) => (
            <button key={s.suit}
                    onClick={() => setActiveSuit(i)}
                    className="py-2.5 px-6 rounded-xl text-sm font-medium cursor-pointer transition-all border-none"
                    style={{
                      background: activeSuit === i ? 'linear-gradient(135deg, #8B6914, #C9A96E)' : 'rgba(255,255,255,0.04)',
                      color: activeSuit === i ? '#0a0612' : '#94A3B8',
                      border: activeSuit === i ? 'none' : '1px solid rgba(255,255,255,0.06)',
                    }}>
              {s.suit} · {s.en}
            </button>
          ))}
        </div>

        {SUIT_EXAMPLES[activeSuit] && (
          <div className="animate-fade-scale flex items-center gap-10 max-md:flex-col max-w-[700px] mx-auto p-8 rounded-2xl"
               style={{
                 background: 'rgba(255,255,255,0.02)',
                 border: '1px solid rgba(255,255,255,0.04)',
               }}>
            <div className="w-[120px] aspect-[5/7] rounded-xl overflow-hidden flex-shrink-0 shadow-lg"
                 style={{ border:'1px solid rgba(201,169,110,0.15)' }}>
              <img src={SUIT_EXAMPLES[activeSuit].src} alt={SUIT_EXAMPLES[activeSuit].suit}
                   className="w-full h-full object-cover" loading="lazy" />
            </div>
            <div>
              <div className="font-serif text-xl text-[#C9A96E] mb-1">
                {SUIT_EXAMPLES[activeSuit].suit}（{SUIT_EXAMPLES[activeSuit].en}）
              </div>
              <div className="flex gap-4 text-sm text-[#64748B] mb-3">
                <span>元素：{SUIT_EXAMPLES[activeSuit].element}</span>
                <span>关键词：{SUIT_EXAMPLES[activeSuit].keyword}</span>
              </div>
              <p className="text-sm text-[#94A3B8] leading-relaxed">
                {SUIT_EXAMPLES[activeSuit].suit}牌组代表着{SUIT_EXAMPLES[activeSuit].element}元素的能量，
                在塔罗中对应着{SUIT_EXAMPLES[activeSuit].keyword}等生活领域。
                当{SUIT_EXAMPLES[activeSuit].suit}牌组在占卜中频繁出现时，说明这些方面正在你的生活中发挥重要作用。
              </p>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}

/* ================================ GallerySection (翻牌效果) ================================ */
function GallerySection() {
  const [flipped, setFlipped] = useState(null)
  const [filter, setFilter] = useState('all')

  const filteredCards = filter === 'all'
    ? galleryCards
    : filter === 'major'
      ? galleryCards.filter(c => c.id.startsWith('m'))
      : galleryCards.filter(c => c.id.startsWith(filter))

  return (
    <section id="gallery" className="py-24 relative">
      <div className="max-w-[1100px] mx-auto px-6">
        <div className="text-center mb-14">
          <div className="text-xs tracking-[4px] mb-3" style={{ color:'#C9A96E' }}>GALLERY</div>
          <h2 className="font-serif text-[34px] max-md:text-[26px] font-bold text-[#F1F0FB] mb-3">牌库预览</h2>
          <p className="text-sm text-[#64748B]">点击卡牌翻转查看详情 · 共78张经典维特塔罗牌</p>
        </div>

        {/* 过滤 */}
        <div className="flex justify-center gap-3 mb-12 flex-wrap">
          {[
            ['all', '全部'],
            ['major', '大阿卡纳'],
            ['w', '权杖'],
            ['c', '圣杯'],
            ['s', '宝剑'],
            ['p', '星币'],
          ].map(([val, label]) => (
            <button key={val}
                    onClick={() => { setFilter(val); setFlipped(null); }}
                    className="py-2 px-5 rounded-lg text-sm font-medium cursor-pointer transition-all border-none"
                    style={{
                      background: filter === val ? 'rgba(201,169,110,0.15)' : 'rgba(255,255,255,0.03)',
                      color: filter === val ? '#C9A96E' : '#64748B',
                      border: filter === val ? '1px solid rgba(201,169,110,0.25)' : '1px solid rgba(255,255,255,0.04)',
                    }}>
              {label}
            </button>
          ))}
        </div>

        {/* 卡牌网格 */}
        <div className="grid grid-cols-6 max-lg:grid-cols-4 max-md:grid-cols-3 max-sm:grid-cols-2 gap-4">
          {filteredCards.map((card) => (
            <div key={card.id}
                 className={`flip-card cursor-pointer ${flipped === card.id ? 'flipped' : ''}`}
                 style={{ aspectRatio:'5/7', height:'auto' }}
                 onClick={() => setFlipped(flipped === card.id ? null : card.id)}>
              <div className="flip-card-inner">
                {/* 正面 */}
                <div className="flip-card-front rounded-xl overflow-hidden"
                     style={{ border:'1px solid rgba(201,169,110,0.12)', boxShadow:'0 4px 16px rgba(0,0,0,0.3)' }}>
                  <img src={card.src} alt={card.name}
                       className="w-full h-full object-cover"
                       loading="lazy" />
                </div>
                {/* 背面 */}
                <div className="flip-card-back p-3 flex flex-col items-center justify-center text-center"
                     style={{
                       background: 'linear-gradient(145deg, #1a0f2e, #0f0a1a)',
                       border: '1px solid rgba(201,169,110,0.2)',
                     }}>
                  <div className="font-serif text-sm font-bold text-[#C9A96E] mb-1">{card.name}</div>
                  <div className="text-[10px] text-[#64748B] mb-2 tracking-[1px]">{card.en}</div>
                  <div className="w-6 h-px mb-2" style={{ background:'rgba(201,169,110,0.3)' }} />
                  <div className="text-[10px] text-[#94A3B8] leading-relaxed">
                    <div className="mb-1">
                      <span style={{ color:'#6EE7B7' }}>{'▲'} 正位：</span>
                      {card.upright}
                    </div>
                    <div>
                      <span style={{ color:'#FCA5A5' }}>{'▼'} 逆位：</span>
                      {card.reversed}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-10">
          <p className="text-sm text-[#64748B]">
            共 {filteredCards.length} 张 · 小程序中查看全部78张完整解读
          </p>
        </div>
      </div>
    </section>
  )
}

/* ================================ FeaturesSection (含交互式每日一牌) ================================ */
function FeaturesSection() {
  const [drawing, setDrawing] = useState(false)
  const [drawnCard, setDrawnCard] = useState(null)
  const [showBack, setShowBack] = useState(true)

  const handleDraw = () => {
    if (drawing) return
    setDrawing(true)
    setDrawnCard(null)
    setShowBack(true)

    setTimeout(() => {
      const card = ALL_CARDS[Math.floor(Math.random() * ALL_CARDS.length)]
      setDrawnCard(card)
      setDrawing(false)
      setTimeout(() => setShowBack(false), 200)
    }, 1500)
  }

  const features = [
    { icon:'🃃', title:'每日一牌', desc:'每天抽一张今日指引牌，翻牌动画、完整解读。30秒完成，适合每天的习惯。' },
    { icon:'🔮', title:'多牌阵占卜', desc:'三牌阵、凯尔特十字、感情事业财运学业——覆盖生活各个领域。自定义牌阵也支持。' },
    { icon:'📚', title:'78张牌完整牌库', desc:'大阿卡纳 + 小阿卡纳（圣杯/权杖/宝剑/星币），每张牌含正位/逆位深度解读。' },
    { icon:'⭐', title:'星座运势', desc:'每日/每周/每月运势、星座配对分析。结合塔罗牌，给你不一样的运势体验。' },
  ]

  return (
    <section id="features" className="py-24 relative">
      <div className="max-w-[1100px] mx-auto px-6">
        <div className="text-center mb-16">
          <div className="text-xs tracking-[4px] mb-3" style={{ color:'#C9A96E' }}>FEATURES</div>
          <h2 className="font-serif text-[34px] max-md:text-[26px] font-bold text-[#F1F0FB] mb-3">功能一览</h2>
          <p className="text-sm text-[#64748B]">一个简单但不敷衍的塔罗工具，该有的都有</p>
        </div>

        {/* 交互式每日一牌 */}
        <div className="max-w-[700px] mx-auto mb-20 p-10 rounded-2xl text-center"
             style={{
               background: 'linear-gradient(145deg, rgba(201,169,110,0.05), rgba(139,105,20,0.03))',
               border: '1px solid rgba(201,169,110,0.1)',
             }}>
          <h3 className="font-serif text-2xl text-[#F1F0FB] mb-2">{'🃃'} 今日灵感抽牌</h3>
          <p className="text-sm text-[#64748B] mb-8">点击下方按钮，抽取一张今日指引牌</p>

          <div className="flex justify-center mb-8">
            <div className="flip-card" style={{ width:160, aspectRatio:'5/7' }}>
              <div className={`flip-card-inner ${!showBack && drawnCard ? 'flipped' : ''}`}>
                <div className="flip-card-front rounded-xl overflow-hidden"
                     style={{ border:'1px solid rgba(201,169,110,0.12)' }}>
                  {drawnCard ? (
                    <img src={drawnCard.src} alt={drawnCard.name}
                         className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center"
                         style={{ background:'linear-gradient(145deg, #1a0f2e, #0f0a1a)' }}>
                      <span className="text-4xl text-[#C9A96E]">{'✦'}</span>
                    </div>
                  )}
                </div>
                <div className="flip-card-back rounded-xl flex flex-col items-center justify-center p-4 text-center"
                     style={{ background:'linear-gradient(145deg, #1a0f2e, #0f0a1a)' }}>
                  <div className="text-4xl mb-2">{'✦'}</div>
                  <div className="text-[10px] text-[#64748B] tracking-[2px]">CLICK TO DRAW</div>
                  <div className="text-[11px] text-[#C9A96E] mt-1">今日指引</div>
                </div>
              </div>
            </div>
          </div>

          {drawnCard && !showBack && (
            <div className="animate-fade-in-up text-center">
              <div className="font-serif text-xl text-[#C9A96E] mb-1">{drawnCard.name}</div>
              <div className="text-xs text-[#64748B] mb-3 tracking-[1px]">{drawnCard.en} · {drawnCard.num}</div>
              <div className="text-sm text-[#94A3B8] leading-relaxed max-w-[400px] mx-auto mb-3">{drawnCard.desc}</div>
              <div className="flex justify-center gap-6 text-xs">
                <span style={{ color:'#6EE7B7' }}>{'▲'} {drawnCard.upright}</span>
                <span style={{ color:'#FCA5A5' }}>{'▼'} {drawnCard.reversed}</span>
              </div>
            </div>
          )}

          <button onClick={handleDraw}
                  disabled={drawing}
                  className="mt-8 py-3.5 px-10 rounded-xl text-base font-medium cursor-pointer transition-all border-none hover:-translate-y-0.5 disabled:opacity-60 disabled:cursor-not-allowed"
                  style={{
                    background: drawing ? 'rgba(255,255,255,0.05)' : 'linear-gradient(135deg, #8B6914, #C9A96E)',
                    color: drawing ? '#64748B' : '#0a0612',
                    boxShadow: drawing ? 'none' : '0 8px 24px rgba(201,169,110,0.25)',
                  }}>
            {drawing ? '抽牌中...' : drawnCard && !showBack ? '再抽一次' : '抽取今日指引'}
          </button>
        </div>

        {/* 功能网格 */}
        <div className="grid grid-cols-2 max-md:grid-cols-1 gap-6">
          {features.map((f, i) => (
            <div key={i}
                 className="p-8 rounded-2xl transition-all duration-300 hover:-translate-y-0.5"
                 style={{
                   background: 'rgba(255,255,255,0.02)',
                   border: '1px solid rgba(255,255,255,0.04)',
                 }}>
              <div className="text-[32px] mb-4">{f.icon}</div>
              <h3 className="font-serif text-xl text-[#F1F0FB] mb-2">{f.title}</h3>
              <p className="text-sm text-[#94A3B8] leading-relaxed">{f.desc}</p>
              <div className="mt-4 h-[100px] rounded-xl flex items-center justify-center text-sm"
                   style={{
                     background: 'linear-gradient(145deg, #1E293B, #111827)',
                     border: '1px solid rgba(255,255,255,0.04)',
                     color: '#64748B',
                   }}>
                {f.icon} {f.title}界面预览
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ================================ ZodiacSection (翻牌功能) ================================ */
function ZodiacSection() {
  const [activeZodiac, setActiveZodiac] = useState(null)

  const elementColors = {
    '火': '#E74C3C',
    '土': '#27AE60',
    '风': '#F1C40F',
    '水': '#3498DB',
  }

  return (
    <section id="zodiac" className="py-24 relative">
      <div className="max-w-[1100px] mx-auto px-6">
        <div className="text-center mb-16">
          <div className="text-xs tracking-[4px] mb-3" style={{ color:'#C9A96E' }}>ZODIAC</div>
          <h2 className="font-serif text-[34px] max-md:text-[26px] font-bold text-[#F1F0FB] mb-3">星座运势</h2>
          <p className="text-sm text-[#64748B]">点击星座卡牌翻转查看本周运势</p>
        </div>

        <div className="grid grid-cols-6 max-lg:grid-cols-4 max-md:grid-cols-3 max-sm:grid-cols-2 gap-4">
          {ZODIACS.map((z) => (
            <div key={z.id}
                 className={`flip-card cursor-pointer ${activeZodiac === z.id ? 'flipped' : ''}`}
                 style={{ aspectRatio:'3/4', height:'auto' }}
                 onClick={() => setActiveZodiac(activeZodiac === z.id ? null : z.id)}>
              <div className="flip-card-inner">
                {/* 正面 */}
                <div className="flip-card-front rounded-xl flex flex-col items-center justify-center p-4 text-center"
                     style={{
                       background: `linear-gradient(145deg, rgba(255,255,255,0.04), rgba(255,255,255,0.01))`,
                       border: `1px solid ${z.color}22`,
                     }}>
                  <div className="text-[36px] mb-2">{z.emoji}</div>
                  <div className="font-serif text-base font-bold text-[#F1F0FB] mb-0.5">{z.name}</div>
                  <div className="text-[10px] tracking-[1px]" style={{ color: z.color }}>{z.nameEn}</div>
                  <div className="text-[10px] text-[#64748B] mt-1">{z.date}</div>
                  <div className="mt-2 px-2 py-0.5 rounded text-[10px]"
                       style={{ background:`${z.color}22`, color:z.color }}>
                    {z.element}元素
                  </div>
                </div>
                {/* 背面 */}
                <div className="flip-card-back rounded-xl flex flex-col items-center justify-center p-4 text-center"
                     style={{
                       background: `linear-gradient(145deg, ${z.color}15, rgba(10,6,18,0.95))`,
                       border: `1px solid ${z.color}33`,
                     }}>
                  <div className="text-lg mb-1">{z.emoji}</div>
                  <div className="font-serif text-sm font-bold text-[#F1F0FB] mb-2">{z.name}</div>
                  <div className="text-[10px] leading-relaxed text-[#94A3B8] mb-2">{z.desc}</div>
                  <div className="w-8 h-px mb-2" style={{ background: `${z.color}44` }} />
                  <div className="text-[10px] leading-relaxed" style={{ color: z.color }}>
                    {z.fortune}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ================================ CTASection ================================ */
function CTASection() {
  return (
    <section id="cta" className="py-24 relative">
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none"
           style={{ background:'radial-gradient(ellipse at center, #C9A96E 0%, transparent 70%)' }} />
      <div className="max-w-[1100px] mx-auto px-6">
        <div className="max-w-[700px] mx-auto text-center p-14 rounded-3xl max-md:p-10"
             style={{
               background: 'linear-gradient(145deg, rgba(201,169,110,0.06), rgba(139,105,20,0.03))',
               border: '1px solid rgba(201,169,110,0.12)',
             }}>
          <div className="text-xs tracking-[4px] mb-4" style={{ color:'#C9A96E' }}>OPEN IN WECHAT</div>
          <h2 className="font-serif text-[34px] max-md:text-[26px] font-bold text-[#F1F0FB] mb-4">
            打开微信，即刻开始
          </h2>
          <p className="text-sm text-[#94A3B8] mb-8 leading-relaxed">
            微信扫码或搜索「星塔」打开小程序<br />
            每日一牌、塔罗占卜、星座运势、完整牌库——全部免费
          </p>

          <div className="flex flex-col items-center gap-6">
            {/* 二维码占位 */}
            <div className="w-[160px] h-[160px] rounded-xl p-2" style={{ background:'rgba(255,255,255,0.95)' }}>
              <div className="w-full h-full rounded flex items-center justify-center text-xs text-center"
                   style={{ background:'#f5f5f5', color:'#999' }}>
                {'●'}<br />
                小程序码<br />
                <span style={{ fontSize:9 }}>（替换为实际码）</span>
              </div>
            </div>
            <div className="text-xs text-[#64748B]">微信扫描打开「星塔」小程序</div>
          </div>

          <div className="mt-10 grid grid-cols-2 max-md:grid-cols-1 gap-4 text-left">
            {[
              ['🃃', '每日一牌', '每天30秒，获取今日指引'],
              ['🔮', '塔罗占卜', '多种牌阵，覆盖各领域'],
              ['⭐', '星座运势', '每日每周每月运势更新'],
              ['📖', '完整牌库', '78张牌正逆位深度解读'],
            ].map(([icon, title, desc]) => (
              <div key={title} className="flex items-center gap-3 p-3 rounded-xl"
                   style={{ background:'rgba(255,255,255,0.03)' }}>
                <span className="text-2xl">{icon}</span>
                <div>
                  <div className="text-sm font-medium text-[#F1F0FB]">{title}</div>
                  <div className="text-xs text-[#64748B]">{desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

/* ================================ FooterSection ================================ */
function FooterSection() {
  return (
    <footer className="py-12 text-center border-t"
            style={{ borderColor:'rgba(255,255,255,0.04)' }}>
      <div className="max-w-[1100px] mx-auto px-6">
        <div className="font-serif text-[22px] font-bold tracking-[4px] text-[#F1F0FB] mb-2">
          {'✦'} 星<span style={{ color:'#C9A96E' }}>塔</span>
        </div>
        <p className="text-sm text-[#64748B]">塔罗是一面镜子，真正的答案在你心中</p>

        <div className="mt-5 mx-auto max-w-[600px] p-4 rounded-lg text-xs leading-relaxed"
             style={{ background:'rgba(255,255,255,0.02)', color:'#475569' }}>
          <strong>免责声明：</strong>
          星塔提供的所有占卜结果及内容仅供娱乐参考，不构成任何决策建议。
          塔罗牌是一种自我探索的工具，帮助用户进行自我觉察与思考，
          不应替代专业心理咨询或现实生活中的判断。
        </div>

        <div className="mt-6 text-xs" style={{ color:'#475569' }}>
          {'©'} 2026 星塔 · 内容仅供娱乐参考
        </div>
      </div>
    </footer>
  )
}

/* ================================ 首页组件 ================================ */
export default function Home() {
  return (
    <>
      <Head>
        <title>星塔 · 塔罗牌占卜与星座运势</title>
        <meta name="description" content="基于维特塔罗经典体系，78张牌完整收录。每日一牌、塔罗占卜、星座运势——不迷信、不宿命，只为你提供内心的指引与启发。" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#0a0612" />
        <link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>✨</text></svg>" />
      </Head>

      <GlobalStyles />
      <CosmicBackground />

      <div className="relative z-10">
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
