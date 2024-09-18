import * as util from "util";
import { captureError, registerErrorSink } from "@stackframe/stack-shared/dist/utils/errors";
import * as Sentry from "@sentry/nextjs";
import { getNodeEnvironment } from "@stackframe/stack-shared/dist/utils/env";
import { env } from "next-runtime-env";

const sentryErrorSink = (location: string, error: unknown) => {
  Sentry.captureException(error, { extra: { location } });
};

export function ensurePolyfilled() {
  if (env("NEXT_PUBLIC_DISABLE_TELEMETRY") === "true") return;
  registerErrorSink(sentryErrorSink);
  // not all environments have default options for util.inspect
  if ("inspect" in util && "defaultOptions" in util.inspect) {
    util.inspect.defaultOptions.depth = 8;
  }

  if (typeof process !== "undefined" && typeof process.on === "function") {
    process.on("unhandledRejection", (reason, promise) => {
      captureError("unhandled-promise-rejection", reason);
      if (getNodeEnvironment() === "development") {
        console.error("\x1b[41mUnhandled promise rejection. Some production environments will kill the server in this case, so the server will now exit. Please use the `ignoreUnhandledRejection` function to signal that you've handled the error.\x1b[0m", reason);
      }
      process.exit(1);
    });
  }
}

ensurePolyfilled();
