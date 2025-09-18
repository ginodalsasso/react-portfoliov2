import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import type { TextRevealOptions, WordRevealOptions } from "./Animations.types";

gsap.registerPlugin(SplitText, ScrollTrigger);

export function textRevealUpAnimation(
    container: HTMLElement,
    opts: TextRevealOptions = {}
) {
    const {
        selector = "[data-reveal-up]",
        y = 96,
        start = "top bottom", // when top of section hit the bottom of viewport
        end = "bottom top", // until bottom hit top of viewport
        scrub = 1, // smooth
    } = opts;

    const ctx = gsap.context(() => {
        const targets = container.querySelectorAll<HTMLElement>(selector);

        targets.forEach((element) => {
            gsap.fromTo(
                element,
                { y: 0 },
                {
                    y: -y,
                    ease: "none",
                    scrollTrigger: {
                        trigger: container,
                        start,
                        end,
                        scrub,
                        invalidateOnRefresh: true,
                    },
                }
            );
        });
    }, container);

    return () => ctx.revert();
}

export function wordRevealAnimation(
    container: HTMLElement,
    opts: WordRevealOptions = {}
) {
    const {
        selector = "[data-word-reveal]",
        stagger = 0.08,
        duration = 0.6,
        ease = "power2.out"
    } = opts;
    const ctx = gsap.context(() => {
        const targets = container.querySelectorAll(selector);

        targets.forEach((element) => {
            const split = new SplitText(element, { type: "words" });

            gsap.set(split.words, { opacity: 0.2, y: 20 });

            gsap.to(split.words, {
                opacity: 1,
                y: 0,
                duration,
                stagger,
                ease,
                scrollTrigger: {
                    trigger: element,
                    start: "top 80%",
                    toggleActions: "play none none reverse",
                },
            });
        });
    }, container);

    return () => ctx.revert();
}
