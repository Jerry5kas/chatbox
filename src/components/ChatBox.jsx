import React, { useState, useRef, useEffect } from 'react'
import { formatTimestamp, formatTime } from '../utils/dateUtils'
import { useChatStorage } from '../hooks/useChatStorage'
import { useAdvancedTheme } from '../contexts/AdvancedThemeContext'
import MessageReactions from './MessageReactions'
import TypingIndicator from './TypingIndicator'
import MessageContent from './MessageContent'
import SafeMessageContent from './SafeMessageContent'
import MessageComposer from './MessageComposer'
import BotPersonalitySelector from './BotPersonalitySelector'
import SettingsPanel from './SettingsPanel'
import AISettingsPanel from './AISettingsPanel'
import { FocusTrap, ScreenReaderAnnouncements, KeyboardShortcuts, HighContrastToggle, SkipToContent } from './AccessibilityFeatures'
import { SettingsIcon, KeyboardIcon, DownloadIcon, TrashIcon, ChevronDownIcon } from './icons/SvgIcons'
import { getPersonalityById } from '../data/botPersonalities'
import { smartResponseSystem } from '../utils/smartResponses'
import { aiChatSystem } from '../utils/aiResponses'
import { freeAIProviders } from '../utils/freeAIProviders'
import { testSmartResponses } from '../utils/testSmartResponses'

