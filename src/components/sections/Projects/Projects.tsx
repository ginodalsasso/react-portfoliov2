import { Link } from "react-router-dom";
import styles from "./Projects.module.css";
import { projects } from "../../../constants/constants";

export default function Projects() {
    return (
        <section className={styles.projectsSection}>
            <header>
                <h2>[ projects ]</h2>
            </header>
            <ul className={styles.projectList}>
                {projects.map((project) => (
                    <li key={project.id} className={styles.projectItem}>
                        <article>
                            <header>
                                <h3>
                                    {project.href ? (
                                        <Link to={project.href}>
                                            {project.title}
                                        </Link>
                                    ) : (
                                        <span>{project.title}</span>
                                    )}
                                </h3>
                            </header>
                            {project.tags && (
                                <ul className={styles.tagList}>
                                    {project.tags.map((tag: string) => (
                                        <li
                                            key={`${project.id}-${tag}`}
                                            className={styles.tag}
                                        >
                                            {tag}
                                        </li>
                                    ))}
                                </ul>
                            )}
                            <p>{project.description}</p>
                        </article>
                    </li>
                ))}
            </ul>
        </section>
    );
}
