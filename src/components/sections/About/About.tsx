import styles from "./About.module.css";

export default function About() {
    return (
        <section className={styles.aboutSection} aria-labelledby="about-title">
            <header>
                <h2 className="section-title">[ about me ]</h2>
            </header>
            <div className="section-content">
                <p>
                    Hello world!
                </p>
                <p>
                    Tech enthusiast since my teens, I started by building websites
                    and forums before spending 17 years in carpentry, learning
                    precision, patience, and teamwork.
                </p>
                <p>
                    During a two-year stay in Australia, I gained adaptability and
                    improved my English. But my passion for tech never truly faded.
                    It led me to a full career shift: one year of intensive formal
                    training, followed by two years of hands-on projects and
                    self-learning driven by insatiable curiosity.
                </p>
            </div>
        </section>
    );
}
