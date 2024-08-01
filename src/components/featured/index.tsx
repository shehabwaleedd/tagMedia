import React from 'react';
import styles from "./style.module.scss"
import ProjectsHomePage from '@/components/projects';

const Projects = ({ work }: {
    work: {
        name: string;
        image: {
            url: string;
        };
        role: string;
        year: string;
    }[];
}) => {


    return (
        <section className={styles.featured}>
            <ProjectsHomePage work={work} />
        </section>
    );
}

export default Projects