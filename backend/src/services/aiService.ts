import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const AI_API_URL = process.env.AI_API_URL || 'http://13.212.175.6:8005/api/v1/external/ai/generate';
const AI_API_KEY = process.env.AI_API_KEY || 'mce_flashapikey962560';

export const generateBlogContent = async (topic: string, tone: string = 'Professional and informative'): Promise<string> => {
  try {
    const instruction = `You are a professional medical writer. Write an informative blog article about '${topic}'.
Target Audience: General Public. Tone: ${tone}.
Format the output with clear Markdown headings, bullet points, and paragraphs. Return raw text only.`;

    const response = await axios.post(
      AI_API_URL,
      {
        instruction,
        provider: 'local',
        temperature: 0.7,
        max_tokens: 2000
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'X-API-Key': AI_API_KEY
        },
        timeout: 90000 // 90 seconds timeout
      }
    );

    return response.data.response;
  } catch (error: any) {
    console.error('Error calling AI API:', error.response?.data || error.message);
    throw new Error('Failed to generate AI content');
  }
};
