import React, { useState } from 'react'
import { botPersonalities } from '../data/botPersonalities'

export default function BotPersonalitySelector({ currentPersonality, onPersonalityChange }) {
  const [isOpen, setIsOpen] = useState(false)

  const currentBot = botPersonalities[currentPersonality]

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 rounded-lg transition-colors"
        title="Change bot personality"
      >
        <span className="text-lg">{currentBot.avatar}</span>
        <div className="text-left">
          <div className="text-xs font-medium text-slate-700 dark:text-slate-300">
            {currentBot.name}
          </div>
          <div className="text-xs text-slate-500 dark:text-slate-400">
            {currentBot.description}
          </div>
        </div>
        <svg className={`w-4 h-4 text-slate-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 mt-2 w-64 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg shadow-lg z-50 animate-slide-in">
          <div className="p-2">
            <div className="text-xs font-medium text-slate-500 dark:text-slate-400 mb-2 px-2">
              Choose Bot Personality
            </div>
            {Object.values(botPersonalities).map((personality) => (
              <button
                key={personality.id}
                onClick={() => {
                  onPersonalityChange(personality.id)
                  setIsOpen(false)
                }}
                className={`w-full flex items-center gap-3 p-2 rounded-lg transition-colors text-left ${
                  currentPersonality === personality.id
                    ? 'bg-sky-100 dark:bg-sky-900 text-sky-700 dark:text-sky-300'
                    : 'hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300'
                }`}
              >
                <span className="text-lg">{personality.avatar}</span>
                <div>
                  <div className="text-sm font-medium">{personality.name}</div>
                  <div className="text-xs opacity-75">{personality.description}</div>
                </div>
                {currentPersonality === personality.id && (
                  <svg className="w-4 h-4 ml-auto" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                )}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
