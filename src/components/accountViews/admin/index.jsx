'use client'

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaNewspaper, FaUsers, FaHandshake, FaBriefcase, FaTv, FaTools, FaSearch, FaInfoCircle, FaPuzzlePiece, FaImage } from 'react-icons/fa';
import styles from '@/app/account/page.module.scss'; 

const AdminView = ({ handleOpen }) => {
    const categories = {
        News: {
            icon: <FaNewspaper />,
            options: [
                { value: 'news', label: 'Manage News' },
                { value: 'createNews', label: 'Create News' },
            ],
        },
        Teams: {
            icon: <FaUsers />,
            options: [
                { value: 'team', label: 'Manage Teams' },
                { value: 'createTeam', label: 'Create Team' },
            ],
        },
        Partners: {
            icon: <FaHandshake />,
            options: [
                { value: 'partners', label: 'Manage Partners' },
                { value: 'createPartner', label: 'Create Partner' },
            ],
        },
        Portfolio: {
            icon: <FaBriefcase />,
            options: [
                { value: 'portfolio', label: 'Manage Portfolio' },
                { value: 'createPortfolio', label: 'Create Portfolio' },
            ],
        },
        Series: {
            icon: <FaTv />,
            options: [
                { value: 'workedWith', label: 'Manage Series' },
                { value: 'createWorkedWith', label: 'Create Worked With' },
            ],
        },
        Logos: {
            icon: <FaImage />,
            options: [
                { value: 'logos', label: 'Manage Logos' },
                { value: 'createLogo', label: 'Create Logo' },
            ],
        },
        Integrations: {
            icon: <FaPuzzlePiece />,
            options: [
                { value: 'integrations', label: 'Manage Integrations' },
                { value: 'createIntegration', label: 'Create Integration' },
            ],
        },
        Services: {
            icon: <FaTools />,
            options: [
                { value: 'services', label: 'Manage Services' },
                { value: 'createService', label: 'Create Service' },
            ],
        },
        SEO: {
            icon: <FaSearch />,
            options: [
                { value: 'aboutPageSEO', label: 'About Page SEO' },
                { value: 'homePageSEO', label: 'Home Page SEO' },
                { value: 'servicesPageSEO', label: 'Services Page SEO' },
                { value: 'contactPageSEO', label: 'Contact Page SEO' },
                { value: 'newsPageSEO', label: 'News Page SEO' },
            ],
        },
        About: {
            icon: <FaInfoCircle />,
            options: [
                { value: 'aboutPage', label: 'Manage About Page' },
                { value: 'aboutPageSEO', label: 'About Page SEO' },
            ],
        },
    };

    const [expanded, setExpanded] = useState(null);

    const handleItemClick = (value) => {
        handleOpen(value)();
    };

    const toggleCategory = (category) => {
        setExpanded(expanded === category ? null : category);
    };

    return (
        <div>
            {Object.entries(categories).map(([category, { icon, options }]) => (
                <div key={category}>
                    <h2 
                        onClick={() => toggleCategory(category)} 
                        className={expanded === category ? styles.selectedCategory : ''} 
                        style={{ cursor: 'pointer', padding: '8px', display: 'flex', alignItems: 'center' }}
                    >
                        <span style={{ marginRight: '8px' }}>{icon}</span>
                        {category}
                    </h2>
                    <AnimatePresence>
                        {expanded === category && (
                            <motion.ul
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: 'auto', opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.3 }}
                                style={{ overflow: 'hidden', listStyleType: 'none', padding: 0 }}
                            >
                                {options.map(option => (
                                    <li
                                        key={option.value}
                                        onClick={() => handleItemClick(option.value)}
                                        style={{ cursor: 'pointer', padding: '8px' }}
                                    >
                                        {option.label}
                                    </li>
                                ))}
                            </motion.ul>
                        )}
                    </AnimatePresence>
                </div>
            ))}
        </div>
    );
};

export default AdminView;
