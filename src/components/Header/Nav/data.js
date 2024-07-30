import { BsYoutube, BsInstagram, BsTwitterX, BsTiktok, BsSnapchat } from "react-icons/bs";
import { FaFacebookF, FaLinkedinIn } from "react-icons/fa";

export const links = [
    {
        title: "Home",
        href: "/"
    },
    {
        title: "Projects",
        href: "/projects"
    },
    {
        title: "About",
        href: "/about"
    },
    {
        title: "Contact",
        href: "/contact"
    }
]

export const footerLinks = [
    {
        title: "Facebook",
        icon: <FaFacebookF />,
        href: "https://www.facebook.com/TagMediaeg"
    },
    {
        title: "Tiktok",
        icon: <BsTiktok />,
        href: "https://www.tiktok.com/@tagmediaeg"
    },
    {
        title: "Instagram",
        icon: <BsInstagram />,
        href: "https://www.instagram.com/tagmediaeg"
    },
    {
        title: "Twitter",
        icon: <BsTwitterX />,
        href: "https://twitter.com/TagMediaEg"
    },
    {
        title: "Snapchat",
        icon: <BsSnapchat />,
        href: "https://www.snapchat.com/add/tagmediaeg"
    },
    {
        title: "Youtube",
        icon: <BsYoutube />,
        href: "https://www.youtube.com/channel/UC1Z1dL1vZsW3q1RdJ6lX5Fw"
    },
    {
        title: "LinkedIn",
        icon: <FaLinkedinIn />,
        href: "https://www.linkedin.com/company/tag-media-eg"
    }
]