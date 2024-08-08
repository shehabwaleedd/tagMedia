interface Data {
    id: number;
    title: string;
    text: string[];
}

const Data: Data[] = [
    {
        id: 1,
        title: "Privacy Notice",
        text: [
            "This Privacy Notice for Tag Media informs website visitors regarding our policies with the collection, use, and disclosure of Information if anyone decides to use our Service, the Tag Media website."
        ]
    },
    {
        id: 2,
        title: "What information do we collect?",
        text: [
            "We use Google Analytics, LinkedIn Insight Tag, and Facebook Pixel for analytics and marketing purposes. These tools collect non-personally identifiable information about your visits to our website, including your IP address, browser type, pages you visit, and time spent on those pages.",
            "We do not directly collect or store any personal data of our users."
        ]
    },
    {
        id: 3,
        title: "How do we use your information?",
        text: [
            "We use the data collected through these tools to analyze trends, administer the site, track users' movements, and gather demographic information. This data helps us improve our website, services, and marketing efforts.",
            "Google Analytics helps us understand how visitors use our website.",
            "LinkedIn Insight Tag allows us to gain insights into our website visitors and improve our LinkedIn advertising campaigns.",
            "Facebook Pixel helps us measure the effectiveness of our advertising and understand actions people take on our website.",
            "We do not sell, trade, or rent your personal data to third parties. The data collected is used solely for our own analytics and marketing purposes."
        ]
    },
    {
        id: 4,
        title: "How do we protect your information?",
        text: [
            "While we do not directly store user data, we ensure that our use of third-party analytics and marketing tools complies with their respective privacy policies and data protection standards.",
            "Please note that the privacy practices of Google, LinkedIn, and Facebook are governed by their own privacy policies, which we encourage you to review."
        ]
    },
    {
        id: 5,
        title: "Your rights",
        text: [
            "You have the right to opt-out of data collection for analytics and marketing purposes. You can do this by adjusting your browser settings to block cookies or by using opt-out features provided by Google, LinkedIn, and Facebook.",
            "If you have any questions about our privacy practices or would like to make a complaint, please contact us at [insert Tag Media contact email]."
        ]
    },
    {
        id: 6,
        title: "Changes to this Privacy Notice",
        text: [
            "We may update this Privacy Notice from time to time in response to changing legal, technical, or business developments. When we update our Privacy Notice, we will take appropriate measures to inform you, consistent with the significance of the changes we make.",
            "You can see when this Privacy Notice was last updated by checking the last updated date displayed at the top of this Privacy Notice."
        ]
    }
];

export default Data;