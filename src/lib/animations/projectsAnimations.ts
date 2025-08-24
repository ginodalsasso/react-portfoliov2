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

    const factor = 1.2; // scroll speed

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
            end: () => "+=" + panels.length * window.innerWidth * factor, // end after scrolling through all panels
            invalidateOnRefresh: true,
        },
    });

    // Slide panels into view
    panels.forEach((panel, index) => {
        if (index === 0) return;
        timeline.to(panel, { xPercent: 0 }, ">");
    });

    // Manage z-index to keep the active panel on top
    const zIndexTriggers: ScrollTrigger[] = [];

    panels.forEach((panel) => {
        const scrollTrigger = ScrollTrigger.create({
            trigger: panel,
            containerAnimation: timeline, // link the panel's visibility to the timeline
            start: "left left", // when the left edge of the panel reaches the left edge of the viewport
            end: "right right", // until the right edge reaches the right edge
            onToggle: (self) => { // on toggle, set z-index
                gsap.set(panel, { zIndex: self.isActive ? 1000 : 1 });
            },
        });
        zIndexTriggers.push(scrollTrigger); 
    });

    // Cleanup
    return () => {
        timeline.scrollTrigger?.kill();
        timeline.kill();
        zIndexTriggers.forEach((st) => st.kill());
    };
}
