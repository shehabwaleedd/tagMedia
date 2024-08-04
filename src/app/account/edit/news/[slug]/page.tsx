'use client'
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'next/navigation';
import { Field, FieldArray, Formik, Form } from 'formik';
import { FormValues } from '@/types/createNews';
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
    [key: string]: any; // Add index signature
};



const EditNews = () => {
    const { slug } = useParams();
    const { news } = useNewsBySlug(slug as string);
    const validationSchema = Yup.object().shape({
        title: Yup.string().required('Title is required').max(24, 'Title cannot exceed 24 characters'),
        subTitle: Yup.string().required('Subtitle is required').max(5000, 'Subtitle cannot exceed 5000 characters'),
        category: Yup.string().required('Category is required'),
        date: Yup.string().required('Date is required'),
    });



    const [initialValues, setInitialValues] = useState<FormValues>({
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

    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);
    const [mainImg, setMainImg] = useState<File | null>(null);
    const [mainImgPreview, setMainImgPreview] = useState<string | null>(null);
    const [images, setImages] = useState<File[] | null>(null);
    const [imagePreviews, setImagePreviews] = useState<string[]>([]);
    const [sections, setSections] = useState<SectionType[]>([]);

    const handleMainImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files[0]) {
            setMainImg(event.target.files[0]);
            setMainImgPreview(URL.createObjectURL(event.target.files[0]));
        }
    };

    const handleImagesChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files) {
            const filesArray = Array.from(event.target.files);
            setImages(filesArray);
            setImagePreviews(filesArray.map(file => URL.createObjectURL(file)));
        }
    };



    const handleSectionChange = (index: number, field: string, value: any) => {
        const updatedSections = [...sections];
        updatedSections[index][field] = value;
        setSections(updatedSections);
    };

    const handleSectionImageChange = (index: number, file: File) => {
        const newSections = [...sections];
        newSections[index].image = file;
        setSections(newSections);
    };

    const addNewSection = () => {
        setSections(prevSections => [
            ...prevSections,
            {
                title: '',
                subTitle: '',
                description: '',
                image: null,
                _id: undefined
            }
        ]);
    };

    const removeSection = (index: number) => {
        setSections(sections => sections.filter((_, i) => i !== index));
    };


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

    const handleSubmit = async (values: any, { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void }) => {
        const blogFormData = new FormData();


        blogFormData.append('title', values.title);
        blogFormData.append('subTitle', values.subTitle);
        blogFormData.append('category', values.category);
        blogFormData.append('date', values.date);
        blogFormData.append('author', values.author);
        blogFormData.append('seoTitle', values.seoTitle);
        blogFormData.append('seoDescription', values.seoDescription);
        values.tags.forEach((tag: string) => blogFormData.append('tags', tag));
        values.seoKeywords.forEach((keyword: string) => blogFormData.append('seoKeywords', keyword));

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
            const blogUpdateResponse = await axios.patch(`${process.env.NEXT_PUBLIC_BASE_URL}/blog/${news?._id}`, blogFormData, {
                headers: {
                    token,
                    'Content-Type': 'multipart/form-data'
                },
            });
            if (blogUpdateResponse.data.message === "Success") {
                // Now handle each section update
                const promises = sections.map(section => {
                    const sectionFormData = new FormData();
                    sectionFormData.append('title', section.title);
                    sectionFormData.append('subTitle', section.subTitle);
                    sectionFormData.append('description', section.description);
                    if (section.image instanceof File) {
                        sectionFormData.append('image', section.image);
                    }

                    return section._id ? axios.patch(`${process.env.NEXT_PUBLIC_BASE_URL}/section/specificSection/${section._id}`, sectionFormData, {
                        headers: {
                            token,
                            'Content-Type': 'multipart/form-data'
                        }
                    })
                        : axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/section/${news?._id}`, sectionFormData, {
                            headers: {
                                token,
                                'Content-Type': 'multipart/form-data'
                            }
                        });
                });

                await Promise.all(promises);
                setSuccess(true);
                toast.success('Update successful');
            } else {
                toast.error(blogUpdateResponse.data.err || 'Failed to update news')
            }
        } catch (err: any) {
            if (err.response && err.blogUpdateResponse.data && err.blogUpdateResponse.data.err) {
                toast.error(err.response.data.err);
            } else {
                toast.error('Failed to update news');
            }
        } finally {
            setLoading(false);
            setSubmitting(false);
        }
    };

    return (
        <main className={styles.editNews}>
            <Link href="/account">
                Back to Account
            </Link>
            <Formik
                initialValues={initialValues}
                onSubmit={handleSubmit}
                validationSchema={validationSchema}
                enableReinitialize>
                {({ values, setFieldValue }) => (
                    <section className={checkboxStyles.createTour__container}>
                        <Link href="/account">
                            Back to Account
                        </Link>
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
                                <div className={styles.groupCheckboxes} >
                                    {sections.length > 0 &&
                                        sections.map((section, index) => (
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
                                                <input type="file" onChange={event => {
                                                    if (event.currentTarget.files) {
                                                        handleSectionImageChange(index, event.currentTarget.files[0]);
                                                    }
                                                }} />
                                                {section.image && (
                                                    <Image src={section.image instanceof File ? URL.createObjectURL(section.image) : section.image} alt="Section Image" width={100} height={100} />
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
                                {imagePreviews && <div className={common.wrap}>
                                    {imagePreviews.map((preview, index) => (
                                        <Image key={index} src={preview} alt={`Image ${index}`} width={250} height={220} />
                                    ))}
                                </div>}
                            </div>

                            {loading && <p>Loading...</p>}
                            {error && error.split(',').map((err, index) => (
                                <p key={index}>{err}</p>
                            ))}
                            <button type="submit"

                                className={common.submitButton}
                                disabled={loading}>
                                {loading ? 'Submitting...' : 'Submit'}
                            </button>
                        </Form>
                    </section>
                )}
            </Formik>
        </main>
    );
};

export default EditNews;
