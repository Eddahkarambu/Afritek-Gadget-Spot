import React, { useState } from 'react';
export default function ProductImage({ src, alt, className = '', loading = 'lazy' }) {
  const [failed, setFailed] = useState('');
  if (!src || failed === src) return <div className={`${className} flex items-center justify-center text-gray-500 bg-gray-100`} role="img" aria-label={alt}>Photo unavailable</div>;
  return <img src={src} alt={alt} className={className} loading={loading} decoding="async" onError={() => setFailed(src)} />;
}
