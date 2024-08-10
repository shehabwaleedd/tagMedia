interface Route {
    href: string;
    label: string;
}
const routesLinks: Route[] = [
    { href: '/', label: 'Home' },
    { href: '/work', label: 'Work' },
    { href: '/about', label: 'About' },
    { href: '/news', label: 'News' },
    { href: '/contact', label: 'Contact' },
];


export default routesLinks;