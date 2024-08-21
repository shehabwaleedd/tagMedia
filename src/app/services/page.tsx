import React from 'react'
import ServicesComponent from '@/components/servicesCo'
import { serverDynamicFetch } from '@/lib/serverDynamicFetch';
import styles from "./page.module.scss"
const ServicesPage = async () => {

    const services = await serverDynamicFetch('service');


    return (
        <main className={styles.servicesPage}>
            <ServicesComponent data={services} />
        </main>
    )
}

export default ServicesPage