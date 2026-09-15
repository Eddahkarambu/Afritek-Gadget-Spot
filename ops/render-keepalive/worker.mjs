const HEALTH_URL = 'https://afritek-admin-testing.onrender.com/api/v1/health';

// The liveness endpoint does not query Neon or read catalogue/image storage.
// Keep the destination fixed: this Worker is not a public URL-fetching proxy.
export async function checkRender(fetcher = fetch, timeoutMs = 90_000) {
  const controller = new AbortController();
  const started = Date.now();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  const url = new URL(HEALTH_URL);
  url.searchParams.set('uptime', String(started));

  try {
    const response = await fetcher(url.toString(), {
      method: 'GET',
      redirect: 'error',
      cache: 'no-store',
      headers: { Accept: 'application/json' },
      signal: controller.signal,
    });
    if (!response.ok) {
      await response.body?.cancel();
      throw new Error(`Render health returned HTTP ${response.status}.`);
    }
    const body = await response.json();
    if (body?.status !== 'ok') throw new Error('Render did not return its expected health response.');
    return { status: response.status, durationMs: Date.now() - started };
  } finally {
    clearTimeout(timer);
  }
}

export default {
  async scheduled() {
    try {
      const result = await checkRender();
      console.log(JSON.stringify({ event: 'render_health_ok', ...result }));
    } catch {
      // Report failure to Cloudflare without logging response bodies or secrets.
      console.error('Render health check failed or timed out. Inspect the Render service.');
      throw new Error('Render health check failed.');
    }
  },
  fetch() {
    // Visiting a Worker URL must not generate extra probes.
    return new Response('Not found', { status: 404 });
  },
};
