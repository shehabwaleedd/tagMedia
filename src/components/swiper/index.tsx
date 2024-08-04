'use client'
import React, { useState } from 'react'
import { useKeenSlider } from "keen-slider/react"
import "@/components/news/NewsHomePage.scss"
import "keen-slider/keen-slider.min.css"
import { GoArrowRight, GoArrowLeft } from "react-icons/go";

const Slider = ({ content }: { content: JSX.Element }) => {
    const [currentSlide, setCurrentSlide] = useState(0)
    const [loaded, setLoaded] = useState(false)
    const [sliderRef, instanceRef] = useKeenSlider({
        loop: false,
        initial: 0,
        slideChanged(slider) {
            setCurrentSlide(slider.track.details.rel)
        },
        created() {
            setLoaded(true)
        },
        breakpoints: {
            "(min-width: 440px)": {
                slides: { perView: 1, spacing: 10 },
            },
            "(min-width: 768px)": {
                slides: { perView: 2, spacing: 20 },
            },
            "(min-width: 1024px)": {
                slides: { perView: 3, spacing: 30 },
            },
            "(min-width: 1324px)": {
                slides: { perView: 4, spacing: 30 },
            },
        },
        slides: {
            perView: 1, spacing: 10, origin: "auto",
        },
    })

    return (
        <div className="navigation-wrapper">
            {loaded && instanceRef.current && (
                <div className='arrows'>
                    <Arrow
                        left
                        onClick={(e: any) =>
                            e.stopPropagation() || instanceRef.current?.prev()
                        }
                        disabled={currentSlide === 0}
                    />
                    <Arrow
                        onClick={(e: any) =>
                            e.stopPropagation() || instanceRef.current?.next()
                        }
                        disabled={
                            currentSlide ===
                            instanceRef.current.track.details.slides.length - 1
                        }
                    />
                </div>
            )}
            <div ref={sliderRef} className="keen-slider">
                {content}
            </div>
        </div>
    )
}

function Arrow(props: {
    disabled: boolean
    left?: boolean
    onClick: (e: any) => void
}) {
    return (
        <button
            onClick={props.onClick}
            className={`arrow ${
                props.left ? "arrow--left" : "arrow--right"
            } ${props.disabled ? "arrow--disabled" : ""}`}
            aria-label={props.left ? "Previous slide" : "Next slide"}
        >
            {props.left ? <GoArrowLeft /> : <GoArrowRight />}
        </button>
    )
}

export default Slider