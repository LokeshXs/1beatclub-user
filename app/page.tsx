import NavBar from "@/components/common/NavBar";
import UseCasesBentoGrid from "@/components/landingPage/UseCasesSection";
import HeroSection from "@/components/landingPage/HeroSection";
import { Metadata } from "next";
import ContactUsSection from "@/components/landingPage/ContactusSection";
import HowItWorksSection from "@/components/landingPage/HowItWorks";
import ActionSection from "@/components/landingPage/ActionSection";
import Footer from "@/components/landingPage/Footer";

export const metadata:Metadata = {
  title:"1BeatClub: Your Music, Voted by the Crowd",
  description:"Create and vote on playlists with 1BeatClub! Let the most-loved songs play in order, perfect for gatherings, study groups, or any moment that calls for great music."
}


export default function Home() {
  return (
    <main className=" bg-primary min-h-screen ">
    <NavBar />
    <HeroSection />
    {/* <DashboardSection /> */}
    <UseCasesBentoGrid />
    <HowItWorksSection />
    <ContactUsSection/>
    <ActionSection />
    <Footer/>
  </main>
  );
}
