
import { AiOutlineYoutube } from "react-icons/ai";
import { FaFacebookF, FaSnapchat, FaInstagram, FaTiktok } from "react-icons/fa6";
import { RiTwitterXFill } from "react-icons/ri";
import { FaLinkedin } from "react-icons/fa";


type SocialIconType = {
    href: string;
    Icon: any;
    label: string;
}

const socialIcons: SocialIconType[] = [
    { href: "https://www.facebook.com/TagMediaeg", Icon: FaFacebookF, label: "Facebook Page Link" },
    { href: "https://www.instagram.com/tagmediaeg", Icon: FaInstagram, label: "Instagram Page Link" },
    { href: "https://twitter.com/TagMediaEg", Icon: RiTwitterXFill, label: "Twitter Page Link" },
    { href: "https://www.youtube.com/channel/UCZv3g6bq9P7wU5KZn6a3v8A", Icon: AiOutlineYoutube, label: "Youtube Page Link" },
    { href: "https://www.snapchat.com/add/tagmediaeg", Icon: FaSnapchat, label: "Snapchat Page Link" },
    { href: "https://www.linkedin.com/company/tagmediaeg", Icon: FaLinkedin, label: "Linkedin Page Link" },
    { href: "https://www.tiktok.com/@tagmediaeg", Icon: FaTiktok, label: "Tiktok Page Link" },
];

export default socialIcons;