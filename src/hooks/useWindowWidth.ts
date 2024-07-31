import { useState, useEffect } from 'react';

const useWindowSize = () => {
    const [windowWidth, setWindowWidth] = useState<number | null>(null);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const handleResize = () => setWindowWidth(window.innerWidth);
            window.addEventListener('resize', handleResize);
            handleResize(); // Call this once to set the initial windowWidth
            return () => window.removeEventListener('resize', handleResize);
        }
    }, []);

    const isMobile = windowWidth !== null && windowWidth < 468;
    const isTablet = windowWidth !== null && windowWidth < 768;
    const isDesktop = windowWidth !== null && windowWidth >= 1268;

    return { windowWidth, isMobile, isTablet, isDesktop };
};

export default useWindowSize;
