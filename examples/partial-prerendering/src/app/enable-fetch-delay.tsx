"use client";

import { useStackApp } from "@jshimko/stack";

export default function EnableFetchDelay() {
  const app = useStackApp();
  (app as any).__DEMO_ENABLE_SLIGHT_FETCH_DELAY = true;

  return <></>;
}
