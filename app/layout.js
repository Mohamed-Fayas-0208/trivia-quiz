import './globals.css';

export const metadata = {
  title: 'Trivia Quiz',
  description: 'Trivia quiz built with Next.js 14 App Router'
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

