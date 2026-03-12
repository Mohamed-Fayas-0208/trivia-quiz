export default function QuestionCard({
  question,
  options,
  selectedOption,
  onSelectOption,
  questionNumber,
  totalQuestions
}) {
  return (
    <section style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
      <header style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
        <span
          style={{
            fontSize: '0.85rem',
            fontWeight: 600,
            textTransform: 'uppercase',
            letterSpacing: '0.1em',
            color: '#9ca3af'
          }}
        >
          Question {questionNumber} of {totalQuestions}
        </span>
        <h2 style={{ fontSize: '1.25rem', fontWeight: 600, color: '#f9fafb' }}>
          {question}
        </h2>
      </header>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(1, minmax(0, 1fr))',
          gap: '0.75rem'
        }}
      >
        {options.map((option) => {
          const isSelected = selectedOption === option;
          return (
            <button
              key={option}
              type="button"
              onClick={() => onSelectOption(option)}
              style={{
                width: '100%',
                textAlign: 'left',
                borderRadius: '10px',
                padding: '0.9rem 1rem',
                fontSize: '0.95rem',
                backgroundColor: isSelected
                  ? 'rgba(37,99,235,0.08)'
                  : '#020617',
                color: '#f9fafb',
                border: isSelected
                  ? '2px solid #2563EB'
                  : '1px solid rgba(148, 163, 184, 0.45)',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                transform: 'scale(1)',
                boxShadow: 'none'
              }}
              onMouseEnter={(e) => {
                if (!isSelected) {
                  e.currentTarget.style.backgroundColor = 'rgba(15, 23, 42, 0.8)';
                  e.currentTarget.style.transform = 'scale(1.01)';
                }
              }}
              onMouseLeave={(e) => {
                if (!isSelected) {
                  e.currentTarget.style.backgroundColor = '#020617';
                  e.currentTarget.style.transform = 'scale(1)';
                }
              }}
            >
              {option}
            </button>
          );
        })}
      </div>
    </section>
  );
}

