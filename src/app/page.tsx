import { About } from '@/sections/About';
import { Booking } from '@/sections/Booking';
import { Contact } from '@/sections/Contact';
import { Differentials } from '@/sections/Differentials';
import { FinalCTA } from '@/sections/FinalCTA';
import { GallerySection } from '@/sections/GallerySection';
import { Hero } from '@/sections/Hero';
import { InstagramSection } from '@/sections/InstagramSection';
import { Results } from '@/sections/Results';
import { Reviews } from '@/sections/Reviews';
import { ServiceFeatures } from '@/sections/ServiceFeatures';
import { Services } from '@/sections/Services';
import { Team } from '@/sections/Team';

/** Home: a ordem abaixo é o fluxo de conversão (conhecer -> confiar -> agendar). */
export default function HomePage() {
  return (
    <>
      <Hero />
      <Differentials />
      <Services />
      <ServiceFeatures />
      <Results />
      <About />
      <Team />
      <GallerySection />
      <InstagramSection />
      <Reviews />
      <Booking />
      <Contact />
      <FinalCTA />
    </>
  );
}
