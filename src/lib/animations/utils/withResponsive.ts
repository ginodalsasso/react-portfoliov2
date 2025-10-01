import { gsap } from "gsap";
import { BREAKPOINTS } from "../../constants/constants";
import type { ResponsiveConditions } from "./Animations.types";

/**
 * A utility function to handle responsive animations.
 * @param animationCallback - A callback function that receives the current responsive conditions and returns a cleanup function.
 * @returns A function that can be called to revert the animations.
 */
export function withResponsive<T>(
    animationCallback: (conditions: ResponsiveConditions) => T
): () => void {
    const mm = gsap.matchMedia();

    mm.add(BREAKPOINTS, (context) => {
        const conditions = context.conditions as ResponsiveConditions;
        return animationCallback(conditions);
    });

    return () => mm.revert();
}
