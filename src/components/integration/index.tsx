import React from 'react'
import styles from "./style.module.scss"
import Image from 'next/image'

type IntegrationProps = {
    name: string;
    link: string;
    image: {
        url: string;
    };
}

type Integration = {
    integrations: IntegrationProps[];
}


const Integration: React.FC<Integration> = ({ integrations }) => {
    return (
        <section className={styles.integration}>
            <div className={styles.upper}>
                <h2>Integrations</h2>
                <p>
                    We integrate with the best tools to make your life easier. We are always looking for new ways to make your experience better.
                </p>
            </div>
            <div className={styles.content}>
                {integrations.map((integration, i) => (
                    <div key={i}>
                        <Image src={integration.image.url} alt={integration.name} width={800} height={800} />
                    </div>
                ))}
            </div>
        </section>
    )
}

export default Integration