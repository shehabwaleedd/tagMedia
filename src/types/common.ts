export interface NewsType {
    title: string
    subTitle: string
    mainImg: MainImg;
    images: MainImg[];
    date: string;
    link: string;
    _id: string;
    news?: string;
    category: string;
    author: string;
    createdAt: string;
    tags: string[];
    sections: Section[];
    slug: string;
    data?: any;
    seoTitle?: string | null;
    seoDescription?: string | null;
    seoImage?: MainImg | null;
    seoKeywords?: string[] | null
}


export interface PartnerSeriesTypes {
    image: {
        url: string;
        public_id: string;
    };
    _id: string;
    name: string;
    sections: PartnerSeriesSection[];
    index: number;
    createdAt: string;
    updatedAt: string;
    __v: number;
}

interface PartnerSeriesSection {
    image: {
        url: string;
        public_id: string;
    };
    _id: string;
    title: string;
    subTitle: string;
    description: string;
    partnerId: string;
}

export interface NewsDataType {
    data?: NewsType[]
}

export interface Section {
    title: string
    subTitle: string
    description: string
    image: MainImg;
    _id?: string;
}


export interface MainImg {
    url: string;
    public_id: string;
    file?: File | Blob;
    previewUrl?: string | null;
}


export interface ImageFile {
    file: File | string; // File for uploads, string for existing URLs
    previewUrl: string; // URL for displaying the image
}



export type LogoData = {
    image: {
        url: string;
    },
    name: string;
    link: string;
}
