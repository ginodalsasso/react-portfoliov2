import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type { projectsAnimationsScrollType } from "./Animations.types";

gsap.registerPlugin(ScrollTrigger);

function setupInitialPanelStates(panels: HTMLElement[]): void {
    panels.forEach((panel, index) => {
        gsap.set(panel, {
            xPercent: index === 0 ? 0 : 100, // first panel in view, others to the right
            zIndex: 1 + index, // base z-index
            position: "relative",
        });
    });
}

function buildTimeline(
    pin: HTMLElement,
    panels: HTMLElement[],
    onProjectChange?: (index: number) => void
) {
    // Slide timeline for horizontal scrolling
    const timeline = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: {
            trigger: pin, // section to pin to the viewport
            pin: true, // pin the section
            scrub: 1, // smooth scrubbing, takes 1 second to catch up
            snap: 1 / (panels.length - 1), // snap to the closest panel
            invalidateOnRefresh: true,
            onUpdate: (self) => {
                // Calculate which project is currently visible
                const progress = self.progress;
                const currentIndex = Math.round(progress * (panels.length - 1));
                
                // Call the callback to update the current project index
                if (onProjectChange) {
                    onProjectChange(currentIndex);
                }
            }
        },
    });

    // Slide panels into view
    panels.forEach((panel, index) => {
        if (index === 0) return; // Skip the first panel

        timeline.to(panel, { 
            xPercent: 0,
        }, ">"); // slide in the next panel
    });

    return timeline;
}

export function projectsAnimationsScroll({ 
    pinRef, 
    trackRef,
    pannelSelector,
    onProjectChange 
}: projectsAnimationsScrollType) {
    const pin = pinRef.current;
    const track = trackRef.current;
    if (!pin || !track) return;

    const panels = gsap.utils.toArray<HTMLElement>(
        track.querySelectorAll(pannelSelector)
    );
    if (!panels.length) return;

    setupInitialPanelStates(panels);

    const timeline = buildTimeline(pin, panels, onProjectChange);

    // Cleanup
    return () => {
        timeline.scrollTrigger?.kill();
        timeline.kill();
    };
}
