// Smart Response System - Frontend-only intelligent responses
export class SmartResponseSystem {
  constructor() {
    this.conversationHistory = []
    this.userPreferences = {
      topics: [],
      communicationStyle: 'friendly',
      interests: []
    }
  }

  // Analyze user message for intent and context
  analyzeMessage(message) {
    const text = message.toLowerCase().trim()
    
    // Intent detection
    const intents = {
      greeting: /^(hi|hello|hey|good morning|good afternoon|good evening)/,
      question: /\?$/,
      code: /(code|coding|programming|javascript|python|react|html|css)/,
      help: /(help|how|what|where|when|why|can you|could you)/,
      compliment: /(thank|thanks|awesome|great|good|nice|love|amazing|excellent)/,
      complaint: /(problem|issue|error|bug|wrong|not working|broken|bad)/,
      goodbye: /(bye|goodbye|see you|later|farewell)/,
      weather: /(weather|temperature|rain|sunny|cloudy|hot|cold)/,
      time: /(time|clock|hour|minute|today|tomorrow|yesterday)/,
      joke: /(joke|funny|laugh|humor|haha)/,
      advice: /(advice|suggestion|recommend|should|think)/,
      personal: /(i am|i'm|my name|about me|myself)/
    }

    // Topic detection
    const topics = {
      technology: /(tech|computer|software|hardware|ai|machine learning|data)/,
      programming: /(programming|coding|development|software|code|algorithm)/,
      web: /(web|website|html|css|javascript|react|vue|angular|frontend|backend)/,
      design: /(design|ui|ux|graphic|visual|color|layout|typography)/,
      business: /(business|startup|company|work|job|career|money|profit)/,
      education: /(learn|study|education|school|university|course|tutorial)/,
      entertainment: /(movie|music|game|book|tv|show|entertainment)/,
      health: /(health|fitness|exercise|medical|doctor|wellness)/,
      travel: /(travel|trip|vacation|place|country|city|hotel)/
    }

    // Emotion detection
    const emotions = {
      positive: /(happy|excited|great|awesome|amazing|wonderful|fantastic|love)/,
      negative: /(sad|angry|frustrated|annoyed|upset|disappointed|worried|stressed)/,
      neutral: /(okay|fine|alright|normal|regular|standard)/
    }

    return {
      intents: Object.keys(intents).filter(intent => intents[intent].test(text)),
      topics: Object.keys(topics).filter(topic => topics[topic].test(text)),
      emotions: Object.keys(emotions).filter(emotion => emotions[emotion].test(text)),
      originalText: message,
      length: message.length
    }
  }

  // Generate contextually relevant response
  generateResponse(analysis, personality) {
    const { intents, topics, emotions, originalText } = analysis
    
    // Priority-based response selection
    if (intents.includes('greeting')) {
      return this.getGreetingResponse(personality)
    }
    
    if (intents.includes('question')) {
      return this.getQuestionResponse(originalText, topics, personality)
    }
    
    if (intents.includes('code')) {
      return this.getCodeResponse(originalText, personality)
    }
    
    if (intents.includes('help')) {
      return this.getHelpResponse(originalText, topics, personality)
    }
    
    if (intents.includes('compliment')) {
      return this.getComplimentResponse(personality)
    }
    
    if (intents.includes('complaint')) {
      return this.getComplaintResponse(personality)
    }
    
    if (intents.includes('goodbye')) {
      return this.getGoodbyeResponse(personality)
    }
    
    if (intents.includes('joke')) {
      return this.getJokeResponse(personality)
    }
    
    if (intents.includes('advice')) {
      return this.getAdviceResponse(originalText, topics, personality)
    }
    
    // Default contextual response
    return this.getContextualResponse(originalText, topics, emotions, personality)
  }

  getGreetingResponse(personality) {
    const responses = {
      friendly: [
        "Hello there! 👋 Great to see you! How's your day going?",
        "Hey! Welcome back! What can I help you with today?",
        "Hi! 😊 Nice to meet you! What brings you here?"
      ],
      professional: [
        "Good day! How may I assist you today?",
        "Hello! I'm here to help. What do you need?",
        "Greetings! What can I do for you?"
      ],
      casual: [
        "Yo! What's up?",
        "Hey! Ready to chat?",
        "Hi! What's on your mind?"
      ],
      creative: [
        "Greetings, fellow human! 🎨 What creative adventure shall we embark on today?",
        "Hello there, you wonderful being! ✨ What sparks your curiosity today?",
        "Salutations! 🌟 Ready to explore something amazing together?"
      ]
    }
    return this.getRandomResponse(responses[personality] || responses.friendly)
  }

  getQuestionResponse(question, topics, personality) {
    const techQuestions = [
      "That's a great question! Are you working on a specific project?",
      "I'd be happy to help! Can you provide a bit more context?",
      "Interesting question! What's your current setup or environment?"
    ]
    
    const generalQuestions = [
      "That's a thoughtful question! Let me think about that...",
      "Good question! I'd love to help you explore that topic.",
      "Interesting! What made you curious about that?"
    ]
    
    if (topics.includes('programming') || topics.includes('technology')) {
      return this.getRandomResponse(techQuestions)
    }
    
    return this.getRandomResponse(generalQuestions)
  }

  getCodeResponse(originalText, personality) {
    const responses = [
      "I love talking about code! 💻 What programming language are you working with?",
      "Coding is awesome! Are you building something cool?",
      "Great to see another developer! 🚀 What's your current project about?",
      "Code talk! Are you debugging something or starting something new?"
    ]
    return this.getRandomResponse(responses)
  }

  getHelpResponse(question, topics, personality) {
    const responses = [
      "I'm here to help! 🤝 What specific area do you need assistance with?",
      "Happy to assist! Can you tell me more about what you're trying to achieve?",
      "I'd love to help you out! What's the challenge you're facing?",
      "Let's figure this out together! What do you need help with?"
    ]
    return this.getRandomResponse(responses)
  }

  getComplimentResponse(personality) {
    const responses = [
      "Aww, thank you! 😊 That means a lot!",
      "You're too kind! I appreciate that!",
      "Thanks! That made my day! 🌟",
      "You're awesome too! 😄"
    ]
    return this.getRandomResponse(responses)
  }

  getComplaintResponse(personality) {
    const responses = [
      "I'm sorry to hear that! 😔 Let me see how I can help.",
      "That sounds frustrating! What's going wrong?",
      "I understand your concern. Let's work through this together.",
      "I'm here to help resolve this! Can you tell me more details?"
    ]
    return this.getRandomResponse(responses)
  }

  getGoodbyeResponse(personality) {
    const responses = [
      "Take care! 👋 It was great chatting with you!",
      "Goodbye! Have a wonderful day! 😊",
      "See you later! Thanks for the great conversation!",
      "Farewell! 🌟 Until next time!"
    ]
    return this.getRandomResponse(responses)
  }

  getJokeResponse(personality) {
    const jokes = [
      "Why don't programmers like nature? It has too many bugs! 🐛",
      "What do you call a programmer from Finland? Nerdic! 🇫🇮",
      "Why did the developer go broke? Because he used up all his cache! 💰",
      "What's a programmer's favorite hangout place? The Foo Bar! 🍺",
      "Why do Java developers wear glasses? Because they can't C#! 👓"
    ]
    return this.getRandomResponse(jokes)
  }

  getAdviceResponse(question, topics, personality) {
    const responses = [
      "That's a thoughtful question! Based on what you've shared, I'd suggest...",
      "Great question! Here's what I think might help...",
      "I've got some ideas that might be useful for you...",
      "Let me share some thoughts on that topic..."
    ]
    return this.getRandomResponse(responses)
  }

  getContextualResponse(text, topics, emotions, personality) {
    // Generate response based on detected topics and emotions
    if (emotions.includes('positive')) {
      return "That sounds great! 😊 Tell me more about it!"
    }
    
    if (emotions.includes('negative')) {
      return "I'm sorry to hear that. 😔 Is there anything I can do to help?"
    }
    
    if (topics.includes('technology')) {
      return "Technology is fascinating! What aspect interests you most?"
    }
    
    if (topics.includes('programming')) {
      return "Programming is such a creative field! What are you working on?"
    }
    
    // Default responses based on text length
    if (text.length < 10) {
      return "That's interesting! Can you tell me more?"
    }
    
    if (text.length > 100) {
      return "Wow, that's quite detailed! I appreciate you sharing all that information."
    }
    
    return "Thanks for sharing! What else is on your mind?"
  }

  getRandomResponse(responses) {
    return responses[Math.floor(Math.random() * responses.length)]
  }

  // Update conversation history for better context
  updateHistory(message, response) {
    this.conversationHistory.push({
      user: message,
      bot: response,
      timestamp: new Date()
    })
    
    // Keep only last 10 exchanges for context
    if (this.conversationHistory.length > 10) {
      this.conversationHistory = this.conversationHistory.slice(-10)
    }
  }

  // Get conversation context
  getContext() {
    if (this.conversationHistory.length === 0) return null
    
    const recent = this.conversationHistory.slice(-3)
    return recent.map(entry => ({
      user: entry.user,
      bot: entry.bot
    }))
  }
}

// Export singleton instance
export const smartResponseSystem = new SmartResponseSystem()
