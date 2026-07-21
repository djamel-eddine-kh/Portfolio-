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
    'Djamel Eddine Khelifaoui, Software Engineer, AI Researcher, PhD Candidate, Java, Spring Boot, React, Angular, Machine Learning, Deep Learning, IoT, Network Security, Algeria',
  ogImage: `${SITE_URL}/og-image.png`,
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
        jobTitle: 'Software Engineer & AI Researcher',
        url: SITE_URL,
        sameAs: [
          'https://www.linkedin.com/in/djamel-eddine-khelifaoui/',
          'https://github.com/djamel-eddine-kh',
        ],
        knowsAbout: [
          'Software Engineering',
          'Backend Architecture',
          'Artificial Intelligence',
          'Machine Learning',
          'IoT Fingerprinting',
          'Java',
          'Spring Boot',
          'React',
        ],
      },
      {
        '@type': 'WebSite',
        '@id': `${SITE_URL}/#website`,
        url: SITE_URL,
        name: `${SITE_NAME} — Official Portfolio`,
        publisher: {
          '@id': `${SITE_URL}/#person`,
        },
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
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:locale" content="en_US" />

      {/* Twitter */}
      <meta name="twitter:card" content={twitterCard} />
      <meta name="twitter:url" content={canonicalUrl} />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />

      {/* Additional SEO signals */}
      <meta name="theme-color" content="#0B1120" />
      <meta name="color-scheme" content="dark light" />

      {/* JSON-LD Structured Data */}
      <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
    </Helmet>
  );
}
