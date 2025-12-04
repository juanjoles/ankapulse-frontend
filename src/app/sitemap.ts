import { MetadataRoute } from 'next'

// Lista de artículos (agrega más aquí cuando los crees)
const DOC_ARTICLES = [
  {
    slug: 'api-monitoring-guide',
    lastModified: '2024-12-05',
    priority: 0.9,
  },
  // Cuando modifiques el artículo de comparación, descomenta esto:
  // {
  //   slug: 'ankapulse-vs-uptimerobot',
  //   lastModified: '2024-12-05',
  //   priority: 0.9,
  // },
]

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://ankapulse.app'
  const locales = ['es', 'en']
  const routes: MetadataRoute.Sitemap = []
  
  // Helper para crear entrada bilingüe
  const createBilingualEntry = (
    path: string,
    lastModified: Date | string,
    priority: number,
    changeFrequency: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never'
  ) => {
    locales.forEach(locale => {
      routes.push({
        url: `${baseUrl}/${locale}${path}`,
        lastModified: new Date(lastModified),
        changeFrequency,
        priority,
        alternates: {
          languages: {
            es: `${baseUrl}/es${path}`,
            en: `${baseUrl}/en${path}`,
          }
        }
      })
    })
  }
  
  // Homepage
  createBilingualEntry('', new Date(), 1, 'weekly')
  
  // Plans
  createBilingualEntry('/plans', new Date(), 0.8, 'monthly')
  
  // Docs index
  createBilingualEntry('/docs', new Date(), 0.9, 'weekly')
  
  // Doc articles
  DOC_ARTICLES.forEach(article => {
    createBilingualEntry(
      `/docs/${article.slug}`,
      article.lastModified,
      article.priority,
      'monthly'
    )
  })
  
  return routes
}