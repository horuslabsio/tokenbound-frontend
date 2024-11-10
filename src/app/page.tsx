import dynamic from "next/dynamic";
import Hero from "@components/Landing/Hero";
import Community from "@components/Landing/Community";
import Features from "@components/Landing/Features";
import Projects from "@components/Landing/Projects";
import FAQs from "@components/Landing/FQAs";

const ShowCase = dynamic(() => import("../components/Landing/ShowCase"));

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col gap-8 pb-16 pt-32">
      <Hero />
      <Features />
      <ShowCase />
      <Projects />
      <FAQs />
      <Community />
    </main>
  );
}
