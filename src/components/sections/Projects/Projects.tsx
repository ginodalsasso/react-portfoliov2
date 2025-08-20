import { Link } from "react-router-dom";
import styles from "./Projects.module.css";
import { projects } from "../../../constants/constants";
import { useState } from "react";

export default function Projects() {
    const [openProjectId, setOpenProjectId] = useState<number | null>(null);

    const toggleProject = (id: number) => {
        setOpenProjectId(openProjectId === id ? null : id);
    };

    return (
        <section id="projects" className={styles.projectsSection}>
            <header>
                <h2 className="section-title ">[ projects ]</h2>
            </header>
            <ul className={styles.projectList}>
                {projects.map((project) => (
                    <li key={project.id}>
                        <article className={styles.projectItem}>
                            <header className={styles.projectHeader}>
                                <h3 id={`project-header-${project.id}`}>
                                    {project.href ? (
                                        <Link to={project.href}>
                                            {project.title}
                                        </Link>
                                    ) : (
                                        <span>{project.title}</span>
                                    )}
                                </h3>
                                <button
                                    onClick={() => toggleProject(project.id)}
                                    className={`
                                        ${styles.toggleButton}
                                        ${ openProjectId === project.id ? styles.open : "" } 
                                    `}
                                    aria-expanded={openProjectId === project.id} // if openProjectId is equal to project.id, button is expanded
                                    aria-controls={`project-panel-${project.id}`} // aria-controls for the project panel
                                    aria-label={`${openProjectId === project.id ? "Closed" : "Opened"} : ${project.title}`} // button label
                                >
                                    +
                                </button>
                            </header>
                            {openProjectId === project.id && (
                                <div 
                                    id={`project-panel-${project.id}`}
                                    className={styles.projectContent}
                                    role="region"
                                    aria-labelledby={`project-header-${project.id}`}
                                    hidden={openProjectId !== project.id} // hide if not expanded
                                >
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
