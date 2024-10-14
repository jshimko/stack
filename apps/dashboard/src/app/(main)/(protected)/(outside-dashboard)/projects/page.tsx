import { redirect } from "next/navigation";
import { env } from "next-runtime-env";
import { stackServerApp } from "@/stack";
import Footer from "./footer";
import PageClient from "./page-client";

export const metadata = {
  title: "Projects",
};

export default async function Page() {
  const user = await stackServerApp.getUser();
  if (user) {
    const projects = await user.listOwnedProjects();
    if (projects.length === 0) {
      redirect("/new-project");
    }
  }

  return (
    <>
      <PageClient />
      {env("NEXT_PUBLIC_WHITE_LABEL_ENABLED") !== "true" && <Footer />}
    </>
  );
}
