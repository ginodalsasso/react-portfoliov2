export type ResponsiveConditions = {
    isMobile: boolean;
    isDesktop: boolean;
    isReducedMotion: boolean;
};

export type projectsAnimationsScrollType = {
    pinRef: React.RefObject<HTMLElement | null>;
    trackRef: React.RefObject<HTMLUListElement | null>;
    pannelSelector: string;
    onProjectChange?: (index: number) => void;
};

export type ButtonAnimationType = {
    buttonRef: React.RefObject<HTMLDivElement | null>;
    setVariant: React.Dispatch<React.SetStateAction<"primary" | "secondary">>;
    enableScrollTrigger?: boolean;
};

export type UseLayeredPinType = {
    start?: string;
    end?: string;
    pinSpacing?: boolean;
};

export type TextRevealOptions = {
    childSelector?: string;
    x?: number;
    y?: number;
    start?: string;
    end?: string;
    scrub?: boolean | number;
};

export type WordRevealOptions = {
    childSelector?: string;
    stagger?: number;
    duration?: number;
    ease?: string;
    initialY?: number;
    initialX?: number;
    initialOpacity?: number;
};

export type CharsRevealOptions= {
    ease?: string;
    duration?: number;
    stagger?: number;
    yoyo?: boolean;
};