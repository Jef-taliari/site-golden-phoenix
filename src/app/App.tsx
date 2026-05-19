import Navbar from '@/features/navbar/Navbar';
import HeroSection from '@/features/hero/HeroSection';
import NextGameSection from '@/features/next-game/NextGameSection';
import TimelineSection from '@/features/timeline/TimelineSection';
import RosterSection from '@/features/roster/RosterSection';
import FanZoneSection from '@/features/fan-zone/FanZoneSection';
import SponsorshipSection from '@/features/sponsorship/SponsorshipSection';
import Footer from '@/features/footer/Footer';
import ScrollToTop from '@/shared/ui/ScrollToTop';

export default function App() {
  return (
    <div className="min-h-screen bg-background text-foreground transition-colors duration-300 ">
      <Navbar />
      <HeroSection />
      <NextGameSection />
      <TimelineSection />
      <RosterSection />
      <FanZoneSection />
      <SponsorshipSection />
      <Footer />
      <ScrollToTop />
    </div>
  );
}
