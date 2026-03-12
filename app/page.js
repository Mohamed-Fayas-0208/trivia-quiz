"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import LayoutWrapper from '../components/LayoutWrapper';
import CategorySelector from '../components/CategorySelector';
import Button from '../components/Button';
import { fetchCategories } from '../lib/fetchCategories';

export default function HomePage() {
  const router = useRouter();
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [amount, setAmount] = useState('5');
  const [isLoadingCategories, setIsLoadingCategories] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    async function loadCategories() {
      setIsLoadingCategories(true);
      setError('');
      try {
        const result = await fetchCategories();
        setCategories(result);
      } catch (err) {
        setError(err.message || 'Failed to load categories.');
      } finally {
        setIsLoadingCategories(false);
      }
    }

    loadCategories();
  }, []);

  const handleStartQuiz = (event) => {
    event.preventDefault();

    const amountNumber = Number(amount);
    if (!selectedCategory) {
      setError('Please select a category.');
      return;
    }
    if (!Number.isFinite(amountNumber) || amountNumber <= 0) {
      setError('Please enter a valid number of questions.');
      return;
    }

    setError('');
    router.push(`/quiz?category=${selectedCategory}&amount=${amountNumber}`);
  };

  return (
    <LayoutWrapper>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
        <header style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          <p
            style={{
              fontSize: '0.75rem',
              textTransform: 'uppercase',
              letterSpacing: '0.15em',
              color: '#9ca3af',
              fontWeight: 600
            }}
          >
            Trivia Playground
          </p>
         
          <p style={{ fontSize: '0.95rem', color: '#9ca3af' }}>
            Choose a category, set how many questions you want, and test your knowledge with a
            timed quiz.
          </p>
        </header>

        <form
          onSubmit={handleStartQuiz}
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '1.5rem',
            marginTop: '0.5rem'
          }}
        >
          <CategorySelector
            categories={categories}
            selectedCategory={selectedCategory}
            onCategoryChange={setSelectedCategory}
            amount={amount}
            onAmountChange={setAmount}
            isLoading={isLoadingCategories}
          />

          {error && (
            <p style={{ fontSize: '0.9rem', color: '#fecaca' }}>
              {error}
            </p>
          )}

          <div style={{ marginTop: '24px', alignSelf: 'flex-start' }}>
            <Button
              type="submit"
              disabled={isLoadingCategories}
            >
              {isLoadingCategories ? 'Loading categories…' : 'Start Quiz'}
            </Button>
          </div>
        </form>
      </div>
    </LayoutWrapper>
  );
}

