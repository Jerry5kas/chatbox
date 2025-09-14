import React from 'react'
import { ThemeProvider } from './contexts/ThemeContext'
import ChatBox from './components/ChatBox'
import ThemeToggle from './components/ThemeToggle'

export default function App() {
  return (
    <ThemeProvider>
      <div className="min-h-screen flex items-center justify-center p-6 bg-slate-50 dark:bg-slate-900 transition-colors duration-300">
        <div className="w-full max-w-md">
          <header className="mb-4 flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-semibold text-slate-800 dark:text-slate-200">Simple Chatbox</h1>
              <p className="text-sm text-slate-500 dark:text-slate-400">Lightweight, static React chat UI — ready for GitHub Pages.</p>
            </div>
            <ThemeToggle />
          </header>
          <ChatBox />
        </div>
      </div>
    </ThemeProvider>
  )
}
