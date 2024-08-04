

import React from 'react';
import Image from 'next/image';
import styles from "../../common.module.scss";
import { ImageUploaderProps } from '@/types/edit';

const ImageUploader: React.FC<ImageUploaderProps> = ({ mainImg, setMainImg, setMainImgUrl, mainImgUrl, type }) => {

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setMainImg(file);
            setMainImgUrl('')
        }
    };

    return (
        <div className={styles.formField}>
            <label htmlFor="mainImg">{type} Image</label>
            <input
                type="file"
                onChange={handleImageChange}
                accept="image/*"
            />
            {mainImgUrl && (
                <Image
                    src={mainImgUrl}
                    alt="Main image"
                    width={500}
                    height={500}
                    onLoad={(e) => URL.revokeObjectURL(e.currentTarget.src)}
                />
            )}
            {mainImg && (
                <Image
                    src={URL.createObjectURL(mainImg)}
                    alt="Main image"
                    width={500}
                    height={500}
                    onLoad={(e) => URL.revokeObjectURL(e.currentTarget.src)}
                />
            )}
        </div>
    );
};

export default ImageUploader;