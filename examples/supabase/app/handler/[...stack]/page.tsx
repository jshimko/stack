import { StackHandler } from "@jshimko/stack";
import { stackServerApp } from "../../../stack";

export default function Handler(props: any) {
  return <StackHandler fullPage app={stackServerApp} {...props} />;
}
