import { Metadata } from 'next/types';

export const metadata = {
    title: 'Projects | Cyper Studio',
    description: 'Explore our portfolio of projects and case studies showcasing our expertise in design and development.',
    keywords: 'projects, portfolio, case studies, cyper studio, development projects',
    openGraph: {
        title: 'Projects | Cyper Studio',
        description: 'Explore our portfolio of projects and case studies showcasing our expertise in design and development.',
        url: 'https://yourwebsite.com/projects',
        siteName: 'Cyper Studio',
        images: [
            {
                url: 'https://yourwebsite.com/images/projects-og.jpg',
                width: 1200,
                height: 630,
                alt: 'Cyper Studio Projects',
            },
        ],
        locale: 'en_US',
        type: 'website',
    },
    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
            'max-image-preview': 'large',
            'max-video-preview': -1,
            'max-snippet': -1,
        },
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Projects | Cyper Studio',
        description: 'Explore our portfolio of projects and case studies showcasing our expertise in design and development.',
        creator: '@cyperstudio',
        images: ['https://yourwebsite.com/images/projects-og.jpg'],
    },
    alternates: {
        canonical: 'https://yourwebsite.com/projects',
    }
};

export default function ProjectsLayout({ children }) {
    return (
        <div className="projects-layout">
            {children}
        </div>
    );
}