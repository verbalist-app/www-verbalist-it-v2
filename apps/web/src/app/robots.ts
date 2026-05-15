import type { MetadataRoute } from 'next'

const SITE_URL = 'https://www.verbalist.it'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: '*', allow: '/', disallow: ['/login', '/signup'] },
      // AI crawler — opt-in (vogliamo essere citati)
      { userAgent: 'GPTBot', allow: '/' },              // OpenAI training
      { userAgent: 'OAI-SearchBot', allow: '/' },       // OpenAI search index
      { userAgent: 'ChatGPT-User', allow: '/' },        // ChatGPT live browsing su citazioni
      { userAgent: 'PerplexityBot', allow: '/' },       // Perplexity search/training
      { userAgent: 'Perplexity-User', allow: '/' },     // Perplexity live browsing
      { userAgent: 'ClaudeBot', allow: '/' },           // Anthropic training
      { userAgent: 'anthropic-ai', allow: '/' },        // Anthropic legacy
      { userAgent: 'Google-Extended', allow: '/' },     // Gemini training
      { userAgent: 'AppleBot-Extended', allow: '/' },   // Apple AI training
      { userAgent: 'Meta-ExternalAgent', allow: '/' },  // Meta AI training
      { userAgent: 'cohere-ai', allow: '/' },           // Cohere
      // Opt-out: training-only crawler che non portano valore di citazione
      { userAgent: 'CCBot', disallow: '/' },            // Common Crawl
      { userAgent: 'Bytespider', disallow: '/' },       // ByteDance training
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
  }
}
