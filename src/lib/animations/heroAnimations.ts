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

export function heroButtonAnimations(
    buttonRef: React.RefObject<HTMLDivElement | null>,
    setVariant: React.Dispatch<React.SetStateAction<"primary" | "secondary">>
) {
    if (!buttonRef.current) return;
    const button = buttonRef.current;

    const navbar = document.querySelector(".navbar") as HTMLElement;
    if (!navbar) return;

    const navbarHeight = navbar.offsetHeight;
    
    const observer = new IntersectionObserver( // Observe sections as the user scrolls
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    const sectionBg = getComputedStyle(entry.target).backgroundColor;
                    const buttonBg = getComputedStyle(button).backgroundColor;

                    const sameBg = buttonBg === sectionBg;
                    setVariant(sameBg ? "primary" : "secondary");
                }
            });
        },
        { threshold: 0.5 }
    );

    document.querySelectorAll("section").forEach((section) => observer.observe(section));
    
    const trigger = ScrollTrigger.create({
    trigger: buttonRef.current,
    start: `top top+=${navbarHeight}`,
    end: "+=9999", // keep active
    pin: true,
    onEnter: () => {
        gsap.fromTo(
            buttonRef.current,
            { y: 10 }, // start position
            { 
                y: 0, 
                duration: 0.4, 
                ease: "power4.out" 
            } // animate to original position
        );
    },
    onLeaveBack: () => {
        gsap.to(buttonRef.current, {
            y: 10,
            duration: 0.4,
            ease: "power4.in",
        });
    },
});

    // Cleanup function to kill the ScrollTrigger instance
    const cleanup = () => {
        trigger.kill();
        observer.disconnect();
    };

    return cleanup;
}
