import Image from 'next/image'

import { ButtonLink, PlainButtonLink } from '@/components/elements/button'
import { Main } from '@/components/elements/main'
import { GitHubIcon } from '@/components/icons/social/github-icon'
import { XIcon } from '@/components/icons/social/x-icon'
import { YouTubeIcon } from '@/components/icons/social/youtube-icon'
import {
  FooterCategory,
  FooterLink,
  FooterWithNewsletterFormCategoriesAndSocialIcons,
  NewsletterForm,
  SocialLink,
} from '@/components/sections/footer-with-newsletter-form-categories-and-social-icons'
import {
  NavbarDropdown,
  NavbarDropdownLink,
  NavbarLink,
  NavbarLogo,
  NavbarWithLinksActionsAndCenteredLogo,
} from '@/components/sections/navbar-with-links-actions-and-centered-logo'
import type { Metadata } from 'next'
import './globals.css'

const SITE_URL = 'https://www.verbalist.it'

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'AI per content engineering SEO e GEO \\ Verbalist',
    template: '%s \\ Verbalist',
  },
  description:
    'Verbalist trasforma keyword, SERP e competitor in contenuti SEO e GEO strutturati, pronti anche per la ricerca con AI come ChatGPT e Perplexity.',
  applicationName: 'Verbalist',
  generator: 'Next.js',
  keywords: ['SEO', 'GEO', 'AI search', 'content marketing', 'AEO', 'generazione contenuti', 'analisi SERP'],
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
    title: 'AI per content engineering SEO e GEO \\ Verbalist',
    description:
      'Verbalist trasforma keyword, SERP e competitor in contenuti SEO e GEO strutturati, pronti anche per la ricerca con AI come ChatGPT e Perplexity.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AI per content engineering SEO e GEO \\ Verbalist',
    description:
      'Verbalist trasforma keyword, SERP e competitor in contenuti SEO e GEO strutturati, pronti anche per la ricerca con AI come ChatGPT e Perplexity.',
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
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@graph': [
                {
                  '@type': 'Organization',
                  '@id': `${SITE_URL}/#organization`,
                  name: 'Verbalist',
                  legalName: 'NUR S.r.l.',
                  url: SITE_URL,
                  logo: `${SITE_URL}/img/brand/verbalist-logotype-dark.svg`,
                  sameAs: ['https://nur.it'],
                  parentOrganization: {
                    '@type': 'Organization',
                    name: 'NUR S.r.l.',
                    url: 'https://nur.it',
                    address: {
                      '@type': 'PostalAddress',
                      streetAddress: 'Via del Commercio 1/N',
                      addressLocality: 'San Giorgio Bigarello',
                      addressRegion: 'MN',
                      addressCountry: 'IT',
                    },
                  },
                },
                {
                  '@type': 'WebSite',
                  '@id': `${SITE_URL}/#website`,
                  url: SITE_URL,
                  name: 'Verbalist',
                  description:
                    'Verbalist trasforma keyword, SERP e competitor in contenuti SEO e GEO strutturati, pronti anche per la ricerca con AI come ChatGPT e Perplexity.',
                  publisher: { '@id': `${SITE_URL}/#organization` },
                  inLanguage: 'it-IT',
                },
              ],
            }),
          }}
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
                  <NavbarDropdownLink href="/brand">Brand & Tone of voice</NavbarDropdownLink>
                  <NavbarDropdownLink href="/prodotto/multi-lingua">Multi-lingua</NavbarDropdownLink>
                </NavbarDropdown>
                <NavbarLink href="/clienti">Clienti</NavbarLink>
                <NavbarLink href="/prezzi">Prezzi</NavbarLink>
                <NavbarLink href="/blog">Blog</NavbarLink>
                <NavbarLink href="https://docs.verbalist.it" target="_blank" rel="noopener noreferrer">
                  Docs
                </NavbarLink>
                <NavbarLink href="/login" className="sm:hidden">
                  Log in
                </NavbarLink>
              </>
            }
            logo={
              <NavbarLogo href="/">
                <Image
                  src="/img/logos/verbalist-logotype-dark.svg"
                  alt="Verbalist"
                  className="dark:hidden"
                  width={96}
                  height={28}
                />
                <Image
                  src="/img/logos/verbalist-logotype-light.svg"
                  alt="Verbalist"
                  className="not-dark:hidden"
                  width={96}
                  height={28}
                />
              </NavbarLogo>
            }
            actions={
              <>
                <PlainButtonLink href="/login" className="max-sm:hidden">
                  Log in
                </PlainButtonLink>
                <ButtonLink href="/signup">Get started</ButtonLink>
              </>
            }
          />

          <Main>{children}</Main>

          <FooterWithNewsletterFormCategoriesAndSocialIcons
            id="footer"
            cta={
              <NewsletterForm
                headline="Stay in the loop"
                subheadline={
                  <p>
                    Get customer support tips, product updates and customer stories that you can archive as soon as they
                    arrive.
                  </p>
                }
                action="#"
              />
            }
            links={
              <>
                <FooterCategory title="Product">
                  <FooterLink href="#">Features</FooterLink>
                  <FooterLink href="#">Pricing</FooterLink>
                  <FooterLink href="#">Integrations</FooterLink>
                </FooterCategory>
                <FooterCategory title="Company">
                  <FooterLink href="#">About</FooterLink>
                  <FooterLink href="#">Careers</FooterLink>
                  <FooterLink href="#">Blog</FooterLink>
                  <FooterLink href="#">Press Kit</FooterLink>
                </FooterCategory>
                <FooterCategory title="Resources">
                  <FooterLink href="#">Help Center</FooterLink>
                  <FooterLink href="#">API Docs</FooterLink>
                  <FooterLink href="#">Status</FooterLink>
                  <FooterLink href="#">Contact</FooterLink>
                </FooterCategory>
                <FooterCategory title="Legal">
                  <FooterLink href="/privacy">Privacy Policy</FooterLink>
                  <FooterLink href="/cookie">Cookie Policy</FooterLink>
                  <FooterLink href="/termini">Termini di servizio</FooterLink>
                </FooterCategory>
              </>
            }
            fineprint={<>© {new Date().getFullYear()} <a href="https://nur.it" target="_blank" rel="noopener noreferrer">NUR S.r.l.</a></>}
            socialLinks={
              <>
                <SocialLink href="https://x.com" name="X">
                  <XIcon />
                </SocialLink>
                <SocialLink href="https://github.com" name="GitHub">
                  <GitHubIcon />
                </SocialLink>
                <SocialLink href="https://www.youtube.com" name="YouTube">
                  <YouTubeIcon />
                </SocialLink>
              </>
            }
          />
        </>
      </body>
    </html>
  )
}
