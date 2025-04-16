'use client'
import React, { useState, useRef } from 'react';
import { toast } from 'sonner';
import emailjs from '@emailjs/browser';
import styles from "./style.module.scss";
import global from "@/app/page.module.scss";

interface FormData {
    name: string;
    email: string;
    message: string;
    number: number;
}

const initialFormData: FormData = {
    name: "",
    email: "",
    message: "",
    number: 0,
};

const ContactForm: React.FC = () => {
    const [formData, setFormData] = useState<FormData>(initialFormData);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const formRef = useRef<HTMLFormElement>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const sendEmail = async () => {
        if (!formRef.current) return;

        try {
            const response = await emailjs.sendForm(
                'service_8w0yrra',
                'template_hhjk74t',
                formRef.current,
                '5m5atldGOJSmu_rHK'
            );
            toast.success("Your message has been sent successfully!");
            setFormData(initialFormData);
        } catch (error) {
            console.error('Email error:', error);
            toast.error("An error occurred while sending your message. Please try again later.");
        }
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsSubmitting(true);

        const errors = Object.entries(formData).reduce((acc, [key, value]) => {
            if (!value.trim()) {
                acc[key as keyof FormData] = `${key.charAt(0).toUpperCase() + key.slice(1)} is required`;
            }
            return acc;
        }, {} as Partial<Record<keyof FormData, string>>);

        if (Object.keys(errors).length === 0) {
            await sendEmail();
        } else {
            Object.entries(errors).forEach(([field, message]) => {
                toast.error(message);
            });
        }

        setIsSubmitting(false);
    };

    return (
        <section className={styles.contact_right}>
            <form onSubmit={handleSubmit} ref={formRef}>
                <div className={styles.contact_right__container}>
                    <div className={styles.group}>
                        {['name', 'email', "number"].map((key) => (
                            <div key={key} className={styles.contact_right__container__input}>
                                <label htmlFor={key}>{key.charAt(0).toUpperCase() + key.slice(1)}</label>
                                <input
                                    type={key === 'email' ? 'email' : key === 'number' ? 'number' : 'text'}
                                    id={key}
                                    name={key}
                                    value={formData[key as keyof FormData]}
                                    onChange={handleChange}
                                    placeholder={`Enter your ${key}...`}
                                    required
                                />
                            </div>
                        ))}
                    </div>
                    <div className={styles.contact_right__container__input}>
                        <label htmlFor="message">Message</label>
                        <textarea
                            id="message"
                            name="message"
                            value={formData.message}
                            onChange={handleChange}
                            placeholder="Enter your message..."
                            required
                            rows={5}
                        />
                    </div>
                    <button type="submit" className={global.button} disabled={isSubmitting}>
                        <p>{isSubmitting ? 'Submitting...' : 'Submit'}</p>
                    </button>
                </div>
            </form>
        </section>
    );
};

export default ContactForm;