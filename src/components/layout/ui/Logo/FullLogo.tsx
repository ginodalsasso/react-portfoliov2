import styles from "./Logo.module.css";
import Logo from "../Logo/Logo";
import type { FullLogoProps } from "./Logo.types";
import type { JSX } from "react";

export default function FullLogo({ href = "/", fontSize = "2rem" }: FullLogoProps) {
    const Wrapper = href ? 'a' : 'div' as keyof JSX.IntrinsicElements;

    return (
        <Wrapper
            className={styles.logoContainer}
            style={{ fontSize }}
            { ...href ? { href } : {} }
            role={href ? "link" : 'img'} // Use 'img' role if not a link
            aria-label="Full Logo"
        >
            <span className={styles.logoText}>gin</span>
            <Logo size="0.55em" />
        </Wrapper>
    );
}   