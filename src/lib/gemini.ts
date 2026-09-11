import Groq from 'groq-sdk';

// Initialize the Groq API
const groq = new Groq({ 
  apiKey: import.meta.env.VITE_GROQ_API_KEY || 'dummy_key',
  dangerouslyAllowBrowser: true 
});

export const generateGeminiResponse = async (prompt: string): Promise<string> => {
  try {
    // Validate API key
    if (!import.meta.env.VITE_GROQ_API_KEY) {
      throw new Error('Groq API key is not configured');
    }

    // Validate prompt
    if (!prompt || typeof prompt !== 'string') {
      throw new Error('Invalid prompt provided');
    }

    const completion = await groq.chat.completions.create({
      messages: [
        {
          role: 'system',
          content: 'You are an expert agricultural AI assistant. Your name is UZHAMI. You help farmers with their farming-related questions, providing accurate and helpful advice about crop management, soil health, pest control, and other agricultural topics. Keep your responses focused on farming and agriculture.'
        },
        {
          role: 'user',
          content: prompt
        }
      ],
      model: 'openai/gpt-oss-20b',
      temperature: 0.7,
      max_tokens: 500,
      top_p: 0.95,
    });

    const responseText = completion.choices[0]?.message?.content;
    
    if (!responseText) {
      throw new Error('Empty response received from Groq API');
    }

    return responseText;
  } catch (error) {
    // Handle specific error types
    if (error instanceof Error) {
      if (error.message.includes('API key')) {
        throw new Error('Please configure your Groq API key properly');
      }
      throw new Error(`AI Assistant Error: ${error.message}`);
    }
    
    // Generic error
    throw new Error('Failed to generate response. Please try again.');
  }
};