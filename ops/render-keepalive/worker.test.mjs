import { test } from 'node:test';
import assert from 'node:assert/strict';
import worker, { checkRender } from './worker.mjs';

test('probe calls only public liveness, bypasses caches, and sends no credentials', async () => {
  let calls = 0;
  const result = await checkRender(async (address, options) => {
    calls++;
    const url = new URL(address);
    assert.equal(url.origin, 'https://afritek-admin-testing.onrender.com');
    assert.equal(url.pathname, '/api/v1/health');
    assert.ok(url.searchParams.get('uptime'));
    assert.equal(options.method, 'GET');
    assert.equal(options.cache, 'no-store');
    assert.equal(options.redirect, 'error');
    assert.deepEqual(options.headers, { Accept: 'application/json' });
    assert.equal(options.body, undefined);
    assert.ok(options.signal instanceof AbortSignal);
    return Response.json({ status: 'ok' });
  });
  assert.equal(calls, 1);
  assert.equal(result.status, 200);
  assert.ok(result.durationMs >= 0);
});

test('non-success responses are failures, with no immediate retry storm', async () => {
  let calls = 0;
  await assert.rejects(checkRender(async () => {
    calls++;
    return new Response('upstream unavailable', { status: 503 });
  }), /HTTP 503/);
  assert.equal(calls, 1);
});

test('loading pages and unexpected JSON are not reported healthy', async () => {
  await assert.rejects(checkRender(async () => new Response('<html>Waking up</html>')));
  await assert.rejects(checkRender(async () => Response.json({ status: 'starting' })), /expected health/);
});

test('slow requests abort and network failures propagate', async () => {
  await assert.rejects(checkRender((_url, { signal }) => new Promise((resolve, reject) => {
    signal.addEventListener('abort', () => reject(new Error('aborted')), { once: true });
  }), 5), /aborted/);
  await assert.rejects(checkRender(async () => { throw new Error('offline'); }), /offline/);
});

test('the public HTTP handler is disabled and cannot trigger a probe', async () => {
  const response = await worker.fetch(new Request('https://example.test/?url=https://other.test'));
  assert.equal(response.status, 404);
});
