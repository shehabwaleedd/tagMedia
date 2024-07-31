import styles from "./page.module.scss";
import Landing from "@/components/landing";
import Brief from "@/components/brief"
import Featured from "@/components/featured";
import ImageSlider from "@/components/SlidingImages";
import ServicesCo from "@/components/servicesCo"
import { serverDynamicFetch } from '@/lib/serverDynamicFetch'
import Spacer from "@/components/spacer";
import Trusted from "@/components/trusted";

export default async function Home() {

  const partners = await serverDynamicFetch('partner');
  const work = await serverDynamicFetch('portfolio');

  return (
    <>
      <main className={styles.main}>
        <Landing />
        <Trusted />
        <Spacer main="Projects" left="Transforming brands for growth" right="What can we do for you?" />
        <Featured work={work} />
        <Brief />
        <ImageSlider actors={partners} />
        <ServicesCo />
      </main>
    </>
  );
}
