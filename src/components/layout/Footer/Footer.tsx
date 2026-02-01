import FullLogo from "../ui/Logo/FullLogo";
import styles from "./Footer.module.css";
import Button from "../ui/Button/Button";
import { useLayeredAnimation } from "../../../lib/animations/sectionAnimations";
import Logo from "../ui/Logo/Logo";

export default function Footer() {
    const footerRef = useLayeredAnimation(); // use of layered pin animation hook

    return (
        <footer
            className={`${styles.footer} layered-animation`}
            ref={footerRef}
        >
            <div className="centered-section-logo">
                <Logo size={40} bgColor="white" roundColor="black" />
            </div>
            <nav aria-label="Footer Navigation" className={styles.nav}>
                <FullLogo className={styles.fullLogo} />
                <ul className={styles.navLinks}>
                    <li>
                        <a
                            target="_blank"
                            rel="noopener noreferrer"
                            href="https://github.com/ginodalsasso"
                        >
                            [ github ]
                        </a>
                    </li>
                    <li>
                        <a
                            target="_blank"
                            rel="noopener noreferrer"
                            href="https://linkedin.com/in/gino-dalsasso"
                        >
                            [ linkedin ]
                        </a>
                    </li>
                    <li>
                        <a
                            href="/assets/cv-gino-dalsasso.pdf"
                            download="cv-gino-dalsasso"
                        >
                            <Button
                                aria-label="Download my CV"
                                variant="secondary"
                                size="small"
                            >
                                my resume
                            </Button>
                        </a>
                    </li>
                </ul>
            </nav>
            <div className={styles.footerInfo}>
                &copy; 2025, designed by&nbsp;
                <a
                    href="https://www.studiotuttopasta.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Romane
                </a>
            </div>
        </footer>
    );
}
