import { NextResponse } from 'next/server';
import { GoogleGenAI } from '@google/genai';

export const dynamic = 'force-dynamic';

export async function POST(request) {
  try {
    const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
    
    const { question, userAnswer, correctAnswer } = await request.json();

    if (!question || !userAnswer || !correctAnswer) {
      return NextResponse.json({ error: 'Missing required parameters' }, { status: 400 });
    }

    const prompt = `
    Context: A trivia quiz application.
    Question: ${question}
    Correct Answer: ${correctAnswer}
    User's Incorrect Answer: ${userAnswer}

    Please provide a brief, friendly, and informative explanation (2-3 sentences max) of why the Correct Answer is right, and optionally why the User's Incorrect Answer is wrong.
    `;

    const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
    });

    return NextResponse.json({ explanation: response.text });
  } catch (error) {
    console.error('[Gemini API Error]:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to generate explanation. Please try again.' }, 
      { status: 500 }
    );
  }
}
