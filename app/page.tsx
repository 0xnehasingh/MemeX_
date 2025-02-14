"use client";

import Landing from "@/components/ui/landingpage";
import { Navbar } from "@/components/ui/Navbar";
import { useRef } from "react";
import Footer from "@/components/ui/footer";
// import MechChat from "@/components/MechChat";
export default function Home() {
  const homeSectionRef = useRef<HTMLDivElement>(null);

  return (
    <div>
      <Navbar homeSectionRef={homeSectionRef} />
      <Landing />
      <Footer />
      {/* <MechChat /> */}
    </div>
  );
}
