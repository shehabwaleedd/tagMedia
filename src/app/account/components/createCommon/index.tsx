import React, { useState } from 'react';
import Cookies from 'js-cookie';
import common from "../../common.module.scss";
import ImageUploader from '../createNews/components/ImageUploader';
import axios from 'axios';
import { Form, Formik, Field, FormikHelpers } from 'formik';
import CustomField from '../createNews/components/CustomField';
import * as Yup from 'yup';
import { toast } from 'sonner';

interface FormValues {
    name: string;
    image: File | null;
    position?: string;  // optional for team
    description?: string, // optiomal for service
}

const CreateCommon: React.FC<{ type: 'partner' | 'workedWith' | 'team' | 'portfolio' | 'service' }> = ({ type }) => {
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>('');
    const [success, setSuccess] = useState<boolean>(false);
    const [image, setImage] = useState<File | null>(null);

    const initialValues: FormValues = {
        name: '',
        image: null,
        ...(type === 'team' && { position: '' }),
        ...(type === 'service' && { description: '' })

    };

    // Dynamic endpoint based on the type
    const endpoint = {
        'partner': '/partner',
        'workedWith': '/workedWith',
        'team': '/team',
        'portfolio': '/portfolio',
        'service': '/service'
    }[type];

    // Validation Schema including optional position field for team
    const validationSchema = Yup.object().shape({
        name: Yup.string().required("Name is required"),
        image: Yup.mixed().required("An image is required"),
        ...(type === 'team' && {
            position: Yup.string().required("Position is required")
        })
    });

    const handleSubmit = async (values: FormValues, { resetForm }: FormikHelpers<FormValues>) => {
        const token = Cookies.get("token");
        if (!token) {
            setError("Unauthorized");
            return;
        }

        const formData = new FormData();
        formData.append('name', values.name);
        if (image) {
            formData.append('image', image);
        }
        if (values.position) {
            formData.append('position', values.position);
        }
        if (values.description) {
            formData.append('description', values.description)
        }

        try {
            setLoading(true);
            const response = await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}${endpoint}`, formData, {
                headers: {
                    token,
                    'Content-Type': 'multipart/form-data'
                },
            });
            if (response.data.message === "Success") {
                setSuccess(true);
                setError('')
                resetForm();
                setImage(null);
                toast.success(`${type} is created successfully`)
            }
            else {
                throw new Error("Failed to create entry");
            }
        } catch (err: any) {
            const message = axios.isAxiosError(err) && err.response
                ? (err.response.data.err || "An unknown error occurred")
                : "Network error";
            setError(message);
            toast.error(message);
            setSuccess(false)

        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={common.common}>
            <h1>Create {type.charAt(0).toUpperCase() + type.slice(1)}</h1>
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
                enableReinitialize
            >
                {({ setFieldValue }) => (
                    <Form>
                        <CustomField name="name" label="Name" fieldType="input" />
                        {type === 'team' && <Field name="position" placeholder="Position" component="input" />}
                        {type === 'service' && <Field name="description" placeholder="Description" component="textarea" />}
                        <ImageUploader mainImg={image} setMainImg={(file) => {
                            setImage(file);
                            setFieldValue('image', file);
                        }} title={type === "service" ? "Icon" : type} />
                        <button className={common.submitButton} type="submit" disabled={loading}>
                            {loading ? `Creating ${type}...` : `Create ${type}`}
                        </button>
                        {error && <p className={common.error}>{error}</p>}
                        {success && <p className={common.success}>{type} created successfully</p>}
                    </Form>
                )}
            </Formik>
        </div>
    )
}

export default CreateCommon;
