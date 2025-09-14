import React, { useState, useRef, useEffect } from 'react'
import { formatTimestamp, formatTime } from '../utils/dateUtils'
import { useChatStorage } from '../hooks/useChatStorage'
import MessageReactions from './MessageReactions'
import TypingIndicator from './TypingIndicator'
import MessageContent from './MessageContent'
import SafeMessageContent from './SafeMessageContent'
import MessageComposer from './MessageComposer'
import BotPersonalitySelector from './BotPersonalitySelector'
import { getRandomResponse, getPersonalityById } from '../data/botPersonalities'

export default function ChatBox() {
  const { messages, botPersonality, addMessage, addReaction, changeBotPersonality, clearMessages, exportMessages } = useChatStorage()
  const [isBotTyping, setIsBotTyping] = useState(false)
  const [userTyping, setUserTyping] = useState(false)
  const listRef = useRef(null)

  useEffect(() => {
    // auto-scroll to bottom
    if (listRef.current) {
      listRef.current.scrollTop = listRef.current.scrollHeight
    }
  }, [messages])

  function handleSend(messageData) {
    // Add user message
    addMessage({
      from: 'me',
      ...messageData
    })
    
    // Show typing indicator
    setIsBotTyping(true)
    
    // demo bot response with typing delay
    setTimeout(() => {
      setIsBotTyping(false)
      addMessage({
        from: 'bot',
        text: getRandomResponse(botPersonality),
        type: 'text',
        metadata: {}
      })
    }, 1500 + Math.random() * 1000) // Random delay between 1.5-2.5 seconds
  }

  function handleTyping(isTyping) {
    setUserTyping(isTyping)
  }



  return (
    <div className="bg-white dark:bg-slate-800 shadow-md rounded-2xl overflow-hidden border border-slate-100 dark:border-slate-700 transition-colors duration-300">
      <div className="px-4 py-3 border-b border-slate-100 dark:border-slate-700 flex items-center justify-between">
        <BotPersonalitySelector
          currentPersonality={botPersonality}
          onPersonalityChange={changeBotPersonality}
        />
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
                <MessageContent message={m} />
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
        
        {/* Typing Indicators */}
        <TypingIndicator isTyping={isBotTyping} botName={getPersonalityById(botPersonality).name} />
        {userTyping && (
          <div className="flex justify-end animate-slide-in">
            <div className="max-w-[80%]">
              <div className="bg-sky-600 text-white rounded-lg rounded-br-none px-4 py-2">
                <div className="flex items-center gap-2">
                  <span className="text-sm">You are typing</span>
                  <div className="flex gap-1">
                    <div className="w-1 h-1 bg-white rounded-full animate-bounce-subtle" style={{ animationDelay: '0ms' }}></div>
                    <div className="w-1 h-1 bg-white rounded-full animate-bounce-subtle" style={{ animationDelay: '150ms' }}></div>
                    <div className="w-1 h-1 bg-white rounded-full animate-bounce-subtle" style={{ animationDelay: '300ms' }}></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <MessageComposer
        onSend={handleSend}
        onTyping={handleTyping}
      />
    </div>
  )
}
