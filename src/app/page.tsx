import styles from "./page.module.scss";
import Landing from "@/components/landing";
import Brief from "@/components/brief"
import Featured from "@/components/featured";
import ImageSlider from "@/components/SlidingImages";
import ServicesComponent from "@/components/servicesCo";
import { serverDynamicFetch } from '@/lib/serverDynamicFetch'
import Announcment from "@/animation/marquee2/Marquee";
import Divider from "@/components/divider";
import Testimonials from '@/components/testimonials';
import MarqueeContent from "@/components/MarqueeContent";
import NewsHomePage from "@/components/news";
export default async function Home() {

  const partners = await serverDynamicFetch('partner');
  const work = await serverDynamicFetch('portfolio');

  return (
    <main className={styles.main}>
      <Landing />
      <Featured work={work} />
      <Divider main="Celebrities" />
      {/* <ImageSlider actors={partners} /> */}
      <Announcment content={MarqueeContent(partners)} direction={"left"} />
      <Divider main="Services" />
      <ServicesComponent />
      <Divider main="News" />
      <NewsHomePage />
      <Brief />
      <Testimonials />
    </main>
  );
}
