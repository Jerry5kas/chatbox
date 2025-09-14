import React, { useState, useRef, useEffect } from 'react'
import { emojiCategories, recentEmojis, searchEmojis } from '../data/emojis'

export default function EmojiPicker({ onEmojiSelect, isOpen, onClose }) {
  const [activeCategory, setActiveCategory] = useState('smileys')
  const [searchQuery, setSearchQuery] = useState('')
  const [searchResults, setSearchResults] = useState([])
  const pickerRef = useRef(null)

  // Close picker when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (pickerRef.current && !pickerRef.current.contains(event.target)) {
        onClose()
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isOpen, onClose])

  // Handle search
  useEffect(() => {
    if (searchQuery.trim()) {
      setSearchResults(searchEmojis(searchQuery))
    } else {
      setSearchResults([])
    }
  }, [searchQuery])

  const handleEmojiClick = (emoji) => {
    onEmojiSelect(emoji)
    onClose()
  }

  const renderEmojiList = () => {
    if (searchQuery.trim()) {
      return searchResults.map((result, index) => (
        <button
          key={`search-${index}`}
          onClick={() => handleEmojiClick(result.emoji)}
          className="w-8 h-8 flex items-center justify-center text-lg hover:bg-slate-100 dark:hover:bg-slate-700 rounded transition-colors"
          title={`${result.emoji} from ${emojiCategories[result.category].name}`}
        >
          {result.emoji}
        </button>
      ))
    }

    if (activeCategory === 'recent') {
      return recentEmojis.map((emoji, index) => (
        <button
          key={`recent-${index}`}
          onClick={() => handleEmojiClick(emoji)}
          className="w-8 h-8 flex items-center justify-center text-lg hover:bg-slate-100 dark:hover:bg-slate-700 rounded transition-colors"
          title={emoji}
        >
          {emoji}
        </button>
      ))
    }

    return emojiCategories[activeCategory]?.emojis.map((emoji, index) => (
      <button
        key={`${activeCategory}-${index}`}
        onClick={() => handleEmojiClick(emoji)}
        className="w-8 h-8 flex items-center justify-center text-lg hover:bg-slate-100 dark:hover:bg-slate-700 rounded transition-colors"
        title={emoji}
      >
        {emoji}
      </button>
    ))
  }

  if (!isOpen) return null

  return (
    <div
      ref={pickerRef}
      className="absolute bottom-full left-0 mb-2 w-80 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl shadow-lg z-50 animate-slide-in"
    >
      {/* Header */}
      <div className="p-3 border-b border-slate-200 dark:border-slate-700">
        <div className="flex items-center gap-2">
          <input
            type="text"
            placeholder="Search emojis..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="flex-1 px-3 py-2 text-sm bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-lg text-slate-800 dark:text-slate-200 placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-sky-200 dark:focus:ring-sky-800"
          />
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition-colors"
          >
            ✕
          </button>
        </div>
      </div>

      {/* Category Tabs */}
      <div className="flex border-b border-slate-200 dark:border-slate-700">
        {[
          { key: 'recent', name: 'Recent', icon: '🕒' },
          ...Object.entries(emojiCategories).map(([key, category]) => ({
            key,
            name: category.name.split(' ')[0], // Short name
            icon: category.emojis[0]
          }))
        ].map(({ key, name, icon }) => (
          <button
            key={key}
            onClick={() => {
              setActiveCategory(key)
              setSearchQuery('')
            }}
            className={`flex-1 py-2 px-1 text-xs font-medium transition-colors ${
              activeCategory === key
                ? 'text-sky-600 dark:text-sky-400 border-b-2 border-sky-600 dark:border-sky-400'
                : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-300'
            }`}
            title={name}
          >
            <div className="text-lg mb-1">{icon}</div>
            <div className="truncate">{name}</div>
          </button>
        ))}
      </div>

      {/* Emoji Grid */}
      <div className="p-3 max-h-64 overflow-y-auto">
        <div className="grid grid-cols-8 gap-1">
          {renderEmojiList()}
        </div>
        {searchQuery.trim() && searchResults.length === 0 && (
          <div className="text-center py-8 text-slate-500 dark:text-slate-400">
            No emojis found for "{searchQuery}"
          </div>
        )}
      </div>
    </div>
  )
}
