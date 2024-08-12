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


const satoshi = localFont({
  src: '../../public/fonts/Satoshi-Regular.woff2',
  variable: '--font-satoshi',
  display: 'swap',
  preload: true,
});


const avanttLight = localFont({
  src: '../../public/fonts/Avantt-Light.ttf',
  variable: '--font-avantt-light',
  display: 'swap',
});

const helvetica = localFont({
  src: '../../public/fonts/Helvetica.woff',
  variable: '--font-helvetica',
  display: 'swap',
});

const helveticaBold = localFont({
  src: '../../public/fonts/HelveticaNeueMedium.ttf',
  variable: '--font-helvetica-bold',
  display: 'swap',
});

const satoshiRegular = localFont({
  src: '../../public/fonts/Satoshi-Regular.woff2',
  variable: '--font-satoshi-regular',
  display: 'swap',
});



// Define the shape of your variables
interface Variables {
  homePageSeoTitle: string;
  homePageSeoDescription: string;
  homePageSeoKeywords: string;
  homePageSeoImage: string;
  // Add other variables as needed
}

async function getVariables(): Promise<Variables> {
  try {
    const response = await axios.get<Variables>(`${process.env.NEXT_PUBLIC_BASE_URL}/variable`, {
      headers: { 'Cache-Control': 'max-age=3600' } // Cache for 1 hour
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
    // Fallback to default values if fetch fails
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className={`${avanttLight.variable} ${helvetica.variable} ${helveticaBold.variable} ${satoshiRegular.variable}`}>
      <head>
        <meta name="theme-color" content="#161616" />
        <link rel="preload" href="/fonts/Avantt-Light.ttf" as="font" type="font/ttf" crossOrigin="anonymous"/>
        <link rel="preload" href="/fonts/Helvetica.woff" as="font" type="font/woff" crossOrigin="anonymous" />
        <link rel="preload" href="/fonts/HelveticaNeueMedium.ttf" as="font" type="font/ttf" crossOrigin="anonymous" />
        <link rel="preload" href="/fonts/Satoshi-Regular.woff2" as="font" type="font/woff2" crossOrigin="anonymous"/>
      </head>
      <body>
        <Background />
        <Toaster />
        <Navbar />
        <SmoothScroller />
        {children}
        <Footer />
        <LinkedInInsightTag partnerId={process.env.NEXT_PUBLIC_LINKEDIN_PARTNER_ID} />
        <GoogleAnalytics measurementId={process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID} />
        <FacebookPixel pixelId={process.env.NEXT_PUBLIC_FACEBOOK_PIXEL || ""} />
      </body>
    </html>
  );
}