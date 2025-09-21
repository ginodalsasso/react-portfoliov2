import { useLayoutEffect } from "react";
import { useLayeredAnimation } from "../../../lib/animations/sectionAnimations";
import Logo from "../../layout/ui/Logo/Logo";
import styles from "./Goals.module.css";
import { textRevealUpAnimation, wordRevealAnimation } from "../../../lib/animations/textAnimations";

export default function Goals() {
    const sectionRef = useLayeredAnimation(); // use of layered pin animation hook

    useLayoutEffect(() => {
        const section = sectionRef.current;
        if (!section) return;

        const textRevealCleanup = textRevealUpAnimation(section);
        const wordCleanup = wordRevealAnimation(section);

        return () => {
            textRevealCleanup();
            wordCleanup();
        };
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
                <h2 className="section-title" data-reveal-up>[ my goals in NZ ]</h2>
            </header>
            <div className="section-content" data-reveal-up data-word-reveal>
                <p>
                    New Zealand represents more than just a professional
                    opportunity for me—it’s a place where I aspire to grow,
                    contribute, and be part of an inspiring tech community. My
                    goal is to work on meaningful projects and join a team that
                    values both technical excellence and human connection.
                </p>
                <p>
                    I believe that great development is not just about writing
                    clean and efficient code, but also about collaboration,
                    empathy, and a shared vision.
                </p>
            </div>
        </section>
    );
}
