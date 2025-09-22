import { useLayoutEffect, useRef } from "react";
import styles from "./About.module.css";
import { textRevealUpAnimation } from "../../../lib/animations/textAnimations";

export default function About() {
    const sectionRef = useRef<HTMLElement | null>(null);

    useLayoutEffect(() => {
        const section = sectionRef.current;
        if (!section) return;

        const textRevealCleanup = textRevealUpAnimation(section, { y: 0, x: 96 });

        return () => {
            textRevealCleanup();
        };
    }, [sectionRef]);

    return (
        <section
            id="about"
            className={styles.aboutSection}
            aria-labelledby="about-title"
            ref={sectionRef}
        >
            <header>
                <h2 className="section-title">[ about me ]</h2>
            </header>
            <div className="section-content" data-reveal-up>
                <p>Hello world!</p>
                <p>
                    Tech enthusiast since my teens, I started by building
                    websites and forums before spending 17 years in carpentry,
                    learning precision, patience, and teamwork.
                </p>
                <p>
                    During a two-year stay in Australia, I gained adaptability
                    and improved my English. But my passion for tech never truly
                    faded. It led me to a full career shift: one year of
                    intensive formal training, followed by two years of hands-on
                    projects and self-learning driven by insatiable curiosity.
                </p>
            </div>
        </section>
    );
}
