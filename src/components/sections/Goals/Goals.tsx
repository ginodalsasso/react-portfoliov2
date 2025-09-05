import Logo from "../../layout/ui/Logo/Logo";
import styles from "./Goals.module.css";

export default function Goals() {
    return (
        <section
            id="goals"
            className={styles.goalsSection}
            aria-labelledby="goals-title"
        >
            <header>
                <h2 className="section-title">[ my goals in NZ ]</h2>
            </header>
            <div className="section-content">
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
            <Logo size={36} bgColor="white" roundColor="black" />
        </section>
    );
}
