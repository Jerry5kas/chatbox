import React, { createContext, useContext, useEffect, useState } from 'react'
import { themePresets, avatarOptions, backgroundOptions } from '../data/themePresets'

const AdvancedThemeContext = createContext()

export function useAdvancedTheme() {
  const context = useContext(AdvancedThemeContext)
  if (!context) {
    throw new Error('useAdvancedTheme must be used within an AdvancedThemeProvider')
  }
  return context
}

export function AdvancedThemeProvider({ children }) {
  const [isDark, setIsDark] = useState(() => {
    const saved = localStorage.getItem('chatbox-theme-dark')
    if (saved) return saved === 'true'
    return window.matchMedia('(prefers-color-scheme: dark)').matches
  })
  
  const [themePreset, setThemePreset] = useState(() => {
    const saved = localStorage.getItem('chatbox-theme-preset')
    return saved || 'default'
  })
  
  const [userAvatar, setUserAvatar] = useState(() => {
    const saved = localStorage.getItem('chatbox-user-avatar')
    return saved || 'default'
  })
  
  const [botAvatar, setBotAvatar] = useState(() => {
    const saved = localStorage.getItem('chatbox-bot-avatar')
    return saved || 'default'
  })
  
  const [backgroundPreset, setBackgroundPreset] = useState(() => {
    const saved = localStorage.getItem('chatbox-background')
    return saved || 'none'
  })
  
  const [fontSize, setFontSize] = useState(() => {
    const saved = localStorage.getItem('chatbox-font-size')
    return saved || 'medium'
  })
  
  const [compactMode, setCompactMode] = useState(() => {
    const saved = localStorage.getItem('chatbox-compact-mode')
    return saved === 'true'
  })

  // Apply theme changes
  useEffect(() => {
    const preset = themePresets[themePreset] || themePresets.default
    const colors = isDark ? preset.darkColors : preset.colors
    
    // Apply CSS custom properties
    document.documentElement.style.setProperty('--color-primary', colors.primary)
    document.documentElement.style.setProperty('--color-secondary', colors.secondary)
    document.documentElement.style.setProperty('--color-background', colors.background)
    document.documentElement.style.setProperty('--color-surface', colors.surface)
    document.documentElement.style.setProperty('--color-text', colors.text)
    document.documentElement.style.setProperty('--color-text-secondary', colors.textSecondary)
    document.documentElement.style.setProperty('--color-border', colors.border)
    
    // Apply dark mode class
    document.documentElement.classList.toggle('dark', isDark)
    
    // Apply background
    const background = backgroundOptions.find(bg => bg.id === backgroundPreset)
    if (background && background.id !== 'none') {
      document.documentElement.style.setProperty('--background-gradient', background.gradient)
    } else {
      document.documentElement.style.removeProperty('--background-gradient')
    }
    
    // Apply font size
    const fontSizeMap = {
      small: '14px',
      medium: '16px',
      large: '18px',
      xlarge: '20px'
    }
    document.documentElement.style.setProperty('--font-size-base', fontSizeMap[fontSize] || '16px')
    
  }, [isDark, themePreset, backgroundPreset, fontSize])

  // Save to localStorage
  useEffect(() => {
    localStorage.setItem('chatbox-theme-dark', isDark.toString())
  }, [isDark])
  
  useEffect(() => {
    localStorage.setItem('chatbox-theme-preset', themePreset)
  }, [themePreset])
  
  useEffect(() => {
    localStorage.setItem('chatbox-user-avatar', userAvatar)
  }, [userAvatar])
  
  useEffect(() => {
    localStorage.setItem('chatbox-bot-avatar', botAvatar)
  }, [botAvatar])
  
  useEffect(() => {
    localStorage.setItem('chatbox-background', backgroundPreset)
  }, [backgroundPreset])
  
  useEffect(() => {
    localStorage.setItem('chatbox-font-size', fontSize)
  }, [fontSize])
  
  useEffect(() => {
    localStorage.setItem('chatbox-compact-mode', compactMode.toString())
  }, [compactMode])

  const getCurrentTheme = () => {
    return themePresets[themePreset] || themePresets.default
  }
  
  const getUserAvatar = () => {
    return avatarOptions.find(avatar => avatar.id === userAvatar) || avatarOptions[0]
  }
  
  const getBotAvatar = () => {
    return avatarOptions.find(avatar => avatar.id === botAvatar) || avatarOptions[0]
  }
  
  const getBackground = () => {
    return backgroundOptions.find(bg => bg.id === backgroundPreset) || backgroundOptions[0]
  }

  const value = {
    // Theme state
    isDark,
    setIsDark,
    themePreset,
    setThemePreset,
    backgroundPreset,
    setBackgroundPreset,
    fontSize,
    setFontSize,
    compactMode,
    setCompactMode,
    
    // Avatar state
    userAvatar,
    setUserAvatar,
    botAvatar,
    setBotAvatar,
    
    // Computed values
    getCurrentTheme,
    getUserAvatar,
    getBotAvatar,
    getBackground,
    
    // Available options
    themePresets,
    avatarOptions,
    backgroundOptions
  }

  return (
    <AdvancedThemeContext.Provider value={value}>
      {children}
    </AdvancedThemeContext.Provider>
  )
}
