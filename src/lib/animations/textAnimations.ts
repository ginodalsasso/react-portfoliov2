import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import type {
    CharsRevealOptions,
    TextRevealOptions,
    WordRevealOptions,
} from "./utils/Animations.types";
import { ensureFontsReady } from "./utils/ensureFontsReady";

gsap.registerPlugin(SplitText, ScrollTrigger);

export async function textRevealUpAnimation(
    target: HTMLElement | string,
    opts: TextRevealOptions = {}
) {
    await ensureFontsReady();
    
    const {
        childSelector = "[data-reveal-up]",
        x = 0,
        y = 180,
        start = "top bottom", // when top of section hit the bottom of viewport
        end = "bottom top", // until bottom hit top of viewport
        scrub = 1, // smooth
    } = opts;
    // Determine the container and target selector based on the type of 'target'

    const container = typeof target === "string" ? document : target;
    const targetSelector = typeof target === "string" ? target : childSelector;

    const ctx = gsap.context(() => {
        const targets = container.querySelectorAll<HTMLElement>(targetSelector);

        targets.forEach((element) => {
            gsap.fromTo(
                element,
                {
                    y: 0,
                    x: 0,
                },
                {
                    y: -y,
                    x,
                    ease: "none",
                    scrollTrigger: {
                        trigger: container as HTMLElement,
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

// Word Reveal Animation giving whether a reference to a container or a selector string
export async function wordRevealAnimation(
    target: HTMLElement | string,
    opts: WordRevealOptions = {}
) {
    await ensureFontsReady();

    const {
        childSelector = "[data-word-reveal]",
        stagger = 0.06,
        duration = 0.6,
        ease = "power3.out",
        initialY = 20,
        initialOpacity = 0,
    } = opts;

    // Determine the container and target selector based on the type of 'target'
    const container = typeof target === "string" ? document : target;
    const targetSelector = typeof target === "string" ? target : childSelector;

    const ctx = gsap.context(() => {
        const targets = container.querySelectorAll(targetSelector);

        targets.forEach((element) => {

            const split = new SplitText(element, { type: "words" });

            gsap.set(split.words, { opacity: initialOpacity, y: initialY });

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
export async function charsRevealAnimation(
    selector: string,
    opts: CharsRevealOptions = {}
) {
    await ensureFontsReady();
    
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
}
