import { useReadMdx as MDXRead } from '@/hooks/useReadMdx';
import { MDX } from '@/interface';

export async function generateStaticParams() {
  const posts = ((await MDXRead()) as MDX.Metadata[]) ?? [];
  return posts?.map((post) => ({
    slug: post.path,
  }));
}

export default function ArticleLayout({ children }: { children: React.ReactNode }) {
  return children;
}
