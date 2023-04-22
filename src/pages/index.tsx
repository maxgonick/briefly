import Image from 'next/image'
import { Inter } from 'next/font/google'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { useEffect } from 'react'
//import EmailCallTabs from '@/components/EmailCallTabs'
// import Blurb from "../components/Blurb"

const inter = Inter({ subsets: ['latin'] })
export default function Home() {
  useEffect(() => {
    const fetchData = async () => {
      const state = 'WV';
      const data = await fetch(`/api/billsForState?state=${state}`);
      const dataJson = await data.json();
      if(data.status >= 400){
        console.log(dataJson['message']);
      } else {
        console.log(dataJson);
      }
    }
    fetchData();
  });
  return (
    <main>
    <Header/>
      {/* <Blurb/> */}
      {/* <EmailCallTabs email="dear joe, hi. -donnie j trump " number="4206661738"/> */}
    <Footer/>
    </main>
  );
}
