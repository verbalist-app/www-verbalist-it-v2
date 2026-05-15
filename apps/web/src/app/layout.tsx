import Image from 'next/image'

import { ButtonLink, PlainButtonLink } from '@/components/elements/button'
import { Main } from '@/components/elements/main'
import {
  FooterCategory,
  FooterLink,
  FooterWithNewsletterFormCategoriesAndSocialIcons,
  NewsletterForm,
} from '@/components/sections/footer-with-newsletter-form-categories-and-social-icons'
import {
  NavbarDropdown,
  NavbarDropdownLink,
  NavbarLink,
  NavbarLogo,
  NavbarWithLinksActionsAndCenteredLogo,
} from '@/components/sections/navbar-with-links-actions-and-centered-logo'
import type { Metadata, Viewport } from 'next'
import './globals.css'

const SITE_URL = 'https://www.verbalist.it'

const SITE_DESCRIPTION =
  'Verbalist trasforma SERP, keyword e competitor in contenuti SEO e GEO pronti per Google, ChatGPT e Perplexity. Pacchetti a consumo, niente abbonamento.'

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
}

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'Software SEO con AI per content engineering \\ Verbalist',
    template: '%s \\ Verbalist',
  },
  description: SITE_DESCRIPTION,
  applicationName: 'Verbalist',
  generator: 'Next.js',
  keywords: [
    'SEO',
    'GEO',
    'AI search',
    'content marketing',
    'AEO',
    'generazione contenuti',
    'analisi SERP',
  ],
  authors: [{ name: 'NUR S.r.l.', url: 'https://nur.it' }],
  creator: 'NUR S.r.l.',
  publisher: 'NUR S.r.l.',
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'it_IT',
    url: SITE_URL,
    siteName: 'Verbalist',
    title: 'Software SEO con AI per content engineering \\ Verbalist',
    description: SITE_DESCRIPTION,
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Software SEO con AI per content engineering \\ Verbalist',
    description: SITE_DESCRIPTION,
    images: ['/opengraph-image'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
  formatDetection: {
    telephone: false,
    email: false,
    address: false,
  },
}

const organizationSchema = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Organization',
      '@id': `${SITE_URL}/#organization`,
      name: 'Verbalist',
      legalName: 'NUR S.r.l.',
      url: SITE_URL,
      logo: `${SITE_URL}/img/logos/verbalist-logotype-dark.svg`,
      sameAs: ['https://nur.it'],
      parentOrganization: {
        '@type': 'Organization',
        name: 'NUR S.r.l.',
        url: 'https://nur.it',
        foundingDate: '1999',
        address: {
          '@type': 'PostalAddress',
          streetAddress: 'Via del Commercio 1/N',
          addressLocality: 'San Giorgio Bigarello',
          addressRegion: 'MN',
          addressCountry: 'IT',
        },
        award: [
          'Google Premier Partner',
          'HubSpot Platinum Partner',
          'Microsoft Partner',
          'Semrush Partner',
        ],
      },
    },
    {
      '@type': 'WebSite',
      '@id': `${SITE_URL}/#website`,
      url: SITE_URL,
      name: 'Verbalist',
      description: SITE_DESCRIPTION,
      publisher: { '@id': `${SITE_URL}/#organization` },
      inLanguage: 'it-IT',
    },
  ],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="it">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Familjen+Grotesk:ital,wght@0,400..700;1,400..700&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        <>
          <NavbarWithLinksActionsAndCenteredLogo
            id="navbar"
            links={
              <>
                <NavbarDropdown label="Prodotto" id="nav-prodotto">
                  <NavbarDropdownLink href="/prodotto/analisi-serp">Analisi SERP</NavbarDropdownLink>
                  <NavbarDropdownLink href="/prodotto/generazione-contenuti">Generazione contenuti</NavbarDropdownLink>
                  <NavbarDropdownLink href="/prodotto/ottimizzazione-contenuti">Ottimizzazione contenuti</NavbarDropdownLink>
                  <NavbarDropdownLink href="/prodotto/brand-tone-of-voice">Brand & Tone of voice</NavbarDropdownLink>
                  <NavbarDropdownLink href="/prodotto/multi-lingua">Multi-lingua</NavbarDropdownLink>
                </NavbarDropdown>
                <NavbarLink href="/pricing">Prezzi</NavbarLink>
                <NavbarLink href="/blog">Blog</NavbarLink>
                <NavbarLink href="#">Docs</NavbarLink>
                <NavbarLink href="/login" className="sm:hidden">
                  Accedi
                </NavbarLink>
              </>
            }
            logo={
              <NavbarLogo href="/">
                <Image
                  src="/img/logos/verbalist-logotype-dark.svg"
                  alt="Verbalist"
                  width={96}
                  height={28}
                />
              </NavbarLogo>
            }
            actions={
              <>
                <PlainButtonLink href="/login" className="max-sm:hidden">
                  Accedi
                </PlainButtonLink>
                <ButtonLink href="/signup">Prova gratis 1 mese</ButtonLink>
              </>
            }
          />

          <Main>{children}</Main>

          <FooterWithNewsletterFormCategoriesAndSocialIcons
            id="footer"
            cta={
              <NewsletterForm
                headline="Newsletter"
                subheadline={
                  <p>
                    Pattern di content engineering, casi di studio e aggiornamenti del prodotto. Una
                    mail al mese, senza spam.
                  </p>
                }
                action="#"
              />
            }
            links={
              <>
                <FooterCategory title="Prodotto">
                  <FooterLink href="/prodotto/analisi-serp">Analisi SERP</FooterLink>
                  <FooterLink href="/prodotto/generazione-contenuti">Generazione contenuti</FooterLink>
                  <FooterLink href="/prodotto/ottimizzazione-contenuti">Ottimizzazione contenuti</FooterLink>
                  <FooterLink href="/prodotto/brand-tone-of-voice">Brand & Tone of voice</FooterLink>
                  <FooterLink href="/prodotto/multi-lingua">Multi-lingua</FooterLink>
                  <FooterLink href="/pricing">Prezzi</FooterLink>
                  <FooterLink href="/manifesto">Manifesto</FooterLink>
                </FooterCategory>
                <FooterCategory title="Azienda">
                  <FooterLink href="/about">Chi siamo</FooterLink>
                  <FooterLink href="/blog">Blog</FooterLink>
                  <FooterLink href="mailto:info@nur.it">Contatti</FooterLink>
                </FooterCategory>
                <FooterCategory title="Legale">
                  <FooterLink href="/privacy-policy">Privacy Policy</FooterLink>
                  <FooterLink href="/cookie-policy">Cookie Policy</FooterLink>
                  <FooterLink href="/termini-e-condizioni">Termini di servizio</FooterLink>
                </FooterCategory>
              </>
            }
            fineprint={`© ${new Date().getFullYear()} NUR S.r.l.`}
          />
        </>
      </body>
    </html>
  )
}
