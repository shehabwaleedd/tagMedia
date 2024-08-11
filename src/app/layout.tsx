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
    themeColor: "#000000",
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
    <html lang="en" suppressHydrationWarning>
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