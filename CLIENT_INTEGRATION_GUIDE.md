# 🚀 MedEngine AI Content Generator API
## 📖 Client Integration & Developer Onboarding Guide

Welcome to the **MedEngine AI Content Generator API**. This comprehensive guide provides everything your engineering team needs to design, build, and integrate your own custom web pages, mobile apps, or backend services using our AI engine.

---

## 📌 1. API Credentials & Endpoint Summary

Share these credentials with your development team:

| Parameter | Value | Notes |
| :--- | :--- | :--- |
| **API Endpoint URL** | `http://13.212.175.6:8005/api/v1/external/ai/generate` | Target endpoint for all generation requests |
| **HTTP Method** | `POST` | Must be a POST request |
| **Content-Type** | `application/json` | Request and response are JSON |
| **Auth Header** | `X-API-Key` | Header name for your API key |
| **Your API Key** | `mce_flashapikey962560` | Keep this confidential |

---

## 📦 2. Request & Response Specifications

### A. HTTP Headers Required
Every API request must include the following headers:
```http
POST /api/v1/external/ai/generate HTTP/1.1
Host: 13.212.175.6:8005
Content-Type: application/json
X-API-Key: mce_flashapikey962560
```

### B. Request Body Parameters (JSON)

| Field Name | Type | Required? | Default | Description |
| :--- | :--- | :--- | :--- | :--- |
| **`instruction`** | `string` | **Required** | — | The full prompt instructing the AI what content to generate (topic, tone, structure, guidelines). |
| **`provider`** | `string` | **Required** | `"local"` | Must be set to `"local"`. |
| **`temperature`** | `number` | Optional | `0.7` | Creativity parameter (Range `0.0` to `1.0`). `0.7` is recommended for high accuracy with natural flow. |
| **`max_tokens`** | `integer` | Optional | `2000` | Maximum token length for the response (1 token ≈ 0.75 words). |

#### Example Request JSON:
```json
{
  "instruction": "You are a professional medical writer. Write an informative article about 'Cold vs Flu'. Target Audience: General Public. Tone: Professional and informative. Key points to cover: Symptoms, diagnosis, prevention, when to consult a doctor. Format the output with clear headings, bullet points, and paragraphs. Return raw text only.",
  "provider": "local",
  "temperature": 0.7,
  "max_tokens": 2000
}
```

### C. Response Body (JSON)
On success (`200 OK`), the API returns a JSON object with a single `response` key containing the complete AI-generated text:

```json
{
  "response": "# Cold vs Flu: How to Spot the Difference\n\nWhile cold and flu share similar symptoms, they are caused by different viruses...\n\n### Key Differences:\n* **Onset**: Cold develops gradually, while the flu hits suddenly.\n* **Fever**: Rare in colds, common and high in flu.\n* **Aches**: Mild in colds, severe in flu."
}
```

---

## 🎨 3. Frontend Implementation & UI Requirements

When designing your own user interface, here is what your frontend page should include:

```
┌─────────────────────────────────────────────────────────────────┐
│                    CUSTOM FRONTEND PAGE                         │
├─────────────────────────────────────────────────────────────────┤
│ 1. USER INPUTS                                                  │
│    • Topic / Disease / Subject (<input type="text">)            │
│    • Target Audience (<select> Dropdown)                        │
│    • Tone (<select> Dropdown: Professional, Casual, Empathetic) │
│    • Key Points (<textarea>)                                    │
│    • Word Count / Length Selector (Short, Medium, Long)         │
├─────────────────────────────────────────────────────────────────┤
│ 2. ACTION & STATUS                                              │
│    • [ Generate Content ] Button                                │
│    • ⏳ Loading Spinner / Progress bar (15–40s generation time) │
├─────────────────────────────────────────────────────────────────┤
│ 3. OUTPUT & UTILITY CONTROLS                                    │
│    • Formatted Content Preview Area (Markdown / Plain Text)     │
│    • [ Copy to Clipboard ] Button                               │
│    • [ Export as PDF / Word / Markdown ] Button                 │
│    • [ Save to My Library / Database ] Action                   │
└─────────────────────────────────────────────────────────────────┘
```

