import React from 'react';
import "./Carousel.scss";
import Slider from '@/components/swiper';
import { PrismicNextImage } from '@prismicio/next';
import Link from 'next/link';
import { Content } from "@prismicio/client";
import { SliceComponentProps } from '@prismicio/react';
import { createClient } from '@/prismicio';
import NewsCard from '@/app/news/(components)/newsCards/NewsCards';

type NewsPostDocument = Content.NewsPostDocument;
type CarouselSlice = Content.CarouselSlice;

interface Post {
  id: string;
  uid: string;
  data: {
    title: string;
    description?: any[];
    image: any;
    year: string;
    type: string;
  };
}

interface CarouselProps {
  posts: Post[];
  type: "actor" | "serie" | "news";
}

const ClientContent = ({ post }: { post: Post }) => {
  // Get dimensions directly from the image field
  const dimensions = post.data.image.dimensions || { width: 700, height: 500 };

  return (
    <div className="carouselItem">
      <PrismicNextImage field={post.data.image} width={dimensions.width} height={dimensions.height} className="carouselImage" />
      <p className="itemTitle">{post.data.title}</p>
    </div>
  );
};

const CarouselContent = ({ posts, type }: CarouselProps) => {
  const isNews = type === "news";
  const basePath = isNews ? "news" : "clients";

  return (
    <>
      {posts.map((post) => (
        <div className="keen-slider__slide" key={post.id}>
          <Link href={`/${basePath}/${post.uid}`} className="carouselLink">
            <ClientContent post={post} />
          </Link>
        </div>
      ))}
    </>
  );
};

const NewsContent = ({ news }: { news: NewsPostDocument[] }) => (
  <>
    {news.map((newsItem) => (
      <div key={newsItem.uid} className="keen-slider__slide">
        <Link href={`/news/${newsItem.uid}`} className="carouselLink">
          <NewsCard news={newsItem} />
        </Link>
      </div>
    ))}
  </>
);

const Carousel: React.FC<SliceComponentProps<CarouselSlice>> = async ({ slice }) => {
  const client = createClient();
  const { type } = slice.primary;
  const isNews = type === "news" as "actor" | "serie" | "news";

  const fetchPosts = async () => {
    const postType = isNews ? "news_post" : "clients_post";
    return await client.getAllByType(postType);
  };

  const getRefIds = () => {
    return slice.primary.carouselItems?.map(item => {
      if (item?.card?.link_type === 'Document' && 'id' in item.card) {
        return item.card.id;
      }
      return null;
    }).filter((id): id is string => id !== null) ?? [];
  };

  const filterPosts = (posts: any[], refIds: string[]) => {
    if (refIds.length === 0) return posts;

    return refIds
      .map(id => posts.find(post => post.id === id))
      .filter((post): post is any => post !== undefined);
  };

  const allPosts = await fetchPosts();
  const referenceIds = getRefIds();
  const filteredPosts = filterPosts(allPosts, referenceIds);

  if (filteredPosts.length === 0) {
    return null;
  }

  return (
    <section className="carousel">
      <Slider
        content={
          isNews
            ? <NewsContent news={filteredPosts} />
            : <CarouselContent posts={filteredPosts} type={type as "actor" | "serie" | "news"} />
        }
        type={type as "actor" | "serie" | "news"}
      />
    </section>
  );
};

export default Carousel;