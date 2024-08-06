'use client'
import React, { useState, useEffect, useCallback, useMemo } from 'react';
import axios from 'axios';
import { useParams } from 'next/navigation';
import { Field, FieldArray, Formik, Form, FormikHelpers } from 'formik';
import { FormValues, ImageFile } from '@/types/createNews';
import styles from "../../../components/createNews/page.module.scss";
import checkboxStyles from "../../../components/createNews/page.module.scss"
import common from "../../../common.module.scss";
import Image from 'next/image';
import { useNewsBySlug } from '@/lib/news/useNewsById';
import CheckboxGroupFieldArray from '@/app/account/components/createNews/components/ChecboxGroupFieldArray';
import { categoryOptions, keywordOptions } from '@/app/account/components/createNews/components/presets';
import CustomField from '@/app/account/components/createNews/components/CustomField';
import ReactQuillField from '@/app/account/components/createNews/components/ReactQuillField';
import * as Yup from 'yup';
import Link from 'next/link';
import { toast } from 'sonner';

type SectionType = {
    title: string;
    subTitle: string;
    description: string;
    image: string | File | null;
    _id?: string;
    [key: string]: any;
};

const validationSchema = Yup.object().shape({
    title: Yup.string().required('Title is required').max(120, 'Title cannot exceed 120 characters'),
    subTitle: Yup.string().required('Subtitle is required').max(5000, 'Subtitle cannot exceed 5000 characters'),
    category: Yup.string().required('Category is required'),
    date: Yup.string().required('Date is required'),
});

const initialFormValues: FormValues = {
    title: '',
    subTitle: '',
    mainImg: null,
    images: [],
    sections: [],
    category: '',
    tags: [],
    date: '',
    author: '',
    seoTitle: '',
    seoDescription: '',
    seoImage: null,
    seoKeywords: []
};

