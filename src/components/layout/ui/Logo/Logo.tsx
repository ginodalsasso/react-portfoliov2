import styles from "./Logo.module.css";
import type { LogoProps } from "./Logo.types";

export default function Logo({ color = "black", size = 64, ariaLabel = "Portfolio Logo" }: LogoProps) {
    return (
        <div className={styles.logoWrapper}>
            <div
                className={`${styles.logoSquare} ${styles[color]}`}
                style={{
                    width: size,
                    height: size,
                }}
                role="img"
                aria-label={ariaLabel}

            >
                <div className={styles.logoRound} />
            </div>
        </div>
    );
}
