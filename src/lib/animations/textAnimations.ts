import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import type { CharsRevealOptions, TextRevealOptions, WordRevealOptions } from "./Animations.types";

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
        stagger = 0.06,
        duration = 0.6,
        ease = "power3.out"
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


// ________ TEXT ANIMATIONS __________
export function charsRevealAnimation(
    selector: string,
    opts: CharsRevealOptions = {}
) {
    const {
        ease = "none",
        duration = 0.05,
        stagger = 0.08,
        yoyo = true,
    } = opts;

    const split = new SplitText(selector, {
        type: "chars",
    });

    const animation = gsap.fromTo(
        split.chars,
        { opacity: 0 },
        {
            opacity: 1,
            ease,
            duration,
            stagger,
            repeat: -1,
            yoyo,
            repeatDelay: 1,
        }
    );

    // Cleanup function to revert split text and kill animation
    const cleanup = () => {
        split.revert();
        animation.kill();
    };

    return cleanup; // Return cleanup function for useEffect
};