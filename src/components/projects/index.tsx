'use client'
import React, { useRef, useEffect, useState } from 'react';
import styles from "./style.module.scss";
import Link from 'next/link';
import Image from 'next/image';
import RoundedButton from '@/animation/RoundedButton';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import useWindowSize from '@/hooks/useWindowWidth';

interface Project {
    name: string;
    image: {
        url: string;
    };
    role: string;
    year: string;
}

const ProjectItem: React.FC<{ project: Project; index: number }> = ({ project, index }) => {


    return (
        <div className={styles.projectItem} data-index={index}>
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

interface ProjectsHomePageProps {
    work: Project[];
}

const ProjectsHomePage: React.FC<ProjectsHomePageProps> = ({ work }) => {
    const sectionRef = useRef<HTMLDivElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const [displayedProjects, setDisplayedProjects] = useState<Project[]>([]);
    const { isMobile } = useWindowSize();

    useEffect(() => {
        const limit = isMobile ? 5 : 8;
        setDisplayedProjects(work.slice(0, limit));
    }, [work, isMobile]);



    useEffect(() => {
        if (sectionRef.current && containerRef.current) {
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top 80%",
                    end: "bottom center",
                    scrub: 1,
                }
            });
            // Animate columns
            // Get all columns
            const columns = gsap.utils.toArray<HTMLElement>(`.${styles.projectColumn}`);

            // Animate columns with reversed index
            columns.forEach((column, columnIndex) => {
                const reversedIndex = columns.length - 1 - columnIndex;
                tl.to(column, {
                    y: `-${15 + (reversedIndex + 1) * 25}%`,
                    ease: "none",
                }, 0);
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
        <section className={styles.projectsSection} ref={sectionRef}>
            <div className={styles.projectsContainer} ref={containerRef}>
                {columnProjects.map((projects, columnIndex) => (
                    <div
                        key={columnIndex}
                        className={styles.projectColumn}
                    >
                        {projects.map((project, projectIndex) => (
                            <ProjectItem
                                key={projectIndex}
                                project={project}
                                index={projectIndex}
                            />
                        ))}
                    </div>
                ))}
            </div>

        </section>
    );
}

export default ProjectsHomePage;

