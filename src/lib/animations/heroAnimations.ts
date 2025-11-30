import { gsap } from "gsap";
import { TextPlugin } from "gsap/TextPlugin";
import { SplitText } from "gsap/SplitText";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type { ButtonAnimationType } from "./utils/Animations.types";
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
        }
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
        invalidateOnRefresh: true,
        onEnter: () => {
            gsap.fromTo(
                buttonElement, // reference to the button element
                { y: 10 }, // start position
                { 
                    y: 0, 
                    duration: 0.5, 
                    ease: "power2.out",
                    force3D: true,
                } // animate to original position
            );
        },
        onLeaveBack: () => {
            gsap.to(buttonElement, {
                y: 10,
                duration: 0.5,
                ease: "power2.in",
                force3D: true,
            });
        }, 
    });
}

export function heroButtonAnimations({ 
    buttonRef, 
    setVariant, 
    enableScrollTrigger = true,
}: ButtonAnimationType): (() => void) {
    // Create scroll trigger for desktop
    const button = buttonRef.current;
    if (!button || !enableScrollTrigger) 
        return () => {};

    // Setup section observer for variant changes
    const observer = setupSectionObserver(setVariant);

    setTimeout(() => {
        const navbarHeight = getNavbarHeight();
        if (!navbarHeight) return () => {}; 
        const trigger = createButtonScrollTrigger(button, navbarHeight);

        // Cleanup function
        return () => {
            trigger.kill();
            observer.disconnect();
        };
    }, 0);
    
    return () => {
        observer.disconnect();
    };
}