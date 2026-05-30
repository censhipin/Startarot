const stats = [
  { num: '78', label: '张塔罗牌完整收录' },
  { num: '12+', label: '种经典牌阵' },
  { num: '∞', label: '种生活场景覆盖' },
  { num: '100%', label: '免费使用' },
]

export default function Stats() {
  return (
    <section id="stats" className="py-20">
      <div className="max-w-[1100px] mx-auto px-6">
        <div className="text-center mb-14">
          <div className="text-xs text-gold tracking-[4px] mb-3">BY THE NUMBERS</div>
          <h2 className="font-serif text-[34px] max-md:text-[26px] font-bold text-[#F1F0FB]">星塔的数据</h2>
        </div>

        <div className="flex justify-center gap-16 flex-wrap">
          {stats.map((s, i) => (
            <div key={i} className="text-center">
              <div className="font-serif text-4xl font-bold text-gold">{s.num}</div>
              <div className="text-sm text-[#64748B] mt-1">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
