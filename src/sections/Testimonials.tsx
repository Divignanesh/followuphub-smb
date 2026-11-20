import { Star } from "lucide-react";
import { Avatar } from "../components/Mock";
import { Reveal } from "../components/ui";
import { TESTIMONIALS, TESTIMONIALS_ARE_SAMPLES, type Testimonial } from "../lib/content";

/**
 * A wall of short reviews in two rows drifting in opposite directions,
 * paused on hover or focus. Each row is drawn twice so the loop is seamless;
 * the copy is hidden from screen readers. The quotes are placeholders until
 * real ones arrive (see content.ts), and the section says so while the flag
 * is on.
 */

function Card({ t, i }: { t: Testimonial; i: number }) {
  return (
    <figure className="flex w-[280px] shrink-0 flex-col rounded-[1.25rem] bg-page p-5 shadow-card">
      <div className="flex gap-0.5" role="img" aria-label="Five stars">
        {Array.from({ length: 5 }).map((_, k) => <Star key={k} className="size-3.5 fill-gold text-gold" />)}
      </div>
      <blockquote className="mt-2.5 flex-1 text-[14.5px] leading-snug">“{t.quote}”</blockquote>
      <figcaption className="mt-3 flex items-center gap-2.5">
        <Avatar name={t.name} i={i} size="size-7" />
        <span>
          <span className="block text-[13px] font-semibold">{t.name}</span>
          <span className="block text-[12px] text-ink-soft">{t.role}</span>
        </span>
      </figcaption>
    </figure>
  );
}

function Row({ items, offset, reverse, dur }: { items: Testimonial[]; offset: number; reverse?: boolean; dur: string }) {
  return (
    <div className="marquee-wrap overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_6%,black_94%,transparent)]">
      <div className={`marquee flex w-max gap-4 px-2 py-2 ${reverse ? "marquee-rev" : ""}`} style={{ ["--dur" as string]: dur }}>
        {[0, 1].map((copy) => (
          <div key={copy} aria-hidden={copy === 1 || undefined} className="flex gap-4">
            {items.map((t, i) => <Card key={t.name} t={t} i={i + offset} />)}
          </div>
        ))}
      </div>
    </div>
  );
}

export function Testimonials() {
  const half = Math.ceil(TESTIMONIALS.length / 2);
  return (
    <section id="testimonials" aria-labelledby="t-title" className="overflow-hidden pb-2 pt-16 sm:pt-20">
      <div className="container-x">
        <Reveal className="mx-auto max-w-2xl text-center">
          <h2 id="t-title" className="t-h2">What small business owners say</h2>
          <p className="t-lede mt-4 text-ink-soft">From owners who answer the phone and do the work.</p>
          {TESTIMONIALS_ARE_SAMPLES && <p className="mt-2 text-[12.5px] text-ink-soft">Sample reviews, shown until customer reviews are added.</p>}
        </Reveal>
      </div>
      <div className="mt-12 grid gap-3">
        <Row items={TESTIMONIALS.slice(0, half)} offset={0} dur="110s" />
        <Row items={TESTIMONIALS.slice(half)} offset={1} reverse dur="120s" />
      </div>
    </section>
  );
}
