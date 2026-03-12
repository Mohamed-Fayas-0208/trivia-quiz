export default function Button({
  children,
  onClick,
  disabled = false,
  type = 'button',
  style = {},
  ...props
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      style={{
        padding: '10px 18px',
        borderRadius: '10px',
        border: 'none',
        backgroundColor: disabled ? '#64748b' : '#2563EB',
        color: 'white',
        fontSize: '14px',
        fontWeight: 500,
        cursor: disabled ? 'not-allowed' : 'pointer',
        boxShadow: '0 2px 6px rgba(0,0,0,0.2)',
        transition: 'all 0.2s ease',
        transform: 'scale(1)',
        opacity: disabled ? 0.6 : 1,
        ...style
      }}
      onMouseEnter={(e) => {
        if (!disabled) {
          e.currentTarget.style.backgroundColor = '#1D4ED8';
          e.currentTarget.style.transform = 'scale(1.01)';
        }
      }}
      onMouseLeave={(e) => {
        if (!disabled) {
          e.currentTarget.style.backgroundColor = '#2563EB';
          e.currentTarget.style.transform = 'scale(1)';
        }
      }}
      {...props}
    >
      {children}
    </button>
  );
}
