import { gsap } from "gsap";
import { TextPlugin } from "gsap/TextPlugin";
import { SplitText } from "gsap/SplitText";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type { ButtonAnimationType } from "./Animations.types";
import React from "react";

gsap.registerPlugin(TextPlugin, SplitText, ScrollTrigger);

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
        anticipatePin: 1,
        onEnter: () => {
            gsap.fromTo(
                buttonElement, // reference to the button element
                { y: 10 }, // start position
                { 
                    y: 0, 
                    duration: 0.8, 
                    ease: "power4.out" 
                } // animate to original position
            );
        },
        onLeaveBack: () => {
            gsap.to(buttonElement, {
                y: 10,
                duration: 0.8,
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