'use client'
import React, { useState, useEffect } from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import ImageUploader from '../../components/EditImageUploader';
import CustomField from '@/app/account/components/createNews/components/CustomField';
import styles from './page.module.scss';
import common from "../../../common.module.scss"
import Link from 'next/link';
import { BsArrowLeft } from "react-icons/bs";


interface FormValues {
    name: string;
    image: File | null;
    position?: string;
    subTitle?: string;
    sections?: Array<{ title: string; subTitle: string; description: string }>;
    tags?: string[];
    category?: string;
    author?: string;

}

interface EditEntityProps {
    data: FormValues | any;
    type: string;
    id: string;
    loading: boolean;
}



const EditEntity: React.FC<EditEntityProps> = ({ data, type, id }) => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);
    const [mainImgUrl, setMainImgUrl] = useState<string | null>(null);
    const [image, setImage] = useState<File | null>(null);
    useEffect(() => {
        if (data && data.image) {
            setMainImgUrl((data.image as any).url);
        }
    }, [data]);

    const validationSchema = Yup.object().shape({
        name: Yup.string().required("Name is required"),
        image: Yup.mixed().required("An image is required"),
        ...(type === 'team' && { position: Yup.string().required("Position is required") }),

    });

    const handleSubmit = async (values: FormValues) => {
        const token = localStorage.getItem("token");
        if (!token) {
            setError("Unauthorized");
            return;
        }

        const formData = new FormData();
        formData.append('name', values.name);
        if (image instanceof File) {
            formData.append('image', image);
        }
        if (type === 'team' && values.position) {
            formData.append('position', values.position);
        }

        try {
            setLoading(true);
            const response = await axios.patch(`${process.env.NEXT_PUBLIC_BASE_URL}/${type}/${id}`, formData, {
                headers: {
                    token,
                    'Content-Type': 'multipart/form-data'
                },
            });
            if (response.status === 200) {
                setSuccess(true);
                setError('');
            } else {
                throw new Error("Failed to update entity");
            }
        } catch (err: any) {
            setError(err.response?.data?.message || "Failed to update entity");
        } finally {
            setLoading(false);
        }
    };

    return (
        <main className={styles.editPage}>
            <section className={styles.editPage_upper}>
                <Link href="/account">
                    <BsArrowLeft className={styles.backIcon} />
                    <span>
                        Back to account
                    </span>
                </Link>
            </section>
            <section className={styles.editContainer}>
                <Formik
                    initialValues={data}
                    validationSchema={validationSchema}
                    onSubmit={handleSubmit}
                    enableReinitialize
                >
                    {({ setFieldValue, values }) => (
                        <Form className={common.common}>
                            <div className={common.group}>
                                <CustomField name="name" label="Name" fieldType="input" />
                                {type === 'team' && <CustomField name="position" label="Position" fieldType="input" />}
                                {type === 'service' && <CustomField name="description" label="Description" fieldType="input" />}
                            </div>
                            <ImageUploader
                                mainImg={image}
                                setMainImg={setImage}
                                mainImgUrl={mainImgUrl}
                                setMainImgUrl={setMainImgUrl}
                                type={type}
                            />
                            <button className={common.submitButton} type="submit" disabled={loading}>{loading ? "Updating..." : "Update"} {type}</button>
                            {error && <div className={styles.error}>{error}</div>}
                            {success && <div className={styles.success}>Update successful!</div>}
                        </Form>
                    )}
                </Formik>
            </section>
        </main>
    );
};

export default EditEntity;
