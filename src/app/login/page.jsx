'use client'
import React, { useState, useEffect } from 'react'
import { useFormik } from 'formik';
import * as yup from 'yup'
import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import styles from "./page.module.scss"
import { useAuth } from '@/context/AuthContext';
import Image from 'next/image';
import { toast } from "sonner"

const Page = () => {
    const [errorFromDataBase, setErrorFromDataBase] = useState('')
    const [isLoading, setIsLoading] = useState(false);
    const { handleLoginSuccess, isLoggedIn } = useAuth();

    const router = useRouter();
    let validationSchema = yup.object({
        email: yup.string().email().required("Email is required"),
        password: yup.string().required("Password is required"),

    })



    const loginFormik = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        validationSchema,
        onSubmit: async (values) => {
            setIsLoading(true);
            setErrorFromDataBase(''); // Reset server error message before each submission
            try {
                const response = await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/user/login`, values);

                if (response.status === 200 && response.data.message === "success") {
                    toast.success("Login successful, redirecting to dashboard...")
                    handleLoginSuccess(response.data.token);
                }
            } catch (err) {
                let errorMessage = 'An unexpected error occurred during login.'; // Default error message
                if (err.response && err.response.data) {
                    if (typeof err.response.data === 'object' && 'err' in err.response.data) {
                        errorMessage = err.response.data.err;
                    } else if (Array.isArray(err.response.data)) {
                        errorMessage = err.response.data.map(e => e.message || e).join('\n');
                    }
                }
                toast.error(errorMessage)
                setErrorFromDataBase(errorMessage);
            } finally {
                setIsLoading(false);
            }
        },
    });

    return (
        <main className={styles.container}>
            <section className={styles.container__formSection}>
                <h1> Login </h1>
                <form onSubmit={loginFormik.handleSubmit} className={styles.form}>
                    <label htmlFor="email"> Email </label>
                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        autoComplete='email'
                        onBlur={loginFormik.handleBlur}
                        required
                        onChange={loginFormik.handleChange}
                        value={loginFormik.values.email}
                        className={styles.input}
                    />
                    {loginFormik.touched.email && loginFormik.errors.email && (
                        <div className={styles.error}>{loginFormik.errors.email}</div>
                    )}
                    <label htmlFor="password"> Password </label>
                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        autoComplete='current-password'
                        onBlur={loginFormik.handleBlur}
                        required
                        onChange={loginFormik.handleChange}
                        value={loginFormik.values.password}
                        className={styles.input}
                    />
                    {loginFormik.touched.password && loginFormik.errors.password && (
                        <div className={styles.error}>{loginFormik.errors.password}</div>
                    )}
                    <button type="submit" className={styles.button} disabled={isLoading}>{isLoading ? 'Logging in...' : 'Login'}</button>
                    {errorFromDataBase && <div className={styles.error}>{errorFromDataBase}</div>}
                </form>
            </section>
        </main>

    )
}

export default Page