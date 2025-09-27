import { useLayoutEffect, useRef } from "react";
import styles from "./About.module.css";
import { textRevealUpAnimation } from "../../../lib/animations/textAnimations";

export default function About() {
    const sectionRef = useRef<HTMLElement | null>(null);

    useLayoutEffect(() => {
        const section = sectionRef.current;
        if (!section) return;
        if (window.innerWidth < 768) return; // Skip animation on mobile

        const textRevealCleanup = textRevealUpAnimation(section, {
            childSelector: "[data-reveal]",
            y: 0,
            x: 96,
        });

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
                <h2 className="section-title" data-reveal>
                    [ about me ]
                </h2>
            </header>
            <div className="section-content" data-reveal>
                <p>Hello world!</p>
                <p>
                    A <strong>tech enthusiast</strong> since my teens, I first
                    built websites and forums before spending{" "}
                    <em>17 years in carpentry</em>, honing precision and
                    teamwork—my path wasn't linear.
                </p>
                <p>
                    A transformative stay in <strong>Australia</strong>{" "}
                    reignited my dormant passion for technology.
                </p>
                <p>
                    That spark became a flame: one year of intensive training,
                    two years of relentless self-learning, and countless
                    projects fueled by pure curiosity.
                </p>
                <p>
                    Sometimes the best journeys take you full circle.
                </p>
            </div>
        </section>
    );
}
