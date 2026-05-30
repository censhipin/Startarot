import Head from 'next/head'
import Starfield from '@/components/Starfield'
import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import Features from '@/components/Features'
import Stats from '@/components/Stats'
import QRCode from '@/components/QRCode'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <>
      <Head>
        <title>星塔 · 塔罗牌占卜与星座运势</title>
        <meta name="description" content="基于维特塔罗经典体系，78张牌完整收录。每日一牌、塔罗占卜、星座运势——全部免费。" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta property="og:title" content="星塔 · 塔罗牌占卜与星座运势" />
        <meta property="og:description" content="基于维特塔罗经典体系，78张牌完整收录。每日一牌、塔罗占卜、星座运势。" />
      </Head>

      <div className="fixed inset-0 pointer-events-none z-0"
           style={{
             background:
               'radial-gradient(ellipse 80% 60% at 50% 0%, rgba(59,42,98,0.2) 0%, transparent 70%),' +
               'radial-gradient(ellipse 60% 50% at 80% 80%, rgba(30,58,95,0.15) 0%, transparent 60%)',
           }}>
      </div>

      <Starfield />
      <Navbar />
      <Hero />
      <Features />
      <Stats />
      <QRCode />
      <Footer />
    </>
  )
}
