"use client";

import { useEffect, useMemo, useRef, useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import LayoutWrapper from '../../components/LayoutWrapper';
import QuestionCard from '../../components/QuestionCard';
import Timer from '../../components/Timer';
import ResultScreen from '../../components/ResultScreen';
import Button from '../../components/Button';
import { fetchQuestions } from '../../lib/fetchQuestions';

function QuizContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const categoryId = searchParams.get('category') || '';
  const amountParam = searchParams.get('amount') || '5';
  const amount = useMemo(() => {
    const parsed = Number(amountParam);
    return Number.isFinite(parsed) && parsed > 0 ? parsed : 5;
  }, [amountParam]);

  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState('');
  const [score, setScore] = useState(0);
  const [wrongAnswers, setWrongAnswers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [showResult, setShowResult] = useState(false);
  const [timerResetKey, setTimerResetKey] = useState(0);
  const lastTransitionIndexRef = useRef(-1);

  useEffect(() => {
    async function loadQuestions() {
      if (!categoryId) {
        router.push('/');
        return;
      }

      console.log('[QuizPage] loadQuestions effect fired', {
        categoryId,
        amount
      });

      setIsLoading(true);
      setError('');

      try {
        const result = await fetchQuestions({
          amount,
          categoryId
        });
        setQuestions(result);
        setCurrentIndex(0);
        setSelectedOption('');
        setScore(0);
        setWrongAnswers([]);
        setShowResult(false);
        setTimerResetKey((key) => key + 1);
      } catch (err) {
        console.error('[QuizPage] Error loading questions', err);
        setError(err.message || 'Failed to load questions.');
      } finally {
        setIsLoading(false);
      }
    }

    loadQuestions();
  }, [amount, categoryId, router]);

  useEffect(() => {
    console.log('[QuizPage] State snapshot', {
      questionsLength: questions.length,
      currentIndex,
      isLoading,
      error,
      showResult
    });
  }, [questions, currentIndex, isLoading, error, showResult]);

  const hasQuestions = questions.length > 0;
  const currentQuestion = hasQuestions ? questions[currentIndex] : null;

  const handleOptionSelect = (option) => {
    if (!currentQuestion) {
      return;
    }

    setSelectedOption(option);
  };

  const goToNextQuestion = () => {
    if (!hasQuestions) {
      return;
    }

    // Prevent double transitions for the same question (e.g. timer + button)
    if (lastTransitionIndexRef.current === currentIndex) {
      return;
    }
    lastTransitionIndexRef.current = currentIndex;

    // Finalize answer and update score before moving to next question
    if (currentQuestion) {
      if (selectedOption === currentQuestion.correctAnswer) {
        setScore((prev) => prev + 1);
      } else if (selectedOption) {
        // Track the wrong answer
        setWrongAnswers((prev) => [
          ...prev,
          {
            question: currentQuestion.question,
            correctAnswer: currentQuestion.correctAnswer,
            userAnswer: selectedOption
          }
        ]);
      }
    }

    const isLastQuestion = currentIndex >= questions.length - 1;

    if (isLastQuestion) {
      setShowResult(true);
      return;
    }

    setCurrentIndex((index) => index + 1);
    setSelectedOption('');
    setTimerResetKey((key) => key + 1);
  };

  const handleTimerComplete = () => {
    if (showResult || isLoading || !hasQuestions) {
      return;
    }
    // When time runs out, finalize answer and move to next question
    goToNextQuestion();
  };

  const handleRestart = () => {
    router.push('/');
  };

  if (!categoryId) {
    return null;
  }

  return (
    <LayoutWrapper>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        <header style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
          <button
            type="button"
            onClick={() => router.push('/')}
            style={{
              alignSelf: 'flex-start',
              marginBottom: '0.35rem',
              fontSize: '0.8rem',
              color: '#9ca3af',
              background: 'transparent',
              border: 'none',
              cursor: 'pointer'
            }}
          >
            ← Back to setup
          </button>
          {/* <p
            style={{
              fontSize: '0.75rem',
              textTransform: 'uppercase',
              letterSpacing: '0.15em',
              color: '#9ca3af',
              fontWeight: 600
            }}
          >
            Timed Quiz
          </p>
          <h1 style={{ fontSize: '1.5rem', fontWeight: 700, color: '#f9fafb' }}>
            Challenge yourself
          </h1> */}
        </header>

        {isLoading && (
          <p style={{ fontSize: '0.95rem', color: '#e5e7eb' }}>
            Loading questions…
          </p>
        )}

        {error && !isLoading && !hasQuestions && (
          <p style={{ fontSize: '0.9rem', color: '#fecaca' }}>
            {error}
          </p>
        )}

        {!isLoading && showResult && (
          <ResultScreen
            score={score}
            totalQuestions={questions.length}
            wrongAnswers={wrongAnswers}
            onRestart={handleRestart}
          />
        )}

        {!isLoading && !showResult && currentQuestion && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <Timer
              duration={20}
              onComplete={handleTimerComplete}
              resetKey={timerResetKey}
            />

            <QuestionCard
              question={currentQuestion.question}
              options={currentQuestion.options}
              selectedOption={selectedOption}
              onSelectOption={handleOptionSelect}
              questionNumber={currentIndex + 1}
              totalQuestions={questions.length}
            />

            <div
              style={{
                display: 'flex',
                justifyContent: 'flex-end',
                alignItems: 'center',
                marginTop: '24px'
              }}
            >
              <Button onClick={goToNextQuestion}>
                {currentIndex >= questions.length - 1 ? 'Finish Quiz' : 'Next Question'}
              </Button>
            </div>
          </div>
        )}
      </div>
    </LayoutWrapper>
  );
}

export default function QuizPage() {
  return (
    <Suspense fallback={<div>Loading quiz...</div>}>
      <QuizContent />
    </Suspense>
  );
}

