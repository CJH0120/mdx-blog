import type { MetadataRoute } from 'next';
import { useReadMdx as ReadMDX } from '../hooks/useReadMdx';
import { MDX } from '@/interface';
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://bittenlog.vercel.app';

  const posts: MDX.Metadata[] = (await ReadMDX()) as MDX.Metadata[];
  const indexPage = {
    url: baseUrl,
    lastModified: new Date().toISOString().split('T')[0],
  };
  const article = posts?.map((post) => {
    return {
      url: `${baseUrl}/article/${post.path}`,
      lastModified: new Date(post.date).toISOString().split('T')[0],
    };
  });

  return [indexPage, ...article];
}