const EditNews: React.FC = () => {
    const { slug } = useParams();
    const { news } = useNewsBySlug(slug as string);

    const [initialValues, setInitialValues] = useState<FormValues>(initialFormValues);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [mainImg, setMainImg] = useState<File | null>(null);
    const [mainImgPreview, setMainImgPreview] = useState<string | null>(null);
    const [images, setImages] = useState<File[] | null>(null);
    const [imagePreviews, setImagePreviews] = useState<string[]>([]);
    const [sections, setSections] = useState<SectionType[]>([]);

    const handleMainImageChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files[0]) {
            const file = event.target.files[0];
            setMainImg(file);
            setMainImgPreview(URL.createObjectURL(file));
        }
    }, []);

    const handleImagesChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files) {
            const filesArray = Array.from(event.target.files);
            setImages(filesArray);
            setImagePreviews(filesArray.map(file => URL.createObjectURL(file)));
        }
    }, []);

    const handleSectionChange = useCallback((index: number, field: string, value: any) => {
        setSections(prevSections => {
            const updatedSections = [...prevSections];
            updatedSections[index] = {
                ...updatedSections[index],
                [field]: value,
                isModified: true // Add this flag to track modifications
            };
            return updatedSections;
        });
    }, []);

    const handleSectionImageChange = useCallback((index: number, file: File) => {
        setSections(prevSections => {
            const newSections = [...prevSections];
            newSections[index] = {
                ...newSections[index],
                image: file,
                isModified: true // Add this flag to track modifications
            };
            return newSections;
        });
    }, []);

    const addNewSection = useCallback(() => {
        setSections(prevSections => [
            ...prevSections,
            {
                title: '',
                subTitle: '',
                description: '',
                image: null,
                isNew: true // Add this flag for new sections
            }
        ]);
    }, []);

    const removeSection = useCallback((index: number) => {
        setSections(sections => sections.filter((_, i) => i !== index));
    }, []);

    useEffect(() => {
        if (news) {
            setInitialValues({
                title: news.title,
                subTitle: news.subTitle,
                mainImg: null,
                images: [],
                sections: [],
                category: news.category,
                tags: news.tags,
                date: news.date,
                author: news.author,
                seoImage: null,
                seoKeywords: news.seoKeywords,
                seoTitle: news.seoTitle,
                seoDescription: news.seoDescription
            });
            setSections(news.sections.map(section => ({
                title: section?.title,
                subTitle: section?.subTitle,
                description: section?.description,
                image: section?.image?.url,
                _id: section?._id
            })));
            setMainImgPreview(news?.mainImg.url);
            setImagePreviews(news?.images.map(img => img.url));
        }
    }, [news]);

    const handleSubmit = useCallback(async (values: FormValues, { setSubmitting }: FormikHelpers<FormValues>) => {
        const blogFormData = new FormData();

        Object.entries(values).forEach(([key, value]) => {
            if (key !== 'sections' && key !== 'images' && key !== 'mainImg' && key !== 'seoImage') {
                if (Array.isArray(value)) {
                    value.forEach(item => blogFormData.append(key, item));
                } else {
                    blogFormData.append(key, value as string);
                }
            }
        });

        if (mainImg) {
            blogFormData.append('mainImg', mainImg);
        }
        if (images) {
            images.forEach(img => {
                blogFormData.append('images', img);
            });
        }

        try {
            setLoading(true);
            const token = localStorage.getItem('token');
            if (!token) {
                throw new Error('No token found');
            }

            const blogUpdateResponse = await axios.patch(`${process.env.NEXT_PUBLIC_BASE_URL}/blog/${news?._id}`, blogFormData, {
                headers: {
                    token,
                    'Content-Type': 'multipart/form-data'
                },
            });

            if (blogUpdateResponse.data.message === "Success") {
                const sectionPromises = sections.map(section => {
                    const sectionFormData = new FormData();

                    // Only include necessary fields
                    ['title', 'subTitle', 'description'].forEach(key => {
                        if (section[key]) {
                            sectionFormData.append(key, section[key]);
                        }
                    });

                    // Handle image separately
                    if (section.image instanceof File) {
                        sectionFormData.append('image', section.image);
                    }

                    if (section.isNew) {
                        // For new sections
                        return axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/section/${news?._id}`, sectionFormData, {
                            headers: { token, 'Content-Type': 'multipart/form-data' }
                        });
                    } else if (section.isModified) {
                        // For modified existing sections
                        return axios.patch(`${process.env.NEXT_PUBLIC_BASE_URL}/section/specificSection/${section._id}`, sectionFormData, {
                            headers: { token, 'Content-Type': 'multipart/form-data' }
                        });
                    }
                    // If the section is neither new nor modified, don't send a request
                    return Promise.resolve();
                });

                await Promise.all(sectionPromises);
                toast.success('Update successful');
            } else {
                toast.error(blogUpdateResponse.data.err || 'Failed to update news');
            }
        } catch (err: any) {
            const errorMessage = err.response?.data?.err || err.message || 'Failed to update news';
            toast.error(errorMessage);
            setError(errorMessage);
        } finally {
            setLoading(false);
            setSubmitting(false);
        }
    }, [mainImg, images, sections, news]);


    const renderSections = useMemo(() => (
        <div className={styles.groupCheckboxes}>
            {sections.map((section, index) => (
                <div key={index} style={{ border: "1px solid var(--border-color)", borderRadius: "1rem", padding: "0.4rem" }}>
                    <input
                        type="text"
                        onChange={e => handleSectionChange(index, 'title', e.target.value)}
                        value={section.title}
                        placeholder="Section Title"
                    />
                    <textarea
                        onChange={e => handleSectionChange(index, 'description', e.target.value)}
                        value={section.description}
                        placeholder="Description"
                    />
                    <label htmlFor={`sections[${index}].image`}>Image</label>
                    <input
                        type="file"
                        onChange={event => {
                            if (event.currentTarget.files) {
                                handleSectionImageChange(index, event.currentTarget.files[0]);
                            }
                        }}
                    />
                    {section.image && (
                        <Image
                            src={section.image instanceof File ? URL.createObjectURL(section.image) : section.image}
                            alt="Section Image"
                            width={100}
                            height={100}
                        />
                    )}
                    <input
                        type="text"
                        onChange={e => handleSectionChange(index, 'subTitle', e.target.value)}
                        value={section.subTitle}
                        placeholder="Image Subtitle"
                    />
                    <div className={styles.spaceBetween}>
                        <button type="button" onClick={() => removeSection(index)}>Remove</button>
                        <button type="button" onClick={addNewSection}>Add New Section</button>
                    </div>
                </div>
            ))}
        </div>
    ), [sections, handleSectionChange, handleSectionImageChange, removeSection, addNewSection]);

    return (
        <main className={styles.editNews}>
            
            <Formik
                initialValues={initialValues}
                onSubmit={handleSubmit}
                validationSchema={validationSchema}
                enableReinitialize
            >
                {({ values, setFieldValue }) => (
                    <section className={checkboxStyles.createTour__container}>
                        <Link href="/account">Back to Account</Link>
                        <Form className={checkboxStyles.createTour__container_content}>
                            <div className={styles.group}>
                                <CustomField name="title" label='title' fieldType="input" />
                                <CustomField name="seoTitle" label='SEO Title' fieldType="input" />
                            </div>
                            <div className={styles.group}>
                                <ReactQuillField name="subTitle" label="Subtitle" value={values.subTitle} onChange={setFieldValue} />
                                <ReactQuillField name="seoDescription" label="SEO Description" value={values.seoDescription ?? ''} onChange={setFieldValue} />
                            </div>
                            <div className={styles.checkboxField} style={{ padding: "1rem" }}>
                                {renderSections}
                            </div>
                            <div className={styles.checkboxField}>
                                <CustomField name="category" label="Category" fieldType='select' options={categoryOptions.map((cat) => ({ value: cat.value, label: cat.label }))} />
                                <CustomField name="date" label="Date" fieldType="input" />
                                <CustomField name="author" label="Author" fieldType="input" />
                            </div>

                            <CheckboxGroupFieldArray name='seoKeywords' options={keywordOptions.map((cat) => ({ value: cat.value, label: cat.label }))} setFieldValue={setFieldValue} values={values.seoKeywords ?? []} />
                            <CheckboxGroupFieldArray name="tags" options={categoryOptions.map((cat) => ({ value: cat.value, label: cat.label }))} setFieldValue={setFieldValue} values={values.tags} />
                            <div className={styles.checkboxField}>
                                <label htmlFor="mainImg">Main Image</label>
                                <input type="file" onChange={handleMainImageChange} accept="image/*" />
                                {mainImgPreview && (
                                    <Image src={mainImgPreview} alt="Main Image" width={250} height={220} />
                                )}
                                <label htmlFor="images">Images</label>
                                <input type="file" multiple onChange={handleImagesChange} accept="image/*" />
                                {imagePreviews && (
                                    <div className={common.wrap}>
                                        {imagePreviews.map((preview, index) => (
                                            <Image key={index} src={preview} alt={`Image ${index}`} width={250} height={220} />
                                        ))}
                                    </div>
                                )}
                            </div>

                            {loading && <p>Loading...</p>}
                            {error && error.split(',').map((err, index) => (
                                <p key={index}>{err}</p>
                            ))}
                            <button
                                type="submit"
                                className={common.submitButton}
                                disabled={loading}
                            >
                                {loading ? 'Submitting...' : 'Submit'}
                            </button>
                        </Form>
                    </section>
                )}
            </Formik>
        </main>
    );
};

export default React.memo(EditNews);