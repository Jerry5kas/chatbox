import React from 'react'
import CodeSnippet from './CodeSnippet'
import ImagePreview from './ImagePreview'
import FileAttachment from './FileAttachment'
import LinkPreview from './LinkPreview'

export default function MessageContent({ message }) {
  const { text, type, metadata } = message

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

    // Detect inline code
    if (text.includes('`') && text.split('`').length >= 3) {
      return {
        type: 'text',
        metadata: { hasInlineCode: true }
      }
    }

    return { type: 'text', metadata: {} }
  }

  const formatInlineCode = (text) => {
    return text.split('`').map((part, index) => {
      if (index % 2 === 1) {
        return (
          <code key={index} className="bg-slate-200 dark:bg-slate-700 px-1 py-0.5 rounded text-sm font-mono">
            {part}
          </code>
        )
      }
      return part
    })
  }

  const formatLinks = (text) => {
    const urlRegex = /(https?:\/\/[^\s]+)/g
    const parts = text.split(urlRegex)
    
    return parts.map((part, index) => {
      if (urlRegex.test(part)) {
        return (
          <a
            key={index}
            href={part}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sky-600 dark:text-sky-400 hover:underline"
          >
            {part}
          </a>
        )
      }
      return part
    })
  }

  const renderContent = () => {
    try {
      const detectedType = type || detectMessageType(text)
      
      console.log('MessageContent render:', { text, type, detectedType })

      switch (detectedType.type) {
        case 'code':
          if (!detectedType.metadata?.code) {
            console.warn('Code block without code content')
            return <div className="text-sm leading-6 whitespace-pre-wrap">{text}</div>
          }
          return (
            <div>
              <CodeSnippet 
                code={detectedType.metadata.code}
                language={detectedType.metadata.language}
              />
            </div>
          )

        case 'image':
          if (!detectedType.metadata?.src) {
            console.warn('Image without src')
            return <div className="text-sm leading-6 whitespace-pre-wrap">{text}</div>
          }
          return (
            <div>
              <ImagePreview 
                src={detectedType.metadata.src}
                alt={detectedType.metadata.alt}
              />
            </div>
          )

        case 'link':
          if (!detectedType.metadata?.url) {
            console.warn('Link without url')
            return <div className="text-sm leading-6 whitespace-pre-wrap">{text}</div>
          }
          return (
            <div>
              <LinkPreview url={detectedType.metadata.url} />
            </div>
          )

        case 'file':
          if (!detectedType.metadata?.file) {
            console.warn('File without file object')
            return <div className="text-sm leading-6 whitespace-pre-wrap">{text}</div>
          }
          return (
            <div>
              <FileAttachment file={detectedType.metadata.file} />
            </div>
          )

        case 'text':
        default:
          let formattedText = text
          
          // Handle inline code
          if (detectedType.metadata?.hasInlineCode) {
            formattedText = formatInlineCode(text)
          } else {
            // Handle links in regular text
            formattedText = formatLinks(text)
          }

          return (
            <div className="text-sm leading-6 whitespace-pre-wrap">
              {formattedText}
            </div>
          )
      }
    } catch (error) {
      console.error('Error rendering message content:', error)
      return (
        <div className="text-sm leading-6 whitespace-pre-wrap text-red-500">
          Error rendering message: {text}
        </div>
      )
    }
  }

  return renderContent()
}
