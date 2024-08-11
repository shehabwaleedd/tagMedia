'use client'
import React, { useRef, useEffect, useState } from 'react';
import styles from "./style.module.scss";
import Link from 'next/link';
import Image from 'next/image';
import RoundedButton from '@/animation/RoundedButton';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import useWindowSize from '@/hooks/useWindowWidth';
import { usePathname } from 'next/navigation';


interface Project {
    _id: string;
    name: string;
    image: {
        url: string;
    };
    slug: string;
    role: string;
    year: string;
}


interface ProjectItemProps {
    project: Project;
    index: number;
    isActor: boolean;
}


const ProjectItem: React.FC<ProjectItemProps> = ({ project, index, isActor }) => {
    const type = isActor ? 'actor' : 'series';
    const href = `/work/${type}/${project._id}/${project.slug}`;



    return (
        <div className={styles.projectItem} data-index={index}>
            <div className={styles.projectItem__image}>
                <Image src={project.image.url} width={800} height={800} alt={project.name} placeholder='blur' blurDataURL={project.image.url} />
            </div>
            <div className={styles.projectItem__info}>
                <h3>{project.name}</h3>
                <RoundedButton>
                    <Link href={href}>Explore More</Link>
                </RoundedButton>
            </div>
        </div>
    );
};

interface ProjectsHomePageProps {
    work: Project[];
    instanceId: string;
    isActor: boolean;
}

const ProjectsHomePage: React.FC<ProjectsHomePageProps> = ({ work, instanceId, isActor }) => {
    const sectionRef = useRef<HTMLElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const [displayedProjects, setDisplayedProjects] = useState<Project[]>([]);
    const { isMobile } = useWindowSize();
    const pathname = usePathname();

    useEffect(() => {
        if (pathname === '/work') {
            setDisplayedProjects(work);
        } else {
            const limit = isMobile ? 5 : 8;
            setDisplayedProjects(work.slice(0, limit));
        }
    }, [work, isMobile, pathname]);

    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);

        let mm = gsap.matchMedia();

        mm.add("(min-width: 769px)", () => {
            if (sectionRef.current && containerRef.current) {
                const columns = gsap.utils.toArray<HTMLElement>(`.${styles.projectColumn}[data-instance-id="${instanceId}"]`);

                // Initial setup
                gsap.set(columns[1], { y: '5%' }); // Center column starts lower

                const tl = gsap.timeline({
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: "top bottom",
                        end: "bottom top",
                        scrub: 0.5, // Smooth scrubbing effect
                        invalidateOnRefresh: true,
                    }
                });

                // Animate center column
                tl.to(columns[1], {
                    y: '-60%', // Move center column up faster
                    ease: "power1.inOut",
                }, 0);

                // Animate outer columns
                tl.to([columns[0], columns[2]], {
                    y: '-50%', // Move outer columns up slower
                    ease: "power1.inOut",
                }, 0);
            }
        });

        return () => {
            mm.revert();
        };
    }, [instanceId]);

    const columnProjects: Project[][] = [
        displayedProjects.filter((_, i) => i % 3 === 0),
        displayedProjects.filter((_, i) => i % 3 === 1),
        displayedProjects.filter((_, i) => i % 3 === 2)
    ];

    return (
        <section className={styles.projectsSection} ref={sectionRef} data-instance-id={instanceId}>
            <div className={styles.projectsContainer} ref={containerRef}>
                {columnProjects.map((projects, columnIndex) => (
                    <div
                        key={columnIndex}
                        className={styles.projectColumn}
                        data-instance-id={instanceId}
                    >
                        {projects.map((project, projectIndex) => (
                            <ProjectItem
                                key={projectIndex}
                                project={project}
                                index={projectIndex}
                                isActor={isActor}
                            />
                        ))}
                    </div>
                ))}
            </div>
        </section>
    );
}

export default ProjectsHomePage;