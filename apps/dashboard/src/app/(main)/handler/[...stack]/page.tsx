import { env } from "next-runtime-env";
import { StackHandler } from "@jshimko/stack";
import { stackServerApp } from "@/stack";
import { StyledLink } from "@/components/link";

export default function Handler(props: any) {
  const extraInfo = env("NEXT_PUBLIC_WHITE_LABEL_ENABLED") !== "true" ? <>
    <p className="text-xs">By signing in, you agree to the</p>
    <p className="text-xs">
      <StyledLink href="https://www.iubenda.com/privacy-policy/19290387/cookie-policy">Terms of Service</StyledLink> and
      <StyledLink href="https://www.iubenda.com/privacy-policy/19290387">Privacy Policy</StyledLink>
    </p>
  </> : null;

  return <StackHandler
    fullPage {...props}
    app={stackServerApp}
    componentProps={{ SignIn: { extraInfo }, SignUp: { extraInfo } }}
  />;
}
