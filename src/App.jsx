import React from 'react'
import ChatBox from './components/ChatBox'

export default function App() {
  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <div className="w-full max-w-md">
        <header className="mb-4">
          <h1 className="text-2xl font-semibold text-slate-800">Simple Chatbox</h1>
          <p className="text-sm text-slate-500">Lightweight, static React chat UI — ready for GitHub Pages.</p>
        </header>
        <ChatBox />
      </div>
    </div>
  )
}
