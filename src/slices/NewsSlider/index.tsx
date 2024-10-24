import React from 'react';
import { SliceComponentProps } from '@prismicio/react';
import { Content } from '@prismicio/client';
import { createClient } from '@/prismicio';
import styles from "./style.module.scss";
import Slide from './Slide';

type NewsSliderSlice = Content.NewsSliderSlice;


const NewsSlider: React.FC<SliceComponentProps<NewsSliderSlice>> = async ({ slice }) => {
  const client = createClient();
  const allNewsPosts = await client.getAllByType("news_post");

  const referenceLinkIds = slice.primary.cards
    .map(card => {
      if (card.referencelink.link_type === 'Document' && 'id' in card.referencelink) {
        return (card.referencelink as any).id;
      }
      return null;
    })
    .filter((id): id is string => id !== null);
  const newsPostsData = referenceLinkIds
    .map(id => allNewsPosts.find(post => post.id === id))
    .filter((post): post is NonNullable<typeof post> => post !== undefined)
    .map(post => ({
      id: post.id,
      uid: post.uid,
      title: post.data.title,
      tags: post.data.tags,
      description: post.data.description,
      featured_image: post.data.mainimage,
    }));

  return (
    <>
      {newsPostsData.length > 0 ? (
        <Slide newsPostsData={newsPostsData} slice={slice} />
      ) : (
        <p>No news posts available to display.</p>
      )}
    </>
  );
};

export default NewsSlider;