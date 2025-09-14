import React from 'react'

export default function SafeMessageContent({ message }) {
  const { text, type, metadata } = message

  // Simple fallback that always works
  const renderSimpleContent = () => {
    // Handle code blocks with simple styling
    if (text.startsWith('```') && text.endsWith('```')) {
      const codeContent = text.replace(/```\w*\n?/g, '').replace(/```/g, '').trim()
      return (
        <div className="bg-slate-900 text-green-400 p-3 rounded-lg font-mono text-sm overflow-x-auto">
          <pre>{codeContent}</pre>
        </div>
      )
    }

    // Handle URLs
    const urlRegex = /(https?:\/\/[^\s]+)/g
    const parts = text.split(urlRegex)
    
    const formattedText = parts.map((part, index) => {
      if (urlRegex.test(part)) {
        return (
          <a
            key={index}
            href={part}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-400 hover:underline"
          >
            {part}
          </a>
        )
      }
      return part
    })

    return (
      <div className="text-sm leading-6 whitespace-pre-wrap">
        {formattedText}
      </div>
    )
  }

  return (
    <div>
      {renderSimpleContent()}
    </div>
  )
}
