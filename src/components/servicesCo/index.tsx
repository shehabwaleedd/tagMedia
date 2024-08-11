import React from 'react';
import styles from './style.module.scss';

type Service = {
    name: string;
    services: string[];
};

const hardcodedService: Service = {
    name: "End-to-end",
    services: ['Creative execution']
};

interface ServicesComponentProps {
    data: Service[];
}

const ServicesComponent: React.FC<ServicesComponentProps> = ({ data }) => {
    const allServices = [hardcodedService, ...data];

    return (
        <section className={styles.servicesContainer}>
            <div>
                <h3> We offer </h3>
            </div>
            <div className={styles.servicesList}>
                {allServices.map((service, index) => (
                    index === 0 ? (
                        <div key={index} className={styles.specialCard}>
                            <h3>{service.name}</h3>
                            <p>{service.services[0]}</p>
                        </div>
                    ) : (
                        <div key={index} className={styles.serviceCard}>
                            <div className={styles.serviceHeader}>
                                <h3>{service.name}</h3>
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