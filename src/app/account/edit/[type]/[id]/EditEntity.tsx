'use client'
import React, { useState, useEffect } from 'react';
import { Formik, Form, FieldArray } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import ImageUploader from '../../components/EditImageUploader';
import CustomField from '@/app/account/components/createNews/components/CustomField';
import styles from './page.module.scss';
import common from "../../../common.module.scss"
import Link from 'next/link';
import { BsArrowLeft } from "react-icons/bs";
import { toast } from 'sonner';

interface ImageData {
    url: string;
    public_id: string;
}



interface Section {
    _id?: string;
    title: string;
    subTitle: string;
    description: string;
    image: ImageData | File | null;
}

interface FormValues {
    name: string;
    image: ImageData | File | null;
    position?: string;
    description?: string;
    sections?: Section[];
}

interface EditEntityProps {
    data: FormValues;
    type: 'partner' | 'workedWith' | 'team' | 'portfolio' | 'service';
    id: string;
}

const EditEntity: React.FC<EditEntityProps> = ({ data, type, id }) => {
    const [loading, setLoading] = useState(false);

    const [initialValues, setInitialValues] = useState<FormValues>({
        name: '',
        image: null,
        position: '',
        description: '',
        sections: []
    });

    useEffect(() => {
        if (data) {
            setInitialValues({
                name: data.name || '',
                image: data.image || null,
                position: data.position || '',
                description: data.description || '',
                sections: data.sections?.map(section => ({
                    ...section,
                    image: section.image || null
                })) || []
            });
        }
    }, [data]);

    const validationSchema = Yup.object().shape({
        name: Yup.string().required("Name is required"),
        image: Yup.mixed().required("An image is required"),
        ...(type === 'team' && { position: Yup.string().required("Position is required") }),
        ...(type === 'service' && { description: Yup.string().required("Description is required") }),
        ...(type === 'portfolio' || type === 'partner' ? {
            sections: Yup.array().of(
                Yup.object().shape({
                    title: Yup.string().required("Section title is required"),
                    subTitle: Yup.string(),
                    description: Yup.string().required("Section description is required"),
                    image: Yup.mixed().required("Section image is required")
                })
            )
        } : {})
    });

    const handleSubmit = async (values: FormValues) => {
        const token = localStorage.getItem("token");
        if (!token) {
            toast.error("Unauthorized, logout and login again");
            return;
        }

        setLoading(true);

        try {
            const formData = new FormData();
            formData.append('name', values.name);
            if (values.image instanceof File) {
                formData.append('image', values.image);
            }
            if (type === 'team' && values.position) {
                formData.append('position', values.position);
            }
            if (type === 'service' && values.description) {
                formData.append('description', values.description);
            }

            const response = await axios.patch(`${process.env.NEXT_PUBLIC_BASE_URL}/${type}/${id}`, formData, {
                headers: {
                    token,
                    'Content-Type': 'multipart/form-data'
                },
            });

            if (response.status === 200) {
                if ((type === 'portfolio' || type === 'partner') && values.sections) {
                    await Promise.all(values.sections.map(async (section) => {
                        const sectionFormData = new FormData();
                        sectionFormData.append('title', section.title);
                        sectionFormData.append('subTitle', section.subTitle);
                        sectionFormData.append('description', section.description);
                        if (section.image instanceof File) {
                            sectionFormData.append('image', section.image);
                        }

                        if (section._id) {
                            return axios.patch(`${process.env.NEXT_PUBLIC_BASE_URL}/section/specificSection/${section._id}`, sectionFormData, {
                                headers: { token, 'Content-Type': 'multipart/form-data' },
                            });
                        } else {
                            return axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/section/${id}`, sectionFormData, {
                                headers: { token, 'Content-Type': 'multipart/form-data' },
                            });
                        }
                    }));
                }

                toast.success("Update successful!");
            } else {
                throw new Error("Failed to update entity");
            }
        } catch (err: any) {
            toast.error(err.response?.data?.message || "Failed to update entity");
        } finally {
            setLoading(false);
        }
    };


    if (!data) {
        return <div>Loading...</div>;
    }

    return (
        <main className={styles.editPage}>
            <section className={styles.editPage_upper}>
                <Link href="/account">
                    <BsArrowLeft className={styles.backIcon} />
                    <span>Back to account</span>
                </Link>
            </section>
            <section className={styles.editContainer}>
                <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={handleSubmit}
                    enableReinitialize
                >
                    {({ setFieldValue, values }) => (
                        <Form className={common.common}>
                            <div className={common.group}>
                                <CustomField name="name" label="Name" fieldType="input" />
                                {type === 'team' && <CustomField name="position" label="Position" fieldType="input" />}
                                {type === 'service' && <CustomField name="description" label="Description" fieldType="textarea" />}
                            </div>
                            <ImageUploader
                                mainImg={values.image instanceof File ? values.image : null}
                                setMainImg={(file) => setFieldValue('image', file)}
                                mainImgUrl={(values.image as ImageData)?.url || null}
                                setMainImgUrl={() => { }}
                                type={type}
                            />

                            {(type === 'portfolio' || type === 'partner') && (
                                <FieldArray name="sections">
                                    {({ push, remove }) => (
                                        <div>
                                            {values.sections?.map((section, index) => (
                                                <div key={index} className={styles.section}>
                                                    <CustomField name={`sections.${index}.title`} label="Section Title" fieldType="input" />
                                                    <CustomField name={`sections.${index}.subTitle`} label="Section Subtitle" fieldType="input" />
                                                    <CustomField name={`sections.${index}.description`} label="Description" fieldType="textarea" />
                                                    <ImageUploader
                                                        mainImg={section.image instanceof File ? section.image : null}
                                                        setMainImg={(file) => setFieldValue(`sections.${index}.image`, file)}
                                                        mainImgUrl={(section.image as ImageData)?.url || null}
                                                        setMainImgUrl={() => { }}
                                                        type="Section Image"
                                                    />
                                                    <button type="button" onClick={() => remove(index)} className={styles.removeButton}>Remove Section</button>
                                                </div>
                                            ))}
                                            <button type="button" onClick={() => push({ title: '', subTitle: '', description: '', image: null })} className={styles.addButton}>
                                                Add Section
                                            </button>
                                        </div>
                                    )}
                                </FieldArray>
                            )}

                            <button className={common.submitButton} type="submit" disabled={loading}>
                                {loading ? "Updating..." : `Update ${type}`}
                            </button>
                        </Form>
                    )}
                </Formik>
            </section>
        </main>
    );
};

export default EditEntity;