import { Link } from "react-router-dom";
import FullLogo from "../ui/Logo/FullLogo";
import styles from "./Navbar.module.css";

export default function Navbar() {
    return (
        <nav aria-label="Main Navigation" className={styles.navbar}>
            <FullLogo />
            <ul className={styles.navLinks}>
                <li><Link to="#projects">projects</Link></li>
                <li><Link to="#approach">approach</Link></li>
                <li><Link to="#about">about</Link></li>
            </ul>
        </nav>
    );
}