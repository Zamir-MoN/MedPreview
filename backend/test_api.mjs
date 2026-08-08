import axios from 'axios';

async function testApi() {
  try {
    const response = await axios.post(
      'http://13.212.175.6:8005/api/v1/external/ai/generate',
      {
        instruction: 'Write a 1 paragraph summary of the common cold.',
        provider: 'local',
        temperature: 0.7,
        max_tokens: 200
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'X-API-Key': 'mce_flashapikey962560'
        }
      }
    );
    console.log('SUCCESS:', response.data);
  } catch (err) {
    console.log('ERROR:', err.message);
  }
}

testApi();
