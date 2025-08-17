import { Link } from "react-router-dom";
import styles from "./Projects.module.css";
import { projects } from "../../../constants/constants";
import { useState } from "react";

export default function Projects() {
    const [drawerOpen, setDrawerOpen] = useState(false);

    return (
        <section className={styles.projectsSection}>
            <header>
                <h2 className="section-title ">[ projects ]</h2>
            </header>
            <ul className={styles.projectList}>
                {projects.map((project) => (
                    <li key={project.id}>
                        <article className={styles.projectItem}>
                            <header className={styles.projectHeader}>
                                <h3>
                                    {project.href ? (
                                        <Link to={project.href}>
                                            {project.title}
                                        </Link>
                                    ) : (
                                        <span>{project.title}</span>
                                    )}
                                </h3>
                                <button 
                                    onClick={() => setDrawerOpen(!drawerOpen)} 
                                    className={`${styles.toggleButton} ${drawerOpen ? styles.open : ""}`}
                                >
                                    +
                                </button>
                            </header>
                            {drawerOpen && (
                                <div className={styles.projectContent}>
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
                                </div>
                            )}
                        </article>
                    </li>
                ))}
            </ul>
        </section>
    );
}
