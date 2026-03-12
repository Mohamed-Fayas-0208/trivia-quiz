import Button from './Button';

export default function ResultScreen({ score, totalQuestions, onRestart }) {
  const percentage = totalQuestions > 0 ? Math.round((score / totalQuestions) * 100) : 0;

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
    </section>
  );
}

