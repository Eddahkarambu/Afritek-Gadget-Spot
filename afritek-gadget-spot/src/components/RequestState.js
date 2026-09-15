import React, { useEffect, useState } from 'react';
export default function RequestState({ loading, error, reload }) {
  const [slow, setSlow] = useState(false);
  useEffect(() => { setSlow(false); const timer = setTimeout(() => setSlow(true), 8000); return () => clearTimeout(timer); }, [loading]);
  if (loading) return <p role="status" className="py-8 text-center">{slow ? 'The shop is taking longer to respond. Please keep this page open; it may take a minute.' : 'Loading…'}</p>;
  if (error) return <div role="alert" className="p-6 border border-red-400 rounded-xl"><p>{error}</p><button onClick={reload} className="mt-4 rounded-lg bg-teal-700 text-white px-5 py-3">Try again</button></div>;
  return null;
}
