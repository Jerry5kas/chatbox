import React, { useState } from 'react'

const quickReactions = ['👍', '❤️', '😂', '😮', '😢', '😡']

export default function MessageReactions({ messageId, reactions, onAddReaction }) {
  const [showPicker, setShowPicker] = useState(false)

  const handleReactionClick = (emoji) => {
    onAddReaction(messageId, emoji)
    setShowPicker(false)
  }

  return (
    <div className="mt-2 flex items-center gap-1">
      {/* Existing Reactions */}
      {Object.entries(reactions || {}).map(([emoji, count]) => (
        <button
          key={emoji}
          onClick={() => handleReactionClick(emoji)}
          className="flex items-center gap-1 px-2 py-1 bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 rounded-full text-xs transition-colors group"
        >
          <span className="text-sm">{emoji}</span>
          <span className="text-slate-600 dark:text-slate-400 group-hover:text-slate-800 dark:group-hover:text-slate-200">
            {count}
          </span>
        </button>
      ))}
      
      {/* Add Reaction Button */}
      <div className="relative">
        <button
          onClick={() => setShowPicker(!showPicker)}
          className="w-6 h-6 flex items-center justify-center text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition-colors"
          title="Add reaction"
        >
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
          </svg>
        </button>
        
        {/* Quick Reaction Picker */}
        {showPicker && (
          <div className="absolute bottom-full left-0 mb-2 p-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg shadow-lg flex gap-1 z-10 animate-slide-in">
            {quickReactions.map((emoji) => (
              <button
                key={emoji}
                onClick={() => handleReactionClick(emoji)}
                className="w-8 h-8 flex items-center justify-center text-lg hover:bg-slate-100 dark:hover:bg-slate-700 rounded transition-colors"
                title={emoji}
              >
                {emoji}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
