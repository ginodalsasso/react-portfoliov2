export type projectsAnimationsScrollType = {
    pinRef: React.RefObject<HTMLElement | null>;
    trackRef: React.RefObject<HTMLUListElement | null>;
    onProjectChange?: (index: number) => void;
};

export type ButtonAnimationType = {
    buttonRef: React.RefObject<HTMLDivElement | null>;
    setVariant: React.Dispatch<React.SetStateAction<"primary" | "secondary">>;
};