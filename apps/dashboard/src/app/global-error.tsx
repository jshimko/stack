"use client";

import * as Sentry from "@sentry/nextjs";
import { env } from "next-runtime-env";
import { Spinner } from "@stackframe/stack-ui";
import Error from "next/error";
import { useEffect } from "react";

export default function GlobalError({ error }: any) {
  const isProdLike = process.env.NODE_ENV.includes("production");

  useEffect(() => {
    if (env("NEXT_PUBLIC_DISABLE_TELEMETRY") === "true") return;
    Sentry.captureException(error);
  }, [error]);

  useEffect(() => {
    let cancelled = false;
    setTimeout(() => {
      if (isProdLike && !cancelled) {
        window.location.assign("/");
      }
    }, 20);
    return () => {
      cancelled = true;
    };
  }, [isProdLike]);

  return (
    <html>
      <body suppressHydrationWarning>
        {isProdLike ? (
          <Spinner />
        ) : (
          <Error
            statusCode={500}
          />
        )}
      </body>
    </html>
  );
}
