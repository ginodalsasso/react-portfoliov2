import { useLayoutEffect, useRef, useState } from "react";
import styles from "./Hero.module.css";
import Button from "../../layout/ui/Button/Button";
import { heroButtonAnimations } from "../../../lib/animations/heroAnimations";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { charsRevealAnimation } from "../../../lib/animations/textAnimations";
import { withResponsive } from "../../../lib/animations/utils/withResponsive";
import OptimizedImage from "../../layout/ui/OptimizedImage/OptimizedImage";
import { profilePic2 } from "../../../assets/img";

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
    const [variant, setVariant] = useState<"primary" | "secondary">("primary");
    const buttonRef = useRef<HTMLDivElement>(null);

    useLayoutEffect(() => {
        // responsive + animations texte + bouton
        const cleanupResponsive = withResponsive(
            async ({ isDesktop, isMobile, isReducedMotion }) => {
                if (isReducedMotion) return () => {};

                const heroButtonCleanup = heroButtonAnimations({
                    buttonRef,
                    setVariant,
                    enableScrollTrigger: isDesktop && !isMobile,
                });

                const charsCleanup = await charsRevealAnimation(".split");

                return () => {
                    heroButtonCleanup();
                    charsCleanup?.();
                };
            }
        );

        // cleanup
        return () => {
            cleanupResponsive();
        };
    }, []);
    

    return (
        <section className={styles.heroSection} aria-labelledby="hero-title">
            <div className={styles.heroContent}>
                <header>
                    <h1 id="hero-title" className={`${styles.heroTitle} split`}>
                        Hi, I’m Gino, <br /> full-stack developer <br /> from
                        France to NZ
                    </h1>
                </header>
                <div className={styles.heroMedia}>
                    <OptimizedImage
                        src={profilePic2}
                        alt="Portrait"
                        className={`${styles.heroImage} ${styles.img2}`}
                        loading="lazy"
                    />
                    <div ref={buttonRef} className={styles.buttonContainer}>
                        <Button
                            aria-label="Contact me"
                            variant={variant}
                            size="medium"
                        >
                            <a href="mailto:dalsasso.gino@gmail.com">
                                dalsasso.gino@gmail.com
                            </a>
                        </Button>
                    </div>
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
