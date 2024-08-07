import React from 'react';
import styles from "./page.module.scss";
import Landing from "@/components/landing";
import Brief from "@/components/brief";
import ServicesComponent from "@/components/servicesCo";
import { serverDynamicFetch } from '@/lib/serverDynamicFetch';
import Testimonials from "@/components/testimonials";
import NewsHomePage from "@/components/news";
import WorkWithUs from "@/components/workWithUs";
import Integration from "@/components/integration";
import Carousel from "@/components/carousel";

const Home: React.FC = async () => {
  const partners = await serverDynamicFetch('partner');
  const work = await serverDynamicFetch('portfolio');
  const integration = await serverDynamicFetch('integration');

  return (
    <main className={styles.main}>
      <Landing />
      <Carousel content={partners} type="actor" />
      <Brief />
      <Carousel content={work} type="series" />
      <Integration integrations={integration} />
      <WorkWithUs />
      <NewsHomePage />
      <ServicesComponent />
    </main>
  );
};

export default Home;