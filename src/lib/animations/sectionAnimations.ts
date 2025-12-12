import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { refreshGSAP, registerTrigger, unregisterTrigger } from "./utils/gsapManager";
import { getNavbarHeight } from "./utils/getNavbarHeight";

gsap.registerPlugin(ScrollTrigger);

function calculateOffset (index: number, firstLayerStep: number, layerStep: number) {
    return index === 0 ? firstLayerStep : index * layerStep + firstLayerStep;
};

function setupOffset() {
    const navHeight = getNavbarHeight();

    const centeredLogos = Array.from(document.querySelectorAll(".centered-section-logo")) as HTMLElement[];
    const layerStep = centeredLogos[0].offsetHeight;

    const firstLayerStep = navHeight + layerStep;
    return { firstLayerStep, layerStep };
}

export function useLayeredAnimation() {
    const ref = useRef<HTMLElement | null>(null);

    useLayoutEffect(() => {
        const element = ref.current;
        if (!element) return;

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
                scrub: 1,
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
            refreshGSAP();
        };
    }, []);
    
    return ref;
}

