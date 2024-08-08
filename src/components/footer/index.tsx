'use client'
import React, { useState, useEffect } from 'react';
import styles from './style.module.scss';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import axios from 'axios';
import { toast } from 'sonner';
import { RiTwitterXFill } from "react-icons/ri";
import { FaFacebookF, FaSnapchat, FaInstagram } from "react-icons/fa6";
import { AiOutlineYoutube } from "react-icons/ai";

const Footer = () => {
    const router = usePathname();
    const isProjectPage = router === '/work';
    const [newsCount, setNewsCount] = useState<number>(0);
    const [projectsCount, setProjectsCount] = useState<number>(0);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [partnersRes, portfolioRes, newsRes] = await Promise.all([
                    axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/partner`),
                    axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/portfolio`),
                    axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/blog`)
                ]);

                setProjectsCount(partnersRes.data.data.length + portfolioRes.data.data.length);
                setNewsCount(newsRes.data.data.result.length);
            } catch (error: any) {
                toast.error('Error fetching data:', error.message || error.toString());
            }
        };

        fetchData();
    }, []);

    // if (isProjectPage) return null;

    return (
        <footer className={styles.footer}>
            <div className={styles.footer__upper}>
                <div className={styles.footer__upper_left}>
                    <h2>Tag Media®</h2>
                </div>
                <div className={styles.footer__upper_right}>
                    <div className={styles.footer__upper_right_content}>
                        <nav aria-label="Main navigation" className={styles.footer__upper_right_content_upper}>
                            <ul className={styles.menuLinks}>
                                <li><Link href="/">Home</Link></li>
                                <li>
                                    <Link href="/work">
                                        <h4>Work</h4>
                                        <span className={styles.count}>{projectsCount}</span>
                                    </Link>
                                </li>
                                <li><Link href="/about">About</Link></li>
                                <li>
                                    <Link href="/news">
                                        <h4>News</h4>
                                        <span className={styles.count}>{newsCount ?? 0}</span>
                                    </Link>
                                </li>
                                <li><Link href="/contact">Contact</Link></li>
                            </ul>
                        </nav>
                        <div className={styles.footer__upper_right_content_lower}>
                            <nav aria-label="Secondary navigation" className={styles.menuLinks}>
                                <ul>
                                    <li>
                                        <Link href="/careers">
                                            <h4>Careers</h4>
                                            <span className={styles.count}>coming soon</span>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href="/snippets">
                                            <h4>Snippets</h4>
                                            <span className={styles.count}>coming soon</span>
                                        </Link>
                                    </li>
                                </ul>
                                <ul>
                                    <li>
                                        <Link href="/privacy">
                                            <h4>Policy</h4>
                                        </Link>
                                    </li>
                                </ul>
                            </nav>
                            <div className={styles.by}>
                                <h3>Website By</h3>
                                <Link href="https://www.cairo-studio.com" target='_blank'>Cairo Studio</Link>
                            </div>
                        </div>
                    </div>
                    <div className={styles.by}>
                        <h3>Follow us</h3>
                        <div className={styles.social}>
                            <Link href="https://www.facebook.com/TagMediaeg" target='_blank' aria-label="Facebook Page Link">
                                <FaFacebookF />
                            </Link>
                            <Link href="https://www.instagram.com/tagmediaeg" target='_blank' aria-label="Instagram Page Link">
                                <FaInstagram />
                            </Link>
                            <Link href="https://twitter.com/TagMediaEg" target='_blank' aria-label="Twitter Page Link">
                                <RiTwitterXFill />
                            </Link>
                            <Link href="https://www.youtube.com/channel/UCZv3g6bq9P7wU5KZn6a3v8A" target='_blank' aria-label="Youtube Page Link">
                                <AiOutlineYoutube />
                            </Link>
                            <Link href="https://www.snapchat.com/add/tagmediaeg" target='_blank' aria-label="Snapchat Page Link">
                                <FaSnapchat />
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
            <div className={styles.footer__lower}>
                <span>{new Date().getFullYear()} © Tag Media. All rights reserved.</span>
            </div>
        </footer>
    );
};

export default Footer;
