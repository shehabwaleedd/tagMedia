interface Route {
    href: string;
    label: string;
}
const routesLinks: Route[] = [
    { href: '/', label: 'Home' },
    { href: '/clients', label: 'Clients' },
    { href: '/news', label: 'News' },
    { href: '/services', label: 'Services' },
    { href: '/about', label: 'About' },
    { href: '/contact', label: 'Contact' },
];


export default routesLinks;