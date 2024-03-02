
import Image from "next/image";
import styles from "./page.module.scss";
import Landing from "@/components/landing";
import Brief from "@/components/brief"
export default function Home() {
  return (
    <main className={styles.main}>
      <Landing />
      <Brief />
    </main>
  );
}
