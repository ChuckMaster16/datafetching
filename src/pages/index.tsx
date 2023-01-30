import Head from 'next/head'
import Image from 'next/image'
import { Inter } from '@next/font/google'
import styles from '@/styles/Home.module.css'
import Layout from '../components/Layout'
import { useRouter } from "next/router";





const inter = Inter({ subsets: ['latin'] })


export default function Home() {
  const {push} = useRouter();
  return (
    <>
      <Layout>
        <div className='p-20'>
          <button onClick={()=>push("/staticProps")} className='text-back font-extrabold border py-2 px-5 rounded-3xl hover:bg-black hover:text-white'>Get data</button>
        </div>
      </Layout>
      
    </>
  )
}
