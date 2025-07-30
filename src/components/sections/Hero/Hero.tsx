import { Link } from "react-router-dom";
import { useEffect } from "react";

import styles from "./Hero.module.css";
import Button from "../../layout/Button/Button";
import { heroAnimations } from "../../../lib/animations/heroAnimations";

export default function Hero() {
    useEffect(() => {
        const cleanup = heroAnimations(".split");
        return () => {
            cleanup();
        };
    }, []);

    return (
        <section className={styles.heroSection} aria-label="Hero Section">
            <div className={styles.heroContent}>
                <h1 className={`${styles.heroTitle} split`}>
                    Hi, I’m Gino, <br /> full-stack developer <br /> From France to NZ
                </h1>
                <div>
                    <Button
                        aria-label="Click me"
                        variant="primary"
                        size="medium"
                    >
                        <Link to="mailto:gino.dalsasso@gmail.com">
                            gino.dalsasso@gmail.com
                        </Link>
                    </Button>
                    <span aria-hidden="true" className={styles.heroBackground}>
                        full-stack<br />developer
                    </span>
                </div>
            </div>
        </section>
    );
}
