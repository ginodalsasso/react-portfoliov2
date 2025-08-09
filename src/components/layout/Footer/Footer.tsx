import { Link } from "react-router-dom";
import FullLogo from "../ui/Logo/FullLogo";
import styles from "./Footer.module.css";
import { navLinks } from "../../../constants/constants";

export default function Footer() {
    return (
        <footer className={`footer ${styles.footer}`}>
            <nav aria-label="Footer Navigation" className={styles.nav}>
                <FullLogo fontSize="clamp(8rem, 6vw, 16rem)" />
                <ul className={styles.navLinks}>
                    {navLinks.map((link) => (
                        <li key={link.title}>
                            <Link to={link.path}>{link.title}</Link>
                        </li>
                    ))}
                </ul>
            </nav>
            <p className={styles.footerInfo}>
                &copy; 2025, made with ♥ by
                <address>
                    <a href="mailto:dalsasso.gino@gmail.com">
                        Gino Dalsasso
                    </a>
                </address>
            </p>
        </footer>
    );
}
