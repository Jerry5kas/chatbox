import React, { useState } from 'react'
import { botPersonalities } from '../data/botPersonalities'
import { ChevronDownIcon, CheckIcon } from './icons/SvgIcons'

export default function BotPersonalitySelector({ currentPersonality, onPersonalityChange }) {
  const [isOpen, setIsOpen] = useState(false)

  const currentBot = botPersonalities[currentPersonality]

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-3 px-4 py-2.5 bg-gradient-to-r from-slate-50 to-slate-100 dark:from-slate-700 dark:to-slate-800 hover:from-slate-100 hover:to-slate-200 dark:hover:from-slate-600 dark:hover:to-slate-700 rounded-xl transition-all duration-200 border border-slate-200 dark:border-slate-600 hover:shadow-sm group"
        title="Change bot personality"
      >
        <span className="text-xl group-hover:scale-110 transition-transform">{currentBot.avatar}</span>
        <div className="text-left flex-1">
          <div className="text-sm font-semibold text-slate-800 dark:text-slate-200">
            {currentBot.name}
          </div>
          <div className="text-xs text-slate-600 dark:text-slate-400">
            {currentBot.description}
          </div>
        </div>
        <ChevronDownIcon className={`w-4 h-4 text-slate-500 dark:text-slate-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
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
                  <CheckIcon className="w-4 h-4 ml-auto text-sky-600 dark:text-sky-400" />
                )}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
