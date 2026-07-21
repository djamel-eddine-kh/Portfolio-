import React from 'react';
import { Helmet } from 'react-helmet-async';

const SITE_URL = 'https://djamelkhelifaoui.com';
const SITE_NAME = 'Djamel Eddine Khelifaoui';
const DEFAULT_AUTHOR = 'Djamel Eddine Khelifaoui';

const DEFAULTS = {
  title: 'Djamel Eddine Khelifaoui — Software Engineer & AI Researcher',
  description:
    'Portfolio of Djamel Eddine Khelifaoui — Software Engineer, AI Researcher, and PhD Candidate specializing in scalable backend systems, mobile applications, and machine learning for IoT security.',
  keywords:
    'Djamel Eddine Khelifaoui, Djamel Khelifaoui, جمال الدين خليفاوي, Software Engineer, AI Researcher, PhD Candidate, Java, Spring Boot, React, TypeScript, PostgreSQL, Docker, Redis, Hibernate, Machine Learning, Artificial Intelligence, IoT Security, Network Security',
  ogImage: `${SITE_URL}/portfolio-og-image.png`,
} as const;

interface SEOProps {
  /** Page title — appended with site name unless noSuffix is true */
  title?: string;
  /** Meta description (max ~155 chars recommended) */
  description?: string;
  /** Canonical URL path (e.g. "/" or "/projects"). Defaults to "/" */
  path?: string;
  /** Comma-separated keywords */
  keywords?: string;
  /** Open Graph image URL */
  ogImage?: string;
  /** Open Graph type. Defaults to "website" */
  ogType?: string;
  /** Twitter card type. Defaults to "summary_large_image" */
  twitterCard?: 'summary' | 'summary_large_image' | 'app' | 'player';
  /** Robots directive. Defaults to "index, follow" */
  robots?: string;
  /** Author name. Defaults to site author */
  author?: string;
  /** If true, the title is used as-is without appending the site name suffix */
  noSuffix?: boolean;
}

export default function SEO({
  title,
  description = DEFAULTS.description,
  path = '/',
  keywords = DEFAULTS.keywords,
  ogImage = DEFAULTS.ogImage,
  ogType = 'website',
  twitterCard = 'summary_large_image',
  robots = 'index, follow',
  author = DEFAULT_AUTHOR,
  noSuffix = false,
}: SEOProps) {
  const fullTitle = title
    ? noSuffix
      ? title
      : `${title} | ${SITE_NAME}`
    : DEFAULTS.title;

  const canonicalUrl = `${SITE_URL}${path === '/' ? '' : path}`;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Person',
        '@id': `${SITE_URL}/#person`,
        name: SITE_NAME,
        alternateName: [
          'Djamel Khelifaoui',
          'جمال الدين خليفاوي',
        ],
        jobTitle: [
          'Software Engineer',
          'AI Researcher',
          'PhD Candidate',
        ],
        url: SITE_URL,
        image: `${SITE_URL}/portfolio-og-image.png`,
        sameAs: [
          'https://www.linkedin.com/in/djamel-eddine-khelifaoui/',
          'https://github.com/djamel-eddine-kh',
        ],
        knowsAbout: [
          'Java',
          'Spring Boot',
          'React',
          'TypeScript',
          'PostgreSQL',
          'Docker',
          'Redis',
          'Hibernate',
          'Machine Learning',
          'Artificial Intelligence',
          'IoT Security',
          'Network Security',
        ],
      },
      {
        '@type': 'WebSite',
        '@id': `${SITE_URL}/#website`,
        url: SITE_URL,
        name: `${SITE_NAME} — Official Portfolio`,
        alternateName: 'Djamel Eddine Khelifaoui Portfolio',
        description: DEFAULTS.description,
        publisher: {
          '@id': `${SITE_URL}/#person`,
        },
        inLanguage: ['en', 'ar'],
      },
    ],
  };

  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="author" content={author} />
      <meta name="robots" content={robots} />
      <link rel="canonical" href={canonicalUrl} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={ogType} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:image:secure_url" content={ogImage} />
      <meta property="og:image:type" content="image/png" />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content={fullTitle} />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:locale" content="en_US" />

      {/* Twitter */}
      <meta name="twitter:card" content={twitterCard} />
      <meta name="twitter:url" content={canonicalUrl} />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />
      <meta name="twitter:image:alt" content={fullTitle} />

      {/* Favicon & Web Manifest */}
      <link rel="icon" type="image/x-icon" href="/favicon.ico" />
      <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
      <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
      <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
      <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
      <link rel="manifest" href="/manifest.webmanifest" />

      {/* Additional SEO signals */}
      <meta name="theme-color" content="#0B1120" />
      <meta name="msapplication-TileColor" content="#0B1120" />
      <meta name="color-scheme" content="dark light" />

      {/* JSON-LD Structured Data */}
      <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
    </Helmet>
  );
}
