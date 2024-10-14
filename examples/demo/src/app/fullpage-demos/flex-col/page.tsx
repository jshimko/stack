import { SignIn } from "@jshimko/stack";

export default function SimpleDivFullPageDemo() {
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
      <SignIn fullPage />
    </div>
  );
}
