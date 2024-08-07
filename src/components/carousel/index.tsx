import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import "./Carousel.scss";
import Slider from '../swiper';
import { PartnerSeriesTypes } from '@/types/common';
import { slugify } from '@/utils/slugify';

interface CarouselProps {
    content: PartnerSeriesTypes[];
    type: 'actor' | 'series';
}

const CarouselContent: React.FC<CarouselProps> = ({ content, type }) => (
    <>
        {content.map((item, index) => (
            <div key={item._id} className={`keen-slider__slide carouselItem`}>
                <Link href={`/work/${type}/${slugify(item.name)}`} className='carouselLink'>
                    <div className='imageWrapper'>
                        <Image
                            src={item.image.url}
                            width={400}
                            height={500}
                            alt={item.name}
                            layout="responsive"
                            objectFit="cover"
                            priority={type === 'actor' ? index < 3 : false}
                        />
                    </div>
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