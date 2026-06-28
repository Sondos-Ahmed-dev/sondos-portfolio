import React from 'react';

export const SEOSchema: React.FC = () => {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Sondos Ibrahim',
    email: 'sondosibrahim246@gmail.com',
    jobTitle: 'Frontend Developer',
    image: '/manus-storage/logo-si_c3cd3cc6.png',
    sameAs: [
      'https://linkedin.com/in/sondos-ibrahim-629342312',
      'https://github.com/Sondos-Ahmed-dev',
    ],
    knowsAbout: [
      'Angular',
      'React',
      'TypeScript',
      'JavaScript',
      'HTML5',
      'CSS3',
      'REST API',
      'Full-Stack Development',
      'Spring Boot',
      '.NET',
      'MySQL',
      'RxJS',
      'Bootstrap',
    ],
    alumniOf: {
      '@type': 'EducationalOrganization',
      name: 'Helwan University',
      addressCountry: 'EG',
    },
    hasCredential: [
      {
        '@type': 'EducationalOccupationalCredential',
        name: 'Front-End Development with Angular',
        issuedBy: {
          '@type': 'Organization',
          name: 'ITI (Information Technology Institute)',
        },
        dateIssued: '2025',
      },
      {
        '@type': 'EducationalOccupationalCredential',
        name: 'UI/UX Design',
        issuedBy: {
          '@type': 'Organization',
          name: 'NTI (National Telecommunication Institute)',
        },
        dateIssued: '2025',
      },
      {
        '@type': 'EducationalOccupationalCredential',
        name: 'Web Designer',
        issuedBy: {
          '@type': 'Organization',
          name: 'NTI (National Telecommunication Institute)',
        },
        dateIssued: '2024',
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
};
