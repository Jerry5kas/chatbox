import React, { useState } from 'react'
import { useAdvancedTheme } from '../contexts/AdvancedThemeContext'

export default function SettingsPanel({ isOpen, onClose }) {
  const {
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
    userAvatar,
    setUserAvatar,
    botAvatar,
    setBotAvatar,
    themePresets,
    avatarOptions,
    backgroundOptions
  } = useAdvancedTheme()

  const [activeTab, setActiveTab] = useState('appearance')

  if (!isOpen) return null

  const tabs = [
    { id: 'appearance', name: 'Appearance', icon: '🎨' },
    { id: 'avatars', name: 'Avatars', icon: '👤' },
    { id: 'layout', name: 'Layout', icon: '📐' }
  ]

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-slate-200 dark:border-slate-700">
          <h2 className="text-xl font-semibold text-slate-900 dark:text-slate-100">
            Chat Settings
          </h2>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition-colors rounded-lg"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </button>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-slate-200 dark:border-slate-700">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 flex items-center justify-center gap-2 py-4 px-4 text-sm font-medium transition-colors ${
                activeTab === tab.id
                  ? 'text-sky-600 dark:text-sky-400 border-b-2 border-sky-600 dark:border-sky-400'
                  : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-300'
              }`}
            >
              <span>{tab.icon}</span>
              {tab.name}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="p-6 max-h-96 overflow-y-auto">
          {activeTab === 'appearance' && (
            <div className="space-y-6">
              {/* Dark Mode */}
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-3">
                  Theme Mode
                </label>
                <div className="flex gap-3">
                  <button
                    onClick={() => setIsDark(false)}
                    className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-lg border transition-colors ${
                      !isDark
                        ? 'border-sky-500 bg-sky-50 dark:bg-sky-900 text-sky-700 dark:text-sky-300'
                        : 'border-slate-200 dark:border-slate-600 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-700'
                    }`}
                  >
                    <span>☀️</span>
                    Light
                  </button>
                  <button
                    onClick={() => setIsDark(true)}
                    className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-lg border transition-colors ${
                      isDark
                        ? 'border-sky-500 bg-sky-50 dark:bg-sky-900 text-sky-700 dark:text-sky-300'
                        : 'border-slate-200 dark:border-slate-600 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-700'
                    }`}
                  >
                    <span>🌙</span>
                    Dark
                  </button>
                </div>
              </div>

              {/* Color Theme */}
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-3">
                  Color Theme
                </label>
                <div className="grid grid-cols-2 gap-3">
                  {Object.entries(themePresets).map(([key, preset]) => (
                    <button
                      key={key}
                      onClick={() => setThemePreset(key)}
                      className={`flex items-center gap-3 p-3 rounded-lg border transition-colors ${
                        themePreset === key
                          ? 'border-sky-500 bg-sky-50 dark:bg-sky-900'
                          : 'border-slate-200 dark:border-slate-600 hover:bg-slate-50 dark:hover:bg-slate-700'
                      }`}
                    >
                      <div
                        className="w-4 h-4 rounded-full"
                        style={{ backgroundColor: preset.colors.primary }}
                      />
                      <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
                        {preset.name}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Background */}
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-3">
                  Background
                </label>
                <div className="grid grid-cols-4 gap-3">
                  {backgroundOptions.map((bg) => (
                    <button
                      key={bg.id}
                      onClick={() => setBackgroundPreset(bg.id)}
                      className={`relative h-16 rounded-lg border-2 transition-colors ${
                        backgroundPreset === bg.id
                          ? 'border-sky-500'
                          : 'border-slate-200 dark:border-slate-600'
                      }`}
                      style={{ background: bg.gradient }}
                      title={bg.name}
                    >
                      {backgroundPreset === bg.id && (
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="w-6 h-6 bg-sky-500 rounded-full flex items-center justify-center">
                            <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                          </div>
                        </div>
                      )}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'avatars' && (
            <div className="space-y-6">
              {/* User Avatar */}
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-3">
                  Your Avatar
                </label>
                <div className="grid grid-cols-6 gap-3">
                  {avatarOptions.map((avatar) => (
                    <button
                      key={`user-${avatar.id}`}
                      onClick={() => setUserAvatar(avatar.id)}
                      className={`flex flex-col items-center gap-2 p-3 rounded-lg border transition-colors ${
                        userAvatar === avatar.id
                          ? 'border-sky-500 bg-sky-50 dark:bg-sky-900'
                          : 'border-slate-200 dark:border-slate-600 hover:bg-slate-50 dark:hover:bg-slate-700'
                      }`}
                      title={avatar.name}
                    >
                      <span className="text-2xl">{avatar.emoji}</span>
                      <span className="text-xs text-slate-600 dark:text-slate-400">
                        {avatar.name}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Bot Avatar */}
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-3">
                  Bot Avatar
                </label>
                <div className="grid grid-cols-6 gap-3">
                  {avatarOptions.map((avatar) => (
                    <button
                      key={`bot-${avatar.id}`}
                      onClick={() => setBotAvatar(avatar.id)}
                      className={`flex flex-col items-center gap-2 p-3 rounded-lg border transition-colors ${
                        botAvatar === avatar.id
                          ? 'border-sky-500 bg-sky-50 dark:bg-sky-900'
                          : 'border-slate-200 dark:border-slate-600 hover:bg-slate-50 dark:hover:bg-slate-700'
                      }`}
                      title={avatar.name}
                    >
                      <span className="text-2xl">{avatar.emoji}</span>
                      <span className="text-xs text-slate-600 dark:text-slate-400">
                        {avatar.name}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'layout' && (
            <div className="space-y-6">
              {/* Font Size */}
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-3">
                  Font Size
                </label>
                <div className="flex gap-3">
                  {['small', 'medium', 'large', 'xlarge'].map((size) => (
                    <button
                      key={size}
                      onClick={() => setFontSize(size)}
                      className={`flex-1 py-2 px-4 rounded-lg border transition-colors ${
                        fontSize === size
                          ? 'border-sky-500 bg-sky-50 dark:bg-sky-900 text-sky-700 dark:text-sky-300'
                          : 'border-slate-200 dark:border-slate-600 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-700'
                      }`}
                    >
                      <span className="capitalize text-sm">{size}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Compact Mode */}
              <div>
                <label className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    checked={compactMode}
                    onChange={(e) => setCompactMode(e.target.checked)}
                    className="w-4 h-4 text-sky-600 bg-slate-100 border-slate-300 rounded focus:ring-sky-500 dark:focus:ring-sky-600 dark:ring-offset-slate-800 focus:ring-2 dark:bg-slate-700 dark:border-slate-600"
                  />
                  <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
                    Compact Mode
                  </span>
                </label>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                  Reduce spacing and padding for a more compact layout
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-3 p-6 border-t border-slate-200 dark:border-slate-700">
          <button
            onClick={onClose}
            className="px-4 py-2 text-slate-600 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-sky-600 text-white rounded-lg hover:bg-sky-700 transition-colors"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  )
}
