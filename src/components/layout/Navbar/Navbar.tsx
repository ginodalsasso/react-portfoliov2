import FullLogo from "../ui/Logo/FullLogo";
import styles from "./Navbar.module.css";
import { navLinks } from "../../../lib/constants/constants";
import BurgerMenu from "../ui/BurgerMenu/BurgerMenu";

export default function Navbar() {
    return (
        <nav
            id="desktop-nav"
            data-testid="desktop-nav"
            role="navigation"
            aria-label="Main Navigation"
            className={`navbar ${styles.navbar}`}
        >
            <FullLogo className={styles.fullLogo} />
            <ul className={styles.navLinks}>
                {navLinks.map((link) => (
                    <li key={link.title} data-testid={`nav-link-${link.title}`}>
                        <a href={link.path}>{link.title}</a>
                    </li>
                ))}
            </ul>

            <BurgerMenu navLinks={navLinks} />
        </nav>
    );
}
