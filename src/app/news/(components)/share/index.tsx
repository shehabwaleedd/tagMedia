'use client';
import React, { useCallback, useMemo } from 'react';
import { FiLink, FiLinkedin, FiFacebook, FiTwitter } from 'react-icons/fi';
import { FaWhatsapp, FaReddit } from 'react-icons/fa';
import { toast } from 'sonner';
import { Content } from '@prismicio/client';
import styles from '../newsDetails/style.module.scss';
import { motion } from 'framer-motion';

type NewsPostDocument = Content.NewsPostDocument;

interface SharePlatform {
    icon: React.ReactNode;
    name: string;
    action?: 'clipboard';
    getShareUrl?: (url: string, title: string, description: string) => string;
}

const Share = ({ news }: { news: NewsPostDocument }) => {
    const title = useMemo(() => news.data.title || '', [news.data.title]);
    const description = useMemo(() => news.data.description || '', [news.data]);

    const handleShare = useCallback((platform: SharePlatform) => {
        const url = typeof window !== 'undefined' ? window.location.href : '';

        if (platform.action === 'clipboard') {
            if (navigator.clipboard) {
                navigator.clipboard.writeText(url)
                    .then(() => toast.success('Link copied to clipboard'))
                    .catch(() => toast.error('Failed to copy link'));
            } else {
                const textarea = document.createElement('textarea');
                textarea.value = url;
                document.body.appendChild(textarea);
                textarea.select();
                try {
                    document.execCommand('copy');
                    toast.success('Link copied to clipboard');
                } catch (err) {
                    toast.error('Failed to copy link');
                }
                document.body.removeChild(textarea);
            }
            return;
        }

        if (platform.getShareUrl && typeof window !== 'undefined') {
            const shareUrl = platform.getShareUrl(url, title, description);
            window.open(shareUrl, '_blank', 'noopener,noreferrer');
        }
    }, [title, description]);

    const sharePlatforms = useMemo<SharePlatform[]>(() => [
        {
            icon: <FiLink />,
            name: 'Copy link',
            action: 'clipboard'
        },
        {
            icon: <FiLinkedin />,
            name: 'LinkedIn',
            getShareUrl: (url, title, description) =>
                `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(url)}&title=${encodeURIComponent(title)}&summary=${encodeURIComponent(description)}`
        },
        {
            icon: <FiFacebook />,
            name: 'Facebook',
            getShareUrl: (url) =>
                `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`
        },
        {
            icon: <FiTwitter />,
            name: 'Twitter',
            getShareUrl: (url, title) =>
                `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(`Check this out: ${title}`)}`
        },
        {
            icon: <FaWhatsapp />,
            name: 'WhatsApp',
            getShareUrl: (url, title) =>
                `https://api.whatsapp.com/send?text=${encodeURIComponent(`Check out this news: ${title} ${url}`)}`
        },
        {
            icon: <FaReddit />,
            name: 'Reddit',
            getShareUrl: (url, title) =>
                `https://www.reddit.com/submit?url=${encodeURIComponent(url)}&title=${encodeURIComponent(title)}`
        }
    ], []);

    return (
        <section className={styles.shareSection}>
            <h3>Share the news</h3>
            <p>Share the best content on your own channels:</p>
            <div className={styles.shareIcons}>
                {sharePlatforms.map((platform, index) => (
                    <motion.button key={index} onClick={() => handleShare(platform)} aria-label={`Share on ${platform.name}`} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
                        {platform.icon}
                    </motion.button>
                ))}
            </div>
        </section>
    );
};

export default React.memo(Share);