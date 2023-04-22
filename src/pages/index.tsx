import Image from 'next/image'
import { Inter } from 'next/font/google'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import EmailCallTabs from '@/components/EmailCallTabs'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <main>
    <Header/>
      <EmailCallTabs email="dear joe, hi. -donnie j trump " number="4206661738"/>
    <Footer/>
    </main>
  );
}
