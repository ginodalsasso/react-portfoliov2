import styles from "./Logo.module.css";
import type { LogoProps } from "./Logo.types";

export default function Logo({ size = 64, href, ariaLabel = "Portfolio Logo" }: LogoProps) {
    const Wrapper = href ? 'a' : 'div';
    return (
        <Wrapper
            className={styles.logoSquare}
            style={{
                width: size,
                height: size
            }}
            {...(href ? { href } : {})}
            role="img"
            aria-label={ariaLabel}
        >
            <div className={styles.logoRound} />
        </Wrapper>
    );
}
