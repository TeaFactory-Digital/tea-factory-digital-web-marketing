import Link from 'next/link';

/** Root-level 404: the locale segment is unknown here, so it stays in English. */
export default function NotFound() {
  return (
    <html lang="en">
      <body
        style={{
          minHeight: '100dvh',
          display: 'grid',
          placeItems: 'center',
          backgroundColor: '#fcfaf5',
          color: '#1f231d',
          fontFamily: 'system-ui, sans-serif',
          margin: 0,
        }}
      >
        <div style={{ textAlign: 'center', padding: '2rem' }}>
          <p style={{ letterSpacing: '0.16em', fontSize: '0.75rem', color: '#5d6458' }}>404</p>
          <h1 style={{ fontSize: '2rem', margin: '0.5rem 0 1rem' }}>Page not found</h1>
          <Link href="/en" style={{ color: '#1d5339', fontWeight: 600 }}>
            Back to Tea Factory Digital
          </Link>
        </div>
      </body>
    </html>
  );
}
