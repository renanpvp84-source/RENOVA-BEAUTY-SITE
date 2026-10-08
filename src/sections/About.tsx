import { CTAButton } from '@/components/ui/CTAButton';
import { FramedImage } from '@/components/ui/FramedImage';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { about } from '@/data/content';
import { directionsUrl } from '@/lib/maps';

/** Sobre a Renova. O texto vem de data/content.ts (about) e é provisório. */
export function About() {
  const [main, detail] = about.images;

  return (
    <section
      id="sobre"
      data-theme="light"
      aria-labelledby="sobre-titulo"
      className="section-y overflow-hidden bg-bone text-ink"
    >
      <div className="container-site grid items-center gap-x-10 gap-y-16 lg:grid-cols-12">
        <div className="relative lg:col-span-5">
          <FramedImage
            image={main}
            ring
            parallax={3}
            sizes="(min-width: 1024px) 384px, 76vw"
            className="w-[76%] max-w-[24rem] text-bronze"
          />
          <div className="absolute bottom-[-2.5rem] right-0 w-[40%] max-w-[13.75rem] lg:right-[4%]">
            <FramedImage
              image={detail}
              shape="rect"
              ratio="aspect-[4/5]"
              parallax={-6}
              sizes="(min-width: 1024px) 220px, 40vw"
              className="border-[6px] border-bone"
            />
          </div>
        </div>

        <div className="lg:col-span-6 lg:col-start-7">
          <SectionHeading
            id="sobre-titulo"
            eyebrow="Sobre a Renova"
            title={
              <>
                Mais do que beleza. <em>Uma experiência.</em>
              </>
            }
          />

          <div data-reveal="up" className="mt-7 max-w-[34rem] space-y-4 text-lg leading-relaxed text-stone">
            {about.paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>

          <dl data-reveal-group className="mt-10 grid gap-x-8 gap-y-7 sm:grid-cols-2">
            {about.pillars.map((pillar) => (
              <div key={pillar.title} data-reveal-item className="border-t border-ink/20 pt-4">
                <dt className="text-[0.8125rem] font-medium uppercase tracking-[0.16em]">
                  {pillar.title}
                </dt>
                <dd className="mt-2 text-[0.95rem] leading-relaxed text-stone">{pillar.text}</dd>
              </div>
            ))}
          </dl>

          <div data-reveal="up" className="mt-10">
            <CTAButton href={directionsUrl} variant="outline-dark" icon="external" external>
              Como chegar
            </CTAButton>
          </div>
        </div>
      </div>
    </section>
  );
}
