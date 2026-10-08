import { InstagramGrid } from '@/components/InstagramGrid';
import { CTAButton } from '@/components/ui/CTAButton';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { instagramPosts } from '@/data/content';
import { siteConfig } from '@/data/siteConfig';

export function InstagramSection() {
  const { handle, url } = siteConfig.instagram;

  return (
    <section
      id="instagram"
      data-theme="light"
      aria-labelledby="instagram-titulo"
      className="section-y bg-bone text-ink"
    >
      <div className="container-site grid items-center gap-x-12 gap-y-12 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <SectionHeading
            id="instagram-titulo"
            eyebrow="Instagram"
            title={
              <>
                A beleza acontece <em>todos os dias</em> por aqui.
              </>
            }
            lead="Acompanhe nossos trabalhos, bastidores, novidades e resultados."
          />
          <p data-reveal="up" className="mt-8 font-display text-[1.75rem] italic leading-none text-bronze">
            @{handle}
          </p>
          <div data-reveal="up" className="mt-8">
            <CTAButton href={url} variant="ink" icon="external" external>
              Ver Instagram
            </CTAButton>
          </div>
        </div>

        <div className="lg:col-span-6 lg:col-start-7">
          <InstagramGrid posts={instagramPosts} />
        </div>
      </div>
    </section>
  );
}
