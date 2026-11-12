import { ArrowLeft, ArrowRight, Star } from "lucide-react";
import { useRef } from "react";
import { Avatar } from "../components/Mock";
import { Reveal } from "../components/ui";
import { TESTIMONIALS, TESTIMONIALS_ARE_SAMPLES } from "../lib/content";

/**
 * After the Nitux testimonials row: heading left, a short line and two
 * arrow buttons right, and a row of cards that scrolls and snaps. The quotes
 * are placeholders until real ones arrive (see content.ts); each card says
 * so while the flag is on.
 */
export function Testimonials() {
  const track = useRef<HTMLDivElement>(null);
  const move = (dir: number) => track.current?.scrollBy({ left: dir * track.current.clientWidth * 0.8, behavior: "smooth" });

  return (
    <section id="testimonials" aria-labelledby="t-title" className="section-y overflow-hidden">
      <div className="container-x">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <Reveal>
            <p className="eyebrow">Testimonials</p>
            <h2 id="t-title" className="t-h2 mt-4 max-w-[15ch]">What small business owners say</h2>
          </Reveal>
          <div className="flex items-end gap-6">
            <p className="t-body max-w-[16rem] text-ink-soft lg:text-right">From owners who answer the phone and do the work.</p>
            <div className="flex shrink-0 gap-2">
              <button type="button" aria-label="Previous testimonials" onClick={() => move(-1)} className="grid size-11 place-items-center rounded-full bg-brand text-white hover:bg-brand-deep">
                <ArrowLeft className="size-5" />
              </button>
              <button type="button" aria-label="Next testimonials" onClick={() => move(1)} className="grid size-11 place-items-center rounded-full bg-brand text-white hover:bg-brand-deep">
                <ArrowRight className="size-5" />
              </button>
            </div>
          </div>
        </div>

        <div ref={track} className="no-scrollbar -mx-4 mt-12 flex snap-x snap-mandatory scroll-px-4 gap-4 overflow-x-auto px-4 pb-6 sm:-mx-8 sm:scroll-px-8 sm:px-8">
          {TESTIMONIALS.map((t, i) => (
            <figure key={t.name} className="flex w-[300px] shrink-0 snap-start flex-col rounded-[1.5rem] bg-[linear-gradient(170deg,var(--color-lavender),#fff_50%)] p-6 shadow-card sm:w-[360px]">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <figcaption className="text-[15.5px] font-semibold">{t.name}</figcaption>
                  <p className="text-[13px] text-ink-soft">{t.role}</p>
                  <div className="mt-2 flex gap-0.5" role="img" aria-label="Five stars">
                    {Array.from({ length: 5 }).map((_, k) => <Star key={k} className="size-3.5 fill-gold text-gold" />)}
                  </div>
                </div>
                <Avatar name={t.name} i={i} size="size-10" />
              </div>
              <blockquote className="mt-5 flex-1 text-[15px] leading-relaxed">“{t.quote}”</blockquote>
              {TESTIMONIALS_ARE_SAMPLES && (
                <span className="mt-5 self-start rounded-md bg-soft-2 px-2 py-1 text-[11px] font-medium text-ink-soft">Sample</span>
              )}
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
