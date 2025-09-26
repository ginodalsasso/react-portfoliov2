import { useLayoutEffect } from "react";
import { useLayeredAnimation } from "../../../lib/animations/sectionAnimations";
import Logo from "../../layout/ui/Logo/Logo";
import styles from "./Approach.module.css";
import { textRevealUpAnimation, wordRevealAnimation } from "../../../lib/animations/textAnimations";

export default function Approach() {
    const sectionRef = useLayeredAnimation(); // use of layered pin animation hook
    useLayoutEffect(() => {
        const section = sectionRef.current;
        if (!section) return;

        const textRevealCleanup = textRevealUpAnimation(section);
        const wordCleanup = wordRevealAnimation(section, { childSelector: "[data-word-reveal]" });

        return () => {
            textRevealCleanup();
            wordCleanup();
        };
    }, [sectionRef]);

    return (
        <section
            id="approach"
            className={`${styles.approachSection} layered-animation`}
            aria-labelledby="approach-title"
            ref={sectionRef}
        >
            <div className="centered-section-logo">
                <Logo size={36} bgColor="accent" roundColor="white" />
            </div>
            <header>
                <h2 className="section-title" data-reveal-up>[ my approach ]</h2>
            </header>
            <div className="section-content" data-reveal-up data-word-reveal>
                <p>
                    Development is a passion-driven craft that demands rigor,
                    curiosity, and total immersion. I approach each project with
                    precision and care, always striving for clean, efficient
                    solutions that balance aesthetics and functionality.
                </p>
                <p>
                    I find real satisfaction in solving problems, sometimes
                    frustrating, always rewarding and I stay sharp by learning
                    through practice, staying informed, and building for the joy
                    of it.
                </p>
            </div>
            <p className={styles.approachContentLast}>
                My approach is built on stability and sincerity.
            </p>
        </section>
    );
}
