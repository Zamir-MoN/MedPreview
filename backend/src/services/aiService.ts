import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const AI_API_URL = process.env.AI_API_URL || 'http://13.212.175.6:8005/api/v1/external/ai/generate';
const AI_API_KEY = process.env.AI_API_KEY || 'mce_flashapikey962560';

export const generateBlogContent = async (topic: string, tone: string = 'Professional and informative'): Promise<string> => {
  try {
    const instruction = `You are a professional medical writer. Write an informative blog article about '${topic}'.
Target Audience: General Public. Tone: ${tone}.
Format the output with clear Markdown headings, bullet points, and paragraphs. You MUST write the ENTIRE article strictly in English. Return raw text only.`;

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
        timeout: 300000 // 5 minutes timeout to allow long generation
      }
    );

    let finalContent = response.data.response;
    
    // The AI sometimes wraps its response in a JSON object despite instructions
    try {
      const parsed = JSON.parse(finalContent);
      if (parsed && typeof parsed === 'object') {
        const values = Object.values(parsed);
        if (values.length > 0 && typeof values[0] === 'string') {
          finalContent = values[0];
        }
      }
    } catch (e) {
      // Output is not JSON, which is fine. Use raw text.
    }

    if (!finalContent || typeof finalContent !== 'string') {
       finalContent = '';
    }

    // Try to extract the Conclusion or a good summary for the image prompt
    let imagePrompt = topic;
    const conclusionMatch = finalContent.match(/##\s*Conclusion\s*([\s\S]*?)(?:##|$)/i);
    if (conclusionMatch && conclusionMatch[1]) {
      // Use up to 400 characters from the conclusion to avoid URL too long errors
      imagePrompt = conclusionMatch[1].trim().substring(0, 400); 
    }

    // Generate an image using the external AI image API
    try {
      const imgQuery = new URLSearchParams({
        prompt: imagePrompt + ", highly detailed, professional medical illustration, clean style",
        style: "realistic",
        ar: "16:9"
      });
      
      const imgResponse = await axios.get(`https://r-gengpt-api.vercel.app/api/image?${imgQuery.toString()}`);
      
      if (imgResponse.data && imgResponse.data.status === 'success' && imgResponse.data.data?.url) {
        // Prepend the generated image to the top of the blog content
        finalContent = `![Medical Illustration](${imgResponse.data.data.url})\n\n` + finalContent;
      }
    } catch (imgError: any) {
      console.error('Failed to generate image, proceeding with text only.', imgError.message);
    }

    return finalContent;
  } catch (error: any) {
    console.error('Error calling AI API:', error.response?.data || error.message);
    throw new Error('Failed to generate AI content');
  }
};

export const generateImageForExistingBlog = async (topic: string, content: string): Promise<string> => {
  let imagePrompt = topic;
  const conclusionMatch = content.match(/##\s*Conclusion\s*([\s\S]*?)(?:##|$)/i);
  if (conclusionMatch && conclusionMatch[1]) {
    imagePrompt = conclusionMatch[1].trim().substring(0, 400); 
  }

  try {
    const imgQuery = new URLSearchParams({
      prompt: imagePrompt + ", highly detailed, professional medical illustration, clean style",
      style: "realistic",
      ar: "16:9"
    });
    
    const imgResponse = await axios.get(`https://r-gengpt-api.vercel.app/api/image?${imgQuery.toString()}`);
    
    if (imgResponse.data && imgResponse.data.status === 'success' && imgResponse.data.data?.url) {
      return `![Medical Illustration](${imgResponse.data.data.url})\n\n` + content;
    }
  } catch (imgError: any) {
    console.error('Failed to generate image for existing blog', imgError.message);
    throw new Error('Failed to generate image');
  }

  return content;
};