### Prompt Construction Logic (Frontend Javascript):
To get the best results from the AI, combine user inputs into a structured instruction string before making the API call:

```javascript
function buildPrompt(topic, audience, tone, keyPoints, customInstructions) {
    return `
You are a medical and healthcare content writer.
Write a comprehensive article about: ${topic}.
Target Audience: ${audience}.
Tone: ${tone}.
Key Points to Cover: ${keyPoints}.
Additional Guidelines: ${customInstructions || "None"}.

FORMATTING RULES:
- Use clean Markdown headings (e.g. #, ##, ###).
- Use bullet points for symptoms, steps, or list items.
- Maintain medically accurate, verified information.
- Return raw formatted text only (no JSON formatting).
    `.trim();
}
```

---

## 💻 4. Ready-to-Use Code Integration Examples

### Example 1: Complete Standalone 1-File HTML/JS Webpage
You can save this as `index.html` and run it directly in any browser:

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>AI Content Studio</title>
    <style>
        * { box-sizing: border-box; font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; }
        body { background: #0f172a; color: #f8fafc; margin: 0; padding: 40px 20px; display: flex; justify-content: center; }
        .container { width: 100%; max-width: 800px; background: #1e293b; padding: 30px; border-radius: 12px; border: 1px solid #334155; }
        h1 { margin-top: 0; color: #38bdf8; font-size: 24px; }
        .form-group { margin-bottom: 18px; }
        label { display: block; font-weight: 600; margin-bottom: 6px; font-size: 14px; color: #cbd5e1; }
        input, select, textarea { width: 100%; padding: 12px; background: #0f172a; border: 1px solid #475569; border-radius: 6px; color: white; font-size: 14px; }
        input:focus, select:focus, textarea:focus { outline: none; border-color: #38bdf8; }
        .btn-submit { width: 100%; padding: 14px; background: #0284c7; color: white; border: none; border-radius: 6px; font-weight: bold; cursor: pointer; font-size: 16px; transition: 0.2s; }
        .btn-submit:hover { background: #0369a1; }
        .btn-submit:disabled { background: #64748b; cursor: not-allowed; }
        .loading-box { text-align: center; color: #94a3b8; margin: 20px 0; font-style: italic; }
        .output-card { margin-top: 25px; background: #0f172a; border: 1px solid #334155; border-radius: 8px; padding: 20px; }
        .output-header { display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid #334155; padding-bottom: 10px; margin-bottom: 15px; }
        .btn-copy { background: #334155; color: white; border: none; padding: 6px 12px; border-radius: 4px; cursor: pointer; }
        .btn-copy:hover { background: #475569; }
        .output-text { white-space: pre-wrap; line-height: 1.6; color: #e2e8f0; font-size: 15px; }
        .hidden { display: none; }
    </style>
</head>
<body>

<div class="container">
    <h1>✨ AI Content Generator</h1>
    
    <div class="form-group">
        <label>Article Topic / Condition *</label>
        <input type="text" id="topic" placeholder="e.g. Type 2 Diabetes Diet & Management" />
    </div>

    <div style="display: flex; gap: 15px;">
        <div class="form-group" style="flex: 1;">
            <label>Target Audience</label>
            <select id="audience">
                <option value="General Public">General Public</option>
                <option value="Patients">Patients & Caregivers</option>
                <option value="Medical Professionals">Medical Professionals</option>
            </select>
        </div>
        <div class="form-group" style="flex: 1;">
            <label>Tone</label>
            <select id="tone">
                <option value="Professional & Informative">Professional & Informative</option>
                <option value="Empathetic & Caring">Empathetic & Caring</option>
                <option value="Simple & Conversational">Simple & Conversational</option>
            </select>
        </div>
    </div>

    <div class="form-group">
        <label>Key Points / Sections to Include</label>
        <textarea id="keypoints" rows="3" placeholder="e.g. Foods to eat, Foods to avoid, Exercise tips, Warning signs"></textarea>
    </div>

    <button id="generateBtn" class="btn-submit" onclick="generateContent()">Generate Content</button>

    <div id="loading" class="loading-box hidden">
        ⏳ Generating your content with AI (takes approx. 15–30 seconds)...
    </div>

    <div id="outputContainer" class="output-card hidden">
        <div class="output-header">
            <strong style="color: #38bdf8;">Generated Result</strong>
            <button class="btn-copy" onclick="copyContent()">📋 Copy to Clipboard</button>
        </div>
        <div id="outputText" class="output-text"></div>
    </div>
</div>

<script>
    const API_URL = "http://13.212.175.6:8005/api/v1/external/ai/generate";
    const API_KEY = "mce_flashapikey962560";

    async function generateContent() {
        const topic = document.getElementById('topic').value.trim();
        const audience = document.getElementById('audience').value;
        const tone = document.getElementById('tone').value;
        const keypoints = document.getElementById('keypoints').value.trim();
        
        const btn = document.getElementById('generateBtn');
        const loading = document.getElementById('loading');
        const outputContainer = document.getElementById('outputContainer');
        const outputText = document.getElementById('outputText');

        if (!topic) {
            alert("Please enter an article topic.");
            return;
        }

        btn.disabled = true;
        loading.classList.remove('hidden');
        outputContainer.classList.add('hidden');

        const prompt = `Write a comprehensive medical article about: ${topic}.
Target Audience: ${audience}.
Tone: ${tone}.
Key Points to Cover: ${keypoints || "Overview, Causes, Symptoms, Management"}.
Please format using clean headings, paragraphs, and bullet points. Return raw text only.`;

        try {
            const response = await fetch(API_URL, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "X-API-Key": API_KEY
                },
                body: JSON.stringify({
                    instruction: prompt,
                    provider: "local",
                    temperature: 0.7,
                    max_tokens: 2000
                })
            });

            if (!response.ok) {
                throw new Error(`Server returned error: ${response.status} ${response.statusText}`);
            }

            const data = await response.json();
            outputText.innerText = data.response;
            outputContainer.classList.remove('hidden');
        } catch (err) {
            alert("Failed to generate: " + err.message);
        } finally {
            btn.disabled = false;
            loading.classList.add('hidden');
        }
    }

    function copyContent() {
        const text = document.getElementById('outputText').innerText;
        navigator.clipboard.writeText(text);
        alert("Content copied to clipboard!");
    }
</script>

</body>
</html>
```

---

### Example 2: React / Next.js Component Integration
```tsx
import React, { useState } from 'react';

export default function ContentGenerator() {
  const [topic, setTopic] = useState('');
  const [audience, setAudience] = useState('General Public');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState('');

  const handleGenerate = async () => {
    if (!topic) return alert('Enter a topic');
    setLoading(true);
    setResult('');

    try {
      const prompt = `Write an in-depth article on: ${topic} for ${audience}. Format with clear headings and bullet points.`;
      
      const res = await fetch("http://13.212.175.6:8005/api/v1/external/ai/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-API-Key": "mce_flashapikey962560"
        },
        body: JSON.stringify({
          instruction: prompt,
          provider: "local",
          temperature: 0.7,
          max_tokens: 2000
        })
      });

      const data = await res.json();
      setResult(data.response);
    } catch (err: any) {
      alert("Generation failed: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: 700, margin: '40px auto', padding: 20 }}>
      <h2>AI Medical Article Writer</h2>
      <input 
        value={topic} 
        onChange={(e) => setTopic(e.target.value)} 
        placeholder="Enter medical topic..." 
        style={{ width: '100%', padding: 10, marginBottom: 10 }}
      />
      <select value={audience} onChange={(e) => setAudience(e.target.value)} style={{ width: '100%', padding: 10, marginBottom: 10 }}>
        <option value="General Public">General Public</option>
        <option value="Patients">Patients</option>
        <option value="Doctors">Doctors</option>
      </select>
      <button onClick={handleGenerate} disabled={loading} style={{ padding: '10px 20px', cursor: 'pointer' }}>
        {loading ? '⏳ Generating...' : 'Generate Article'}
      </button>

      {result && (
        <div style={{ marginTop: 20, whiteSpace: 'pre-wrap', background: '#f5f5f5', padding: 15, borderRadius: 8 }}>
          {result}
        </div>
      )}
    </div>
  );
}
```

---

### Example 3: Node.js / Express Backend Proxy (Secure Setup)
To protect your API key from public frontend users, call the API through your own backend:

```javascript
// server.js (Express Backend)
const express = require('express');
const axios = require('axios');
const app = express();
app.use(express.json());

const MED_API_URL = "http://13.212.175.6:8005/api/v1/external/ai/generate";
const MED_API_KEY = "mce_flashapikey962560"; // Stored safely in your backend .env

app.post('/api/generate-content', async (req, res) => {
    try {
        const { topic, audience, tone, keyPoints } = req.body;

        const instruction = `Write an article on ${topic} for ${audience}. Tone: ${tone}. Key Points: ${keyPoints}.`;

        const apiResponse = await axios.post(MED_API_URL, {
            instruction: instruction,
            provider: "local",
            temperature: 0.7,
            max_tokens: 2000
        }, {
            headers: {
                "Content-Type": "application/json",
                "X-API-Key": MED_API_KEY
            },
            timeout: 90000 // 90 seconds timeout
        });

        res.json({ success: true, content: apiResponse.data.response });
    } catch (error) {
        console.error("API error:", error.response?.data || error.message);
        res.status(500).json({ success: false, error: "Failed to generate content" });
    }
});

app.listen(3000, () => console.log('Server running on port 3000'));
```

---

### Example 4: Python Backend / Script
```python
import requests

API_URL = "http://13.212.175.6:8005/api/v1/external/ai/generate"
API_KEY = "mce_flashapikey962560"

def generate_article(topic, audience="General Public", tone="Professional"):
    prompt = f"Write a structured medical article about {topic} for {audience}. Tone: {tone}."
    
    headers = {
        "Content-Type": "application/json",
        "X-API-Key": API_KEY
    }
    
    payload = {
        "instruction": prompt,
        "provider": "local",
        "temperature": 0.7,
        "max_tokens": 2000
    }
    
    response = requests.post(API_URL, json=payload, headers=headers, timeout=90)
    
    if response.status_code == 200:
        return response.json().get("response")
    else:
        raise Exception(f"API Error {response.status_code}: {response.text}")

# Example Run:
if __name__ == "__main__":
    article = generate_article("Migraine Causes & Prevention")
    print(article)
```

---

## 🛠️ 5. Supported Use-Cases & Prompt Blueprints

You can build multiple tools in your application using this single API endpoint:

| Use Case | Suggested Prompt Blueprint |
| :--- | :--- |
| **Medical Blog Article** | `"Write a 800-word comprehensive blog post about: [Topic]. Include symptoms, triggers, prevention, and treatment."` |
| **Medical Report Simplifier** | `"Simplify and translate the following clinical note into plain language that a patient without medical training can easily understand: [User Text]"` |
| **Social Media Health Tip** | `"Create an engaging Instagram/LinkedIn health post about [Topic] with 3 practical tips and 5 relevant hashtags."` |
| **Patient Care & FAQ Sheet** | `"Create a patient FAQ care guide for [Condition] with 5 frequently asked questions and a Do's and Don'ts checklist."` |

---

## ⚠️ 6. Developer Best Practices & Troubleshooting

1. **Generation Timeout**: Local AI inference can take between **15 to 45 seconds** depending on request length. Ensure your HTTP client (Fetch/Axios/Requests) sets a timeout of at least **90 seconds**.
2. **API Key Security**:
   - For internal prototypes: Direct browser calls are acceptable.
   - For public websites/apps: Call the API via your backend server (Example 3 above) so normal website visitors cannot extract your `X-API-Key` from browser DevTools.
3. **HTTP Status Codes**:
   - `200 OK`: Request succeeded. Content is inside `data.response`.
   - `400 Bad Request`: Missing `instruction` or invalid JSON syntax.
   - `401 / 403 Unauthorized`: Invalid or missing `X-API-Key` header.
   - `500 / 504 Server Error / Timeout`: AI server busy or processing exceeded timeout.
