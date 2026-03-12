export default function CategorySelector({
  categories,
  selectedCategory,
  onCategoryChange,
  amount,
  onAmountChange,
  isLoading
}) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
        <label
          htmlFor="category"
          style={{ fontSize: '0.9rem', fontWeight: 600, color: '#e5e7eb' }}
        >
          Category
        </label>
        <select
          id="category"
          value={selectedCategory}
          onChange={(e) => onCategoryChange(e.target.value)}
          disabled={isLoading}
          style={{
            padding: '0.75rem 0.9rem',
            borderRadius: '0.75rem',
            border: '1px solid rgba(148, 163, 184, 0.4)',
            backgroundColor: '#020617',
            color: '#f9fafb',
            fontSize: '0.95rem',
            outline: 'none'
          }}
        >
          <option value="">Select a category</option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
        <label
          htmlFor="amount"
          style={{ fontSize: '0.9rem', fontWeight: 600, color: '#e5e7eb' }}
        >
          Number of Questions
        </label>
        <input
          id="amount"
          type="number"
          min="1"
          max="20"
          value={amount}
          onChange={(e) => onAmountChange(e.target.value)}
          style={{
            padding: '0.75rem 0.9rem',
            borderRadius: '0.75rem',
            border: '1px solid rgba(148, 163, 184, 0.4)',
            backgroundColor: '#020617',
            color: '#f9fafb',
            fontSize: '0.95rem',
            outline: 'none'
          }}
        />
      </div>
    </div>
  );
}

