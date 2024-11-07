import NavBar from "@/components/common/NavBar";
import UseCasesBentoGrid from "@/components/landingPage/UseCasesSection";
import HeroSection from "@/components/landingPage/HeroSection";


export default function Home() {
  return (
    <main className=" bg-primary min-h-screen">
    <NavBar />
    <HeroSection />
    {/* <DashboardSection /> */}
    <UseCasesBentoGrid />
  </main>
  );
}
