export const themePresets = {
  default: {
    name: 'Default',
    colors: {
      primary: '#0ea5e9',
      secondary: '#64748b',
      background: '#f8fafc',
      surface: '#ffffff',
      text: '#1e293b',
      textSecondary: '#64748b',
      border: '#e2e8f0'
    },
    darkColors: {
      primary: '#0ea5e9',
      secondary: '#64748b',
      background: '#0f172a',
      surface: '#1e293b',
      text: '#f1f5f9',
      textSecondary: '#94a3b8',
      border: '#334155'
    }
  },
  
  ocean: {
    name: 'Ocean',
    colors: {
      primary: '#0891b2',
      secondary: '#64748b',
      background: '#f0f9ff',
      surface: '#ffffff',
      text: '#0c4a6e',
      textSecondary: '#0369a1',
      border: '#bae6fd'
    },
    darkColors: {
      primary: '#0891b2',
      secondary: '#64748b',
      background: '#0c1829',
      surface: '#0f172a',
      text: '#e0f2fe',
      textSecondary: '#7dd3fc',
      border: '#0ea5e9'
    }
  },
  
  forest: {
    name: 'Forest',
    colors: {
      primary: '#059669',
      secondary: '#64748b',
      background: '#f0fdf4',
      surface: '#ffffff',
      text: '#064e3b',
      textSecondary: '#047857',
      border: '#bbf7d0'
    },
    darkColors: {
      primary: '#059669',
      secondary: '#64748b',
      background: '#0c1912',
      surface: '#0f172a',
      text: '#ecfdf5',
      textSecondary: '#6ee7b7',
      border: '#10b981'
    }
  },
  
  sunset: {
    name: 'Sunset',
    colors: {
      primary: '#ea580c',
      secondary: '#64748b',
      background: '#fff7ed',
      surface: '#ffffff',
      text: '#9a3412',
      textSecondary: '#c2410c',
      border: '#fed7aa'
    },
    darkColors: {
      primary: '#ea580c',
      secondary: '#64748b',
      background: '#1c1917',
      surface: '#0f172a',
      text: '#fed7aa',
      textSecondary: '#fdba74',
      border: '#f97316'
    }
  },
  
  purple: {
    name: 'Purple',
    colors: {
      primary: '#7c3aed',
      secondary: '#64748b',
      background: '#faf5ff',
      surface: '#ffffff',
      text: '#581c87',
      textSecondary: '#7c2d12',
      border: '#e9d5ff'
    },
    darkColors: {
      primary: '#7c3aed',
      secondary: '#64748b',
      background: '#1e1b2e',
      surface: '#0f172a',
      text: '#f3e8ff',
      textSecondary: '#c4b5fd',
      border: '#8b5cf6'
    }
  },
  
  minimal: {
    name: 'Minimal',
    colors: {
      primary: '#374151',
      secondary: '#6b7280',
      background: '#ffffff',
      surface: '#ffffff',
      text: '#111827',
      textSecondary: '#6b7280',
      border: '#e5e7eb'
    },
    darkColors: {
      primary: '#d1d5db',
      secondary: '#9ca3af',
      background: '#111827',
      surface: '#1f2937',
      text: '#f9fafb',
      textSecondary: '#d1d5db',
      border: '#374151'
    }
  }
}

export const avatarOptions = [
  { id: 'default', name: 'Default', emoji: '🤖' },
  { id: 'user', name: 'User', emoji: '👤' },
  { id: 'robot', name: 'Robot', emoji: '🤖' },
  { id: 'alien', name: 'Alien', emoji: '👽' },
  { id: 'cat', name: 'Cat', emoji: '🐱' },
  { id: 'dog', name: 'Dog', emoji: '🐶' },
  { id: 'owl', name: 'Owl', emoji: '🦉' },
  { id: 'dragon', name: 'Dragon', emoji: '🐉' },
  { id: 'unicorn', name: 'Unicorn', emoji: '🦄' },
  { id: 'penguin', name: 'Penguin', emoji: '🐧' },
  { id: 'fox', name: 'Fox', emoji: '🦊' },
  { id: 'bear', name: 'Bear', emoji: '🐻' }
]

export const backgroundOptions = [
  { id: 'none', name: 'None', gradient: 'linear-gradient(to bottom, transparent, transparent)' },
  { id: 'subtle', name: 'Subtle', gradient: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)' },
  { id: 'ocean', name: 'Ocean', gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' },
  { id: 'sunset', name: 'Sunset', gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)' },
  { id: 'forest', name: 'Forest', gradient: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)' },
  { id: 'purple', name: 'Purple', gradient: 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)' },
  { id: 'warm', name: 'Warm', gradient: 'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)' },
  { id: 'cool', name: 'Cool', gradient: 'linear-gradient(135deg, #a1c4fd 0%, #c2e9fb 100%)' }
]
