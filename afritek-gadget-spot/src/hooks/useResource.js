import { useEffect, useState } from 'react';
import { api } from '../lib/api';
const pending = new Map();
function get(path) {
  if (!pending.has(path)) pending.set(path, api(path).finally(() => pending.delete(path)));
  return pending.get(path);
}
export default function useResource(path) {
  const [state, setState] = useState({ data: null, error: '', loading: true });
  const [revision, setRevision] = useState(0);
  useEffect(() => {
    let active = true;
    setState({ data: null, error: '', loading: true });
    const timer = setTimeout(() => get(path).then(data => { if (active) setState({ data, error: '', loading: false }); }, error => { if (active) setState({ data: null, error: error.message, loading: false }); }), 150);
    return () => { active = false; clearTimeout(timer); };
  }, [path, revision]);
  return { ...state, reload: () => setRevision(value => value + 1) };
}
