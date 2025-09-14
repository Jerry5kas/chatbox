import React, { useState, useRef, useEffect } from 'react'
import { formatTimestamp, formatTime } from '../utils/dateUtils'
import { useChatStorage } from '../hooks/useChatStorage'

export default function ChatBox() {
  const { messages, addMessage, clearMessages, exportMessages } = useChatStorage()
  const [text, setText] = useState('')
  const listRef = useRef(null)

  useEffect(() => {
    // auto-scroll to bottom
    if (listRef.current) {
      listRef.current.scrollTop = listRef.current.scrollHeight
    }
  }, [messages])

  function send() {
    const trimmed = text.trim()
    if (!trimmed) return
    
    // Add user message
    addMessage({
      from: 'me',
      text: trimmed
    })
    setText('')
    
    // demo bot response
    setTimeout(() => {
      addMessage({
        from: 'bot',
        text: 'Nice — thanks for trying this demo!'
      })
    }, 600)
  }

  function onKey(e) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      send()
    }
  }

  return (
    <div className="bg-white dark:bg-slate-800 shadow-md rounded-2xl overflow-hidden border border-slate-100 dark:border-slate-700 transition-colors duration-300">
      <div className="px-4 py-3 border-b border-slate-100 dark:border-slate-700 flex items-center justify-between">
        <div>
          <div className="text-sm font-medium text-slate-800 dark:text-slate-200">Support</div>
          <div className="text-xs text-slate-500 dark:text-slate-400">Online</div>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={exportMessages}
            className="text-xs text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-300 transition-colors"
            title="Export chat history"
          >
            📥
          </button>
          <button
            onClick={clearMessages}
            className="text-xs text-slate-400 dark:text-slate-500 hover:text-red-500 transition-colors"
            title="Clear chat history"
          >
            🗑️
          </button>
          <div className="text-xs text-slate-400 dark:text-slate-500">Light • static</div>
        </div>
      </div>

      <div ref={listRef} className="p-4 h-72 overflow-auto space-y-3 bg-gradient-to-b from-white to-slate-50 dark:from-slate-800 dark:to-slate-900">
        {messages.map((m) => (
          <div key={m.id} className={`flex ${m.from === 'me' ? 'justify-end' : 'justify-start'} animate-slide-in`}>
            <div className="max-w-[80%]">
              <div className={`${m.from === 'me' ? 'bg-sky-600 text-white rounded-lg rounded-br-none' : 'bg-slate-100 dark:bg-slate-700 text-slate-800 dark:text-slate-200 rounded-lg rounded-bl-none'} px-4 py-2 transition-colors duration-300`}> 
                <div className="text-sm leading-6 whitespace-pre-wrap">{m.text}</div>
              </div>
              <div className={`text-xs mt-1 px-2 ${m.from === 'me' ? 'text-right text-slate-500 dark:text-slate-400' : 'text-left text-slate-400 dark:text-slate-500'}`}>
                {formatTime(m.timestamp)}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="p-3 border-t border-slate-100 dark:border-slate-700 bg-white dark:bg-slate-800 transition-colors duration-300">
        <div className="flex gap-2">
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={onKey}
            placeholder="Type a message... (Enter to send)"
            className="flex-1 resize-none h-10 rounded-xl border border-slate-200 dark:border-slate-600 px-3 py-2 text-sm bg-white dark:bg-slate-700 text-slate-800 dark:text-slate-200 placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-sky-200 dark:focus:ring-sky-800 transition-colors duration-300"
          />
          <button
            onClick={send}
            className="inline-flex items-center justify-center px-4 py-2 rounded-xl bg-sky-600 text-white text-sm font-medium shadow-sm hover:brightness-95 transition-all duration-200 hover:scale-105"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  )
}
