import Image from 'next/image';
import { InstagramIcon } from '@/components/icons/BrandIcons';
import { siteConfig } from '@/data/siteConfig';
import type { SiteImage } from '@/types';

/**
 * Grade do Instagram. Hoje recebe uma lista estática (data/content.ts);
 * a mesma interface serve para posts vindos de uma integração.
 */
export function InstagramGrid({ posts }: { posts: SiteImage[] }) {
  const { url, handle } = siteConfig.instagram;

  return (
    <ul data-reveal-group className="grid grid-cols-3 gap-2 lg:gap-3">
      {posts.map((post) => (
        <li key={post.alt} data-reveal-item>
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${post.alt}. Ver no Instagram @${handle} (abre em nova aba)`}
            className="group relative block aspect-square overflow-hidden bg-sand"
          >
            <Image
              src={post.src}
              alt=""
              fill
              placeholder="blur"
              sizes="(min-width: 1024px) 230px, 31vw"
              className="object-cover transition-transform duration-700 ease-out motion-safe:group-hover:scale-105"
              style={{ objectPosition: post.focus }}
            />
            <span
              aria-hidden
              className="absolute inset-0 flex items-center justify-center bg-ink/55 text-bone opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100"
            >
              <InstagramIcon size={26} />
            </span>
          </a>
        </li>
      ))}
    </ul>
  );
}
