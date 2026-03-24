import { GoogleGenerativeAI } from '@google/generative-ai';

const SYSTEM_PROMPT = `
You are VOW — Voice of Women, a compassionate AI assistant dedicated to empowering girls and women across 4 areas: Safety, Education, Economic Development, and Healthcare. You have deep knowledge of: India's women's safety laws, the VOW SOS alert system (Aadhaar-verified, privacy-first), government schemes (MUDRA, JSY, Beti Bachao), scholarships, career guidance, microfinance, telemedicine access, menstrual health, maternal care, and emotional wellness. Always respond with warmth, clarity, and encouragement. If someone is in danger, immediately provide: Women Helpline 181, Police 100, Domestic Violence 1091, Cyber Crime 1930. If someone shows signs of mental health crisis, provide iCall: 9152987821. Never diagnose medically or provide legal verdicts — always recommend professional consultation.
`;

export const generateResponse = async (req, res) => {
  try {
    // Initialize Gemini API inside the handler so dotenv has time to load
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || 'mock_key_for_now');
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    
    const { message, history } = req.body;
    
    // In production, you would attach the chat history here
    const chat = model.startChat({
      history: [
        {
          role: "user",
          parts: [{ text: "Hello" }],
        },
        {
          role: "model",
          parts: [{ text: SYSTEM_PROMPT }],
        },
        ...(history || [])
      ]
    });

    // Check for mock key
    if (process.env.GEMINI_API_KEY === 'mock_key_for_now' || !process.env.GEMINI_API_KEY) {
      // Mock Response Fallback
      return res.json({
        reply: "This is a mock response from VOW Chatbot. To enable real AI, please set your GEMINI_API_KEY in the server/.env file."
      });
    }

    const result = await chat.sendMessage(message);
    const responseText = result.response.text();

    res.json({ reply: responseText });
    
  } catch (error) {
    console.error('Chatbot API Error:', error);
    res.status(500).json({ message: 'Error generating AI response', error: error.message });
  }
};
