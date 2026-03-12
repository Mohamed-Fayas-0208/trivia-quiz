import { NextResponse } from 'next/server';
import { fetchQuestions } from '../../../lib/fetchQuestions';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const amountParam = searchParams.get('amount') || '5';
  const categoryId = searchParams.get('category') || '';

  const amount = Number(amountParam);

  try {
    const questions = await fetchQuestions({
      amount: Number.isFinite(amount) && amount > 0 ? amount : 5,
      categoryId
    });

    return NextResponse.json({
      response_code: 0,
      results: questions
    });
  } catch (error) {
    return NextResponse.json(
      {
        response_code: 1,
        error: error.message || 'Failed to fetch questions.'
      },
      { status: 500 }
    );
  }
}

