'use client'
import React, { useState, useCallback } from 'react'
import axios from 'axios'
import styles from "./page.module.scss"
import { Field, FieldArray, Formik, Form } from 'formik';
import { ImageFile, FormValues } from '@/types/createNews';
import { categoryOptions, keywordOptions } from './components/presets';
import CheckboxGroupFieldArray from './components/ChecboxGroupFieldArray';
import CustomField from './components/CustomField';
import ImageUploader from './components/ImageUploader';
import ImagesUploader from './components/ImagesUploader';
import ReactQuillField from './components/ReactQuillField';
import { toast } from 'sonner';

const initialValues: FormValues = {
    title: '',
    subTitle: '',
    mainImg: null,
    images: [],
    sections: [{ title: '', subTitle: '', description: '', image: null }],
    category: '',
    tags: [],
    date: '',
    author: '',
    seoTitle: '',
    seoDescription: '',
    seoImage: null,
    seoKeywords: [],
};




const CreateNews = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>('');
    const [success, setSuccess] = useState<boolean>(false);
    const [uploadedImages, setUploadedImages] = useState<ImageFile[]>([]);
    const [mainImg, setMainImg] = useState<File | null>(null);
    const [seoImage, setSeoImage] = useState<File | null>(null)

    const handleSubmit = async (values: any, { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void }) => {
        const token = localStorage.getItem("token");
        if (!token) {
            setError("Unauthorized");
            return;
        }

        const formData = new FormData();


        formData.append('title', values.title);
        formData.append('subTitle', values.subTitle);
        formData.append('category', values.category);
        formData.append('date', values.date);
        formData.append('author', values.author);
        formData.append('seoTitle', values.seoTitle);
        formData.append('seoDescription', values.seoDescription);
        if (mainImg) formData.append('mainImg', mainImg);
        if (seoImage) formData.append('seoImage', seoImage);
        if (uploadedImages.length > 0) {
            uploadedImages.forEach((image, index) => {
                formData.append(`images`, image.file);
            });
        }
        values.seoKeywords.forEach((keyword: string) => formData.append('seoKeywords', keyword));
        values.tags.forEach((tag: string) => formData.append('tags', tag));


        try {
            setLoading(true);
            const blogResponse = await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/blog`, formData, {
                headers: { token, 'Content-Type': 'multipart/form-data' },
            });

            if (blogResponse.data.message === "Success") {
                const blogId = blogResponse.data.data._id;
                toast.success("Post created successfully");

                // Triggering section updates
                const sectionPromises = values.sections.map(async (section: any) => {
                    const sectionFormData = new FormData();
                    Object.entries(section).forEach(([key, value]) => {
                        if (value instanceof File) {
                            sectionFormData.append(key, value, value.name);
                        } else {
                            sectionFormData.append(key, value as string);
                        }
                    });

                    return axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/section/${blogId}`, sectionFormData, {
                        headers: { token, 'Content-Type': 'multipart/form-data' },
                    });
                });


                const sectionResults = await Promise.all(sectionPromises);
                sectionResults.forEach(result => {
                    if (result.status === 200) {
                        console.log('Section uploaded successfully');
                    } else {
                        console.error('Section upload failed', result.data);
                    }
                });

                setSuccess(true);
            }
        } catch (error: any) {
            setError(error.response?.data?.message || error.response?.err);
        } finally {
            setLoading(false);
            setSubmitting(false);
        }
    }

    const renderSectionFields = useCallback(({ remove, push, form }: { remove: any, push: any, form: any }) => (
        <div className={styles.groupCheckboxes}>
            {form.values.sections.map((section: any, index: number) => (
                <div key={index} style={{ border: "1px solid var(--border-color)", borderRadius: "1rem", padding: "0.4rem" }}>
                    <Field name={`sections.${index}.title`} placeholder="Section Title" />
                    <Field name={`sections.${index}.subTitle`} placeholder="Section Subtitle" />
                    <Field as="textarea" name={`sections.${index}.description`} placeholder="Description" />
                    <input
                        type="file"
                        onChange={(event) => {
                            const file = event.target.files ? event.target.files[0] : null;
                            form.setFieldValue(`sections.${index}.image`, file);
                        }}
                    />
                    {section.image && <img src={URL.createObjectURL(section.image)} alt="Selected" style={{ width: "100px", height: "100px" }} />}

                    <div className={styles.spaceBetween}>
                        <button type="button" onClick={() => remove(index)}>
                            Remove
                        </button>
                        <button
                            type="button"
                            onClick={() => {
                                push({ title: '', subTitle: '', description: '', image: null });
                            }}
                        >
                            Add Section
                        </button>
                    </div>
                </div>
            ))}
        </div>
    ), []);


    return (
        <main className={styles.createTour}>
            <Formik initialValues={initialValues} onSubmit={handleSubmit}>
                {({ values, isSubmitting, setFieldValue }) => (
                    <section className={styles.createTour__container}>
                        <Form className={styles.createTour__container_content}>
                            <div className={styles.group}>
                                <CustomField name="title" setFieldValue={setFieldValue} label='title' fieldType="input" />
                                <CustomField name="seoTitle" setFieldValue={setFieldValue} label='SEO Title' fieldType="input" />
                            </div>
                            <div className={styles.group}>
                                <ReactQuillField name="subTitle" label="Subtitle" value={values.subTitle} onChange={setFieldValue} />
                                <ReactQuillField name="seoDescription" label="SEO Description" value={values.seoDescription ?? ''} onChange={setFieldValue} />
                            </div>
                            <div className={styles.checkboxField}>
                                <ImageUploader mainImg={mainImg} setMainImg={setMainImg} title='News Main' />
                                <ImagesUploader uploadedImages={uploadedImages} setUploadedImages={setUploadedImages} />
                                <ImageUploader mainImg={seoImage} setMainImg={setSeoImage} title='SEO Image' />
                            </div>
                            <div className={styles.checkboxField} style={{ padding: "1rem" }}>
                                <FieldArray name="sections">
                                    {renderSectionFields}
                                </FieldArray>
                            </div>
                            
                            <CheckboxGroupFieldArray name='seoKeywords' options={keywordOptions.map((cat) => ({ value: cat.value, label: cat.label }))} setFieldValue={setFieldValue} values={values.seoKeywords ?? []} />
                            <CheckboxGroupFieldArray name='tags' options={categoryOptions.map((cat) => ({ value: cat.value, label: cat.label }))} setFieldValue={setFieldValue} values={values.tags ?? []} />
                            <div className={styles.checkboxField}>
                                <div className={styles.group}>
                                    <CustomField name="category" label="Category" fieldType="select" options={categoryOptions.map((cat) => ({ value: cat.value, label: cat.label }))} />
                                    <CustomField name="author" setFieldValue={setFieldValue} label='author' fieldType="input" />
                                </div>
                                <input type="date" name="date" value={values.date} onChange={(e) => setFieldValue('date', e.target.value)} />
                            </div>
                            {error && <p className={styles.error}>{error}</p>}
                            <button type="submit" className={styles.submitButton} disabled={isSubmitting || loading}>
                                {loading ? 'Submitting...' : 'Submit'}
                            </button>
                        </Form>
                    </section>
                )}
            </Formik>
        </main >
    )
}

export default CreateNews