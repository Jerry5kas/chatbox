// AI-powered responses using Hugging Face Transformers.js
// This runs entirely in the browser - no backend needed!

// Note: Transformers.js is disabled for now due to build issues
// import { pipeline } from '@xenova/transformers'

class AIChatSystem {
  constructor() {
    this.classifier = null
    this.generator = null
    this.isInitialized = false
  }

  async initialize() {
    if (this.isInitialized) return

    try {
      console.log('🤖 Transformers.js is disabled for production build')
      console.log('💡 Use free AI APIs instead - see AI Settings panel')
      this.isInitialized = false
    } catch (error) {
      console.error('❌ Failed to load AI models:', error)
      this.isInitialized = false
    }
  }

  async analyzeSentiment(text) {
    if (!this.classifier) return { label: 'NEUTRAL', score: 0.5 }

    try {
      const result = await this.classifier(text)
      return {
        label: result[0].label,
        score: result[0].score
      }
    } catch (error) {
      console.error('Sentiment analysis error:', error)
      return { label: 'NEUTRAL', score: 0.5 }
    }
  }

  async generateResponse(userMessage, personality = 'friendly') {
    if (!this.generator) {
      return this.getFallbackResponse(userMessage, personality)
    }

    try {
      // Create a prompt based on personality
      const prompts = {
        friendly: `Human: ${userMessage}\nAI: Hey there! I'm excited to chat with you.`,
        professional: `Human: ${userMessage}\nAI: I understand your message. Let me help you with that.`,
        creative: `Human: ${userMessage}\nAI: That's fascinating! I love how you express yourself.`,
        technical: `Human: ${userMessage}\nAI: From a technical perspective, that's an interesting point.`
      }

      const prompt = prompts[personality] || prompts.friendly
      
      // Generate response using AI
      const result = await this.generator(prompt, {
        max_length: 100,
        num_return_sequences: 1,
        temperature: 0.7,
        do_sample: true
      })

      // Extract just the AI response part
      const fullText = result[0].generated_text
      const aiResponse = fullText.split('AI: ')[1]?.trim() || this.getFallbackResponse(userMessage, personality)

      return aiResponse
    } catch (error) {
      console.error('AI generation error:', error)
      return this.getFallbackResponse(userMessage, personality)
    }
  }

  getFallbackResponse(message, personality) {
    const responses = {
      friendly: [
        "That's really interesting! Tell me more about that.",
        "I love chatting with you! What else is on your mind?",
        "That sounds awesome! I'd love to hear more details."
      ],
      professional: [
        "Thank you for sharing that information with me.",
        "I understand your point. How can I assist you further?",
        "That's a valid concern. Let me help you with that."
      ],
      creative: [
        "Your words paint such a vivid picture!",
        "That's like poetry in motion!",
        "I can see the creativity flowing through your message!"
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

// Export singleton instance
export const aiChatSystem = new AIChatSystem()
