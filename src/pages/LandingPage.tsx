import CompleteParcelSection from '@/components/landing/CompleteParcelSection';
import DemoCTASection from '@/components/landing/DemoCTASection';
import FAQSection from '@/components/landing/FAQSection';
import FeatureGrid from '@/components/landing/FeatureGrid';
import HeroSection from '@/components/landing/HeroSection';
import HowItWorksSection from '@/components/landing/HowItWorksSection';
import LandingFooter from '@/components/landing/LandingFooter';
import LandingHeader from '@/components/landing/LandingHeader';
import MerchantValueSection from '@/components/landing/MerchantValueSection';
import PricingSection from '@/components/landing/PricingSection';
import ProblemSection from '@/components/landing/ProblemSection';
import SolutionSection from '@/components/landing/SolutionSection';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white text-slate-950">
      <LandingHeader />
      <main>
        <HeroSection />
        <ProblemSection />
        <SolutionSection />
        <FeatureGrid />
        <CompleteParcelSection />
        <HowItWorksSection />
        <MerchantValueSection />
        <DemoCTASection />
        <PricingSection />
        <FAQSection />
      </main>
      <LandingFooter />
    </div>
  );
}
