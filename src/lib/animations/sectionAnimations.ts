import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

function initializeOffset() {
    const navbar = document.querySelector(".navbar") as HTMLElement;
    const navHeight = navbar.offsetHeight;

    const centeredLogos = Array.from(document.querySelectorAll(".centered-section-logo")) as HTMLElement[];
    const layerStep = centeredLogos[0].offsetHeight;

    const firstLayerStep = navHeight + layerStep;
    return { firstLayerStep, layerStep };
}

function calculateOffset (index: number, firstLayerStep: number, layerStep: number) {
    return index === 0 ? firstLayerStep : index * layerStep + firstLayerStep;
};

export function useLayeredAnimation() {
    const ref = useRef<HTMLElement | null>(null);

    useLayoutEffect(() => {
        const element = ref.current;
        if (!element) return;

        const sections = Array.from(document.querySelectorAll(".layered-animation")) as HTMLElement[];
        const index = sections.indexOf(element);
        const { firstLayerStep, layerStep } = initializeOffset();
        const offset = calculateOffset(index, firstLayerStep, layerStep);

        const ctx = gsap.context(() => {
            ScrollTrigger.create({
                trigger: element,
                start: () => `top top+=${offset}`,
                pin: true,
                pinSpacing: false,
            });

        });

        return () => ctx.revert();
    }, []);
    return ref;
}

