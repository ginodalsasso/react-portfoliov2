import { Link } from "react-router-dom";
import styles from "./Projects.module.css";
import { projects } from "../../../constants/constants";
import { useLayoutEffect, useRef, useState } from "react";
import { projectsAnimationsScroll } from "../../../lib/animations/projectsAnimations";
import gituhubIcon from "../../../assets/icons/github.svg";

export default function Projects() {
    const [currentProjectIndex, setCurrentProjectIndex] = useState(0);
    const pinRef = useRef<HTMLElement | null>(null);
    const trackRef = useRef<HTMLUListElement | null>(null);

    useLayoutEffect(() => {
        const cleanup = projectsAnimationsScroll({ 
            pinRef, 
            trackRef,
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
                <div className={styles.projectIdDisplay}>
                    <span className={styles.projectNumber}>
                        {projects[currentProjectIndex]?.id.toString()}
                    </span>
                    <p>{projects[currentProjectIndex]?.description}</p>
                </div>

                {/* List of all projects */}
                <ul ref={trackRef} className={styles.projectList}>
                    {projects.map((project) => (
                        <li key={project.id}>
                            <article className={`${styles.projectItem} project-item-animation`}>
                                <header className={styles.projectHeader}>
                                    <h3 id={`project-header-${project.id}`}>
                                        {project.href ? (
                                            <Link to={project.href}>{project.title}</Link>
                                        ) : (
                                            <span>{project.title}</span>
                                        )}
                                    </h3>
                                    {gituhubIcon && project.href && (
                                        <Link to={project.href} target="_blank" rel="noopener noreferrer">
                                            <img src={gituhubIcon} className={styles.githubIcon} alt="GitHub" />
                                        </Link>
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
