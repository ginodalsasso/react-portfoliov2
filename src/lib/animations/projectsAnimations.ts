import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type Refs = {
    pinRef: React.RefObject<HTMLElement | null>;
    trackRef: React.RefObject<HTMLUListElement | null>;
};

export function projectsAnimationsScroll({ pinRef, trackRef }: Refs) {
    const pin = pinRef.current;
    const track = trackRef.current;
    if (!pin || !track) return;

    const panels = gsap.utils.toArray<HTMLElement>(
        track.querySelectorAll(".project-item-animation")
    );
    if (!panels.length) return;

    const scrollSpeed = 1.2;
    const totalDistance = Math.max(0, (panels.length - 1) * window.innerWidth * scrollSpeed); // total scroll distance with math max to avoid negative values

    // Initial setup for panels
    panels.forEach((panel, index) => {
        gsap.set(panel, {
            xPercent: index === 0 ? 0 : 100,
            zIndex: 1 + index, // base z-index
            position: "relative",
        });
    });

    // Slide timeline for horizontal scrolling
    const timeline = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: {
            trigger: pin, // section to pin to the viewport
            pin: true, // pin the section
            scrub: 1, // smooth scrubbing, takes 1 second to catch up
            snap: 1 / (panels.length - 1), // snap to the closest panel
            end: () => "+=" + totalDistance, // end after scrolling through all panels
            invalidateOnRefresh: true,
        },
    });

    // Slide panels into view
    panels.forEach((panel, index) => {
        if (index === 0) return;

        timeline.to(panel, { 
            xPercent: 0, 
            ease: "power1.out"
        }, ">"); // slide in the next panel
    });

    // Cleanup
    return () => {
        timeline.scrollTrigger?.kill();
        timeline.kill();
    };
}
