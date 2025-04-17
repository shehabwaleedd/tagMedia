import React from 'react';
import styles from "./page.module.scss";
import { SliceZone } from "@prismicio/react";
import { createClient } from "@/prismicio";
import { components } from "@/slices";
import { Metadata } from "next";


export default async function Page() {
  const client = createClient();
  const page = await client.getSingle("homepage");

  return (
    <main className={styles.main}>
      <SliceZone slices={page.data.slices} components={components} />
    </main>
  );
}



export async function generateMetadata(): Promise<Metadata> {
  const client = createClient();
  const page = await client.getSingle("homepage");

  return {
    title: page.data.meta_title,
    description: page.data.meta_description,
  };
}
