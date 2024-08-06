import React from 'react'
import styles from "./page.module.scss"
import AboutUpper from './components/upper'
import AboutLower from './components/lower'
import ServicesCo from "@/components/servicesCo"
import { serverDynamicFetch } from '@/lib/serverDynamicFetch'
import Divider from '@/components/divider'
import Team from './components/team'
import Clients from './components/clients'
import Video from '@/components/video'
import WorkWithUs from '@/components/workWithUs'

export default async function About() {
    const team = await serverDynamicFetch('team');
    return (
        <main className={styles.about}>
            <AboutUpper />
            <AboutLower />
            <Video />
            <Clients />
            <WorkWithUs />
            <Team team={team} />
            <ServicesCo />
        </main>
    )
}

