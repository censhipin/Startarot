import { useEffect, useRef, useState } from 'react'

export default function NavBar() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 40)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 py-[18px] transition-all duration-400 ${
      scrolled
        ? 'bg-[rgba(15,10,25,0.85)] backdrop-blur-[20px] border-b border-[rgba(212,175,55,0.08)]'
        : 'bg-transparent'
    }`}>
      <div className="max-w-[1200px] mx-auto px-6 flex items-center justify-between">
        <a href="#" className="text-xl font-bold no-underline tracking-[4px]"
           style={{ fontFamily:"'Georgia',serif", color:'#FFF8E7' }}>
          ✦ 星<span style={{ color:'#D4AF37' }}>塔</span>
        </a>
        <div className="hidden md:flex gap-8">
          {[
            ['功能介绍', '#features'],
            ['牌库', '#gallery'],
            ['小程序', '#qrcode'],
          ].map(([text, href]) => (
            <a key={text} href={href}
               className="text-sm no-underline tracking-[1px] transition-colors hover:text-[#FFF8E7]"
               style={{ color:'#8B7D9B' }}>
              {text}
            </a>
          ))}
        </div>
        <a href="#qrcode"
           className="py-2 px-5 rounded-lg text-sm font-medium no-underline transition-all tracking-[1px]"
           style={{
             background: 'linear-gradient(135deg, #8B6914, #D4AF37)',
             color: '#0a0510',
           }}>
          打开小程序
        </a>
      </div>
    </nav>
  )
}
