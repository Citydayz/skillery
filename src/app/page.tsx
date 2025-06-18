"use client";

import { motion, useScroll, useSpring } from "framer-motion";
import Hero from "@/components/homepage/Hero";
import ProblemSection from "@/components/homepage/ProblemSection";
import SolutionSection from "@/components/homepage/SolutionSection";
import FeaturesSection from "@/components/homepage/FeaturesSection";
import ToolsSection from "@/components/homepage/ToolsSection";
import TestimonialsSection from "@/components/homepage/TestimonialsSection";
import FAQSection from "@/components/homepage/FAQSection";
import PricingSection from "@/components/homepage/PricingSection";
import FinalCTASection from "@/components/homepage/FinalCTASection";
import { StickyCTA } from "@/components/ui/StickyCTA";

export default function HomePage() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <div className="bg-white text-black w-full overflow-x-hidden">
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-[#00ADB5] origin-left z-50"
        style={{ scaleX }}
      />
      <div className="relative">
        <Hero />
        <ProblemSection />
        <SolutionSection />
        <FeaturesSection />
        <ToolsSection />
        <TestimonialsSection />
        <FAQSection />
        <PricingSection />
        <FinalCTASection />
        <StickyCTA>
          <div className="flex items-center justify-between">
            <div className="text-sm text-gray-600">
              Prêt à optimiser votre productivité ?
            </div>
            <button className="bg-[#00ADB5] text-white px-6 py-2 rounded-lg hover:bg-[#00cfd9] transition-colors">
              Commencer gratuitement
            </button>
          </div>
        </StickyCTA>
      </div>
    </div>
  );
}
