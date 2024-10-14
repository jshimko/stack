require("server-only");

const { StackServerApp } = require("@jshimko/stack");

export const stackServerApp = new StackServerApp({
  tokenStore: "nextjs-cookie",
});
