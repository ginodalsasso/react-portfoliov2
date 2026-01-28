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
        start = "top bottom",
        end = "bottom top",
        scrub = 1,
    } = opts;

    const container = typeof target === "string" ? document : target;
    const targetSelector = typeof target === "string" ? target : childSelector;
    const targets = container.querySelectorAll<HTMLElement>(targetSelector);

    if (!targets.length) return () => {};

    // Use a single ScrollTrigger for all targets in this container
    const trigger = ScrollTrigger.create({
        trigger: container as HTMLElement,
        start,
        end,
        scrub,
        invalidateOnRefresh: false,
        onUpdate: (self) => {
            const progress = self.progress;
            targets.forEach((element) => {
                gsap.set(element, {
                    y: -y * progress,
                    x: x * progress,
                    force3D: true,
                });
            });
        },
    });

    return () => trigger.kill();
}

// Word Reveal Animation using ScrollTrigger.batch for better performance
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
        initialX = 20,
        initialOpacity = 0,
    } = opts;

    const container = typeof target === "string" ? document : target;
    const targetSelector = typeof target === "string" ? target : childSelector;
    const targets = container.querySelectorAll<HTMLElement>(targetSelector);

    if (!targets.length) return () => {};

    // Store splits for cleanup
    const splits: SplitText[] = [];

    // Prepare all elements
    targets.forEach((element) => {
        const split = new SplitText(element, { type: "words" });
        splits.push(split);
        gsap.set(split.words, { opacity: initialOpacity, y: initialY, x: initialX });
    });

    // Use batch for a single ScrollTrigger instead of one per element
    ScrollTrigger.batch(targets, {
        start: "top 80%",
        onEnter: (batch) => {
            batch.forEach((el) => {
                const split = splits[Array.from(targets).indexOf(el as HTMLElement)];
                if (split) {
                    gsap.to(split.words, {
                        opacity: 1,
                        y: 0,
                        x: 0,
                        duration,
                        stagger,
                        ease,
                    });
                }
            });
        },
        onLeaveBack: (batch) => {
            batch.forEach((el) => {
                const split = splits[Array.from(targets).indexOf(el as HTMLElement)];
                if (split) {
                    gsap.to(split.words, {
                        opacity: initialOpacity,
                        y: initialY,
                        x: initialX,
                        duration: duration * 0.5,
                        ease,
                    });
                }
            });
        },
    });

    return () => {
        splits.forEach((split) => split.revert());
        ScrollTrigger.getAll()
            .forEach((st) => st.kill());
    };
}

// ________ TEXT ANIMATIONS __________
export async function charsRevealAnimation(
    selector: string,
    opts: CharsRevealOptions = {}
) {
    await ensureFontsReady();
    
    const {
        ease = "none",
        duration = 0.1,
        stagger = 0.09,
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
