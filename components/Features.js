const features = [
  {
    icon: '🃏',
    title: '每日一牌',
    desc: '每天抽一张今日指引牌，翻牌动画、完整解读。30秒完成，适合每天的习惯。',
  },
  {
    icon: '🔮',
    title: '多牌阵占卜',
    desc: '三牌阵、凯尔特十字、感情事业财运学业——覆盖生活各个领域。自定义牌阵也支持。',
  },
  {
    icon: '📚',
    title: '78张牌完整牌库',
    desc: '大阿卡纳 + 小阿卡纳（圣杯/权杖/宝剑/星币），每张牌含正位/逆位深度解读。',
  },
  {
    icon: '⭐',
    title: '星座运势',
    desc: '每日/每周/每月运势、星座配对分析。结合塔罗牌，给你不一样的运势体验。',
  },
]

export default function Features() {
  return (
    <section id="features" className="py-20">
      <div className="max-w-[1100px] mx-auto px-6">
        <div className="text-center mb-14">
          <div className="text-xs text-gold tracking-[4px] mb-3">FEATURES</div>
          <h2 className="font-serif text-[34px] max-md:text-[26px] font-bold text-[#F1F0FB] mb-3">功能一览</h2>
          <p className="text-base text-[#64748B] max-w-[560px] mx-auto leading-relaxed">
            一个简单但不敷衍的塔罗工具，该有的都有
          </p>
        </div>

        <div className="grid grid-cols-2 max-md:grid-cols-1 gap-6">
          {features.map((f, i) => (
            <div
              key={i}
              className="p-8 rounded-2xl transition-all duration-300 hover:-translate-y-0.5"
              style={{
                background: 'rgba(255,255,255,0.02)',
                border: '1px solid rgba(255,255,255,0.04)',
              }}
              onMouseEnter={(e) => e.currentTarget.style.borderColor = 'rgba(201,169,110,0.12)'}
              onMouseLeave={(e) => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.04)'}
            >
              <div className="text-[32px] mb-4">{f.icon}</div>
              <h3 className="font-serif text-xl text-[#F1F0FB] mb-2">{f.title}</h3>
              <p className="text-sm text-[#94A3B8] leading-relaxed">{f.desc}</p>
              <div className="mt-4 h-[120px] rounded-xl flex items-center justify-center text-sm text-[#64748B]"
                   style={{
                     background: 'linear-gradient(145deg, #1E293B, #111827)',
                     border: '1px solid rgba(255,255,255,0.04)',
                   }}>
                📱 {f.title}界面预览
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
