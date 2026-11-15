import React, { useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function EditorialAbout() {
  const root = useRef(null);

  // 4 Editorial Chapters matching the reference video & MakeMyTrip resort imagery
  const chapters = [
    {
      id: "gardens",
      title: "The Gardens",
      description: "Lawns, shade and open sky. The 13-acre botanical grounds set the pace here: slower, softer, and entirely your own.",
      image: "/images/resort/photo_19.jpg"
    },
    {
      id: "cottages",
      title: "The Cottages",
      description: "Independent low-rise retreats framed by flowering bougainvillea. Handcrafted teak, private garden sit-outs, and uninterrupted calm.",
      image: "/images/resort/photo_24.jpg"
    },
    {
      id: "water",
      title: "The Water",
      description: "An outdoor freeform pool and children's splash pool, framed by palms, for long afternoons that need no plan.",
      image: "/images/resort/photo_22.jpg"
    },
    {
      id: "table",
      title: "The Table",
      description: "A restaurant and open-air garden café on site, so a good meal is never far from wherever the day takes you.",
      image: "/images/resort/photo_00.jpg"
    }
  ];

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const imgs = gsap.utils.toArray('.sg-img');
      const texts = gsap.utils.toArray('.sg-text');
      const counter = root.current?.querySelector('.sg-count');

      // 1. Initial visual states: hide subsequent images with clipPath and texts with autoAlpha
      gsap.set(imgs.slice(1), { clipPath: 'inset(100% 0 0 0)' });
      gsap.set(imgs[0], { clipPath: 'inset(0% 0 0 0)' });
      gsap.set(texts.slice(1), { autoAlpha: 0, y: 35 });
      gsap.set(texts[0], { autoAlpha: 1, y: 0 });
      if (counter) gsap.set(counter, { yPercent: 0 });

      // 2. Timeline with ScrollTrigger pin across both mobile and desktop screens
      const tl = gsap.timeline({
        defaults: { ease: 'none' },
        scrollTrigger: {
          trigger: root.current,
          start: 'top top',
          end: '+=300%',
          pin: true,       // Pins the section in place on mobile and desktop
          scrub: 0.7,      // Ties animation progress directly to scroll position
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      // 3. As you scroll, wipe the new image over the old one and transition text & counter
      imgs.forEach((img, i) => {
        if (i === 0) return;
        const imgElement = img.querySelector('img');

        tl.to(texts[i - 1], { autoAlpha: 0, y: -35, duration: 0.4 }, i - 1 + 0.35)
          .to(img, { clipPath: 'inset(0% 0 0 0)', duration: 0.8 }, i - 1 + 0.2); // Unmasks new image

        if (imgElement) {
          tl.fromTo(imgElement, { scale: 1.18 }, { scale: 1, duration: 0.8 }, i - 1 + 0.2);
        }

        tl.to(texts[i], { autoAlpha: 1, y: 0, duration: 0.4 }, i - 1 + 0.65); // Fades in new text

        if (counter) {
          tl.to(counter, { yPercent: -100 * i, duration: 0.4, ease: 'power2.inOut' }, i - 1 + 0.5); // Slides 01 -> 02 -> 03 -> 04
        }
      });

      tl.to({}, { duration: 0.2 });
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="about-resort"
      ref={root}
      className="relative w-full h-[100dvh] min-h-[560px] sm:min-h-[640px] bg-[#FAF8F5] overflow-hidden"
    >
      <div className="w-full h-full flex flex-col lg:flex-row">
        
        {/* Text Container: Left on Desktop, Top on Mobile (pt-16 avoids mobile navbar overlap) */}
        <div className="w-full lg:w-1/2 h-[46%] sm:h-[48%] lg:h-full flex flex-col justify-between px-6 sm:px-10 lg:px-20 xl:px-28 pt-16 sm:pt-14 lg:py-20 pb-3 sm:pb-6 z-10 bg-[#FAF8F5]">
          
          {/* Top Counter: 01 —— 04 */}
          <div className="flex items-center gap-3 text-xs sm:text-sm font-mono tracking-widest text-[#517B65]">
            <div className="h-5 sm:h-6 overflow-hidden flex flex-col justify-start">
              <div className="sg-count flex flex-col font-medium">
                {chapters.map((_, i) => (
                  <span key={i} className="h-5 sm:h-6 flex items-center leading-none">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                ))}
              </div>
            </div>
            <span className="w-8 sm:w-12 h-[1px] bg-[#517B65]/40" />
            <span className="leading-none opacity-80 font-medium">
              {String(chapters.length).padStart(2, '0')}
            </span>
          </div>

          {/* Vertically Centered Title & Narrative Stack */}
          <div className="grid grid-cols-1 grid-rows-1 w-full my-auto py-2 sm:py-4 lg:py-8">
            {chapters.map((chap, idx) => (
              <div
                key={chap.id}
                className="sg-text col-start-1 row-start-1 flex flex-col justify-center max-w-lg"
                style={{
                  zIndex: idx + 1,
                  opacity: idx === 0 ? 1 : 0,
                  visibility: idx === 0 ? 'visible' : 'hidden',
                  transform: idx === 0 ? 'none' : 'translateY(35px)',
                }}
              >
                <h2 className="font-serif text-3xl sm:text-5xl lg:text-7xl xl:text-8xl font-normal text-[#23392E] tracking-tight leading-[1.08] mb-2 sm:mb-4 lg:mb-6">
                  {chap.title}
                </h2>
                <p className="font-sans text-xs sm:text-base lg:text-lg xl:text-xl text-[#23392E]/80 font-light leading-relaxed max-w-md">
                  {chap.description}
                </p>
              </div>
            ))}
          </div>

          {/* Minimal Bottom Detail */}
          <div className="text-[10px] sm:text-[11px] tracking-[0.22em] uppercase font-sans text-[#517B65]/60 font-medium">
            The Meadows Resort & Spa • Aurangabad
          </div>

        </div>

        {/* Image Container: Right on Desktop, Bottom on Mobile (takes 54% height on mobile) */}
        <div className="w-full lg:w-1/2 h-[54%] sm:h-[52%] lg:h-full relative overflow-hidden bg-[#14231a]">
          {chapters.map((chap, idx) => (
            <div
              key={chap.id}
              className="sg-img absolute inset-0 w-full h-full overflow-hidden"
              style={{
                zIndex: idx + 1,
                clipPath: idx === 0 ? 'inset(0% 0 0 0)' : 'inset(100% 0 0 0)',
              }}
            >
              <img
                src={chap.image}
                alt={chap.title}
                className="w-full h-full object-cover object-center"
                loading={idx === 0 ? "eager" : "lazy"}
              />
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
