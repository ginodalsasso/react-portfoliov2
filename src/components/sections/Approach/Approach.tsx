import styles from "./Approach.module.css";

export default function Approach() {
    return (
        <section
            className={styles.approachSection}
            aria-labelledby="approach-title"
        >
            <header>
                <h2 className="section-title">[ my approach ]</h2>
            </header>
            <div className="section-content">
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
