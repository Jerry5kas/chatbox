import React, { useState, useRef, useEffect } from 'react'

export default function ChatBox() {
  const [messages, setMessages] = useState([
    { id: 1, from: 'bot', text: '👋 Hi! This is a static demo chat.' },
    { id: 2, from: 'me', text: 'Looks neat!' }
  ])
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
    const next = { id: Date.now(), from: 'me', text: trimmed }
    setMessages((m) => [...m, next])
    setText('')
    // demo bot response
    setTimeout(() => {
      setMessages((m) => [...m, { id: Date.now() + 1, from: 'bot', text: 'Nice — thanks for trying this demo!' }])
    }, 600)
  }

  function onKey(e) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      send()
    }
  }

  return (
    <div className="bg-white shadow-md rounded-2xl overflow-hidden border border-slate-100">
      <div className="px-4 py-3 border-b border-slate-100 flex items-center justify-between">
        <div>
          <div className="text-sm font-medium text-slate-800">Support</div>
          <div className="text-xs text-slate-500">Online</div>
        </div>
        <div className="text-xs text-slate-400">Light • static</div>
      </div>

      <div ref={listRef} className="p-4 h-72 overflow-auto space-y-3 bg-gradient-to-b from-white to-slate-50">
        {messages.map((m) => (
          <div key={m.id} className={`flex ${m.from === 'me' ? 'justify-end' : 'justify-start'}`}>
            <div className={`${m.from === 'me' ? 'bg-sky-600 text-white rounded-lg rounded-br-none' : 'bg-slate-100 text-slate-800 rounded-lg rounded-bl-none'} px-4 py-2 max-w-[80%]`}> 
              <div className="text-sm leading-6 whitespace-pre-wrap">{m.text}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="p-3 border-t border-slate-100 bg-white">
        <div className="flex gap-2">
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={onKey}
            placeholder="Type a message... (Enter to send)"
            className="flex-1 resize-none h-10 rounded-xl border border-slate-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-sky-200"
          />
          <button
            onClick={send}
            className="inline-flex items-center justify-center px-4 py-2 rounded-xl bg-sky-600 text-white text-sm font-medium shadow-sm hover:brightness-95"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  )
}
