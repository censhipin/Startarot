export default function Hero() {
  return (
    <section id="hero" className="min-h-screen flex items-center pt-20">
      <div className="max-w-[1100px] mx-auto px-6 flex items-center gap-16 max-md:flex-col max-md:text-center">
        {/* 左侧文字 */}
        <div className="flex-1">
          <span className="inline-block px-4 py-1.5 rounded-full text-sm tracking-[2px] mb-6"
                style={{ background: 'rgba(201,169,110,0.1)', border: '1px solid rgba(201,169,110,0.15)', color: '#C9A96E' }}>
            ✦ 塔罗牌自我探索工具
          </span>

          <h1 className="font-serif text-5xl max-md:text-3xl font-bold leading-tight text-[#F1F0FB] mb-5">
            塔罗是心灵的镜<br />
            照见你 <span className="text-gold italic">真实的内在</span>
          </h1>

          <p className="text-base leading-relaxed text-[#94A3B8] max-w-[520px] max-md:max-w-full mb-8">
            基于维特塔罗经典体系，78张牌完整收录。每一次抽牌都是一次与自己的深度对话，
            不迷信、不宿命，只为你提供内心的指引与启发。
          </p>

          <div className="flex gap-10 mb-9 max-md:justify-center max-md:gap-6">
            <div>
              <div className="font-serif text-3xl font-bold text-gold">78</div>
              <div className="text-sm text-[#64748B] mt-1">张完整牌库</div>
            </div>
            <div>
              <div className="font-serif text-3xl font-bold text-gold">12</div>
              <div className="text-sm text-[#64748B] mt-1">种经典牌阵</div>
            </div>
            <div>
              <div className="font-serif text-3xl font-bold text-gold">∞</div>
              <div className="text-sm text-[#64748B] mt-1">次自我探索</div>
            </div>
          </div>

          <div className="flex gap-4 flex-wrap max-md:justify-center">
            <a href="#qrcode"
               className="py-3.5 px-8 rounded-xl border-none text-base font-medium cursor-pointer transition-all tracking-[1px] no-underline hover:-translate-y-0.5"
               style={{
                 background: 'linear-gradient(135deg, #8B6914, #C9A96E)',
                 color: '#0F1923',
                 boxShadow: '0 8px 24px rgba(201,169,110,0.25)',
               }}>
              微信打开 →
            </a>
            <a href="#features"
               className="py-3.5 px-8 rounded-xl text-base cursor-pointer transition-all no-underline hover:bg-[rgba(255,255,255,0.02)]"
               style={{ border: '1px solid rgba(255,255,255,0.1)', color: '#E2E8F0' }}>
              了解详情
            </a>
          </div>
        </div>

        {/* 右侧卡牌 */}
        <div className="flex-[0_0_280px] max-md:hidden">
          <div className="w-[260px] aspect-[5/7] mx-auto rounded-2xl flex flex-col items-center justify-center text-center p-8"
               style={{
                 background: 'linear-gradient(145deg, #1E293B, #111827)',
                 border: '1px solid rgba(201,169,110,0.2)',
                 boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
               }}>
            <div className="font-serif text-sm text-gold tracking-[3px]">XVII · THE STAR</div>
            <div className="text-[44px] my-3">🌟</div>
            <div className="font-serif text-xl text-[#F1F0FB] tracking-[4px]">星星</div>
            <div className="text-[11px] text-[#64748B] mt-0.5 tracking-[2px]">希望 · 灵感 · 治愈</div>
            <div className="w-10 h-px my-3" style={{ background: 'rgba(201,169,110,0.3)' }}></div>
            <div className="text-sm text-[#94A3B8] leading-relaxed">代表希望与内心的平静，鼓励你保持信念。</div>
          </div>
        </div>
      </div>
    </section>
  )
}
