import React from 'react'
import styles from "./page.module.scss"
import AboutUpper from './components/upper'
import AboutLower from './components/lower'
import { serverDynamicFetch } from '@/lib/serverDynamicFetch'
import Team from './components/team'
import Clients from './components/clients'
import Video from '@/components/video'
import WorkWithUs from '@/components/workWithUs'

export default async function About() {
    const team = await serverDynamicFetch('team');
    const logos = await serverDynamicFetch('logo');

    return (
        <main className={styles.about}>
            <AboutUpper />
            <AboutLower />
            <Video />
            <Clients data={logos} />
            <Team team={team} />
            <WorkWithUs />
        </main>
    )
}

