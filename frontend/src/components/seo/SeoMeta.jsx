import React from 'react';
import { Helmet } from 'react-helmet-async';

const SeoMeta = ({ 
  title = "Yamukelani Ntimbane - Full-Stack Web Developer",
  description = "Professional full-stack web developer specializing in React, Node.js, and modern web technologies. Based in South Africa, delivering high-quality web solutions.",
  keywords = "Yamukelani Ntimbane, web developer, full-stack developer, React developer, Node.js developer, South Africa developer, portfolio",
  canonical = "",
  ogImage = "/images/seo/og-image.jpg",
  twitterImage = "/images/seo/twitter-image.jpg",
  schema = null,
  robots = "index, follow"
}) => {
  const siteUrl = "https://yamukelanintimbane.com";
  const fullCanonical = canonical || siteUrl;
  
  // Default structured data for Person
  const defaultSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Yamukelani Ntimbane",
    "url": siteUrl,
    "image": `${siteUrl}/images/profile/Yamdev.jpg`,
    "sameAs": [
      "https://www.linkedin.com/in/yamukelani-ntimbane",
      "https://github.com/yamukelani-ntimbane",
      "https://twitter.com/yamukelani_dev"
    ],
    "jobTitle": "Full-Stack Web Developer",
    "worksFor": {
      "@type": "Organization",
      "name": "Freelance"
    },
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Johannesburg",
      "addressRegion": "Gauteng",
      "addressCountry": "ZA"
    },
    "alumniOf": "University of Technology",
    "knowsAbout": [
      "React.js", "Node.js", "JavaScript", "TypeScript", "MongoDB", 
      "Express.js", "Tailwind CSS", "Vite", "Framer Motion"
    ],
    "award": "Dean's List for 3 consecutive years"
  };

  const structuredData = schema || defaultSchema;

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="author" content="Yamukelani Ntimbane" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta name="robots" content={robots} />
      <link rel="canonical" href={fullCanonical} />
      
      {/* Open Graph Meta Tags */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={`${siteUrl}${ogImage}`} />
      <meta property="og:url" content={fullCanonical} />
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content="Yamukelani Ntimbane - Portfolio" />
      <meta property="og:locale" content="en_ZA" />
      
      {/* Twitter Card Meta Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:creator" content="@yamukelani_dev" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={`${siteUrl}${twitterImage}`} />
      <meta name="twitter:site" content="@yamukelani_dev" />
      
      {/* Additional Meta Tags for SEO */}
      <meta name="theme-color" content="#667eea" />
      <meta name="msapplication-TileColor" content="#667eea" />
      <meta name="application-name" content="Yamukelani Ntimbane Portfolio" />
      
      {/* Language and Location */}
      <html lang="en" />
      <meta name="geo.region" content="ZA-GT" />
      <meta name="geo.placename" content="Johannesburg" />
      <meta name="geo.country" content="ZA" />
      
      {/* Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify(structuredData)}
      </script>
      
      {/* Performance and Security */}
      <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
      <meta name="format-detection" content="telephone=no" />
      
      {/* Preconnect to external domains */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link rel="preconnect" href="https://www.google-analytics.com" />
    </Helmet>
  );
};

export default SeoMeta;