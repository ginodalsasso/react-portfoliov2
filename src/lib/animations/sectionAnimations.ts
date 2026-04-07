import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { refreshGSAP, registerTrigger, unregisterTrigger } from "./utils/gsapManager";
import { getNavbarHeight } from "./utils/getNavbarHeight";

function calculateOffset (index: number, firstLayerStep: number, layerStep: number) {
    return index === 0 ? firstLayerStep : index * layerStep + firstLayerStep;
};

// Cache offsets to avoid recalculating on every hook call.
// instanceCount tracks mounted components so the cache is only cleared
// when the last layered-animation section unmounts.
let cachedOffset: { firstLayerStep: number; layerStep: number } | null = null;
let instanceCount = 0;

function setupOffset() {
    if (cachedOffset) return cachedOffset;

    const centeredLogos = Array.from(document.querySelectorAll(".centered-section-logo")) as HTMLElement[];
    if (!centeredLogos.length || centeredLogos[0].offsetHeight === 0) {
        // DOM not ready or logos not rendered yet — return a safe fallback
        return { firstLayerStep: getNavbarHeight, layerStep: 0 };
    }

    const layerStep = centeredLogos[0].offsetHeight;
    const firstLayerStep = getNavbarHeight + layerStep;

    cachedOffset = { firstLayerStep, layerStep };
    return cachedOffset;
}

export function useLayeredAnimation() {
    const ref = useRef<HTMLElement | null>(null);

    useLayoutEffect(() => {
        const element = ref.current;
        if (!element) return;

        instanceCount++;

        const sections = Array.from(document.querySelectorAll(".layered-animation")) as HTMLElement[];
        const index = sections.indexOf(element);
        const { firstLayerStep, layerStep } = setupOffset();
        const offset = calculateOffset(index, firstLayerStep, layerStep);

        let createdTrigger: ScrollTrigger | null = null;

        const ctx = gsap.context(() => {
            createdTrigger = ScrollTrigger.create({
                trigger: element,
                start: () => `top top+=${offset}`,
                end: "max",
                pin: true,
                pinSpacing: false,
                anticipatePin: 1,
                invalidateOnRefresh: false,
                refreshPriority: -1,
                scrub: 0.5,
                fastScrollEnd: true,
                preventOverlaps: true,
            });
        });
        if (createdTrigger) {
            registerTrigger(createdTrigger);
        }

        return () => {
            if (createdTrigger) {
                unregisterTrigger(createdTrigger);
                createdTrigger.kill();
            }
            ctx.revert();
            instanceCount--;
            // Only clear the cache when the last layered section unmounts
            if (instanceCount === 0) {
                cachedOffset = null;
            }
            refreshGSAP();
        };
    }, []);
    
    return ref;
}

