import React, { useState, useRef, useEffect } from 'react'
import { formatTimestamp, formatTime } from '../utils/dateUtils'
import { useChatStorage } from '../hooks/useChatStorage'
import EmojiPicker from './EmojiPicker'
import MessageReactions from './MessageReactions'
import TypingIndicator from './TypingIndicator'

export default function ChatBox() {
  const { messages, addMessage, addReaction, clearMessages, exportMessages } = useChatStorage()
  const [text, setText] = useState('')
  const [showEmojiPicker, setShowEmojiPicker] = useState(false)
  const [isBotTyping, setIsBotTyping] = useState(false)
  const listRef = useRef(null)
  const textareaRef = useRef(null)

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
    
    // Show typing indicator
    setIsBotTyping(true)
    
    // demo bot response with typing delay
    setTimeout(() => {
      setIsBotTyping(false)
      addMessage({
        from: 'bot',
        text: getRandomBotResponse()
      })
    }, 1500 + Math.random() * 1000) // Random delay between 1.5-2.5 seconds
  }

  function getRandomBotResponse() {
    const responses = [
      'Nice — thanks for trying this demo!',
      'That\'s interesting! Tell me more.',
      'I see what you mean! 👍',
      'Great point! What do you think about that?',
      'Thanks for sharing that with me!',
      'That\'s a good question. Let me think...',
      'I appreciate your message! 😊',
      'Wow, that\'s really cool!',
      'I understand what you\'re saying.',
      'That makes sense to me!'
    ]
    return responses[Math.floor(Math.random() * responses.length)]
  }

  function onKey(e) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      send()
    }
  }

  function handleEmojiSelect(emoji) {
    const textarea = textareaRef.current
    if (textarea) {
      const start = textarea.selectionStart
      const end = textarea.selectionEnd
      const newText = text.substring(0, start) + emoji + text.substring(end)
      setText(newText)
      
      // Focus back to textarea and set cursor position
      setTimeout(() => {
        textarea.focus()
        textarea.setSelectionRange(start + emoji.length, start + emoji.length)
      }, 0)
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
          <div key={m.id} className={`flex ${m.from === 'me' ? 'justify-end' : 'justify-start'} animate-slide-in group`}>
            <div className="max-w-[80%]">
              <div className={`${m.from === 'me' ? 'bg-sky-600 text-white rounded-lg rounded-br-none' : 'bg-slate-100 dark:bg-slate-700 text-slate-800 dark:text-slate-200 rounded-lg rounded-bl-none'} px-4 py-2 transition-colors duration-300`}> 
                <div className="text-sm leading-6 whitespace-pre-wrap">{m.text}</div>
              </div>
              <div className={`text-xs mt-1 px-2 ${m.from === 'me' ? 'text-right text-slate-500 dark:text-slate-400' : 'text-left text-slate-400 dark:text-slate-500'}`}>
                {formatTime(m.timestamp)}
              </div>
              <MessageReactions
                messageId={m.id}
                reactions={m.reactions}
                onAddReaction={addReaction}
              />
            </div>
          </div>
        ))}
        
        {/* Typing Indicator */}
        <TypingIndicator isTyping={isBotTyping} botName="Support" />
      </div>

      <div className="p-3 border-t border-slate-100 dark:border-slate-700 bg-white dark:bg-slate-800 transition-colors duration-300 relative">
        <div className="flex gap-2">
          <div className="flex-1 relative">
            <textarea
              ref={textareaRef}
              value={text}
              onChange={(e) => setText(e.target.value)}
              onKeyDown={onKey}
              placeholder="Type a message... (Enter to send)"
              className="w-full resize-none h-10 rounded-xl border border-slate-200 dark:border-slate-600 px-3 py-2 pr-10 text-sm bg-white dark:bg-slate-700 text-slate-800 dark:text-slate-200 placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-sky-200 dark:focus:ring-sky-800 transition-colors duration-300"
            />
            <button
              onClick={() => setShowEmojiPicker(!showEmojiPicker)}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 p-1 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition-colors"
              title="Add emoji"
            >
              😊
            </button>
          </div>
          <button
            onClick={send}
            className="inline-flex items-center justify-center px-4 py-2 rounded-xl bg-sky-600 text-white text-sm font-medium shadow-sm hover:brightness-95 transition-all duration-200 hover:scale-105"
          >
            Send
          </button>
        </div>
        
        <EmojiPicker
          onEmojiSelect={handleEmojiSelect}
          isOpen={showEmojiPicker}
          onClose={() => setShowEmojiPicker(false)}
        />
      </div>
    </div>
  )
}
