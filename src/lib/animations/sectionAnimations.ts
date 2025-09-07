import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type UseLayeredPinType = {
    start?: string;
    pinSpacing?: boolean;
};

export function useLayeredAnimation({
    start = "top top",
    pinSpacing = false,
}: UseLayeredPinType = {}) {
    const ref = useRef<HTMLElement | null>(null);

    useLayoutEffect(() => { // useLayoutEffect to ensure DOM is ready
        if (!ref.current) return;

        const ctx = gsap.context(() => {
            ScrollTrigger.create({
                trigger: ref.current!,
                start,
                pin: true,
                pinSpacing,
            });
        }, ref);

        return () => ctx.revert();
    }, [start, pinSpacing]);

    return ref;
}
