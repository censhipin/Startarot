export default function Footer() {
  return (
    <footer className="py-10 text-center border-t border-[rgba(255,255,255,0.04)]">
      <div className="max-w-[1100px] mx-auto px-6">
        <div className="font-serif text-[22px] font-bold tracking-[4px] text-[#F1F0FB] mb-2">
          ✦ 星<span className="text-gold">塔</span>
        </div>
        <p className="text-sm text-[#64748B]">塔罗是一面镜子，真正的答案在你心中</p>

        <div className="mt-4 mx-auto max-w-[600px] p-3 rounded-lg text-xs text-[#475569] leading-relaxed"
             style={{ background: 'rgba(255,255,255,0.02)' }}>
          <strong>免责声明：</strong>
          星塔提供的所有占卜结果及内容仅供娱乐参考，不构成任何决策建议。
          塔罗牌是一种自我探索的工具，帮助用户进行自我觉察与思考，
          不应替代专业心理咨询或现实生活中的判断。
        </div>

        <p className="mt-5 text-xs text-[#475569]">
          © 2026 星塔 · 内容仅供娱乐参考
        </p>
      </div>
    </footer>
  )
}
