import React from 'react';
import styles from './style.module.scss';

const ContactPage = () => {
    return (
        <section className={styles.contactUpper}>
            <ContactInfo />
        </section>
    );
};

const ContactInfo = () => {
    return (
        <section className={styles.contactInfo} aria-label="Contact Information and Location">
            <div className={styles.mapContainer}>
                <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3454.342879991371!2d30.973928600000004!3d30.027019499999998!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14585120305cd70f%3A0x20eb066dcfa73b76!2sTag%20Media!5e0!3m2!1sen!2seg!4v1724228715972!5m2!1sen!2seg"
                    width="600"
                    height="450"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Tag Media Location"
                    aria-label="Google Maps showing Tag Media location"
                ></iframe>
            </div>
            <div className={styles.contactDetails}>
                <address>
                    <p lang="en">
                        Villa 99, Al-Hikma Street, Neighborhood 3, District 8, Sheikh Zayed
                    </p>
                    <p>
                        Phone: <a href="tel:+201128989894">01128989894</a>
                    </p>
                </address>
            </div>
        </section>
    );
};

export default ContactPage;