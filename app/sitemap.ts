import type { MetadataRoute } from 'next';
import { useReadMdx as ReadMDX } from '../hooks/useReadMdx';
import { MDX } from '@/interface';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrls: Record<string, string> = {
    en: 'https://bittenlog.vercel.app/en',
    ko: 'https://bittenlog.vercel.app',
  };

  const locales = ['en', 'ko'];

  let posts: MDX.Metadata[] = [];
  try {
    posts = (await ReadMDX()) as MDX.Metadata[];
  } catch (error) {
    console.error('Failed to fetch posts for sitemap:', error);
  }

  const sitemap = locales.flatMap((locale) => {
    const baseUrl = baseUrls[locale];

    const indexPage = {
      url: `${baseUrl}/`,
      lastModified: new Date().toISOString().split('T')[0],
    };

    const articlePages = posts.map((post) => ({
      url: `${baseUrl}/article/${post.path}`,
      lastModified: new Date(post.date).toISOString().split('T')[0],
    }));

    return [indexPage, ...articlePages];
  });

  return sitemap;
}
