import { useEffect, useState } from 'react'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 40)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 py-4 transition-all duration-300 ${
        scrolled
          ? 'bg-[rgba(15,25,35,0.85)] backdrop-blur-md border-b border-[rgba(255,255,255,0.04)]'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-[1100px] mx-auto px-6 flex items-center justify-between">
        <a href="#hero" className="font-serif text-[22px] font-bold tracking-[4px] text-[#F1F0FB] no-underline">
          ✦ 星<span className="text-gold">塔</span>
        </a>

        <div className="hidden md:flex gap-7">
          <a href="#features" className="text-[#94A3B8] no-underline text-sm tracking-[1px] hover:text-[#F1F0FB] transition-colors">
            功能介绍
          </a>
          <a href="#stats" className="text-[#94A3B8] no-underline text-sm tracking-[1px] hover:text-[#F1F0FB] transition-colors">
            数据
          </a>
          <a href="#qrcode" className="text-[#94A3B8] no-underline text-sm tracking-[1px] hover:text-[#F1F0FB] transition-colors">
            小程序
          </a>
        </div>

        <a
          href="#qrcode"
          className="py-2 px-5 rounded-lg border-none text-sm font-medium cursor-pointer transition-all tracking-[1px] no-underline"
          style={{
            background: 'linear-gradient(135deg, #8B6914, #C9A96E)',
            color: '#0F1923',
          }}
        >
          打开小程序
        </a>
      </div>
    </nav>
  )
}
