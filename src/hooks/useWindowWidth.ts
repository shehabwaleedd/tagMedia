import { useState, useEffect, useMemo } from 'react';
import { debounce } from 'lodash';

export const BREAKPOINTS = {
    MOBILE: 468,
    MEDIUM_TABLET: 788,
    LARGE_TABLET: 900,
    TABLET: 1067,
    LAPTOP: 1068,
    MEDIUM_LAPTOP: 1220,
    LARGE_LAPTOP: 1400,
} as const;

interface WindowDimensions {
    width: number;
    height: number;
}

interface DeviceBreakpoints {
    isMobile: boolean;
    isMediumTablet: boolean;
    isLargeTablet: boolean;
    isTablet: boolean;
    isLaptop: boolean;
    isMediumLaptop: boolean;
    isLargeLaptop: boolean;
    isDesktop: boolean;
}

const getInitialDimensions = (): WindowDimensions => {
    if (typeof window === 'undefined') {
        return { width: 1200, height: 1200 };
    }
    return {
        width: window.innerWidth,
        height: window.innerHeight,
    };
};

const useWindowSize = () => {
    const [dimensions, setDimensions] = useState<WindowDimensions>(getInitialDimensions);

    useEffect(() => {
        if (typeof window === 'undefined') return;

        const handleResize = debounce(() => {
            setDimensions({
                width: window.innerWidth,
                height: window.innerHeight,
            });
        }, 200);

        handleResize();

        window.addEventListener('resize', handleResize);

        return () => {
            handleResize.cancel();
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    const breakpoints = useMemo((): DeviceBreakpoints => ({
        isMobile: dimensions.width < BREAKPOINTS.MOBILE,
        isMediumTablet: dimensions.width < BREAKPOINTS.MEDIUM_TABLET,
        isLargeTablet: dimensions.width < BREAKPOINTS.LARGE_TABLET,
        isTablet: dimensions.width < BREAKPOINTS.TABLET,
        isLaptop: dimensions.width <= BREAKPOINTS.LAPTOP,
        isMediumLaptop: dimensions.width <= BREAKPOINTS.MEDIUM_LAPTOP,
        isLargeLaptop: dimensions.width <= BREAKPOINTS.LARGE_LAPTOP,
        isDesktop: dimensions.width > BREAKPOINTS.LARGE_LAPTOP,
    }), [dimensions.width]);

    return {
        windowWidth: dimensions.width,
        windowHeight: dimensions.height,
        ...breakpoints,
    };
};

export default useWindowSize;