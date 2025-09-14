import React, { useState, useRef } from 'react'
import EmojiPicker from './EmojiPicker'

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

    // Send with proper metadata structure
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

  return (
    <div className="p-3 border-t border-slate-100 dark:border-slate-700 bg-white dark:bg-slate-800 transition-colors duration-300 relative">
      {/* Toolbar */}
      <div className="flex items-center gap-1 mb-2">
        <button
          onClick={() => fileInputRef.current?.click()}
          className="p-1.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition-colors rounded"
          title="Attach file"
        >
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </button>
        
        <button
          onClick={insertCodeBlock}
          className="p-1.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition-colors rounded"
          title="Insert code block"
        >
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M12.316 3.051a1 1 0 01.633 1.265l-4 12a1 1 0 11-1.898-.632l4-12a1 1 0 011.265-.633zM5.707 6.293a1 1 0 010 1.414L3.414 10l2.293 2.293a1 1 0 11-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0zm8.586 0a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 11-1.414-1.414L16.586 10l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </button>
        
        {/* Quick test buttons */}
        <div className="flex items-center gap-1 ml-2 pl-2 border-l border-slate-200 dark:border-slate-600">
          <button
            onClick={() => setText('```javascript\nconsole.log("Hello World!");\n```')}
            className="px-2 py-1 text-xs bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-600 rounded transition-colors"
            title="Test code block"
          >
            Code
          </button>
          <button
            onClick={() => setText('https://picsum.photos/400/300')}
            className="px-2 py-1 text-xs bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-600 rounded transition-colors"
            title="Test image"
          >
            Image
          </button>
          <button
            onClick={() => setText('https://github.com')}
            className="px-2 py-1 text-xs bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-600 rounded transition-colors"
            title="Test link"
          >
            Link
          </button>
        </div>
      </div>

      {/* Input Area */}
      <div className="flex gap-2">
        <div className="flex-1 relative">
          <textarea
            ref={textareaRef}
            value={text}
            onChange={handleTextChange}
            onKeyDown={handleKeyDown}
            placeholder="Type a message... (Enter to send, Shift+Enter for new line)"
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
          onClick={handleSend}
          className="inline-flex items-center justify-center px-4 py-2 rounded-xl bg-sky-600 text-white text-sm font-medium shadow-sm hover:brightness-95 transition-all duration-200 hover:scale-105"
        >
          Send
        </button>
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
