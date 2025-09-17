import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type { TextRevealOptions } from "./Animations.types";

gsap.registerPlugin(ScrollTrigger);

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

        targets.forEach((el) => {
            gsap.fromTo(
                el,
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
