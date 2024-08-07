'use client'
import React, { useState, useEffect, useRef, ChangeEvent, FormEvent } from 'react';
import styles from "./style.module.scss"
import emailjs from '@emailjs/browser';
import RoundedButton from '@/animation/RoundedButton';
import global from "@/app/page.module.scss"

interface FormData {
    name: string;
    email: string;
    message: string;
}

// Define the type for form errors
interface FormErrors {
    name?: string;
    email?: string;
    message?: string;
}


const ContactForm = () => {
    const form = useRef<HTMLFormElement>(null);

    const [formData, setFormData] = useState<FormData>({
        name: "",
        email: "",
        message: "",
    });
    const [formErrors, setFormErrors] = useState<FormErrors>({});
    const sendEmail = () => {
        if (form.current) {
            emailjs.sendForm('service_5y7rll1', 'template_3xzot3e', form.current, '4nyzjigYhVGMwCX0W')
                .then((response) => {
                    console.log('Email sent:', response);
                    alert("Your message has been sent successfully!");
                })
                .catch((error) => {
                    console.error('Email error:', error);
                    alert("An error occurred while sending your message. Please try again later.");
                });

            setFormData({
                name: "",
                email: "",
                message: "",
            });
        }
    };

    const handleCheckboxChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, checked } = e.target;
        setFormData({ ...formData, [name]: checked });
    };

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        // Validate form fields
        const errors: FormErrors = {};
        if (formData.name.trim() === "") {
            errors.name = "Name is required";
        }
        if (formData.email.trim() === "") {
            errors.email = "Email is required";
        }
        if (formData.message.trim() === "") {
            errors.message = "Message is required";
        }
        if (Object.keys(errors).length === 0) {
            sendEmail();
            setFormErrors({}); // Clear form errors on successful submission
        } else {
            setFormErrors(errors);
        }
    };

    return (
        <section className={styles.contact_right}>
            <form onSubmit={handleSubmit} ref={form}>
                <div className={styles.contact_right__container}>
                    <div className={styles.contact_right__container__input}>
                        <label htmlFor="name">Name</label>
                        <input type="text" name="name" placeholder="John Doe" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} required />{formErrors.name && <p className="error-message">{formErrors.name}</p>}
                    </div>
                    <div className={styles.contact_right__container__input}>
                        <label htmlFor="email">Email</label>
                        <input type="email" name="email" placeholder="your@email.com" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} required />
                        {formErrors.email && <p className={styles.error}>{formErrors.email}</p>}
                    </div>
                    <div className={styles.contact_right__container__input}>
                        <label htmlFor="message">Message</label>
                        <textarea name="message" cols={30} rows={5} placeholder="Hello, I want to start a project about..." value={formData.message} onChange={(e) => setFormData({ ...formData, message: e.target.value })} required></textarea>
                        {formErrors.message && <p className={styles.error}>{formErrors.message}</p>}
                    </div>
                </div>
                <div className={styles.btn}>
                    <button type="submit" className={global.button}>
                        <p>Submit</p>
                    </button>
                </div>
            </form>
        </section>
    )
}

export default ContactForm