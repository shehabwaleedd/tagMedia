import { FaInstagram, FaFacebookF, FaTwitter, FaLinkedinIn, FaYoutube, FaTiktok } from "react-icons/fa6";
import { KeyTextField, ImageField, LinkField, SelectField } from "@prismicio/types";

export interface SettingsDocumentData {
    site_title: KeyTextField;
    site_logo: ImageField;
    nav_items: {
        link_label: KeyTextField;
        link_url: LinkField;
    }[];
    social_items: {
        platform: SelectField;
        social_url: LinkField;
        icon_name: SelectField;
    }[];
    footer_secondary_links: {
        label: KeyTextField;
        link: LinkField;
    }[];
}

export interface SettingsDocument extends Document {
    data: SettingsDocumentData;
}


export const ICON_MAP = {
    'Instagram': FaInstagram,
    'Facebook': FaFacebookF,
    'Twitter': FaTwitter,
    'LinkedIn': FaLinkedinIn,
    'YouTube': FaYoutube,
    'TikTok': FaTiktok
};


export const getIconComponent = (icon_name: string | null) => {
    if (!icon_name) return null;
    return ICON_MAP[icon_name as keyof typeof ICON_MAP];
};
