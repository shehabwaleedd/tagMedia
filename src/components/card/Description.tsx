import React, { useMemo, useCallback } from 'react';
import { Parser } from 'html-to-react';
import styles from './style.module.scss';

const htmlToReactParser = Parser();

interface DescriptionProps {
    description: string;
    maxLength?: number;
}

const Description: React.FC<DescriptionProps> = ({ description, maxLength = 500 }) => {
    const renderHTMLContent = useCallback((htmlContent: string) => {
        return htmlToReactParser.parse(htmlContent);
    }, []);

    const truncatedContent = useMemo(() => {
        if (description.length > maxLength) {
            // Find the last space within the maxLength to avoid cutting words
            const lastSpace = description.lastIndexOf(' ', maxLength);
            return description.slice(0, lastSpace > 0 ? lastSpace : maxLength) + '...';
        }
        return description;
    }, [description, maxLength]);

    const parsedTruncatedDescription = useMemo(() => renderHTMLContent(truncatedContent), [renderHTMLContent, truncatedContent]);

    return (
        <div className={styles.description}>
            {parsedTruncatedDescription}
        </div>
    );
};

export default React.memo(Description);