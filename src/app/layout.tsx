import { Metadata } from 'next';
import axios from 'axios';
import "./globals.css";
import Navbar from "@/components/navbar"
import SmoothScroller from "@/animation/SmoothScrolling";
import Footer from "@/components/footer";
import { Toaster } from "sonner";
import { FacebookPixel } from "@/tags/FacebookPixel";
import { GoogleAnalytics } from "@/tags/GoogleAnalytics";
import { LinkedInInsightTag } from "@/tags/LinkedInInsightTag";
import Background from '@/components/background';
import localFont from 'next/font/local';
import { createClient } from '@/prismicio';

const avanttLight = localFont({
  src: '../../public/fonts/Avantt-Light.ttf',
  variable: '--font-avantt-light',
  display: 'swap',
  weight: '300',
});

const helvetica = localFont({
  src: '../../public/fonts/Helvetica.woff',
  variable: '--font-helvetica',
  display: 'swap',
  weight: 'normal',
  preload: true,
});

const helveticaBold = localFont({
  src: '../../public/fonts/HelveticaNeueMedium.ttf',
  variable: '--font-helvetica-bold',
  display: 'swap',
  weight: 'bold',
  preload: true,
});

const satoshiRegular = localFont({
  src: '../../public/fonts/Satoshi-Regular.woff2',
  variable: '--font-satoshi-regular',
  display: 'swap',
  weight: 'normal',
  preload: true,
});


interface Variables {
  homePageSeoTitle: string;
  homePageSeoDescription: string;
  homePageSeoKeywords: string;
  homePageSeoImage: string;
}

async function getVariables(): Promise<Variables> {
  try {
    const response = await axios.get<Variables>(`${process.env.NEXT_PUBLIC_BASE_URL}/variable`, {
      headers: { 'Cache-Control': 'max-age=3600' }
    });
    return response.data;
  } catch (error) {
    console.error('Failed to fetch variables:', error);
    throw error;
  }
}

export async function generateMetadata(): Promise<Metadata> {
  let variables: Variables;
  try {
    variables = await getVariables();
  } catch (error) {
    console.error('Failed to fetch variables:', error);

    variables = {
      homePageSeoTitle: "Tag Media",
      homePageSeoDescription: "Tag Media is Egypt's pioneer in digital and influencer marketing. We transform brands to power growth.",
      homePageSeoKeywords: "tag media, digital marketing, influencer marketing",
      homePageSeoImage: "https://res.cloudinary.com/dfxz1hh8s/image/upload/v1710376514/iiqbbhbi0ccgdsm8xtl6.jpg",
    };
  }

  return {
    title: variables.homePageSeoTitle,
    description: variables.homePageSeoDescription,
    themeColor: "#161616",
    openGraph: {
      title: variables.homePageSeoTitle,
      description: variables.homePageSeoDescription,
      type: "website",
      images: {
        url: variables.homePageSeoImage,
        alt: "Tag Media",
        width: 1200,
        height: 630,
      },
      siteName: "Tag Media",
    },
    twitter: {
      card: "summary_large_image",
      site: "@tagmediaeg",
      title: variables.homePageSeoTitle,
      description: variables.homePageSeoDescription,
      images: {
        url: variables.homePageSeoImage,
        alt: "Tag Media",
        width: 1200,
        height: 630,
      },
    },
    keywords: variables.homePageSeoKeywords,
    alternates: {
      canonical: "https://www.tagmediaeg.com",
    },
  };
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {


  const client = createClient();
  const settings = await client.getSingle<any>("settings");
  const clientDocs = await client.getAllByType("clients_post");
  const newsDocs = await client.getAllByType("news_post");

  return (
    <html lang="en" suppressHydrationWarning className={`${avanttLight.variable} ${helvetica.variable} ${helveticaBold.variable} ${satoshiRegular.variable}`}>
      <head>
        <script async defer src="https://static.cdn.prismic.io/prismic.js?new=true&repo=tagmediaa"></script>
        <script defer src="https://cloud.umami.is/script.js" data-website-id="2fb08859-33f5-4dce-9879-d297a4842597"></script>
        <meta name="theme-color" content="#161616" />
      </head>
      <body>
        <Background />
        <Toaster />
        <Navbar settings={settings} clientsCount={clientDocs.length} newsCount={newsDocs.length} />
        <SmoothScroller />
        {children}
        <Footer settings={settings} clientsCount={clientDocs.length} newsCount={newsDocs.length} />
        <LinkedInInsightTag partnerId={process.env.NEXT_PUBLIC_LINKEDIN_PARTNER_ID} />
        <GoogleAnalytics measurementId={process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID} />
        <FacebookPixel pixelId={process.env.NEXT_PUBLIC_FACEBOOK_PIXEL || ""} />
      </body>
    </html>
  );
}