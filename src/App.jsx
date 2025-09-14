import React from 'react'
import { AdvancedThemeProvider } from './contexts/AdvancedThemeContext'
import ChatBox from './components/ChatBox'
import PWAInstallPrompt from './components/PWAInstallPrompt'

export default function App() {
  return (
    <AdvancedThemeProvider>
      <div className="min-h-screen flex items-center justify-center p-6 transition-colors duration-300" style={{ background: 'var(--background-gradient, var(--color-background))' }}>
        <div className="w-full max-w-md">
          <ChatBox />
        </div>
      </div>
      
      <PWAInstallPrompt />
    </AdvancedThemeProvider>
  )
}
