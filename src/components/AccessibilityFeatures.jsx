import React, { useEffect, useRef } from 'react'

// Focus trap component for modals
export function FocusTrap({ children, isActive }) {
  const containerRef = useRef(null)
  const firstFocusableRef = useRef(null)
  const lastFocusableRef = useRef(null)

  useEffect(() => {
    if (!isActive || !containerRef.current) return

    const focusableElements = containerRef.current.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    )
    
    if (focusableElements.length === 0) return

    firstFocusableRef.current = focusableElements[0]
    lastFocusableRef.current = focusableElements[focusableElements.length - 1]

    // Focus first element
    firstFocusableRef.current.focus()

    const handleTabKey = (e) => {
      if (e.key !== 'Tab') return

      if (e.shiftKey) {
        // Shift + Tab
        if (document.activeElement === firstFocusableRef.current) {
          e.preventDefault()
          lastFocusableRef.current.focus()
        }
      } else {
        // Tab
        if (document.activeElement === lastFocusableRef.current) {
          e.preventDefault()
          firstFocusableRef.current.focus()
        }
      }
    }

    const handleEscapeKey = (e) => {
      if (e.key === 'Escape') {
        // Dispatch custom event that parent can listen to
        const escapeEvent = new CustomEvent('escapeKey', { detail: { originalEvent: e } })
        document.dispatchEvent(escapeEvent)
      }
    }

    document.addEventListener('keydown', handleTabKey)
    document.addEventListener('keydown', handleEscapeKey)

    return () => {
      document.removeEventListener('keydown', handleTabKey)
      document.removeEventListener('keydown', handleEscapeKey)
    }
  }, [isActive])

  return <div ref={containerRef}>{children}</div>
}

// Screen reader announcements
export function ScreenReaderAnnouncements({ messages, isBotTyping, userTyping }) {
  const announcementRef = useRef(null)
  const lastMessageCountRef = useRef(0)

  useEffect(() => {
    if (!announcementRef.current) return

    // Announce new messages
    if (messages.length > lastMessageCountRef.current) {
      const newMessage = messages[messages.length - 1]
      const announcement = newMessage.from === 'me' 
        ? `You sent: ${newMessage.text}`
        : `Bot replied: ${newMessage.text}`
      
      announcementRef.current.textContent = announcement
      lastMessageCountRef.current = messages.length
    }

    // Announce typing status
    if (isBotTyping) {
      announcementRef.current.textContent = 'Bot is typing'
    } else if (userTyping) {
      announcementRef.current.textContent = 'You are typing'
    }
  }, [messages, isBotTyping, userTyping])

  return (
    <div
      ref={announcementRef}
      className="sr-only"
      aria-live="polite"
      aria-atomic="true"
    />
  )
}

// Keyboard shortcuts help
export function KeyboardShortcuts({ isOpen, onClose }) {
  const shortcuts = [
    { key: 'Enter', description: 'Send message' },
    { key: 'Shift + Enter', description: 'New line' },
    { key: 'Escape', description: 'Close modals' },
    { key: 'Tab', description: 'Navigate focus' },
    { key: 'Shift + Tab', description: 'Navigate backwards' },
    { key: 'Ctrl/Cmd + K', description: 'Focus message input' },
    { key: 'Ctrl/Cmd + /', description: 'Show shortcuts' }
  ]

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-2xl w-full max-w-md max-h-[90vh] overflow-hidden">
        <div className="flex items-center justify-between p-6 border-b border-slate-200 dark:border-slate-700">
          <h2 className="text-xl font-semibold text-slate-900 dark:text-slate-100">
            Keyboard Shortcuts
          </h2>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition-colors rounded-lg"
            aria-label="Close shortcuts"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </button>
        </div>

        <div className="p-6">
          <div className="space-y-4">
            {shortcuts.map((shortcut, index) => (
              <div key={index} className="flex items-center justify-between">
                <span className="text-slate-600 dark:text-slate-400">
                  {shortcut.description}
                </span>
                <kbd className="px-2 py-1 text-xs font-mono bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 rounded border">
                  {shortcut.key}
                </kbd>
              </div>
            ))}
          </div>
        </div>

        <div className="flex items-center justify-end p-6 border-t border-slate-200 dark:border-slate-700">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-sky-600 text-white rounded-lg hover:bg-sky-700 transition-colors"
          >
            Got it
          </button>
        </div>
      </div>
    </div>
  )
}

// High contrast mode toggle
export function HighContrastToggle() {
  const [isHighContrast, setIsHighContrast] = React.useState(() => {
    const saved = localStorage.getItem('chatbox-high-contrast')
    return saved === 'true'
  })

  useEffect(() => {
    document.documentElement.classList.toggle('high-contrast', isHighContrast)
    localStorage.setItem('chatbox-high-contrast', isHighContrast.toString())
  }, [isHighContrast])

  return (
    <button
      onClick={() => setIsHighContrast(!isHighContrast)}
      className="flex items-center gap-2 px-3 py-2 text-sm rounded-lg border border-slate-200 dark:border-slate-600 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
      title={isHighContrast ? 'Disable high contrast' : 'Enable high contrast'}
      aria-label={isHighContrast ? 'Disable high contrast mode' : 'Enable high contrast mode'}
    >
      <span>{isHighContrast ? '🔍' : '👁️'}</span>
      <span className="text-slate-600 dark:text-slate-400">
        {isHighContrast ? 'High Contrast' : 'Normal'}
      </span>
    </button>
  )
}

// Skip to content link
export function SkipToContent() {
  const skipRef = useRef(null)

  const handleSkip = () => {
    skipRef.current?.focus()
    skipRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <>
      <button
        onClick={handleSkip}
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-sky-600 text-white px-4 py-2 rounded-lg z-50"
      >
        Skip to main content
      </button>
      <div ref={skipRef} tabIndex={-1} className="focus:outline-none" />
    </>
  )
}
