import { Link } from "react-router-dom";
import { useLayoutEffect, useRef, useState } from "react";
import styles from "./Hero.module.css";
import Button from "../../layout/ui/Button/Button";
import { heroButtonAnimations } from "../../../lib/animations/heroAnimations";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { charsRevealAnimation } from "../../../lib/animations/textAnimations";
import { withResponsive } from "../../../lib/animations/utils/withResponsive";
gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
    const [variant, setVariant] = useState<"primary" | "secondary">("primary");

    const buttonRef = useRef<HTMLDivElement>(null);
    useLayoutEffect(() => {
        const cleanup = withResponsive(({ isDesktop, isReducedMotion }) => {
            if (isReducedMotion) return () => {}; // Skip animations if reduced motion is preferred

            if (isDesktop) {
                const heroButtonCleanup = heroButtonAnimations({
                    buttonRef,
                    setVariant,
                });

                const charsCleanup = charsRevealAnimation(".split");

                return () => {
                    if (heroButtonCleanup) heroButtonCleanup();
                    charsCleanup();
                };
            }
        });
        return cleanup;
    }, []);

    return (
        <section className={styles.heroSection} aria-labelledby="hero-title">
            <div className={styles.heroContent}>
                <header>
                    <h1 id="hero-title" className={`${styles.heroTitle} split`}>
                        Hi, I’m Gino, <br /> full-stack developer <br /> From
                        France to NZ
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
                    full-stack
                    <br />
                    developer
                </span>
            </div>
        </section>
    );
}
