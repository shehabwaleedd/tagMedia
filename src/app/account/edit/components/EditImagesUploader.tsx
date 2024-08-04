import React from 'react';
import Image from 'next/image';
import { ImageFile } from '@/types/common';


interface ImagesUploaderProps {
    uploadedImages: ImageFile[];
    setUploadedImages: React.Dispatch<React.SetStateAction<ImageFile[]>>;
}

const ImagesUploader: React.FC<ImagesUploaderProps> = ({ uploadedImages, setUploadedImages }) => {
    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;
        if (files) {
            // Clean up previous blob URLs
            uploadedImages.forEach(img => {
                if (img.previewUrl.startsWith('blob:')) {
                    URL.revokeObjectURL(img.previewUrl);
                }
            });

            const newImageFiles: ImageFile[] = Array.from(files).map(file => ({
                file,
                previewUrl: URL.createObjectURL(file)
            }));

            // Replace old images with new ones
            setUploadedImages(newImageFiles);
        }
    };

    return (
        <div>
            <input type="file" multiple onChange={handleImageChange} accept="image/*" />
            <div>
                {uploadedImages.map((image, index) => (
                    <Image
                        key={index}
                        src={image.previewUrl}
                        alt="Uploaded image"
                        width={100}
                        height={100}
                        layout='responsive'
                    />
                ))}
            </div>
        </div>
    );
};

export default ImagesUploader;
