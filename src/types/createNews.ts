export interface Img {
    url: string;
    public_id: string;
}
export interface ImageFile {
    file: File;
    previewUrl?: string | null;
}
export interface ImageFileEdit {
    file: File;
}

export interface CurrentImage {
    url: string;
    public_id: string;
    file?: File | Blob;
}



export interface Option {
    name?: string;
    price?: number;
}

export interface OptionDetails {
    title?: string;
    subTitle?: string;
    description?: string;
    image?: File | null

}

export interface ImageFieldArrayProps {
    name: string;
    label: string;
}

export interface FormValues {
    title: string;
    subTitle: string;
    mainImg: File | null;
    images: File[];
    tags: string[];
    category: string;
    sections: OptionDetails[];
    date: string;
    [key: string]: unknown;
    seoTitle?: string | null;
    seoDescription?: string | null;
    seoImage?: File | null;
    seoKeywords?: string[] | null
}

export interface CustomFieldProps {
    name: string;
    label?: string;
    fieldType: 'input' | 'textarea' | 'select' | 'checkbox' | 'file';
    setFieldValue?: (field: string, value: any, shouldValidate?: boolean) => void;
    options?: Array<{ label: string; value: string }>;
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void; // New prop
    value?: string | number;
}

export interface GroupSize {
    label: string;
    value: number;
}




export interface ImageUploaderProps {
    mainImg: File | null;
    setMainImg: (img: File | null) => void;
    mainImgUrl?: string | null;
    setMainImgUrl?: (url: string) => void;
    title: string;
}

export interface ImagesUploaderProps {
    uploadedImages: ImageFile[];
    setUploadedImages: (images: ImageFile[]) => void;
}
export interface ImagesUploaderEditProps {
    uploadedImages: ImageFileEdit[];
    setUploadedImages: (images: ImageFile[]) => void;
}

interface CheckboxOption {
    label: string;
    value: string;

}


export interface CheckboxGroupFieldArrayProps {
    name: string;
    options: CheckboxOption[];
    setFieldValue: (field: string, value: any) => void;
    values: string[];
}