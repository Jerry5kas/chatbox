// Test the smart response system
import { smartResponseSystem } from './smartResponses'

export function testSmartResponses() {
  console.log('🧪 Testing Smart Response System...')
  
  const testMessages = [
    'Hello!',
    'Tell me a joke',
    'How do I fix this bug?',
    'I love coding!',
    'Thank you so much!',
    'What is React?',
    'I need help with CSS',
    'Goodbye!',
    'nothing... just chilling'
  ]
  
  testMessages.forEach((message, index) => {
    console.log(`\n--- Test ${index + 1} ---`)
    console.log('Input:', message)
    
    const analysis = smartResponseSystem.analyzeMessage(message)
    console.log('Analysis:', analysis)
    
    const response = smartResponseSystem.generateResponse(analysis, 'friendly')
    console.log('Response:', response)
  })
  
  console.log('\n✅ Smart Response System Test Complete!')
}

// Auto-run test when imported
if (typeof window !== 'undefined') {
  window.testSmartResponses = testSmartResponses
}
