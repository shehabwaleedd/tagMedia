'use client'
import React, { useState, ReactNode, useEffect } from 'react';
import { useKeenSlider } from "keen-slider/react";
import "@/components/news/NewsHomePage.scss";
import "keen-slider/keen-slider.min.css";
import { GoArrowRight, GoArrowLeft } from "react-icons/go";
import Link from 'next/link';

interface SliderProps {
    content: ReactNode;
    type: 'actor' | 'serie' | 'news';
}

const animation = { duration: 5000, easing: (t: number) => t }

const Slider: React.FC<SliderProps> = ({ content, type }) => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [loaded, setLoaded] = useState(false);
    const [sliderRef, instanceRef] = useKeenSlider({
        loop: true,
        initial: 0,
        renderMode: "performance",
        mode: "free",
        drag: true,
        slideChanged(slider) {
            setCurrentSlide(slider.track.details.rel);
        },
        created(s) {
            setLoaded(true);
            if (type !== 'news') {
                s.moveToIdx(1, true, animation);
            }
        },
        updated(s) {
            if (type !== 'news') {
                s.moveToIdx(s.track.details.abs + 1, true, animation);
            }
        },
        animationEnded(s) {
            if (type !== 'news') {
                s.moveToIdx(s.track.details.abs + 1, true, animation);
            }
        },
        breakpoints: {
            "(min-width: 440px)": { slides: { perView: 1.25, spacing: 10 } },
            "(min-width: 768px)": { slides: { perView: 2.15, spacing: 20 } },
            "(min-width: 1024px)": { slides: { perView: 3.15, spacing: 30 } },
            "(min-width: 1324px)": { slides: { perView: 3.15, spacing: 30 } },
            "(min-width: 1624px)": { slides: { perView: 4.5, spacing: 30 } },
            "(min-width: 1924px)": { slides: { perView: 5.5, spacing: 30 } },
            "(min-width: 2224px)": { slides: { perView: 6.5, spacing: 30 } },
        },
        slides: { perView: 1.25, spacing: 10, origin: "auto" },
    });

    useEffect(() => {
        if (loaded && instanceRef.current && type !== 'news') {
            const interval = setInterval(() => {
                instanceRef.current?.next();
            }, 195000);

            return () => clearInterval(interval);
        }
    }, [loaded, instanceRef, type]);

    const moreLink = type === 'news' ? '/news' : `/work/${type}s`;
    const moreLinkText = `More ${type.charAt(0).toUpperCase() + type.slice(1)}`;

    return (
        <div className="navigation-wrapper">
            <div className='group'>
                <Link href={moreLink} aria-label={moreLinkText} className="moreLink">
                    <span className="slider__btn">{moreLinkText}s?</span>
                </Link>
                <div>
                    {loaded && instanceRef.current && (
                        <div className='arrows'>
                            <Arrow
                                left
                                onClick={(e: React.MouseEvent) => {
                                    e.stopPropagation();
                                    instanceRef.current?.prev();
                                }}
                                disabled={currentSlide === 0}
                            />
                            <Arrow
                                onClick={(e: React.MouseEvent) => {
                                    e.stopPropagation();
                                    instanceRef.current?.next();
                                }}
                                disabled={
                                    currentSlide ===
                                    instanceRef.current.track.details.slides.length - 1
                                }
                            />
                        </div>
                    )}
                </div>
            </div>
            <div ref={sliderRef} className="keen-slider">
                {content}
            </div>
        </div>
    );
};

interface ArrowProps {
    disabled: boolean;
    left?: boolean;
    onClick: (e: React.MouseEvent) => void;
}

const Arrow: React.FC<ArrowProps> = ({ disabled, left, onClick }) => (
    <button
        onClick={onClick}
        className={`arrow ${left ? "arrow--left" : "arrow--right"} ${disabled ? "arrow--disabled" : ""}`}
        aria-label={left ? "Previous slide" : "Next slide"}
    >
        {left ? <GoArrowLeft /> : <GoArrowRight />}
    </button>
);

export default Slider;