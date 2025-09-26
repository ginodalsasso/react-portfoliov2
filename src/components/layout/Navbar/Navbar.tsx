import FullLogo from "../ui/Logo/FullLogo";
import styles from "./Navbar.module.css";
import { navLinks } from "../../../lib/constants/constants";
import BurgerMenu from "../ui/BurgerMenu/BurgerMenu";
import { wordRevealAnimation } from "../../../lib/animations/textAnimations";
import { useLayoutEffect, useRef } from "react";

export default function Navbar() {
    const navRef = useRef<HTMLElement>(null);

    useLayoutEffect(() => {
        const nav = navRef.current;
        if (!nav) return;

        const wordCleanup = wordRevealAnimation(nav, {
            childSelector: "[data-word-reveal]",
        });

        return () => {
            wordCleanup();
        };
    }, [navRef]);

    return (
        <nav
            aria-label="Main Navigation"
            className={`navbar ${styles.navbar}`}
            ref={navRef}
        >
            <FullLogo />
            <ul className={styles.navLinks} data-word-reveal>
                {navLinks.map((link) => (
                    <li key={link.title}>
                        <a href={link.path}>{link.title}</a>
                    </li>
                ))}
            </ul>

            <BurgerMenu navLinks={navLinks} />
        </nav>
    );
}
