import { metadata as rootMetadata } from '../layout'

export const metadata = {
  ...rootMetadata,
  title: 'Million Neighborhoods | Download',
  description: 'TBD',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
