import React from 'react'
import styles from "./style.module.scss"
import RoundedButton from '@/animation/RoundedButton'
import Link from 'next/link'
import Testimonials from '@/components/testimonials';

const index = () => {

    const data = [
        {
            title: "Brand Strategy",
            desc: "Helping you uncover your brand’s purpose and uniqueness – and the game plan to deliver it to win your customers’ devotion",
            services: [
                "Research and Insight",
                "Brand Purpose & Positioning",
                "Naming & Copywriting",
                "Brand Strategy",
                "Competitive Study",
                "Brand Architecture"
            ]
        },
        {
            title: "Content & Campaigns",
            desc: "Creating and implementing a multi-platform campaign strategy and content that is based on consumer preferences and trends, to drive engagement and conversions.",
            services: [
                " Campaign Ideation",
                "Content Strategy",
                "Social & Content Production",
                "Video & Photography",
                "Ongoing Brand Management",
                "Go - to - market Planning"
            ]
        },
        {
            title: "Community Management",
            desc: "Building and nurturing your brand’s online community to enhance engagement, customer loyalty, and brand advocacy.",
            services: [
                "Community Engagement Strategies",
                "Social Listening",
                "Content Moderation",
                "Feedback Collection",
                "Community Growth",
                "Event Planning & Management"
            ]
        },
        {
            title: "Media Buying",
            desc: "Strategically purchasing ad placements to ensure your brand reaches its target audience effectively and efficiently.",
            services: [
                "Platform Selection",
                "Budget Allocation",
                "Performance Analysis",
                "Ad Placement Optimization"
            ]
        },
        {
            title: "Influencer Marketing",
            desc: "Leveraging the power of influencers to expand your brand's reach, build credibility, and drive engagement through authentic storytelling.",
            services: [
                "Influencer Identification",
                "Campaign Strategy",
                "Content Co-creation",
                "Performance Tracking"
            ]
        },
        {
            title: "Media Production",
            desc: "Creating compelling visual content that captivates and engages your audience, from initial concept to final production.",
            services: [
                "Video Production",
                "Photography",
                "Post-Production Editing",
                "Graphic Design",
                "Animation"
            ]
        }
    ]

    return (
        <section className={styles.servicesCo}>
            <div className={styles.servicesCo_upper}>
                <h2>Services</h2>
                <p>
                    Delivering sustained growth means being committed to your whole design journey – our five core services help you connect and supercharge your brand from strategy and design through to omni-channel activation.
                </p>
            </div>
            <div className={styles.servicesCo_lower}>
                {
                    data.map((item, index) => (
                        <div key={index} className={styles.servicesCo_lower_item}>
                            <h3>{item.title}</h3>
                            <div className={styles.servicesCo_lower_item_content}>
                                <div className={styles.servicesCo_lower_item_content_bottom}>
                                    <p>{item.desc}</p>
                                    <div className={styles.servicesCo_lower_item_content_bottom_lower}>
                                        <RoundedButton>
                                            <Link href="/contact">
                                                Get in touch
                                            </Link>
                                        </RoundedButton>
                                    </div>
                                </div>
                                <div>
                                    <ul>
                                        {
                                            item.services.map((service, index) => (
                                                <li key={index}>{service}</li>
                                            ))
                                        }
                                    </ul>
                                </div>
                            </div>
                        </div>
                    ))
                }
            </div>
            <Testimonials />
        </section>
    )
}

export default index