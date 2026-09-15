# Keep the Render test API awake

A small Cloudflare Worker sends an HTTPS GET to the existing public `/api/v1/health` endpoint every five minutes. This is independent of whether anyone has the storefront open. It needs no API credentials, database access, R2 access, external packages or backend changes.

The health endpoint checks that the API process is running without querying Neon. Do not change it to `/health/ready` or `/products` for keep-alive: continuously waking the database would also consume its compute allowance. Neon may still have its own wake-up latency on a real product request.

## Why this helps, and its limits

[Render Free](https://render.com/docs/free) sleeps after 15 minutes without inbound traffic. A five-minute external request should prevent ordinary idle sleep. This is a best-effort testing measure, not an uptime guarantee: Render may restart free services, scheduled probes may fail, and quota limits still apply. Render recommends paid compute for production. A timer inside the Render app cannot wake a sleeping app; a storefront-only timer stops when visitors leave.

Render grants **750 free instance hours per workspace per month**, shared by its free web services. Keeping one service up for a 31-day month uses **744 hours**, leaving little allowance for another free service. Monitor the actual workspace usage; exhausting it suspends free services for the rest of the month. Bandwidth/build limits also remain applicable.

At one scheduled check per five minutes this Worker runs **288 times per day**. That fits well within the [Workers Free request allowance](https://developers.cloudflare.com/workers/platform/pricing/) assuming other account usage stays within limits. Stay on the Workers Free plan; no paid Worker plan, KV, database, custom domain or R2 binding is needed.

## Activate after the owner merges this PR

This repository change alone does **not** activate a Cloudflare schedule. Use one deployment method; if using Wrangler, maintain the cron in its configuration rather than separately editing it in the dashboard.

### Cloudflare dashboard (no local tooling required)

1. In your Cloudflare account, open Workers & Pages and create a Worker named `afritek-render-keepalive` on the Free plan.
2. Open its code editor, replace the starter code with the contents of `worker.mjs`, and deploy. It is standard module JavaScript with a default exported `scheduled` handler.
3. Add a Cron Trigger with expression **`*/5 * * * *`** under the Worker's settings/triggers. This runs every five minutes in UTC (the interval is the same in Kenya).
4. Enable Worker observability/logging. Disable the public `workers.dev` route and preview URLs if enabled; no inbound public route is needed. The included HTTP handler returns 404 even if a route is temporarily enabled.
5. Wait for the schedule to propagate. Cloudflare documents that [Cron Trigger changes can take up to 15 minutes](https://developers.cloudflare.com/workers/configuration/cron-triggers/).

### Wrangler alternative

From this directory, with a current authenticated Wrangler installation for your Cloudflare account:

```sh
wrangler deploy
```

`wrangler.json` sets the schedule, worker name, logging and disabled public routes. There are no secret bindings to create. This repository does not contain Cloudflare account credentials and does not auto-deploy the Worker from GitHub.

## Verify operation

- Confirm repeated successful scheduled invocations in Cloudflare, approximately five minutes apart. The log event is `render_health_ok`, with HTTP status and elapsed milliseconds.
- A non-2xx response, HTML/loading page, unexpected JSON, network error or 90-second timeout is a failed invocation. No response bodies are logged and no immediate retry loop runs; the next scheduled check will try again.
- After leaving admin and storefront closed for over 15 minutes, open the storefront and check product-loading time. Cloudflare scheduling must remain active during that wait. A successful health check alone does not prove database readiness.
- If the check fails repeatedly, inspect Render's service status and usage. This Worker does not send alerts; review its invocation history/logs.

## Pause or remove

Delete/disable the Cron Trigger in Cloudflare. With Wrangler, set `triggers.crons` to an empty array and redeploy (simply omitting the property may preserve an existing schedule). Propagation can take up to 15 minutes. Once the API moves to paid always-on compute, remove this keep-alive job.

## Local verification

```sh
node --test ops/render-keepalive/worker.test.mjs
```

Run from the repository root. Tests mock network responses and never create remote traffic. They cover the fixed destination, credential-free request, cache bypass, failed/invalid responses, timeout, network failure and disabled public handler.
