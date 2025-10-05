import { useLayoutEffect } from "react";
import { useLayeredAnimation } from "../../../lib/animations/sectionAnimations";
import Logo from "../../layout/ui/Logo/Logo";
import styles from "./Goals.module.css";
import {
    textRevealUpAnimation,
    wordRevealAnimation,
} from "../../../lib/animations/textAnimations";
import { withResponsive } from "../../../lib/animations/utils/withResponsive";

export default function Goals() {
    const sectionRef = useLayeredAnimation(); // use of layered pin animation hook

    useLayoutEffect(() => {
        const section = sectionRef.current;
        if (!section) return;

        const cleanup = withResponsive(({ isMobile, isReducedMotion }) => {
            if (isReducedMotion) return () => {}; // Skip animations if reduced motion is preferred

            const textRevealCleanup = textRevealUpAnimation(section, {
                childSelector: "[data-reveal-up]",
                y: isMobile ? 40 : 200,
            });
            const wordCleanup = wordRevealAnimation(section, {
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
            id="goals"
            className={`${styles.goalsSection} layered-animation`}
            ref={sectionRef}
            aria-labelledby="goals-title"
        >
            <div className="centered-section-logo">
                <Logo size={36} bgColor="black" roundColor="accent" />
            </div>
            <header>
                <h2 className="section-title" data-reveal-up>
                    [ my goals in NZ ]
                </h2>
            </header>

            <div className="section-content" data-reveal-up data-word-reveal>
                <p>
                    <strong>New Zealand</strong> represents more than just a
                    professional opportunity for me—it's a place where I aspire
                    to <em>grow, contribute</em>, and be part of an{" "}
                    <strong>inspiring tech community</strong>. My goal is to
                    work on <em>meaningful projects</em> and join a team that
                    values both <strong>technical excellence</strong> and{" "}
                    <strong>human connection</strong>.
                </p>
                <p>
                    I believe that great development is not just about writing
                    <em>clean and efficient code</em>, but also about{" "}
                    <strong>collaboration, empathy</strong>, and a{" "}
                    <strong>shared vision</strong>.
                </p>
            </div>
        </section>
    );
}