export default function ChatBox() {
  const { messages, botPersonality, addMessage, addReaction, changeBotPersonality, clearMessages, exportMessages } = useChatStorage()
  const { getUserAvatar, getBotAvatar, compactMode, fontSize } = useAdvancedTheme()
  const [isBotTyping, setIsBotTyping] = useState(false)
  const [userTyping, setUserTyping] = useState(false)
  const [showSettings, setShowSettings] = useState(false)
  const [showAISettings, setShowAISettings] = useState(false)
  const [showKeyboardShortcuts, setShowKeyboardShortcuts] = useState(false)
  const [aiMode, setAiMode] = useState(false) // Toggle between smart responses and AI
  const [apiKey, setApiKey] = useState(localStorage.getItem('chatbox-api-key') || '')
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

    // Generate response (AI or Smart)
    setTimeout(async () => {
      setIsBotTyping(false)
      
      try {
        let response = ''
        
        if (aiMode && apiKey) {
          // Use AI API
          console.log('🤖 Using AI API for response...')
          response = await freeAIProviders.getAIResponse(messageData.text, botPersonality, apiKey)
          console.log('AI Response:', response)
        } else {
          // Use smart response system
          console.log('🧠 Using smart response system...')
          const analysis = smartResponseSystem.analyzeMessage(messageData.text)
          response = smartResponseSystem.generateResponse(analysis, botPersonality)
          smartResponseSystem.updateHistory(messageData.text, response)
        }
        
        addMessage({
          from: 'bot',
          text: response,
          type: 'text',
          metadata: {
            aiMode: aiMode,
            personality: botPersonality,
            timestamp: new Date().toISOString()
          }
        })
      } catch (error) {
        console.error('Error generating response:', error)
        // Fallback response
        addMessage({
          from: 'bot',
          text: 'Hello! I\'m here to help! 😊',
          type: 'text',
          metadata: {}
        })
      }
    }, 1500 + Math.random() * 1000)
  }

  function handleTyping(isTyping) {
    setUserTyping(isTyping)
  }



  return (
    <div 
      className="shadow-md rounded-2xl overflow-hidden border transition-colors duration-300"
      style={{
        backgroundColor: 'var(--color-surface)',
        borderColor: 'var(--color-border)',
        fontSize: `var(--font-size-base)`
      }}
      role="main"
      aria-label="Chat conversation"
    >
      {/* Enhanced Header */}
      <div 
        className={`${compactMode ? 'px-4 py-3' : 'px-6 py-4'} border-b`}
        style={{ 
          borderColor: 'var(--color-border)',
          background: 'linear-gradient(135deg, var(--color-surface) 0%, rgba(255,255,255,0.05) 100%)'
        }}
      >
        {/* Top Row - Personality & Status */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-3">
            <BotPersonalitySelector
              currentPersonality={botPersonality}
              onPersonalityChange={changeBotPersonality}
            />
            <div className="flex items-center gap-2 px-3 py-1.5 bg-slate-100 dark:bg-slate-700 rounded-full">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-xs font-medium" style={{ color: 'var(--color-text-secondary)' }}>
                Online
              </span>
            </div>
          </div>
          
          {/* Action Buttons */}
          <div className="flex items-center gap-1">
            <HighContrastToggle />
            
            {/* AI Mode Toggle */}
            <button
              onClick={() => setShowAISettings(true)}
              className={`p-2 rounded-lg transition-colors group ${
                aiMode 
                  ? 'bg-green-100 dark:bg-green-900/20' 
                  : 'hover:bg-slate-100 dark:hover:bg-slate-700'
              }`}
              title={aiMode ? "AI Mode: ON - Click to configure" : "AI Mode: OFF - Click to enable"}
              aria-label="Open AI settings"
            >
              <span className={`text-lg group-hover:scale-110 transition-transform ${
                aiMode ? 'text-green-600' : ''
              }`}>
                {aiMode ? '🤖' : '🧠'}
              </span>
            </button>
            
            <button
              onClick={() => setShowKeyboardShortcuts(true)}
              className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors group"
              title="Keyboard shortcuts"
              aria-label="Show keyboard shortcuts"
            >
              <KeyboardIcon className="w-4 h-4 group-hover:scale-110 transition-transform" style={{ color: 'var(--color-text-secondary)' }} />
            </button>
            <button
              onClick={() => setShowSettings(true)}
              className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors group"
              title="Settings"
              aria-label="Open settings"
            >
              <SettingsIcon className="w-4 h-4 group-hover:scale-110 transition-transform" style={{ color: 'var(--color-text-secondary)' }} />
            </button>
          </div>
        </div>
        
        {/* Bottom Row - Quick Actions */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-xs font-medium" style={{ color: 'var(--color-text-secondary)' }}>
              {messages.length} messages
            </span>
            {messages.length > 0 && (
              <>
                <span className="text-xs" style={{ color: 'var(--color-border)' }}>•</span>
                <span className="text-xs" style={{ color: 'var(--color-text-secondary)' }}>
                  Last: {formatTime(messages[messages.length - 1].timestamp)}
                </span>
              </>
            )}
          </div>
          
          <div className="flex items-center gap-1">
            <button
              onClick={exportMessages}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors group"
              title="Export chat history"
            >
              <DownloadIcon className="w-3.5 h-3.5 group-hover:scale-110 transition-transform" style={{ color: 'var(--color-text-secondary)' }} />
              <span style={{ color: 'var(--color-text-secondary)' }}>Export</span>
            </button>
            <button
              onClick={() => {
                clearMessages()
                localStorage.clear()
                console.log('🧹 Cleared localStorage and messages')
                console.log('🧪 Run testSmartResponses() in console to test the system')
              }}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors group"
              title="Clear chat history and localStorage"
            >
              <TrashIcon className="w-3.5 h-3.5 group-hover:scale-110 transition-transform text-red-500" />
              <span className="text-red-500">Clear</span>
            </button>
          </div>
        </div>
      </div>

      <div 
        ref={listRef} 
        className="p-4 h-72 overflow-auto space-y-3 bg-gradient-to-b from-white to-slate-50 dark:from-slate-800 dark:to-slate-900"
        role="log"
        aria-label="Chat messages"
        aria-live="polite"
        aria-atomic="false"
      >
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
      
      <SettingsPanel
        isOpen={showSettings}
        onClose={() => setShowSettings(false)}
      />
      
      <AISettingsPanel
        isOpen={showAISettings}
        onClose={() => setShowAISettings(false)}
        apiKey={apiKey}
        setApiKey={setApiKey}
        aiMode={aiMode}
        setAiMode={setAiMode}
      />
      
      <KeyboardShortcuts
        isOpen={showKeyboardShortcuts}
        onClose={() => setShowKeyboardShortcuts(false)}
      />
      
      <ScreenReaderAnnouncements
        messages={messages}
        isBotTyping={isBotTyping}
        userTyping={userTyping}
      />
      
      <SkipToContent />
    </div>
  )
}
