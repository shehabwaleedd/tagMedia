'use client';
import React from 'react'
import { FiLink, FiLinkedin, FiFacebook, FiTwitter } from 'react-icons/fi';
import { FaWhatsapp, FaReddit } from 'react-icons/fa';
import { toast } from 'sonner';
import { Content } from '@prismicio/client';
import styles from '../newsDetails/style.module.scss';

type NewsPostDocument = Content.NewsPostDocument;


const Share = ({ news }: { news: NewsPostDocument }) => {

    const copyLinkToClipboard = () => {
        navigator.clipboard.writeText(window.location.href);
        toast.success('Link copied to clipboard');
    };

    const shareOnLinkedIn = () => {
        const url = encodeURIComponent(window.location.href);
        const title = encodeURIComponent(news.data.title || '');
        window.open(`https://www.linkedin.com/shareArticle?mini=true&url=${url}&title=${title}`, '_blank');
    };

    const shareOnFacebook = () => {
        const url = encodeURIComponent(window.location.href);
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}`, '_blank');
    };

    const shareOnTwitter = () => {
        const url = encodeURIComponent(window.location.href);
        const text = encodeURIComponent(`Check this out: ${news.data.title}`);
        window.open(`https://twitter.com/intent/tweet?url=${url}&text=${text}`, '_blank');
    };

    const shareOnWhatsApp = () => {
        const url = encodeURIComponent(window.location.href);
        const text = encodeURIComponent(`Check out this news: ${news.data.title}`);
        window.open(`https://api.whatsapp.com/send?text=${text} ${url}`, '_blank');
    };

    const shareOnReddit = () => {
        const url = encodeURIComponent(window.location.href);
        const title = encodeURIComponent(news.data.title || '');
        window.open(`https://www.reddit.com/submit?url=${url}&title=${title}`, '_blank');
    };

    return (
        <section className={styles.shareSection}>
            <h3>Share the news</h3>
            <p>Share the best content on your own channels:</p>
            <div className={styles.shareIcons}>
                <button onClick={copyLinkToClipboard} aria-label="Copy link">
                    <FiLink />
                </button>
                <button onClick={shareOnLinkedIn} aria-label="Share on LinkedIn">
                    <FiLinkedin />
                </button>
                <button onClick={shareOnFacebook} aria-label="Share on Facebook">
                    <FiFacebook />
                </button>
                <button onClick={shareOnTwitter} aria-label="Share on Twitter">
                    <FiTwitter />
                </button>
                <button onClick={shareOnWhatsApp} aria-label="Share on WhatsApp">
                    <FaWhatsapp />
                </button>
                <button onClick={shareOnReddit} aria-label="Share on Reddit">
                    <FaReddit />
                </button>
            </div>
        </section>
    )
}

export default Share