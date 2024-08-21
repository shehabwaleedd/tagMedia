import React from 'react';
import dynamic from 'next/dynamic';
import styles from "./page.module.scss";
import Landing from "@/components/landing";
import { serverDynamicFetch } from '@/lib/serverDynamicFetch';
const Brief = dynamic(() => import("@/components/brief"), { ssr: false });
const NewsHomePage = dynamic(() => import("@/components/news"), { ssr: false });
const WorkWithUs = dynamic(() => import("@/components/workWithUs"), { ssr: false });
const Integration = dynamic(() => import("@/components/integration"), { ssr: false });
const Carousel = dynamic(() => import("@/components/carousel"), { ssr: false });
import Trusted from '@/components/trusted';

const Home: React.FC = async () => {
  const partners = await serverDynamicFetch('partner');
  const work = await serverDynamicFetch('portfolio');
  const integration = await serverDynamicFetch('integration');
  const logos = await serverDynamicFetch('logo');
  return (
    <main className={styles.main}>
      <Landing />
      <Trusted data={logos} />
      <Carousel content={partners} type="actor" />
      <Brief />
      <Carousel content={work} type="serie" />
      <Integration integrations={integration} />
      <WorkWithUs />
      <NewsHomePage/>
    </main>
  );
};

export default Home;