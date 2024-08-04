'use client';

import React, { useEffect, useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import axios from 'axios';
import Cookies from 'js-cookie';
import * as Yup from 'yup';
import styles from '../../common.module.scss';

// Validation Schema
const validationSchema = Yup.object({
    title: Yup.string().required('Required'),
    description: Yup.string().required('Required'),
    keywords: Yup.string().required('Required'),
});

const SEOForm = ({ page }: { page: string }) => {
    const token = Cookies.get('token');
    const [initialValues, setInitialValues] = useState({
        title: '',
        description: '',
        keywords: '',
        image: '',
    });
    const [seoImage, setSeoImage] = useState<File | null>(null);
    const [seoImagePreview, setSeoImagePreview] = useState<string | null>(null);

    const handleSeoImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files[0]) {
            setSeoImage(event.target.files[0]);
            setSeoImagePreview(URL.createObjectURL(event.target.files[0]));
        }
    };

    useEffect(() => {
        const fetchInitialValues = async () => {
            if (!token) {
                console.error('No token found');
                return;
            }

            try {
                const response = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/variable`, {
                    headers: { token },
                });

                setInitialValues({
                    title: response.data[`${page}SeoTitle`] || '',
                    description: response.data[`${page}SeoDescription`] || '',
                    keywords: response.data[`${page}SeoKeywords`] || '',
                    image: response.data[`${page}SeoImage`] || '',
                });

                if (response.data[`${page}SeoImage`]) {
                    setSeoImagePreview(response.data[`${page}SeoImage`]);
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchInitialValues();
    }, [page, token]);

    const handleSubmit = async (values: any, { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void }) => {
        if (!token) {
            console.error('No token found');
            return;
        }

        const formData = new FormData();
        formData.append(`${page}SeoTitle`, values.title);
        formData.append(`${page}SeoDescription`, values.description);
        formData.append(`${page}SeoKeywords`, values.keywords);

        if (seoImage) {
            formData.append(`${page}SeoImage`, seoImage);
        }

        try {
            const response = await axios.patch(`${process.env.NEXT_PUBLIC_BASE_URL}/variable`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    token,
                },
            });
            console.log('Response:', response.data);
            setSeoImage(null);
            setSeoImagePreview(null);
        } catch (error) {
            console.error('Error:', error);
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className={styles.common}>
            <h1>{`${page} SEO Settings`}</h1>
            <Formik
                enableReinitialize
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
            >
                {({ isSubmitting }) => (
                    <Form className={styles.seoForm}>
                        <div className={styles.formGroup}>
                            <label htmlFor="title">Title</label>
                            <Field type="text" name="title" />
                            <ErrorMessage name="title" component="div" className={styles.error} />
                        </div>

                        <div className={styles.formGroup}>
                            <label htmlFor="description">Description</label>
                            <Field type="text" name="description" />
                            <ErrorMessage name="description" component="div" className={styles.error} />
                        </div>

                        <div className={styles.formGroup}>
                            <label htmlFor="keywords">Keywords</label>
                            <Field type="text" name="keywords" />
                            <ErrorMessage name="keywords" component="div" className={styles.error} />
                        </div>

                        <div className={styles.formGroup}>
                            <label htmlFor="image">Image</label>
                            <input type="file" name="image" onChange={handleSeoImageChange} />
                            {seoImagePreview && <img src={seoImagePreview} alt="SEO" className={styles.imagePreview} />}
                        </div>

                        <ErrorMessage name="image" component="div" className={styles.error} />

                        <button type="submit" disabled={isSubmitting} className={styles.submitButton}>
                            {isSubmitting ? 'Saving...' : 'Save'}
                        </button>
                    </Form>
                )}
            </Formik>
        </div>
    );
};

export default SEOForm;
