export default function LayoutWrapper({ children }) {
  return (
    <main
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '2rem'
      }}
    >
      <div
        style={{
          width: '100%',
          maxWidth: '720px',
          backgroundColor: 'rgba(15, 23, 42, 0.92)',
          borderRadius: '1rem',
          border: '1px solid rgba(148, 163, 184, 0.35)',
          boxShadow: '0 24px 80px rgba(15, 23, 42, 0.9)',
          padding: '2rem'
        }}
      >
        {children}
      </div>
    </main>
  );
}

