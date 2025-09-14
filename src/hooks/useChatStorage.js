import { useState, useEffect } from 'react'

const STORAGE_KEY = 'chatbox-messages'
const PERSONALITY_KEY = 'chatbox-personality'

export function useChatStorage() {
  const [messages, setMessages] = useState([])
  const [botPersonality, setBotPersonality] = useState('support')

  // Load messages and personality from localStorage on mount
  useEffect(() => {
    const savedMessages = localStorage.getItem(STORAGE_KEY)
    const savedPersonality = localStorage.getItem(PERSONALITY_KEY)
    
    if (savedPersonality) {
      setBotPersonality(savedPersonality)
    }
    
    if (savedMessages) {
      try {
        const parsed = JSON.parse(savedMessages)
        // Convert timestamp strings back to Date objects
        const messagesWithDates = parsed.map(msg => ({
          ...msg,
          timestamp: new Date(msg.timestamp)
        }))
        setMessages(messagesWithDates)
      } catch (error) {
        console.error('Failed to load chat history:', error)
        // Fallback to demo messages if loading fails
        setMessages(getDemoMessages())
      }
    } else {
      // First time user - show demo messages
      setMessages(getDemoMessages())
    }
  }, [])

  // Save messages to localStorage whenever messages change
  useEffect(() => {
    if (messages.length > 0) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(messages))
    }
  }, [messages])

  // Save personality to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem(PERSONALITY_KEY, botPersonality)
  }, [botPersonality])

  const addMessage = (message) => {
    const newMessage = {
      ...message,
      id: Date.now(),
      timestamp: new Date(),
      reactions: {}
    }
    setMessages(prev => [...prev, newMessage])
  }

  const addReaction = (messageId, emoji) => {
    setMessages(prev => prev.map(msg => {
      if (msg.id === messageId) {
        const newReactions = { ...msg.reactions }
        if (newReactions[emoji]) {
          newReactions[emoji] += 1
        } else {
          newReactions[emoji] = 1
        }
        return { ...msg, reactions: newReactions }
      }
      return msg
    }))
  }

  const clearMessages = () => {
    setMessages(getDemoMessages())
    localStorage.removeItem(STORAGE_KEY)
  }

  const exportMessages = () => {
    const dataStr = JSON.stringify(messages, null, 2)
    const dataBlob = new Blob([dataStr], { type: 'application/json' })
    const url = URL.createObjectURL(dataBlob)
    const link = document.createElement('a')
    link.href = url
    link.download = `chatbox-history-${new Date().toISOString().split('T')[0]}.json`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
  }

  const changeBotPersonality = (newPersonality) => {
    setBotPersonality(newPersonality)
  }

  return {
    messages,
    botPersonality,
    addMessage,
    addReaction,
    changeBotPersonality,
    clearMessages,
    exportMessages
  }
}

function getDemoMessages() {
  return [
    { 
      id: 1, 
      from: 'bot', 
      text: '👋 Hi! This is a static demo chat.', 
      timestamp: new Date(Date.now() - 300000), // 5 minutes ago
      reactions: { '👍': 2, '❤️': 1 }
    },
    { 
      id: 2, 
      from: 'me', 
      text: 'Looks neat!', 
      timestamp: new Date(Date.now() - 240000), // 4 minutes ago
      reactions: { '😊': 1 }
    }
  ]
}
