import { gsap } from "gsap";
import { TextPlugin } from "gsap/TextPlugin";
import { SplitText } from "gsap/SplitText";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(TextPlugin, SplitText, ScrollTrigger);

export const heroAnimationsText = (selector: string) => {
    const split = new SplitText(selector, {
        type: "chars",
    });

    const animation = gsap.fromTo(
        split.chars,
        { opacity: 0 },
        {
            opacity: 1,
            ease: "none",
            duration: 0.05,
            stagger: 0.08,
            repeat: -1,
            yoyo: true,
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

export function heroButtonAnimations(buttonRef: React.RefObject<HTMLDivElement | null>) {
    const trigger = ScrollTrigger.create({
        trigger: buttonRef.current,
        pin: true,
        start: "top top+=62",
        end: "+=9999", // keep active
        toggleClass: {
            targets: buttonRef.current,
            className: "stickyActive",
        },
    });

    // Cleanup function to kill the ScrollTrigger instance
    const cleanup = () => {
        trigger.kill();
        // remove the sticky class if needed
        if (buttonRef.current) {
            buttonRef.current.classList.remove("stickyActive");
        }
    };

    return cleanup;
}
