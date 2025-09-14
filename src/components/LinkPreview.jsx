import React, { useState, useEffect } from 'react'

export default function LinkPreview({ url }) {
  const [preview, setPreview] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)

  useEffect(() => {
    // For demo purposes, we'll create mock previews
    // In a real app, you'd fetch actual metadata from the URL
    const mockPreview = {
      title: 'Example Website',
      description: 'This is an example link preview with some description text that gives users context about the linked content.',
      image: 'https://via.placeholder.com/400x200/0ea5e9/ffffff?text=Link+Preview',
      domain: new URL(url).hostname
    }
    
    setLoading(true)
    setTimeout(() => {
      setPreview(mockPreview)
      setLoading(false)
    }, 500)
  }, [url])

  const handleClick = () => {
    window.open(url, '_blank', 'noopener,noreferrer')
  }

  if (loading) {
    return (
      <div className="bg-slate-50 dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-600 overflow-hidden">
        <div className="p-4">
          <div className="animate-pulse">
            <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-3/4 mb-2"></div>
            <div className="h-3 bg-slate-200 dark:bg-slate-700 rounded w-1/2"></div>
          </div>
        </div>
      </div>
    )
  }

  if (error || !preview) {
    return (
      <div className="bg-slate-50 dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-600 p-3">
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 text-sky-600 dark:text-sky-400 hover:text-sky-700 dark:hover:text-sky-300 transition-colors"
        >
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M12.586 4.586a2 2 0 112.828 2.828l-3 3a2 2 0 01-2.828 0 1 1 0 00-1.414 1.414 4 4 0 005.656 0l3-3a4 4 0 00-5.656-5.656l-1.5 1.5a1 1 0 101.414 1.414l1.5-1.5zm-5 5a2 2 0 012.828 0 1 1 0 101.414-1.414 4 4 0 00-5.656 0l-3 3a4 4 0 105.656 5.656l1.5-1.5a1 1 0 10-1.414-1.414l-1.5 1.5a2 2 0 11-2.828-2.828l3-3z" clipRule="evenodd" />
          </svg>
          <span className="text-sm font-medium truncate">{url}</span>
        </a>
      </div>
    )
  }

  return (
    <div className="bg-slate-50 dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-600 overflow-hidden hover:shadow-md transition-shadow cursor-pointer" onClick={handleClick}>
      {preview.image && (
        <div className="h-32 bg-slate-200 dark:bg-slate-700 overflow-hidden">
          <img
            src={preview.image}
            alt={preview.title}
            className="w-full h-full object-cover"
            loading="lazy"
          />
        </div>
      )}
      
      <div className="p-3">
        <div className="text-sm font-medium text-slate-900 dark:text-slate-100 mb-1 line-clamp-2">
          {preview.title}
        </div>
        <div className="text-xs text-slate-600 dark:text-slate-400 mb-2 line-clamp-2">
          {preview.description}
        </div>
        <div className="flex items-center gap-1 text-xs text-slate-500 dark:text-slate-500">
          <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M12.586 4.586a2 2 0 112.828 2.828l-3 3a2 2 0 01-2.828 0 1 1 0 00-1.414 1.414 4 4 0 005.656 0l3-3a4 4 0 00-5.656-5.656l-1.5 1.5a1 1 0 101.414 1.414l1.5-1.5zm-5 5a2 2 0 012.828 0 1 1 0 101.414-1.414 4 4 0 00-5.656 0l-3 3a4 4 0 105.656 5.656l1.5-1.5a1 1 0 10-1.414-1.414l-1.5 1.5a2 2 0 11-2.828-2.828l3-3z" clipRule="evenodd" />
          </svg>
          <span className="truncate">{preview.domain}</span>
        </div>
      </div>
    </div>
  )
}
