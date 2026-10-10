import { useMemo } from 'react';
import { company } from '@/data/company';
import { faqSchema, organizationSchema } from '@/lib/seo';
import { Seo } from '@/components/Seo';
import { Hero } from '@/components/sections/Hero';
import { OrbitSection } from '@/components/sections/OrbitSection';
import { PartnersSection } from '@/components/sections/PartnersSection';
import { QuickQuoteSection } from '@/components/sections/QuickQuoteSection';
import { ConsortiumPricingSection } from '@/components/sections/ConsortiumPricingSection';
import { SolutionsSection } from '@/components/sections/SolutionsSection';
import { PositioningSection } from '@/components/sections/PositioningSection';
import { AboutTeaser } from '@/components/sections/AboutTeaser';
import { FaqSection } from '@/components/sections/FaqSection';
import { RecentBlogPostsSection } from '@/components/sections/RecentBlogPostsSection';

export default function HomePage() {
  // The FAQ questions are rendered on this page, so FAQPage schema is valid here.
  const schemas = useMemo(() => [organizationSchema(), faqSchema()], []);

  return (
    <>
      <Seo
        description={`${company.legalName}: corretora em Belo Horizonte que intermedia planos de saúde, seguros, consórcios, previdência privada e financiamentos desde ${company.foundedYear}.`}
        schemas={schemas}
      />

      <Hero />
      <OrbitSection />
      <PartnersSection />
      <QuickQuoteSection />
      <ConsortiumPricingSection />
      <SolutionsSection />
      <PositioningSection />
      <AboutTeaser />
      <FaqSection />
      <RecentBlogPostsSection />
    </>
  );
}
