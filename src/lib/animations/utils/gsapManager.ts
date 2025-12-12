import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// GSAP ScrollTrigger registry to keep track of created triggers
const registeredTriggers = new Set<ScrollTrigger>();

/**
 * Register a created trigger
 */
export function registerTrigger(trigger: ScrollTrigger) {
    registeredTriggers.add(trigger);
}

/**
 * Unregister a killed trigger
 */
export function unregisterTrigger(trigger: ScrollTrigger) {
    registeredTriggers.delete(trigger);
}

/**
 * Refresh GSAP
 */
export function refreshGSAP() {
    ScrollTrigger.refresh();
}