export type projectsAnimationsScrollType = {
    pinRef: React.RefObject<HTMLElement | null>;
    trackRef: React.RefObject<HTMLUListElement | null>;
    pannelSelector: string;
    onProjectChange?: (index: number) => void;
};

export type ButtonAnimationType = {
    buttonRef: React.RefObject<HTMLDivElement | null>;
    setVariant: React.Dispatch<React.SetStateAction<"primary" | "secondary">>;
};

export type UseLayeredPinType = {
    start?: string;
    end?: string;
    pinSpacing?: boolean;
};

export type TextRevealOptions = {
    selector?: string;
    y?: number;
    start?: string;
    end?: string;
    scrub?: boolean | number;
};

export type WordRevealOptions = {
    selector?: string;
    stagger?: number;
    duration?: number;
    ease?: string;
};

export type CharsRevealOptions= {
    ease?: string;
    duration?: number;
    stagger?: number;
    yoyo?: boolean;
};