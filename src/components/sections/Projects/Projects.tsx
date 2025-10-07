import styles from "./Projects.module.css";
import { projects } from "../../../lib/constants/constants";
import { useLayoutEffect, useRef, useState } from "react";
import { projectsAnimationsScroll } from "../../../lib/animations/projectsAnimations";

export default function Projects() {
    const [currentProjectIndex, setCurrentProjectIndex] = useState(0);
    const pinRef = useRef<HTMLElement | null>(null);
    const trackRef = useRef<HTMLUListElement | null>(null);

    useLayoutEffect(() => {
        const cleanup = projectsAnimationsScroll({ 
            pinRef, 
            trackRef,
            pannelSelector: ".project-item-animation",
            onProjectChange: setCurrentProjectIndex 
    });
        return () => {
            if (cleanup) cleanup();
        };
    }, []);

    return (
        <section id="projects" ref={pinRef} className={styles.projectsSection}>
            <header>
                <h2 className="section-title">[ projects ]</h2>
            </header>

            <div className={styles.projectsWrapper}>
                {/* Displaying ID project */}
                <div className={styles.projectNumber}>
                    {projects[currentProjectIndex]?.id.toString()}
                </div>
                <p className={styles.projectDescription}>{projects[currentProjectIndex]?.description}</p>

                {/* List of all projects */}
                <ul ref={trackRef} className={styles.projectList}>
                    {projects.map((project) => (
                        <li key={project.id}>
                            <article className={`${styles.projectItem} project-item-animation`}>
                                <header className={styles.projectHeader}>
                                    <h3 id={`project-header-${project.id}`}>
                                        {project.href ? (
                                            <a href={project.href}>{project.title}</a>
                                        ) : (
                                            <span>{project.title}</span>
                                        )}
                                    </h3>
                                    {project.icon && project.href && (
                                        <a href={project.href} target="_blank" rel="noopener noreferrer">
                                            <img src={project.icon} className={styles.githubIcon} alt="link icon" />
                                        </a>
                                    )}
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
                            </article>
                        </li>
                    ))}
                </ul>
            </div>
        </section>
    );
}
