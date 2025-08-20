import { Link } from "react-router-dom";
import styles from "./Projects.module.css";
import { projects } from "../../../constants/constants";
import { useLayoutEffect, useRef, useState } from "react";
import { projectsAnimationsScroll } from "../../../lib/animations/projectsAnimations";

export default function Projects() {
    const [openProjectId, setOpenProjectId] = useState<number | null>(null);
    const pinRef = useRef<HTMLElement | null>(null);
    const trackRef = useRef<HTMLUListElement | null>(null);

    const toggleProject = (id: number) => {
        setOpenProjectId(openProjectId === id ? null : id);
    };

    useLayoutEffect(() => {
        const cleanup = projectsAnimationsScroll(pinRef, trackRef);
        return () => {
            if (cleanup) cleanup();
        };
    }, []);

    return (
        <section id="projects" ref={pinRef} className={styles.projectsSection} >
            <header>
                <h2 className="section-title ">[ projects ]</h2>
            </header>
            <ul ref={trackRef} className={styles.projectList}>
                {projects.map((project) => (
                    <li key={project.id}>
                        <article className={`${styles.projectItem} project-item-animation`}>
                            <header className={styles.projectHeader}>
                                <h3 id={`project-header-${project.id}`}>
                                    {project.href ? (
                                        <Link to={project.href}>
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
