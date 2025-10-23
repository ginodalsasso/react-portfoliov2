import type { FullLogoProps } from "./Logo.types";
import type { JSX } from "react";
import OptimizedImage from "../OptimizedImage/OptimizedImage";

export default function FullLogo({ href = "/", className }: FullLogoProps) {
    const Wrapper = href ? 'a' : 'div' as keyof JSX.IntrinsicElements;

    return (
        <Wrapper
            { ...href ? { href } : {} }
            role={href ? "link" : 'img'} // Use 'img' role if not a link
            aria-label="Full Logo"
        >
            <OptimizedImage className={className} src="/logo.svg" alt="Full Logo" loading="eager" />
        </Wrapper>
    );
}   