import "server-only";

import { StackServerApp } from "@jshimko/stack";

export const stackServerApp = new StackServerApp({
  tokenStore: "nextjs-cookie",
  urls: {
    signIn: "/signin",
    signUp: "/signup",
  }
});
