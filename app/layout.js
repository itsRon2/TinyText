import { Inter } from 'next/font/google'
import './globals.css'
import {SmsProvider} from '@/components/SmsContext'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Tiny Text App',
  description: 'Created by Timbla Ron',
}

export default async function RootLayout({children}) {
  return (
      <html lang="en">

              <SmsProvider>
                  <body className={inter.className} suppressHydrationWarning={true}>
                  {children}
                  </body>
              </SmsProvider>


      </html>
  )
}
