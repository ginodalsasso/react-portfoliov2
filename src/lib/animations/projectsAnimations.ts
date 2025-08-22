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

    const factor = 2; // control the scroll speed

    const horizontalScroll = gsap.fromTo(
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

    // Drawer effect based on each items
    // const items = gsap.utils.toArray<HTMLElement>(".project-item-animation");

    // items.forEach((item, i) => {
    //     const drawer = item.querySelector<HTMLElement>(".project-drawer");
    //     const header = item.querySelector<HTMLElement>(".projectHeader");

    //     if (!drawer || !header) return;

    //     gsap.set(drawer, { xPercent: 100 }); // initially hide the drawer to the right
    //     gsap.set(item, { zIndex: i + 1 });

    return () => {
        horizontalScroll.scrollTrigger?.kill();
        horizontalScroll.kill();
    };
}