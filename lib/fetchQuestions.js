import shuffleArray from './shuffleArray';
import decodeHtml from './decodeHtml';

const BASE_URL = 'https://opentdb.com';

export async function fetchQuestions({ amount, categoryId }) {
  const searchParams = new URLSearchParams();
  searchParams.set('amount', String(amount || 10));
  if (categoryId) {
    searchParams.set('category', String(categoryId));
  }
  searchParams.set('type', 'multiple');

  const url = `${BASE_URL}/api.php?${searchParams.toString()}`;

  console.log('[fetchQuestions] Request URL:', url);

  const response = await fetch(url);

  console.log('[fetchQuestions] HTTP status:', response.status);

  if (!response.ok) {
    console.error('[fetchQuestions] Network error while fetching questions');
    throw new Error('Failed to fetch questions.');
  }

  const data = await response.json();

  console.log('[fetchQuestions] API response_code:', data.response_code);

  if (typeof data.response_code !== 'number' || data.response_code !== 0) {
    console.error(
      '[fetchQuestions] Non-zero response_code from API:',
      data.response_code
    );
    throw new Error('No questions available for the selected settings.');
  }

  if (!Array.isArray(data.results)) {
    console.error('[fetchQuestions] Invalid results array in API response');
    throw new Error('Invalid questions response from API.');
  }

  console.log('[fetchQuestions] Questions received:', data.results.length);

  return data.results.map((item, index) => {
    console.log('[fetchQuestions] Mapping question index:', index);
    const question = decodeHtml(item.question);
    const correctAnswer = decodeHtml(item.correct_answer);
    const incorrectAnswers = (item.incorrect_answers || []).map((answer) =>
      decodeHtml(answer)
    );

    const options = shuffleArray([correctAnswer, ...incorrectAnswers]);

    return {
      question,
      correctAnswer,
      options
    };
  });
}

