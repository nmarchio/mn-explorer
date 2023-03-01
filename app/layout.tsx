import Footer from '@/components/Footer'
import Navigation from '@/components/Navigation'
import { Montserrat } from 'next/font/google';
import './globals.css'

export const metadata = {
  title: 'Million Neighborhoods Project',
  description: 'Million Neighborhoods is an initiative of the Mansueto Institute for Urban Innovation at the University of Chicago to provide frameworks, tools, and data for mapping, planning, and coordinating solutions towards fulfilling the UN’s Agenda 2030 for Global Sustainable Development.',
  keywords: 'slum,informal settlement,map,million neighborhoods,reblock,global,world,earth,africa,university of chicago,uchicago,mansueto,miurban,data,street,road,access,infrastructure,urban,science,algorithms,bettencourt,marchio,soman,nederhood,sdg,sustainable,poverty,development',
  image: "https://millionneighborhoods.org/extra/images/hi-res.png",
  openGraph: {
    url: "https://millionneighborhoods.org",
    image: "https://millionneighborhoods.org/extra/images/hi-res.png",
    type:"website",
    title:"Global Map Helps Identify Urban Slums",
    description:"Urban researchers harness algorithms to map slums — and improve access to much-needed public services."
  },
  twitter: {
    card:"summary_large_image",
    site:"@miurbanchicago",
    creator:"@miurbanchicago",
    title:"Global Map Helps Identify Urban Slums",
    description:"Urban researchers harness algorithms to map slums — and improve access to much-needed public services.",
    url:"https://millionneighborhoods.org",
    image:"https://millionneighborhoods.org/extra/images/hi-res.png"
  }
}

const montserrat = Montserrat({
  weight: ['400','700'],
  subsets: ['latin'],
  display: 'swap'
})

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={montserrat.className}>
      <body>
        <Navigation />
        {children}
        <Footer />
      </body>
    </html>
  )
}
