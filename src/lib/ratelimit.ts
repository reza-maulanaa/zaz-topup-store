import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

const hasRedis =
  !!process.env.UPSTASH_REDIS_REST_URL && !!process.env.UPSTASH_REDIS_REST_TOKEN;

// ponytail: no Redis env (e.g. local dev) → skip limiting instead of crashing.
// Set UPSTASH_REDIS_REST_URL + UPSTASH_REDIS_REST_TOKEN in prod to enable.
const redis = hasRedis ? Redis.fromEnv() : null;

export const authLimiter = redis
  ? new Ratelimit({
      redis,
      limiter: Ratelimit.slidingWindow(5, "60 s"),
      prefix: "rl:auth",
      analytics: false,
    })
  : null;

export function getClientIp(req: Request): string {
  const xff = req.headers.get("x-forwarded-for");
  if (xff) return xff.split(",")[0].trim();
  return req.headers.get("x-real-ip") ?? "127.0.0.1";
}

/** Returns true if the request is allowed, false if rate-limited. */
export async function checkRateLimit(
  limiter: Ratelimit | null,
  identifier: string,
): Promise<boolean> {
  if (!limiter) return true;
  const { success } = await limiter.limit(identifier);
  return success;
}
