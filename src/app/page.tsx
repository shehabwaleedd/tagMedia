import styles from "./page.module.scss";
import Landing from "@/components/landing";
import Brief from "@/components/brief";
import ServicesComponent from "@/components/servicesCo";
import { serverDynamicFetch } from '@/lib/serverDynamicFetch'

import Testimonials from "@/components/testimonials";
import NewsHomePage from "@/components/news";
import WorkWithUs from "@/components/workWithUs";
import ProjectsHomePage from "@/components/projects";
import Integration from "@/components/integration";
export default async function Home() {

  const partners = await serverDynamicFetch('partner');
  const work = await serverDynamicFetch('portfolio');
  const integration = await serverDynamicFetch('integration');

  return (
    <main className={styles.main}>
      <Landing />
      <ProjectsHomePage work={work} instanceId="featured1" isActor={false} />
      <Brief />
      <ProjectsHomePage work={partners} instanceId="featured2" isActor={true} />
      <WorkWithUs />
      <Integration  integrations={integration}/>
      {/* <Divider main="News" /> */}
      <NewsHomePage />
      <ServicesComponent />
    </main>
  );
}
