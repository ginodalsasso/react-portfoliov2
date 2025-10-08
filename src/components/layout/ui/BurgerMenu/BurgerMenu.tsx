import { useEffect, useState } from "react";
import styles from "./BurgerMenu.module.css";
import type { LinkItem } from "../../../../lib/constants/constants";

export default function BurgerMenu({ navLinks }: { navLinks: LinkItem[] }) {
    const [open, setOpen] = useState(false);

    // Close menu on Escape key press
    useEffect(() => {
        if (!open) return;
        const onKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") setOpen(false);
        };
        document.addEventListener("keydown", onKeyDown);
        return () => document.removeEventListener("keydown", onKeyDown);
    }, [open]);

    return (
        <div className={styles.BurgerMenu}>
            <button
                type="button"
                className={styles.burgerButton}
                aria-expanded={open}
                aria-controls="mobile-menu"
                aria-label={open ? "Close menu" : "Open menu"}
                onClick={() => setOpen((v) => !v)}
            >
                <span
                    aria-hidden="true"
                    className={`${styles.icon} ${open ? styles.openIcon : ""}`}
                >
                    <span className={styles.line} />
                    <span className={styles.line} />
                    <span className={styles.line} />
                </span>
            </button>

            <nav
                id="mobile-menu"
                className={`${styles.menu} ${open ? styles.open : styles.closed}`}
                aria-hidden={!open}
            >
                <ul className={styles.navLinks}>
                    {navLinks.map((link) => (
                        <li key={link.title}>
                            <a href={link.path} onClick={() => setOpen(false)}>
                                {link.title}
                            </a>
                        </li>
                    ))}
                </ul>
            </nav>
        </div>
    );
}
