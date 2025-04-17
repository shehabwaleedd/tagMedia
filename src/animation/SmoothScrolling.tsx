'use client';

import { useLayoutEffect, useRef, useEffect, useCallback } from 'react';
import Tempus from '@studio-freight/tempus';
import Lenis from '@studio-freight/lenis';

const SmoothScroller = () => {
    const lenisRef = useRef<Lenis | null>(null);
    const resizeObserverRef = useRef<ResizeObserver | null>(null);
    const unsubscribeRef = useRef<(() => void) | null>(null);

    const initializeLenis = useCallback(() => {
        if (lenisRef.current) return;

        const lenisInstance = new Lenis({
            duration: 1,
            easing: (t) => (t === 1 ? 1 : 1 - Math.pow(2, -10 * t)),
            touchMultiplier: 2,
            orientation: 'vertical',
            gestureOrientation: 'vertical',
            infinite: false,
            smoothWheel: true,
            lerp: 0.06
        });

        lenisRef.current = lenisInstance;

        if (resizeObserverRef.current) {
            resizeObserverRef.current.disconnect();
        }

        resizeObserverRef.current = new ResizeObserver(() => {
            requestAnimationFrame(() => {
                if (lenisRef.current) {
                    lenisRef.current.resize();
                }
            });
        });

        resizeObserverRef.current.observe(document.documentElement);

        if (unsubscribeRef.current) {
            unsubscribeRef.current();
        }

        const onFrame = (time: number) => {
            if (lenisRef.current) {
                lenisRef.current.raf(time);
            }
        };

        unsubscribeRef.current = Tempus.add(onFrame);
    }, []);

    const destroyLenis = useCallback(() => {
        if (resizeObserverRef.current) {
            resizeObserverRef.current.disconnect();
            resizeObserverRef.current = null;
        }

        if (unsubscribeRef.current) {
            unsubscribeRef.current();
            unsubscribeRef.current = null;
        }

        if (lenisRef.current) {
            lenisRef.current.destroy();
            lenisRef.current = null;
        }
    }, []);

    useEffect(() => {
        const handleTransitionStart = () => {
            destroyLenis();
        };

        const handleTransitionEnd = () => {
            initializeLenis();
        };

        document.addEventListener('startViewTransition', handleTransitionStart);
        document.addEventListener('finishViewTransition', handleTransitionEnd);

        const observer = new MutationObserver((mutations) => {
            for (const mutation of mutations) {
                if (mutation.attributeName === 'style') {
                    const target = mutation.target as HTMLElement;
                    if (target.classList.contains('view-transition-active')) {
                        document.dispatchEvent(new Event('startViewTransition'));
                    } else if (target.classList.contains('view-transition')) {
                        document.dispatchEvent(new Event('finishViewTransition'));
                    }
                }
            }
        });

        observer.observe(document.documentElement, { attributes: true });

        return () => {
            document.removeEventListener('startViewTransition', handleTransitionStart);
            document.removeEventListener('finishViewTransition', handleTransitionEnd);
            observer.disconnect();
            destroyLenis();
        };
    }, [initializeLenis, destroyLenis]);

    useLayoutEffect(() => {
        initializeLenis();
        return destroyLenis;
    }, [initializeLenis, destroyLenis]);

    return null;
};

export default SmoothScroller;