import NavBar from '../components/NavBar'
import Footer from '../components/Footer'
import { DM_Sans } from '@next/font/google'

const dmFont = DM_Sans({ weight: "400", subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <head>
      <title>NFPaisanos | NFT Marketplace </title>
      <meta name='description' content='Marketplace of Nfts'/>
      <link rel='icon' href='/favicon-paisanos.png'/>
      </head>
      <body className={dmFont.className} style={{ margin: "0px" }}>
        <NavBar />
        <main> {children}</main>
        <Footer />
      </body>
    </html>
  )
}
