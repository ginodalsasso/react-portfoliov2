import { gsap } from "gsap";
import { TextPlugin } from "gsap/TextPlugin";
import { SplitText } from "gsap/SplitText";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type { ButtonAnimationType } from "./Animations.types";

gsap.registerPlugin(TextPlugin, SplitText, ScrollTrigger);

// ________ TEXT ANIMATIONS __________
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

// ________ BUTTON ANIMATIONS __________
function getNavbarHeight(): number {
    const navbar = document.querySelector(".navbar") as HTMLElement;
    return navbar?.offsetHeight || 0;
}

function getAccentColor() {
    return getComputedStyle(document.documentElement)
        .getPropertyValue("--accent-color")
        .trim();
}

function setupSectionObserver(
    setVariant: React.Dispatch<React.SetStateAction<"primary" | "secondary">>
) {
    const accentColor = getAccentColor();
    
    const observer = new IntersectionObserver(
        (entries) => {
            // Check if any section is intersecting
            const visibleSection = entries.find(entry => entry.isIntersecting);
            if (!visibleSection) return;

            const sectionBg = getComputedStyle(visibleSection.target).backgroundColor;
            const sameBg = sectionBg === accentColor;
            setVariant(sameBg ? "secondary" : "primary");
        },
        { threshold: 0.3 }
    );

    // Observe all sections
    document.querySelectorAll("section").forEach((section) =>
        observer.observe(section)
    );

    return observer;
}

function createButtonScrollTrigger(
    buttonElement: HTMLDivElement,
    navbarHeight: number
) {
    return ScrollTrigger.create({
        trigger: buttonElement,
        start: `top top+=${navbarHeight}`,
        end: "+=99999", // keep active
        pin: true,
        onEnter: () => {
            gsap.fromTo(
                buttonElement,
                { y: 10 }, // start position
                { 
                    y: 0, 
                    duration: 0.4, 
                    ease: "power4.out" 
                } // animate to original position
            );
        },
        onLeaveBack: () => {
            gsap.to(buttonElement, {
                y: 10,
                duration: 0.4,
                ease: "power4.in",
            });
        }, 
    });
}

export function heroButtonAnimations({ buttonRef, setVariant }: ButtonAnimationType) {
    const navbarHeight = getNavbarHeight();
    if (!navbarHeight) return;

    // Setup section observer for variant changes
    const observer = setupSectionObserver(setVariant);

    // Early return for mobile
    if (window.innerWidth < 768) {
        return () => observer.disconnect();
    }

    // Create scroll trigger for desktop
    const button = buttonRef.current;
    if (!button) return () => observer.disconnect();

    const trigger = createButtonScrollTrigger(button, navbarHeight);

    // Cleanup function
    return () => {
        trigger.kill();
        observer.disconnect();
    };
}