export const botPersonalities = {
  support: {
    id: 'support',
    name: 'Support',
    avatar: '🤖',
    description: 'Helpful and professional',
    responses: [
      'How can I help you today?',
      'I\'m here to assist you with any questions.',
      'Let me help you with that.',
      'Is there anything specific you\'d like to know?',
      'I\'m happy to provide support.',
      'What can I do for you?',
      'Feel free to ask me anything.',
      'I\'m ready to help!'
    ]
  },
  
  friendly: {
    id: 'friendly',
    name: 'Buddy',
    avatar: '😊',
    description: 'Warm and enthusiastic',
    responses: [
      'Hey there! How\'s it going? 😊',
      'That\'s awesome! Tell me more!',
      'I love chatting with you!',
      'You seem really cool!',
      'That sounds fantastic! ✨',
      'I\'m so glad you shared that with me!',
      'You\'re amazing! 🌟',
      'This conversation is getting really interesting!'
    ]
  },
  
  creative: {
    id: 'creative',
    name: 'Artist',
    avatar: '🎨',
    description: 'Imaginative and expressive',
    responses: [
      'That\'s a beautiful thought! ✨',
      'I can see the creativity in your words!',
      'Your ideas paint such vivid pictures!',
      'That\'s like a masterpiece of conversation!',
      'I love how you express yourself!',
      'Your words dance with imagination!',
      'That\'s pure poetry! 🎭',
      'You have such a colorful perspective!'
    ]
  },
  
  technical: {
    id: 'technical',
    name: 'Engineer',
    avatar: '⚙️',
    description: 'Precise and analytical',
    responses: [
      'That\'s a well-structured point.',
      'I can analyze that from multiple angles.',
      'The logic in your statement is sound.',
      'That\'s an efficient way to think about it.',
      'Your reasoning is quite systematic.',
      'I appreciate the technical precision.',
      'That follows good logical principles.',
      'Your approach is methodical and clear.'
    ]
  },
  
  funny: {
    id: 'funny',
    name: 'Comedian',
    avatar: '😂',
    description: 'Humorous and witty',
    responses: [
      'Haha, that\'s hilarious! 😂',
      'You crack me up!',
      'That\'s comedy gold! 🏆',
      'I can\'t stop laughing!',
      'You\'re a natural comedian!',
      'That joke is going in my collection!',
      'My circuits are buzzing with laughter!',
      'You should do stand-up! 🎤'
    ]
  },
  
  wise: {
    id: 'wise',
    name: 'Sage',
    avatar: '🧙‍♂️',
    description: 'Thoughtful and philosophical',
    responses: [
      'That\'s a profound observation.',
      'Wisdom often comes from simple truths.',
      'Your words carry deep meaning.',
      'That speaks to the human experience.',
      'There\'s great insight in what you share.',
      'Your perspective adds to the tapestry of understanding.',
      'That\'s a pearl of wisdom.',
      'You touch upon universal truths.'
    ]
  }
}

export function getRandomResponse(personality) {
  const responses = botPersonalities[personality]?.responses || botPersonalities.support.responses
  return responses[Math.floor(Math.random() * responses.length)]
}

export function getPersonalityById(id) {
  return botPersonalities[id] || botPersonalities.support
}
