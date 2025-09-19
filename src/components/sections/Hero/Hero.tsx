import { Link } from "react-router-dom";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import styles from "./Hero.module.css";
import Button from "../../layout/ui/Button/Button";
import { heroButtonAnimations } from "../../../lib/animations/heroAnimations";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { charsRevealAnimation } from "../../../lib/animations/textAnimations";
gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
    const [variant, setVariant] = useState<"primary" | "secondary">("primary");

    useEffect(() => {
        const cleanup = charsRevealAnimation(".split");
        return () => {
            if (cleanup) cleanup();
        };
    }, []);

    const buttonRef = useRef<HTMLDivElement>(null);
    useLayoutEffect(() => {
        const cleanup = heroButtonAnimations({ buttonRef, setVariant });
        return () => {
            if (cleanup) cleanup();
        };
    }, []);

    return (
        <section className={styles.heroSection} aria-labelledby="hero-title">
            <div className={styles.heroContent}>
                <header>
                    <h1 id="hero-title" className={`${styles.heroTitle} split`}>
                        Hi, I’m Gino, <br /> full-stack developer <br /> From France to NZ
                    </h1>
                </header>
                <div ref={buttonRef} className={styles.buttonContainer}>
                    <Button
                        aria-label="Contact me"
                        variant={variant}
                        size="medium"
                    >
                        <Link to="mailto:dalsasso.gino@gmail.com">
                            dalsasso.gino@gmail.com
                        </Link>
                    </Button>
                </div>
                <span aria-hidden="true" className={styles.heroBackground}>
                    full-stack<br />developer
                </span>
            </div>
        </section>
    );
}
