'use client';

// import { fetchRevenue } from '@/app/lib/data';
import { useState } from 'react';

export default function Page() {
  // const revenue = await fetchRevenue();
  const [status, setStatus] = useState('123');
  return (
    <div>
      <div onClick={() => setStatus('456')}>Example page</div>
      <div>{status}</div>
    </div>
  );
}
