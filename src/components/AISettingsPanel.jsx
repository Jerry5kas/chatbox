import React, { useState } from 'react'
import { CloseIcon } from './icons/SvgIcons'

export default function AISettingsPanel({ isOpen, onClose, apiKey, setApiKey, aiMode, setAiMode }) {
  const [tempApiKey, setTempApiKey] = useState(apiKey)
  const [showKey, setShowKey] = useState(false)

  const handleSave = () => {
    setApiKey(tempApiKey)
    localStorage.setItem('chatbox-api-key', tempApiKey)
    onClose()
  }

  if (!isOpen) return null

  const providers = [
    {
      name: 'OpenAI',
      url: 'https://platform.openai.com/api-keys',
      freeLimit: '$5 free credit',
      description: 'Most advanced, GPT-3.5/4 models'
    },
    {
      name: 'Cohere',
      url: 'https://dashboard.cohere.ai/api-keys',
      freeLimit: '100 requests/month',
      description: 'Great for conversational AI'
    },
    {
      name: 'Hugging Face',
      url: 'https://huggingface.co/settings/tokens',
      freeLimit: '1000 requests/month',
      description: 'Open source models, very generous free tier'
    }
  ]

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-slate-200 dark:border-slate-700">
          <h2 className="text-xl font-semibold text-slate-900 dark:text-slate-100">
            🤖 AI Settings
          </h2>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition-colors rounded-lg"
            aria-label="Close AI settings"
          >
            <CloseIcon className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 max-h-96 overflow-y-auto">
          {/* AI Mode Toggle */}
          <div className="mb-6">
            <label className="flex items-center gap-3">
              <input
                type="checkbox"
                checked={aiMode}
                onChange={(e) => setAiMode(e.target.checked)}
                className="w-4 h-4 text-green-600 bg-slate-100 border-slate-300 rounded focus:ring-green-500 dark:focus:ring-green-600 dark:ring-offset-slate-800 focus:ring-2 dark:bg-slate-700 dark:border-slate-600"
              />
              <div>
                <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
                  Enable AI Mode
                </span>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Use real AI for responses instead of smart responses
                </p>
              </div>
            </label>
          </div>

          {/* API Key Input */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
              API Key
            </label>
            <div className="relative">
              <input
                type={showKey ? 'text' : 'password'}
                value={tempApiKey}
                onChange={(e) => setTempApiKey(e.target.value)}
                placeholder="Enter your API key here..."
                className="w-full px-3 py-2 pr-10 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100 placeholder-slate-500 dark:placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
              <button
                type="button"
                onClick={() => setShowKey(!showKey)}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 p-1 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"
              >
                {showKey ? '🙈' : '👁️'}
              </button>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              Your API key is stored locally in your browser
            </p>
          </div>

          {/* Free AI Providers */}
          <div className="mb-6">
            <h3 className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-3">
              Free AI Providers
            </h3>
            <div className="space-y-3">
              {providers.map((provider, index) => (
                <div key={index} className="p-3 border border-slate-200 dark:border-slate-600 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium text-slate-900 dark:text-slate-100">
                      {provider.name}
                    </h4>
                    <span className="text-xs bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-400 px-2 py-1 rounded">
                      {provider.freeLimit}
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 dark:text-slate-400 mb-2">
                    {provider.description}
                  </p>
                  <a
                    href={provider.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-blue-600 dark:text-blue-400 hover:underline"
                  >
                    Get API Key →
                  </a>
                </div>
              ))}
            </div>
          </div>

          {/* Usage Instructions */}
          <div className="mb-6">
            <h3 className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-3">
              How to Use
            </h3>
            <ol className="text-xs text-slate-600 dark:text-slate-400 space-y-2">
              <li>1. Choose a provider above and get your free API key</li>
              <li>2. Paste the API key in the field above</li>
              <li>3. Enable AI Mode to start using real AI responses</li>
              <li>4. Your responses will be much more intelligent and contextual!</li>
            </ol>
          </div>
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
            onClick={handleSave}
            className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
          >
            Save Settings
          </button>
        </div>
      </div>
    </div>
  )
}
