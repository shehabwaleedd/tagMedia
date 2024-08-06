'use client'
import React, { useState } from 'react'
import styles from './page.module.scss'

import AllTours from '@/components/accountComponents/allNews'
import DisplayEntities from './components/displayEntity'
import { AnimatePresence, motion } from 'framer-motion'
import AdminView from "@/components/accountViews/admin"
import CreateNews from './components/createNews/page'
import CreateCommon from './components/createCommon'
import EditAboutPage from './edit/aboutPage/page'
import SEOForm from './edit/dynamicSEO'


const Account = () => {
    const [activeSection, setActiveSection] = useState<string>('news');


    const handleOpen = (sectionName: string) => () => {
        setActiveSection(sectionName);
    };

    return (
        <main className={styles.account}>
            <div className={styles.account__lower}>
                <div className={styles.account__lower_left}>
                    <div className={styles.account__lower_left_lower}>
                        <AdminView handleOpen={handleOpen} />
                    </div>
                </div>

                <div className={styles.account__lower_right}>
                    <AnimatePresence mode='wait'>
                        {activeSection === 'createNews' && <CreateNews />}
                        {activeSection === 'createPartner' && <CreateCommon type='partner' />}
                        {activeSection === 'createWorkedWith' && <CreateCommon type='workedWith' />}
                        {activeSection === 'createTeam' && <CreateCommon type='team' />}
                        {activeSection === 'createPortfolio' && <CreateCommon type='portfolio' />}
                        {activeSection === 'createService' && <CreateCommon type='service' />}
                        {activeSection === 'createLogo' && <CreateCommon type='logo' />}
                        {activeSection === 'createIntegration' && <CreateCommon type='integration' />}
                        {activeSection === 'partners' && <DisplayEntities type='partner' />}
                        {activeSection === 'workedWith' && <DisplayEntities type='workedWith' />}
                        {activeSection === 'team' && <DisplayEntities type='team' />}
                        {activeSection === 'portfolio' && <DisplayEntities type='portfolio' />}
                        {activeSection === 'services' && <DisplayEntities type='service' />}
                        {activeSection === 'logos' && <DisplayEntities type='logo' />}
                        {activeSection === 'integrations' && <DisplayEntities type='integration' />}
                        {activeSection === 'aboutPage' && <EditAboutPage />}
                        {activeSection === 'aboutPageSEO' && <SEOForm page="about" />}
                        {activeSection === 'homePageSEO' && <SEOForm page="homePage" />}
                        {activeSection === 'workPageSEO' && <SEOForm page="work" />}
                        {activeSection === 'newsPageSEO' && <SEOForm page="news" />}
                        {activeSection === 'contactPageSEO' && <SEOForm page="contact" />}
                        {activeSection === 'news' && <AllTours />}
                        {activeSection === '' && <div className={styles.account__lower_right_default} style={{ padding: "1rem" }}><h2>Select a section to view</h2></div>}
                    </AnimatePresence>
                </div>

            </div>
        </main>
    )
}

export default Account