'use client';

import React, { useEffect, useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import axios from 'axios';
import Cookies from 'js-cookie';
import * as Yup from 'yup';
import styles from '../../common.module.scss';
import { toast } from 'sonner';

// Validation Schema
const validationSchema = Yup.object({
    title: Yup.string().required('Title is required').max(60, 'Title should be 60 characters or less'),
    description: Yup.string().required('Description is required').max(160, 'Description should be 160 characters or less'),
    keywords: Yup.string().required('Keywords are required'),
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
            const file = event.target.files[0];
            if (file.size > 5 * 1024 * 1024) { // 5MB limit
                toast.error('Image size should be less than 5MB');
                return;
            }
            setSeoImage(file);
            setSeoImagePreview(URL.createObjectURL(file));
        }
    };

    useEffect(() => {
        const fetchInitialValues = async () => {
            if (!token) {
                toast.error('No token found. Please login again.');
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
                toast.error('Failed to fetch SEO data. Please try again.');
            }
        };

        fetchInitialValues();
    }, [page, token]);

    const handleSubmit = async (values: any, { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void }) => {
        if (!token) {
            toast.error('No token found. Please login again.');
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
            setSeoImagePreview(values.image);
            toast.success('SEO settings updated successfully');
        } catch (error) {
            console.error('Error:', error);
            toast.error('Failed to update SEO settings. Please try again.');
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className={styles.common}>
            <h1>{`${page.charAt(0).toUpperCase() + page.slice(1)} Page SEO Settings`}</h1>
            <Formik
                enableReinitialize
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
            >
                {({ isSubmitting, values }) => (
                    <Form className={styles.seoForm}>
                        <div className={styles.formGroup}>
                            <label htmlFor="title">Title</label>
                            <Field type="text" name="title" />
                            <div className={styles.charCount}>{values.title.length}/60</div>
                            <ErrorMessage name="title" component="div" className={styles.error} />
                        </div>

                        <div className={styles.formGroup}>
                            <label htmlFor="description">Description</label>
                            <Field as="textarea" name="description" rows="4" />
                            <div className={styles.charCount}>{values.description.length}/160</div>
                            <ErrorMessage name="description" component="div" className={styles.error} />
                        </div>

                        <div className={styles.formGroup}>
                            <label htmlFor="keywords">Keywords (comma-separated)</label>
                            <Field type="text" name="keywords" />
                            <ErrorMessage name="keywords" component="div" className={styles.error} />
                        </div>

                        <div className={styles.formGroup}>
                            <label htmlFor="image">SEO Image</label>
                            <input type="file" name="image" onChange={handleSeoImageChange} accept="image/*" />
                            {seoImagePreview && (
                                <div className={styles.imagePreviewContainer}>
                                    <img src={seoImagePreview} alt="SEO" className={styles.imagePreview} />
                                </div>
                            )}
                        </div>

                        <button type="submit" disabled={isSubmitting} className={styles.submitButton}>
                            {isSubmitting ? 'Saving...' : 'Save SEO Settings'}
                        </button>
                    </Form>
                )}
            </Formik>
        </div>
    );
};

export default SEOForm;