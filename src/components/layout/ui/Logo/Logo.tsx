import styles from "./Logo.module.css";
import type { LogoProps } from "./Logo.types";

export default function Logo({ size = 64, ariaLabel = "Portfolio Logo" }: LogoProps) {
    return (
        <div
            className={styles.logoSquare}
            style={{
                width: size,
                height: size
            }}
            role="img"
            aria-label={ariaLabel}
        >
            <div className={styles.logoRound} />
        </div>
    );
}
