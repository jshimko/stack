import "server-only";

import { StackServerApp } from "@jshimko/stack";

export const stackServerApp = new StackServerApp({
  tokenStore: "nextjs-cookie",
  urls: {
    accountSettings: '/settings',
  }
});
