import { Link } from "react-router-dom";
import FullLogo from "../ui/Logo/FullLogo";
import styles from "./Navbar.module.css";
import { navLinks } from "../../../constants/constants";

export default function Navbar() {
    return (
        <nav aria-label="Main Navigation" className={`navbar ${styles.navbar}`}>
            <FullLogo />
            <ul className={styles.navLinks}>
                {navLinks.map((link) => (
                    <li key={link.title}>
                        <Link to={link.path}>{link.title}</Link>
                    </li>
                ))}
            </ul>
        </nav>
    );
}