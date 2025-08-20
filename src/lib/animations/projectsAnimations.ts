import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export const projectsAnimationsScroll = (
    pinRef: React.RefObject<HTMLElement | null>, 
    trackRef: React.RefObject<HTMLUListElement | null>, 
) => {

    const pin = pinRef.current;
    const track = trackRef.current;
    if (!pin || !track) return;

    const factor = 2; // control the scroll speed

    const animation = gsap.fromTo(
        track,
        { x: 0 },
        {
            x: () => -(track.scrollWidth - pin.clientWidth), // Calculate the distance to scroll
            ease: "none",
            scrollTrigger: {
                trigger: pin,
                pin: true,
                scrub: 1,
                end: () => "+=" + (track.scrollWidth - pin.clientWidth) * factor, // End after scrolling through all slides
                invalidateOnRefresh: true, // Recalculate on refresh
            },
        }
    );

    return () => {
        animation.scrollTrigger?.kill();
        animation.kill();
    };
}