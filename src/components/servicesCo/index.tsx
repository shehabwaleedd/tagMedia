import React from 'react';
import styles from './style.module.scss';
import RoundedButton from '@/animation/RoundedButton';
import Link from 'next/link';
// Import icons from react-icons
import { FaLightbulb, FaBullhorn, FaUsers, FaChartLine, FaUserFriends, FaFilm } from 'react-icons/fa';

type Service = {
    title: string;
    services: string[];
    icon: JSX.Element;
};

const data: Service[] = [
    {
        title: "Brand Strategy",
        services: [
            "Research and Insight",
            "Brand Purpose & Positioning",
            "Naming & Copywriting",
            "Brand Strategy",
            "Competitive Study",
            "Brand Architecture",
        ],
        icon: <FaLightbulb />,
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
        icon: <FaBullhorn />,
    },
    {
        title: "Community Management",
        services: [
            "Community Engagement Strategies",
            "Social Listening",
            "Content Moderation",
            "Feedback Collection",
            "Community Growth",
            "Event Planning & Management",
        ],
        icon: <FaUsers />,
    },
    {
        title: "Media Buying",
        services: [
            "Platform Selection",
            "Budget Allocation",
            "Performance Analysis",
            "Ad Placement Optimization",
        ],
        icon: <FaChartLine />,
    },
    {
        title: "Influencer Marketing",
        services: [
            "Influencer Identification",
            "Campaign Strategy",
            "Content Co-creation",
            "Performance Tracking",
        ],
        icon: <FaUserFriends />,
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
        icon: <FaFilm />,
    },
];

const ServicesComponent = () => {
    return (
        <section className={styles.servicesContainer}>

            <div className={styles.servicesList}>
                {data.map((service, index) => (
                    <div key={index} className={styles.serviceCard}>
                        <div className={styles.serviceIcon}>{service.icon}</div>
                        <div className={styles.serviceHeader}>
                            <h3>{service.title}</h3>
                        </div>
                        <ul>
                            {service.services.map((item, idx) => (
                                <li key={idx}>{item}</li>
                            ))}
                        </ul>
                        <RoundedButton>
                            <Link href="/contact">Get in touch</Link>
                        </RoundedButton>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default ServicesComponent;
