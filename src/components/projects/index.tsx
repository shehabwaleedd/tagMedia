'use client'
import React, { useRef, useEffect, useState } from 'react';
import styles from "./style.module.scss";
import Link from 'next/link';
import Image from 'next/image';
import RoundedButton from '@/animation/RoundedButton';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import useWindowWidth from '@/hooks/useWindowWidth'; // Assume this hook exists

gsap.registerPlugin(ScrollTrigger);

interface Project {
    name: string;
    image: {
        url: string;
    };
    role: string;
    year: string;
}

const ProjectItem: React.FC<{ project: Project }> = ({ project }) => {
    return (
        <div className={styles.projectItem}>
            <div className={styles.projectItem__image}>
                <Image src={project.image.url} width={800} height={800} alt={project.name} placeholder='blur' blurDataURL={project.image.url} />
            </div>
            <div className={styles.projectItem__info}>
                <h3>{project.name}</h3>
                <RoundedButton>
                    <Link href="/projects">Explore More</Link>
                </RoundedButton>
            </div>
        </div>
    );
};

const ProjectsHomePage: React.FC<{ work: Project[] }> = ({ work }) => {
    const columnRefs = useRef<(HTMLDivElement | null)[]>([]);
    const sectionRef = useRef<HTMLElement>(null);
    const { isMobile } = useWindowWidth();
    const [displayedProjects, setDisplayedProjects] = useState<Project[]>([]);

    useEffect(() => {
        const limit = isMobile ? 5 : 8;
        setDisplayedProjects(work.slice(0, limit));
    }, [work, isMobile]);

    useEffect(() => {

        if (sectionRef.current && !isMobile) {
            const sectionHeight = sectionRef.current.offsetHeight;
            const scrollDistance = sectionHeight * 2; // Adjust this multiplier to control the scroll distance

            columnRefs.current.forEach((column, index) => {
                if (column) {
                    gsap.fromTo(column,
                        { y: 0 },
                        {
                            y: index % 2 === 0 ? -scrollDistance * 0.5 : -scrollDistance * 0.6,
                            ease: "none",
                            scrollTrigger: {
                                trigger: sectionRef.current,
                                start: "top top",
                                end: `+=${scrollDistance}`,
                                scrub: 1,

                            }
                        }
                    );
                }
            });
        }

        return () => {
            ScrollTrigger.getAll().forEach(trigger => trigger.kill());

        };
    }, []);

    const columnProjects = [
        displayedProjects.filter((_, i) => i % 3 === 0),
        displayedProjects.filter((_, i) => i % 3 === 1),
        displayedProjects.filter((_, i) => i % 3 === 2)
    ];

    return (
        <section ref={sectionRef} className={styles.projectsSection}>
            <div className={styles.projectsContainer}>
                {columnProjects.map((projects, columnIndex) => (
                    <div
                        key={columnIndex}
                        className={styles.projectColumn}
                        ref={el => columnRefs.current[columnIndex] = el}
                    >
                        {projects.map((project, projectIndex) => (
                            <ProjectItem key={projectIndex} project={project} />
                        ))}
                    </div>
                ))}
            </div>
            {work.length > displayedProjects.length && (
                <div className={styles.showMoreContainer}>
                    <RoundedButton>
                        <Link href="/projects">Show More Projects</Link>
                    </RoundedButton>
                </div>
            )}
        </section>
    );
}

export default ProjectsHomePage;