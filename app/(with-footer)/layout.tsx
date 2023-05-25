import Footer from '@/components/Footer'
import Navigation from '@/components/Navigation'
import { Montserrat } from 'next/font/google';
import '../globals.css'

export const metadata = {
  title: 'Million Neighborhoods',
  description: 'Million Neighborhoods is an initiative to provide tools and data for mapping, planning, and coordinating solutions that improve the delivery of critical public services in rapidly urbanizing countries.',
  keywords: 'slum,informal settlement,map,million neighborhoods,reblock,global,world,earth,africa,university of chicago,uchicago,mansueto,miurban,data,street,road,access,infrastructure,urban,science,algorithms,bettencourt,marchio,sdg,sustainable,poverty,development',
  image: "https://millionneighborhoods.africa/card-image.png",
  openGraph: {
    url: "https://www.millionneighborhoods.africa",
    image: "https://millionneighborhoods.africa/card-image.png",
    type:"website",
    title:"Mapping development down to the street block",
    description:"Explore an interactive map of population and areas that lack access to street networks in sub-Saharan Africa."
  },
  twitter: {
    card:"summary_large_image",
    site:"@miurbanchicago",
    creator:"@miurbanchicago",
    title:"Mapping development down to the street block",
    description:"Explore an interactive map of population and areas that lack access to street networks in sub-Saharan Africa.",
    url:"https://www.millionneighborhoods.africa",
    image:"https://millionneighborhoods.africa/card-image.png"
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
