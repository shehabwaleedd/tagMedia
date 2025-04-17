import Image from 'next/image';
import Script from 'next/script'
import React from 'react'

export type FacebookPixelProps = {
    pixelId?: string;
}

export const FacebookPixel: React.FC<FacebookPixelProps> = ({ pixelId }) => {
    const fbPixelId = pixelId || process.env.NEXT_PUBLIC_FACEBOOK_PIXEL_ID;

    if (!fbPixelId) return null;

    return (
        <>
            <Script id="facebook-pixel" strategy="lazyOnload">
                {`
                    !function(f,b,e,v,n,t,s)
                    {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
                    n.callMethod.apply(n,arguments):n.queue.push(arguments)};
                    if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
                    n.queue=[];t=b.createElement(e);t.async=!0;
                    t.src=v;s=b.getElementsByTagName(e)[0];
                    s.parentNode.insertBefore(t,s)}(window, document,'script',
                    'https://connect.facebook.net/en_US/fbevents.js');
                    fbq('init', '${fbPixelId}');
                    fbq('track', 'PageView');
                `}
            </Script>
            <noscript>
                <Image height="1" width="1" style={{ display: 'none' }} src={`https://www.facebook.com/tr?id=${fbPixelId}&ev=PageView&noscript=1`} alt="Facebook Pixel" unoptimized />
            </noscript>
        </>
    )
}