export interface Img {
    url: string;
    public_id: string;
}
export interface ImageFile {
    previewUrl: string;
    file: File;
    url?: string;
    public_id?: string;
}

export interface CurrentImage {
    url: string;
    public_id?: string;
    file?: File;

}


export interface ImageFieldArrayProps {
    name: string;
    label: string;
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



export interface ImageUploaderProps {
    mainImg: File | null;
    setMainImg: (img: File | null) => void;
    mainImgUrl: string | null;
    setMainImgUrl: (url: string) => void;
    type: string;
}

export interface ImagesUploaderProps {
    uploadedImages: ImageFile[];                      // Array of images selected for upload
    setUploadedImages: React.Dispatch<React.SetStateAction<ImageFile[]>>;
    currentImages: CurrentImage[];                    // Array of images already uploaded
    setCurrentImages: React.Dispatch<React.SetStateAction<CurrentImage[]>>;
}

