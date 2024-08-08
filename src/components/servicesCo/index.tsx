import React from 'react';
import styles from './style.module.scss';
import RoundedButton from '@/animation/RoundedButton';
import Link from 'next/link';

type Service = {
    title: string;
    services: string[];
};

const data: Service[] = [
    {
        title: "End-to-end",
        services: [
            ''
        ]
    },
    {
        title: "Content & Campaigns",
        services: [
            "Campaign Ideation",
            "Content Strategy",
            "Social & Content Production",
            "Video & Photography",
            "Ongoing Brand Management",
            "Go-to-market Planning",
        ],
    },
    {
        title: "Media Buying",
        services: [
            "Platform Selection",
            "Budget Allocation",
            "Performance Analysis",
            "Ad Placement Optimization",
        ],
    },
    {
        title: "Influencer Marketing",
        services: [
            "Influencer Identification",
            "Campaign Strategy",
            "Content Co-creation",
            "Performance Tracking",
        ],
    },
    {
        title: "Media Production",
        services: [
            "Video Production",
            "Photography",
            "Post-Production Editing",
            "Graphic Design",
            "Animation",
        ],
    },
];

const ServicesComponent = () => {
    return (
        <section className={styles.servicesContainer}>
            <div>
                <h3> We offer </h3>
            </div>
            <div className={styles.servicesList}>
                {data.map((service, index) => (
                    index === 0 ? (
                        <div key={index} className={styles.specialCard}>
                            <h3>{service.title}</h3>
                            <p>Creative execution</p>
                        </div>
                    ) : (
                        <div key={index} className={styles.serviceCard}>
                            <div className={styles.serviceHeader}>
                                <h3>{service.title}</h3>
                            </div>
                            <ul>
                                {service.services.map((item, idx) => (
                                    <li key={idx}>{item}</li>
                                ))}
                            </ul>
                        </div>
                    )
                ))}
            </div>
        </section>
    );
};

export default ServicesComponent;
