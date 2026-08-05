// app/layout.tsx - Main layout for all pages
import './styles/globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Aetheris AI - Trading Bot',
  description: 'AI-powered trading signals with WhatsApp-style interface',
  viewport: 'width=device-width, initial-scale=1, maximum-scale=1',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <div className="max-w-md mx-auto bg-whatsapp-bg min-h-screen relative">
          {children}
        </div>
      </body>
    </html>
  )
}