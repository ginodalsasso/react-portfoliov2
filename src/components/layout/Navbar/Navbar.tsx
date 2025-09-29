import FullLogo from "../ui/Logo/FullLogo";
import styles from "./Navbar.module.css";
import { navLinks } from "../../../lib/constants/constants";
import BurgerMenu from "../ui/BurgerMenu/BurgerMenu";

export default function Navbar() {
    return (
        <nav
            aria-label="Main Navigation"
            className={`navbar ${styles.navbar}`}
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
