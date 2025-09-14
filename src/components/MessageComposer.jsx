import React, { useState, useRef, useEffect } from 'react'
import EmojiPicker from './EmojiPicker'
import { AttachmentIcon, CodeIcon, SendIcon, ImageIcon, LinkIcon } from './icons/SvgIcons'

export default function MessageComposer({ onSend, onTyping }) {
  const [text, setText] = useState('')
  const [showEmojiPicker, setShowEmojiPicker] = useState(false)
  const [isTyping, setIsTyping] = useState(false)
  const textareaRef = useRef(null)
  const fileInputRef = useRef(null)
  const typingTimeoutRef = useRef(null)

  const handleTextChange = (e) => {
    const newText = e.target.value
    setText(newText)

    // Typing indicator
    if (onTyping) {
      if (!isTyping) {
        setIsTyping(true)
        onTyping(true)
      }

      // Clear existing timeout
      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current)
      }

      // Set new timeout to stop typing indicator
      typingTimeoutRef.current = setTimeout(() => {
        setIsTyping(false)
        onTyping(false)
      }, 1000)
    }
  }

  const handleSend = () => {
    const trimmed = text.trim()
    if (!trimmed) return

    console.log('Sending message:', trimmed)

    // Stop typing indicator
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current)
    }
    setIsTyping(false)
    if (onTyping) onTyping(false)

    const messageType = detectMessageType(trimmed)
    console.log('Detected message type:', messageType)

    // Send with full rich content detection
    onSend({
      text: trimmed,
      type: messageType.type || 'text',
      metadata: messageType.metadata || {}
    })
    setText('')
  }

  const detectMessageType = (text) => {
    // Detect code blocks - improved regex
    if (text.startsWith('```') && text.endsWith('```')) {
      const codeMatch = text.match(/```(\w+)?\n?([\s\S]*?)```/)
      if (codeMatch) {
        return {
          type: 'code',
          metadata: {
            code: codeMatch[2].trim(),
            language: codeMatch[1] || 'text'
          }
        }
      }
    }

    // Detect images first (more specific)
    const imageRegex = /(https?:\/\/[^\s]+\.(jpg|jpeg|png|gif|webp|svg))/i
    const imageMatch = text.match(imageRegex)
    if (imageMatch) {
      return {
        type: 'image',
        metadata: { 
          src: imageMatch[0],
          alt: 'Shared image'
        }
      }
    }

    // Detect URLs (less specific)
    const urlRegex = /(https?:\/\/[^\s]+)/g
    const urls = text.match(urlRegex)
    if (urls && urls.length > 0) {
      return {
        type: 'link',
        metadata: { url: urls[0] }
      }
    }

    return { type: 'text', metadata: {} }
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
    
    // Keyboard shortcuts
    if (e.ctrlKey || e.metaKey) {
      switch (e.key) {
        case 'k':
          e.preventDefault()
          textareaRef.current?.focus()
          break
        case '/':
          e.preventDefault()
          // Show keyboard shortcuts help (will be implemented)
          break
        case 'Enter':
          e.preventDefault()
          handleSend()
          break
      }
    }
  }

  const handleEmojiSelect = (emoji) => {
    const textarea = textareaRef.current
    if (textarea) {
      const start = textarea.selectionStart
      const end = textarea.selectionEnd
      const newText = text.substring(0, start) + emoji + text.substring(end)
      setText(newText)
      
      setTimeout(() => {
        textarea.focus()
        textarea.setSelectionRange(start + emoji.length, start + emoji.length)
      }, 0)
    }
  }

  const handleFileUpload = (e) => {
    const file = e.target.files[0]
    if (!file) return

    console.log('File selected:', file.name, file.type, file.size)

    // For demo purposes, create a mock file object
    const mockFile = {
      name: file.name,
      size: file.size,
      type: file.type,
      url: URL.createObjectURL(file)
    }

    console.log('Sending file message:', mockFile)

    onSend({
      text: `📎 ${file.name}`,
      type: 'file',
      metadata: { file: mockFile }
    })

    // Reset file input
    e.target.value = ''
  }

  const insertCodeBlock = () => {
    const textarea = textareaRef.current
    if (textarea) {
      const start = textarea.selectionStart
      const end = textarea.selectionEnd
      const selectedText = text.substring(start, end)
      const codeBlock = selectedText ? `\`\`\`\n${selectedText}\n\`\`\`` : '```\n\n```'
      const newText = text.substring(0, start) + codeBlock + text.substring(end)
      setText(newText)
      
      setTimeout(() => {
        textarea.focus()
        if (selectedText) {
          textarea.setSelectionRange(start, start + codeBlock.length)
        } else {
          textarea.setSelectionRange(start + 4, start + 4)
        }
      }, 0)
    }
  }

  // Global keyboard shortcuts
  useEffect(() => {
    const handleGlobalKeyDown = (e) => {
      if (e.ctrlKey || e.metaKey) {
        switch (e.key) {
          case 'k':
            e.preventDefault()
            textareaRef.current?.focus()
            break
        }
      }
    }

    document.addEventListener('keydown', handleGlobalKeyDown)
    return () => document.removeEventListener('keydown', handleGlobalKeyDown)
  }, [])

  return (
    <div 
      className="border-t transition-colors duration-300 relative"
      style={{ 
        borderColor: 'var(--color-border)',
        backgroundColor: 'var(--color-surface)'
      }}
    >
      {/* Enhanced Toolbar */}
      <div className="px-4 py-3 border-b" style={{ borderColor: 'var(--color-border)' }}>
        <div className="flex items-center justify-between">
          {/* Left Actions */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => fileInputRef.current?.click()}
              className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors group"
              title="Attach file"
            >
              <AttachmentIcon className="w-4 h-4 group-hover:scale-110 transition-transform" style={{ color: 'var(--color-text-secondary)' }} />
              <span className="text-sm font-medium" style={{ color: 'var(--color-text-secondary)' }}>Attach</span>
            </button>
            
            <button
              onClick={insertCodeBlock}
              className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors group"
              title="Insert code block"
            >
              <CodeIcon className="w-4 h-4 group-hover:scale-110 transition-transform" style={{ color: 'var(--color-text-secondary)' }} />
              <span className="text-sm font-medium" style={{ color: 'var(--color-text-secondary)' }}>Code</span>
            </button>
          </div>

          {/* Quick Test Buttons */}
          <div className="flex items-center gap-1">
            <button
              onClick={() => setText('```javascript\nconsole.log("Hello World!");\n```')}
              className="flex items-center gap-1 px-2 py-1 text-xs rounded-md hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors group"
              title="Test code block"
            >
              <CodeIcon className="w-3 h-3 group-hover:scale-110 transition-transform" style={{ color: 'var(--color-text-secondary)' }} />
              <span style={{ color: 'var(--color-text-secondary)' }}>Code</span>
            </button>
            <button
              onClick={() => setText('https://picsum.photos/400/300')}
              className="flex items-center gap-1 px-2 py-1 text-xs rounded-md hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors group"
              title="Test image"
            >
              <ImageIcon className="w-3 h-3 group-hover:scale-110 transition-transform" style={{ color: 'var(--color-text-secondary)' }} />
              <span style={{ color: 'var(--color-text-secondary)' }}>Image</span>
            </button>
            <button
              onClick={() => setText('https://github.com')}
              className="flex items-center gap-1 px-2 py-1 text-xs rounded-md hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors group"
              title="Test link"
            >
              <LinkIcon className="w-3 h-3 group-hover:scale-110 transition-transform" style={{ color: 'var(--color-text-secondary)' }} />
              <span style={{ color: 'var(--color-text-secondary)' }}>Link</span>
            </button>
          </div>
        </div>
      </div>

      {/* Enhanced Input Area */}
      <div className="p-4">
        <div className="flex gap-3">
          <div className="flex-1 relative">
            <textarea
              ref={textareaRef}
              value={text}
              onChange={handleTextChange}
              onKeyDown={handleKeyDown}
              placeholder="Type a message... (Enter to send, Shift+Enter for new line)"
              className="w-full resize-none min-h-[44px] max-h-32 rounded-2xl border-2 px-4 py-3 pr-12 text-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-opacity-50"
              style={{
                borderColor: 'var(--color-border)',
                backgroundColor: 'var(--color-background)',
                color: 'var(--color-text)',
                '--placeholder-color': 'var(--color-text-secondary)'
              }}
              aria-label="Message input"
              aria-describedby="message-help"
              role="textbox"
              aria-multiline="true"
            />
            
            {/* Emoji Button */}
            <button
              onClick={() => setShowEmojiPicker(!showEmojiPicker)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-full transition-colors group"
              title="Add emoji"
              aria-label="Add emoji"
              aria-expanded={showEmojiPicker}
            >
              <span className="text-lg group-hover:scale-110 transition-transform">😊</span>
            </button>

            {/* Character Count */}
            {text.length > 0 && (
              <div className="absolute bottom-1 left-3 text-xs" style={{ color: 'var(--color-text-secondary)' }}>
                {text.length}
              </div>
            )}
          </div>
          
          {/* Send Button */}
          <button
            onClick={handleSend}
            disabled={!text.trim()}
            className="flex items-center justify-center w-12 h-11 rounded-2xl transition-all duration-200 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 shadow-sm"
            style={{
              backgroundColor: text.trim() ? 'var(--color-primary)' : 'var(--color-border)',
              color: 'white'
            }}
            aria-label="Send message"
          >
            <SendIcon className="w-5 h-5" />
          </button>
        </div>

        {/* Input Help Text */}
        <div id="message-help" className="mt-2 text-xs" style={{ color: 'var(--color-text-secondary)' }}>
          Press <kbd className="px-1.5 py-0.5 bg-slate-100 dark:bg-slate-700 rounded text-xs">Enter</kbd> to send, 
          <kbd className="px-1.5 py-0.5 bg-slate-100 dark:bg-slate-700 rounded text-xs ml-1">Shift+Enter</kbd> for new line
        </div>
      </div>

      {/* Hidden file input */}
      <input
        ref={fileInputRef}
        type="file"
        className="hidden"
        onChange={handleFileUpload}
        accept="image/*,video/*,audio/*,.pdf,.doc,.docx,.txt"
      />
      
      {/* Emoji Picker */}
      <EmojiPicker
        onEmojiSelect={handleEmojiSelect}
        isOpen={showEmojiPicker}
        onClose={() => setShowEmojiPicker(false)}
      />
    </div>
  )
}
