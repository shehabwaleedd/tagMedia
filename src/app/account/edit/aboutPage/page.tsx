'use client'

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import styles from "../../common.module.scss";
import CustomField from '../../components/createNews/components/CustomField';
import Cookies from 'js-cookie';
import { toast } from 'sonner';
interface AboutPageData {
    mainTitle: string;
    mainDescription: string;
    vision: {
        title: string;
        description: string;
    };
    mission: {
        title: string;
        description: string;
    };
    ourStory: {
        title: string;
        description1: string;
        description2: string;
        description3: string;
    };
    aboutSeo: {
        title: string;
        description: string;
        keywords: string;
        image: string;
    };
}

interface AboutPageEditResponse {
    aboutPage: AboutPageData
}



const validationSchema = Yup.object().shape({
    mainTitle: Yup.string().required("Main title is required"),
    mainDescription: Yup.string().required("Main description is required"),
    vision: Yup.object({
        title: Yup.string().required("Vision title is required"),
        description: Yup.string().required("Vision description is required")
    }),
    mission: Yup.object({
        title: Yup.string().required("Mission title is required"),
        description: Yup.string().required("Mission description is required")
    }),
    ourStory: Yup.object({
        title: Yup.string().required("Our story title is required"),
        description1: Yup.string().required("Description is required"),
        description2: Yup.string().required("Description is required"),
        description3: Yup.string().required("Description is required")
    }),
    aboutSeo: Yup.object({
        title: Yup.string().required("SEO title is required"),
        description: Yup.string().required("SEO description is required"),
        keywords: Yup.string().required("SEO keywords are required"),
        image: Yup.string().required("SEO image is required")
    }),
});

const EditAboutPage: React.FC = () => {
    const [initialValues, setInitialValues] = useState<AboutPageData>({
        mainTitle: '',
        mainDescription: '',
        vision: {
            title: '',
            description: ''
        },
        mission: {
            title: '',
            description: ''
        },
        ourStory: {
            title: '',
            description1: '',
            description2: '',
            description3: ''
        },
        aboutSeo: {
            title: '',
            description: '',
            keywords: '',
            image: ''
        }

    });
    const [data, setData] = useState<AboutPageData | null>(null);
    useEffect(() => {
        const fetchAboutData = async () => {
            try {
                const response = await axios.get<AboutPageEditResponse>(`${process.env.NEXT_PUBLIC_BASE_URL}/variable`);
                setData(response.data.aboutPage);
            } catch (error) {
                console.error("Failed to fetch about page data:", error);
            }
        };
        fetchAboutData();
    }, []);

    useEffect(() => {
        if (data) {
            setInitialValues({
                mainTitle: data?.mainTitle,
                mainDescription: data?.mainDescription,
                vision: {
                    title: data?.vision?.title,
                    description: data?.vision?.description
                },
                mission: {
                    title: data?.mission?.title,
                    description: data?.mission?.description
                },
                ourStory: {
                    title: data?.ourStory?.title,
                    description1: data?.ourStory?.description1,
                    description2: data?.ourStory?.description2,
                    description3: data?.ourStory?.description3
                },
                aboutSeo: {
                    title: data?.aboutSeo?.title,
                    description: data?.aboutSeo?.description,
                    keywords: data?.aboutSeo?.keywords,
                    image: ''
                }
            })
        }
    }, [data])

    const handleSubmit = async (values: AboutPageData) => {
        const token = Cookies.get("token")
        try {
            const response = await axios.patch('https://tagmedia.onrender.com/variable', JSON.stringify({ aboutPage: values }), {
                headers: {
                    token,
                    'Content-Type': 'application/json'
                }
            });
            if (response.status === 200) {
                toast.success('Update successful!');
            } else {
                throw new Error('Failed to update');
            }
        } catch (error: any) {
            console.error("Failed to update about page data:", error);
            toast.error('Failed to update about page data.');
        }
    };

    if (!setInitialValues) {
        return <p>Loading...</p>;
    }

    return (
        <div className={styles.common}>
            <h1>Edit About Page</h1>
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
                enableReinitialize
            >
                {({ isSubmitting }) => (
                    <Form>
                        <CustomField name="mainTitle" label="Main Title" fieldType="input" />
                        <CustomField name="mainDescription" label="Main Description" fieldType="textarea" />
                        <CustomField name="vision.title" label="Vision Title" fieldType="input" />
                        <CustomField name="vision.description" label="Vision Description" fieldType="textarea" />
                        <CustomField name="mission.title" label="Mission Title" fieldType="input" />
                        <CustomField name="mission.description" label="Mission Description" fieldType="textarea" />
                        <CustomField name="ourStory.title" label="Our Story Title" fieldType="input" />
                        <CustomField name="ourStory.description1" label="Our Story Description 1" fieldType="textarea" />
                        <CustomField name="ourStory.description2" label="Our Story Description 2" fieldType="textarea" />
                        <CustomField name="ourStory.description3" label="Our Story Description 3" fieldType="textarea" />
                        <CustomField name="aboutSeo.title" label="SEO Title" fieldType="input" />
                        <CustomField name="aboutSeo.description" label="SEO Description" fieldType="textarea" />
                        <CustomField name="aboutSeo.keywords" label="SEO Keywords" fieldType="input" />
                        <CustomField name="aboutSeo.image" label="SEO Image" fieldType="input" />
                        <button type="submit" disabled={isSubmitting} className={styles.submitButton}>
                            {isSubmitting ? `Updating...` : `Update`}
                        </button>
                    </Form>
                )}
            </Formik>
        </div>
    );
};

export default EditAboutPage;

