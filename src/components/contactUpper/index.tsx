import React from 'react';
import styles from './style.module.scss';
import { KeyTextField, NumberField } from '@prismicio/client';
import { FaWhatsapp } from "react-icons/fa6";
import Link from 'next/link';

const ContactPage = ({
    iFrameLink,
    address,
    phone
}: {
    iFrameLink: KeyTextField;
    address: KeyTextField;
    phone: NumberField;
}) => {
    return (
        <section className={styles.contactUpper}>
            <ContactUpper iFrameLink={iFrameLink} address={address} phone={phone} />
        </section>
    );
};

const ContactUpper = ({
    iFrameLink,
    address,
    phone
}: {
    iFrameLink: KeyTextField;
    address: KeyTextField;
    phone: NumberField;
}) => {
    return (
        <section className={styles.contactUpper} aria-label="Contact Information and Location">
            <div className={styles.contactInfoContainer}>
                <div className={styles.mapContainer}>
                    <iframe
                        src={iFrameLink || "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3454.342879991371!2d30.973928600000004!3d30.027019499999998!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14585120305cd70f%3A0x20eb066dcfa73b76!2sTag%20Media!5e0!3m2!1sen!2seg!4v1724228715972!5m2!1sen!2seg"}
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
                            {address}
                        </p>
                        <p>
                            Phone: <a href={`tel:${phone}`}>{phone}</a>
                        </p>
                    </address>
                    <Link href={`https://api.whatsapp.com/send?phone=${phone}`} target="_blank" rel="noopener noreferrer">
                        <button className={styles.whatsappButton} >
                            <FaWhatsapp />
                            WhatsApp
                        </button>
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default ContactUpper;