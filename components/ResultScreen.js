import { useState } from 'react';
import Button from './Button';

export default function ResultScreen({ score, totalQuestions, wrongAnswers = [], onRestart }) {
  const [explanations, setExplanations] = useState({});
  const [loadingExplanation, setLoadingExplanation] = useState(null);

  const percentage = totalQuestions > 0 ? Math.round((score / totalQuestions) * 100) : 0;

  const handleExplain = async (index, question, userAnswer, correctAnswer) => {
    if (explanations[index]) return; // Already explained
    
    setLoadingExplanation(index);
    try {
      const resp = await fetch('/api/explain', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question, userAnswer, correctAnswer })
      });
      const data = await resp.json();
      
      if (data.error) {
        setExplanations(prev => ({ ...prev, [index]: 'Error: ' + data.error }));
      } else {
        setExplanations(prev => ({ ...prev, [index]: data.explanation }));
      }
    } catch (err) {
      setExplanations(prev => ({ ...prev, [index]: 'Failed to load explanation.' }));
    } finally {
      setLoadingExplanation(null);
    }
  };

  let performanceLabel = 'Nice effort!';
  if (percentage === 100) {
    performanceLabel = 'Perfect score!';
  } else if (percentage >= 80) {
    performanceLabel = 'Great job!';
  } else if (percentage >= 50) {
    performanceLabel = 'Good start!';
  }

  return (
    <section
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '1.5rem',
        alignItems: 'center',
        textAlign: 'center'
      }}
    >
      <header style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
        <h1 style={{ fontSize: '1.5rem', fontWeight: 700, color: '#f9fafb' }}>Your Results</h1>
        <p style={{ fontSize: '0.95rem', color: '#9ca3af' }}>{performanceLabel}</p>
      </header>

      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '0.5rem'
        }}
      >
        <div
          style={{
            width: '120px',
            height: '120px',
            borderRadius: '999px',
            border: '6px solid rgba(96, 165, 250, 0.3)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background:
              'radial-gradient(circle at top, rgba(59, 130, 246, 0.18), transparent 60%)'
          }}
        >
          <span
            style={{
              fontSize: '2.25rem',
              fontWeight: 700,
              color: '#f9fafb',
              fontVariantNumeric: 'tabular-nums'
            }}
          >
            {percentage}%
          </span>
        </div>
        <p style={{ fontSize: '0.95rem', color: '#e5e7eb' }}>
          You scored <strong>{score}</strong> out of <strong>{totalQuestions}</strong>.
        </p>
      </div>

      <div style={{ marginTop: '24px' }}>
        <Button onClick={onRestart}>
          Play Again
        </Button>
      </div>

      {wrongAnswers.length > 0 && (
        <div style={{ marginTop: '2rem', width: '100%', textAlign: 'left' }}>
          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, color: '#f9fafb', marginBottom: '1rem' }}>
            Review Incorrect Answers
          </h2>
          <div style={{ 
            display: 'flex', 
            flexDirection: 'column', 
            gap: '1rem',
            maxHeight: '400px',
            overflowY: 'auto',
            paddingRight: '0.5rem'
          }}>
            {wrongAnswers.map((item, idx) => (
              <div
                key={idx}
                style={{
                  padding: '1rem',
                  borderRadius: '8px',
                  backgroundColor: '#020617',
                  border: '1px solid rgba(148, 163, 184, 0.45)'
                }}
              >
                <p style={{ fontWeight: 600, color: '#f9fafb', marginBottom: '0.5rem' }}>
                  {item.question}
                </p>
                <p style={{ fontSize: '0.9rem', color: '#fca5a5', marginBottom: '0.25rem' }}>
                  Your answer: {item.userAnswer}
                </p>
                <p style={{ fontSize: '0.9rem', color: '#86efac', marginBottom: '0.75rem' }}>
                  Correct answer: {item.correctAnswer}
                </p>
                
                {explanations[idx] ? (
                  <div style={{
                    marginTop: '0.75rem',
                    padding: '0.75rem',
                    backgroundColor: 'rgba(37,99,235,0.08)',
                    borderRadius: '6px',
                    border: '1px solid rgba(37,99,235,0.3)'
                  }}>
                    <strong style={{ color: '#60a5fa', fontSize: '0.85rem', display: 'block', marginBottom: '0.25rem' }}>
                      AI Explanation:
                    </strong>
                    <p style={{ 
                      fontSize: '0.9rem', 
                      color: '#e5e7eb', 
                      lineHeight: '1.4',
                      wordBreak: 'break-word',
                      whiteSpace: 'pre-wrap'
                    }}>
                      {explanations[idx]}
                    </p>
                  </div>
                ) : (
                  <button
                    onClick={() => handleExplain(idx, item.question, item.userAnswer, item.correctAnswer)}
                    disabled={loadingExplanation === idx}
                    style={{
                      marginTop: '0.5rem',
                      padding: '0.5rem 0.75rem',
                      fontSize: '0.85rem',
                      borderRadius: '6px',
                      backgroundColor: 'transparent',
                      color: '#60a5fa',
                      border: '1px solid #60a5fa',
                      cursor: loadingExplanation === idx ? 'not-allowed' : 'pointer',
                      opacity: loadingExplanation === idx ? 0.7 : 1,
                      transition: 'all 0.2s',
                    }}
                    onMouseEnter={(e) => {
                      if (loadingExplanation !== idx) {
                        e.currentTarget.style.backgroundColor = 'rgba(96, 165, 250, 0.1)';
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (loadingExplanation !== idx) {
                        e.currentTarget.style.backgroundColor = 'transparent';
                      }
                    }}
                  >
                    {loadingExplanation === idx ? 'Loading...' : 'Show Explanation'}
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}

