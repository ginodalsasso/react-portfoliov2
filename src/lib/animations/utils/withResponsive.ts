import { BREAKPOINTS } from "../../constants/constants";
import type { ResponsiveConditions } from "./Animations.types";

function getConditions(): ResponsiveConditions {
    return {
        isMobile: window.matchMedia(BREAKPOINTS.isMobile).matches,
        isDesktop: window.matchMedia(BREAKPOINTS.isDesktop).matches,
        isReducedMotion: window.matchMedia(BREAKPOINTS.isReducedMotion).matches,
    };
}

/**
 * Reads the current responsive conditions once and passes them to the animation callback.
 * Returns a cleanup function that reverts whatever the callback set up.
 */
export function withResponsive(
    animationCallback: (conditions: ResponsiveConditions) => (() => void) | Promise<() => void>
): () => void {
    let cleanup: (() => void) | null = null;

    const result = animationCallback(getConditions());

    if (result instanceof Promise) {
        result.then((fn) => { cleanup = fn; });
    } else {
        cleanup = result;
    }

    return () => cleanup?.();
}
