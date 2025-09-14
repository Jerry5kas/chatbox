// Free AI providers that work directly from frontend
// No backend required - all API calls made from browser

class FreeAIProviders {
  constructor() {
    this.providers = {
      huggingface: {
        name: 'Hugging Face (Free)',
        apiUrl: 'https://api-inference.huggingface.co/models',
        models: {
          chat: 'microsoft/DialoGPT-medium',
          sentiment: 'cardiffnlp/twitter-roberta-base-sentiment-latest',
          qa: 'deepset/roberta-base-squad2'
        },
        requiresAuth: true,
        freeLimit: '1000 requests/month'
      },
      
      cohere: {
        name: 'Cohere (Free Tier)',
        apiUrl: 'https://api.cohere.ai/v1',
        requiresAuth: true,
        freeLimit: '100 requests/month',
        endpoint: '/generate'
      },
      
      openai: {
        name: 'OpenAI (Free Tier)',
        apiUrl: 'https://api.openai.com/v1',
        requiresAuth: true,
        freeLimit: '$5 free credit',
        endpoint: '/chat/completions'
      },
      
      replicate: {
        name: 'Replicate (Free Tier)',
        apiUrl: 'https://api.replicate.com/v1',
        requiresAuth: true,
        freeLimit: '$10 free credit',
        models: {
          llama: 'meta/llama-2-7b-chat'
        }
      }
    }
  }

  // Hugging Face API (Free tier - 1000 requests/month)
  async queryHuggingFace(model, inputs, apiKey) {
    const response = await fetch(`https://api-inference.huggingface.co/models/${model}`, {
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json'
      },
      method: 'POST',
      body: JSON.stringify({ inputs })
    })
    
    if (!response.ok) {
      throw new Error(`Hugging Face API error: ${response.status}`)
    }
    
    return await response.json()
  }

  // Cohere API (Free tier - 100 requests/month)
  async queryCohere(prompt, apiKey) {
    const response = await fetch('https://api.cohere.ai/v1/generate', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: 'command-light',
        prompt: prompt,
        max_tokens: 100,
        temperature: 0.7
      })
    })

    if (!response.ok) {
      throw new Error(`Cohere API error: ${response.status}`)
    }

    const data = await response.json()
    return data.generations[0].text
  }

  // OpenAI API (Free tier - $5 credit)
  async queryOpenAI(messages, apiKey) {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: messages,
        max_tokens: 100,
        temperature: 0.7
      })
    })

    if (!response.ok) {
      throw new Error(`OpenAI API error: ${response.status}`)
    }

    const data = await response.json()
    return data.choices[0].message.content
  }

  // Get AI response with fallback
  async getAIResponse(userMessage, personality = 'friendly', apiKey = null) {
    // Try different providers in order of preference
    const providers = [
      () => this.queryOpenAI([
        { role: 'system', content: `You are a ${personality} AI assistant. Keep responses short and conversational.` },
        { role: 'user', content: userMessage }
      ], apiKey),
      
      () => this.queryCohere(`Human: ${userMessage}\nAI:`, apiKey),
      
      () => this.queryHuggingFace('microsoft/DialoGPT-medium', userMessage, apiKey)
    ]

    for (const provider of providers) {
      try {
        const response = await provider()
        return response
      } catch (error) {
        console.warn('AI provider failed:', error.message)
        continue
      }
    }

    // Fallback to local smart responses
    return this.getLocalFallback(userMessage, personality)
  }

  getLocalFallback(message, personality) {
    const responses = {
      friendly: [
        "That's really interesting! Tell me more! 😊",
        "I love chatting with you! What else is on your mind?",
        "That sounds awesome! I'd love to hear more details! ✨"
      ],
      professional: [
        "Thank you for sharing that information with me.",
        "I understand your point. How can I assist you further?",
        "That's a valid concern. Let me help you with that."
      ],
      creative: [
        "Your words paint such a vivid picture! 🎨",
        "That's like poetry in motion! ✨",
        "I can see the creativity flowing through your message! 🌟"
      ],
      technical: [
        "That's a well-structured technical question.",
        "From an engineering perspective, that makes sense.",
        "Let's analyze this systematically."
      ]
    }

    const personalityResponses = responses[personality] || responses.friendly
    return personalityResponses[Math.floor(Math.random() * personalityResponses.length)]
  }
}

export const freeAIProviders = new FreeAIProviders()
