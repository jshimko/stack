import { env } from "next-runtime-env";
import { PostHog } from 'posthog-node';

export default async function withPostHog<T>(callback: (posthog: PostHog) => Promise<T>) {
  const postHogKey = env("NEXT_PUBLIC_POSTHOG_KEY") || "phc_vIUFi0HzHo7oV26OsaZbUASqxvs8qOmap1UBYAutU4k";
  const posthogClient = new PostHog(env("NEXT_PUBLIC_DISABLE_TELEMETRY") === "true" ? "undefined" : postHogKey, {
    host: "https://eu.i.posthog.com",
    flushAt: 1,
    flushInterval: 0
  });
  try {
    await callback(posthogClient);
  } finally {
    await posthogClient.shutdown();
  }
}
