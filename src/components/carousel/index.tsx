import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import "./Carousel.scss";
import Slider from '../swiper';
import { PartnerSeriesTypes } from '@/types/common';

interface CarouselProps {
    content: PartnerSeriesTypes[];
    type: 'actor' | 'serie';
}

const CarouselContent: React.FC<CarouselProps> = ({ content, type }) => (
    <>
        {content.map((item, index) => (
            <div key={item._id} className={`keen-slider__slide carouselItem`}>
                <Link href={`/clients/${type}/${item.slug}`} className='carouselLink'>

                    <Image
                        src={item.image.url}
                        alt={item.name}
                        width={type === 'actor' ? 800 : 300}
                        height={type === 'actor' ? 800 : 300}
                        objectFit="contain"
                        priority={type === 'actor' ? index < 4 : false}
                    />

                    <h3 className="itemTitle">{item.name}</h3>
                </Link>
            </div>
        ))}
    </>
);

const Carousel: React.FC<CarouselProps> = ({ content, type }) => {
    return (
        <section className='carousel'>
            <Slider content={<CarouselContent content={content} type={type} />} type={type} />
        </section>
    );
};

export default Carousel;