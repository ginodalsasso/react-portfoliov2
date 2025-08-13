import { Link } from "react-router-dom";
import FullLogo from "../ui/Logo/FullLogo";
import styles from "./Footer.module.css";
import Button from "../ui/Button/Button";

export default function Footer() {
    return (
        <footer className={`footer ${styles.footer}`}>
            <nav aria-label="Footer Navigation" className={styles.nav}>
                <FullLogo fontSize="clamp(10rem, 30vw, 18rem)" />
                <ul className={styles.navLinks}>
                    <li><Link to="https://github.com/ginodalsasso">[ github ]</Link></li>
                    <li><Link to="https://linkedin.com/in/gino-dalsasso">[ linkedin ]</Link></li>
                    <li>
                        <Link to="/assets/cv.pdf" target="_blank">
                            <Button
                                aria-label="Download my CV"
                                variant="secondary"
                                size="small"
                            >
                                my resume
                            </Button>
                        </Link>
                    </li>
                </ul>
            </nav>
            <span className={styles.footerInfo}>
                &copy; 2025, designed by&nbsp;
                <a href="https://www.studiotuttopasta.com/" target="_blank" rel="noopener noreferrer">
                    Romy
                </a>
            </span>
        </footer>
    );
}
