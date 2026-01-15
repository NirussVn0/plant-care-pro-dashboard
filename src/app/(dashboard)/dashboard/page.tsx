
import React from 'react';

export default function DashboardPage() {
  return (
    <div>
      <h1 style={{ fontSize: '2rem', fontWeight: 600, marginBottom: '1rem', color: 'var(--co-primary-dark)' }}>Greenhouse Overview</h1>
      <p style={{ color: 'var(--co-text-muted)' }}>Welcome back! You have 5 plants needing attention today.</p>
      
      {/* Placeholder content for grid verification */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
        gap: '1.5rem',
        marginTop: '2rem'
      }}>
        {/* We will build real cards later */}
        <div style={{ background: 'white', padding: '1.5rem', borderRadius: '1rem', boxShadow: 'var(--sh-sm)' }}>
          <h3>Daily Tasks</h3>
        </div>
        <div style={{ background: 'white', padding: '1.5rem', borderRadius: '1rem', boxShadow: 'var(--sh-sm)' }}>
          <h3>My Jungle</h3>
        </div>
        <div style={{ background: 'white', padding: '1.5rem', borderRadius: '1rem', boxShadow: 'var(--sh-sm)' }}>
          <h3>Growth Trends</h3>
        </div>
      </div>
    </div>
  );
}
