import { useLayoutEffect } from "react";
import { useLayeredAnimation } from "../../../lib/animations/sectionAnimations";
import Logo from "../../layout/ui/Logo/Logo";
import styles from "./Approach.module.css";
import {
    textRevealUpAnimation,
    wordRevealAnimation,
} from "../../../lib/animations/textAnimations";
import { withResponsive } from "../../../lib/animations/utils/withResponsive";

export default function Approach() {
    const sectionRef = useLayeredAnimation(); // use of layered pin animation hook

    useLayoutEffect(() => {
        const section = sectionRef.current;
        if (!section) return;

        const cleanup = withResponsive(async ({ isMobile, isReducedMotion }) => {
            if (isReducedMotion) return () => {}; // Skip animations if reduced motion is preferred

            const textRevealCleanup = await textRevealUpAnimation(section, {
                childSelector: "[data-reveal-up]",
                y: isMobile ? 40 : 250,
            });

            const wordCleanup = await wordRevealAnimation(section, {
                childSelector: "[data-word-reveal]",
            });

            return () => {
                textRevealCleanup();
                wordCleanup();
            };
        });
        return cleanup;
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
                <h2 className="section-title" data-reveal-up>
                    [ my approach ]
                </h2>
            </header>
            <div className="section-content" data-reveal-up data-word-reveal>
                <p>
                    Development is a <strong>passion-driven craft</strong> that
                    demands rigor, curiosity, and total immersion. I approach
                    each project with
                    <em>precision and care</em>, always striving for clean,
                    efficient solutions that balance aesthetics and
                    functionality.
                </p>

                <p>
                    I find real satisfaction in{" "}
                    <strong>solving problems</strong>, sometimes frustrating,
                    always rewarding and I stay sharp by learning through
                    practice, staying informed, and{" "}
                    <em>building for the joy of it</em>.
                </p>
            </div>

            <p className={`${styles.approachContentLast}`} data-reveal-up>
                My approach is built on <strong>stability</strong> and{" "}
                <strong>sincerity</strong>.
            </p>
        </section>
    );
}
