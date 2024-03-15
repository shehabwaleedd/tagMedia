'use client'
import React, { useState, useCallback } from 'react';
import styles from './page.module.scss';
import getChars from '@/animation/animatedHeaders/getChars';
import ProjectsAbsolute from '@/components/projectsAbsolute/ProjectsAbsolute';
import { data } from "@/components/services"
import useWindowWidth from '@/hooks/useWindowWidth';
import ProjectMobile from "./components/mobileView"
import DesktopProjects from "./components/desktopView"

const Projects = () => {
    const windowWidth = useWindowWidth();
    const isMobile = windowWidth < 568;
    const duplicatedProjects = Array.from({ length: 12 }, () => data).flat(); // Ensure enough duplicates for smooth scrolling

    const [projectState, setProjectState] = useState({
        detailsOpened: false,
        selectedProjectIndex: null,
        hoveredProjectIndex: null,
    });

    const handleProjectClick = useCallback((index) => {
        setProjectState(prevState => ({
            ...prevState,
            detailsOpened: true,
            selectedProjectIndex: index
        }));
    }, []);

    const handleDetailsClose = useCallback(() => {
        setProjectState(prevState => ({
            ...prevState,
            detailsOpened: false,
            selectedProjectIndex: null,
        }));
    }, []);







    return (
        <>
            <main className={styles.projects}>
                <div className={styles.projects_upper}>
                    {getChars("Our Projects")}
                </div>
                {isMobile ? (
                    <ProjectMobile projects={data} handleProjectClick={handleProjectClick} handleDetailsClose={handleDetailsClose} />
                ) : (
                    <DesktopProjects duplicatedProjects={duplicatedProjects} handleProjectClick={handleProjectClick} handleDetailsClose={handleDetailsClose} />
                )}
            </main>
            {/* <AnimatePresence mode='wait'>
                <div className="projectsPage__container">
                    <ProjectsAbsolute projectState={projectState} handleDetailsClose={handleDetailsClose} />
                </div>
            </AnimatePresence> */}
        </>
    );
};

export default Projects;
