import styles from "./page.module.scss";
import Landing from "@/components/landing";
import Brief from "@/components/brief"
import Featured from "@/components/featured";
import ImageSlider from "@/components/SlidingImages";
import Marquee from "@/animation/marquee/Marquee";

export default function Home() {
  return (
    <>
      <main className={styles.main}>
        <Landing />
        <Brief />
        <Featured />
        <ImageSlider />
        <Marquee />
      </main>
    </>
  );
}
