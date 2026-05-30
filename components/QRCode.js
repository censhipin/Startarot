export default function QRCode() {
  return (
    <section id="qrcode" className="py-20"
             style={{
               background: 'rgba(255,255,255,0.01)',
               borderTop: '1px solid rgba(255,255,255,0.04)',
               borderBottom: '1px solid rgba(255,255,255,0.04)',
             }}>
      <div className="max-w-[1100px] mx-auto px-6">
        <div className="text-center mb-14">
          <div className="text-xs text-gold tracking-[4px] mb-3">OPEN IN WECHAT</div>
          <h2 className="font-serif text-[34px] max-md:text-[26px] font-bold text-[#F1F0FB] mb-3">打开微信小程序</h2>
          <p className="text-base text-[#64748B]">微信扫码或搜索「星塔」即可使用</p>
        </div>

        <div className="flex items-center justify-center gap-12 flex-wrap max-md:text-center">
          {/* 小程序码占位 */}
          <div className="w-[180px] h-[180px] bg-white rounded-xl p-3">
            <div className="w-full h-full bg-gray-100 rounded flex items-center justify-center text-xs text-gray-400 text-center">
              ⬤<br />
              小程序码<br />
              （替换为实际码）
            </div>
          </div>

          <div className="max-w-[320px]">
            <h3 className="font-serif text-2xl text-[#F1F0FB] mb-2">✦ 星塔 小程序</h3>
            <p className="text-sm text-[#94A3B8] leading-relaxed mb-4">
              微信内长按识别二维码，或在微信中搜索「星塔」打开小程序。<br />
              每日一牌、塔罗占卜、星座运势、完整牌库——全部免费。
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
