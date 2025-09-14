import React from 'react'

export default function TypingIndicator({ isTyping, botName = 'Bot' }) {
  if (!isTyping) return null

  return (
    <div className="flex justify-start animate-slide-in">
      <div className="max-w-[80%]">
        <div className="bg-slate-100 dark:bg-slate-700 text-slate-800 dark:text-slate-200 rounded-lg rounded-bl-none px-4 py-2 transition-colors duration-300">
          <div className="flex items-center gap-2">
            <span className="text-sm text-slate-600 dark:text-slate-400">{botName} is typing</span>
            <div className="flex gap-1">
              <div className="w-1 h-1 bg-slate-400 rounded-full animate-bounce-subtle" style={{ animationDelay: '0ms' }}></div>
              <div className="w-1 h-1 bg-slate-400 rounded-full animate-bounce-subtle" style={{ animationDelay: '150ms' }}></div>
              <div className="w-1 h-1 bg-slate-400 rounded-full animate-bounce-subtle" style={{ animationDelay: '300ms' }}></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
