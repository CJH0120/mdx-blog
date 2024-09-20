import { notFound } from 'next/navigation'
import MDXWrapper from '@/components/MDX/mdxWrapper'
import { useReadMdxFile as getFiles, useReadMdx as getDetail } from '@/hooks/useReadMdx'
import { Metadata } from 'next'
import styles from './article.module.scss'
import { MDX } from '@/interface'
import { SeriesWrapper } from '@/components/seriesSection'
import { TagWrapper } from '@/components/tagSection'

export async function generateMetadata({ params }: { params: { slug: string; locale: string } }): Promise<Metadata> {
  const data = await getFiles(params.slug, params.locale)
  if (!data) return {}
  return {
    title: data.meta.title,
    description: data.meta.description,
    openGraph: {
      title: data.meta.title,
      description: data.meta.description,
      siteName: 'Bitten Dev',
      type: 'article',
      images: data.meta.thumbnail,
      url: `https://bittenlog.vercel.app/article/${params.slug}`,
    },

    twitter: {
      title: data.meta.title,
      description: data.meta.description,
      images: data.meta.thumbnail,
      card: 'summary_large_image',
    },

    keywords: [...(data.meta.tags ?? [])],
  }
}

export async function generateStaticParams() {
  const posts = (await getDetail()) as MDX.Metadata[]

  const locales = ['en', 'ko']

  return locales.flatMap((locale) =>
    posts.map((post) => ({
      params: {
        locale,
        slug: post.path,
      },
    }))
  )
}
export default async function Page({ params }: { params: { slug: string; locale: string } }) {
  const data = (await getDetail(params.slug, params.locale)) as MDX.DetailProps
  if (!data.content) notFound()
  return (
    <>
      <MDXWrapper content={data.content} meta={data.meta} language={params.locale} />
      {!!data.series?.length && (
        <div className={[styles['footer-content-wrapper']].join(' ')}>
          <div className={[styles['footer-container']].join(' ')}>
            <div className={[styles['footer-title-wrapper']].join(' ')}>
              <h3 className={[styles['footer-title']].join(' ')}>
                <span className={[styles['footer-series']].join(' ')}>&quot;{data.meta.series}&quot;</span>
                <span>{params.locale === 'en' ? 'Series' : '시리즈물'}</span>
              </h3>
            </div>
            <SeriesWrapper data={data.series as MDX.Metadata[]} currentPath={params.slug} locale={params.locale} />
          </div>
        </div>
      )}
      {!!data.tags?.length &&
        data.tags?.map((v) =>
          Object.keys(v).map((key) => (
            <div className={[styles['footer-content-wrapper']].join(' ')} key={key}>
              <div className={[styles['footer-container']].join(' ')}>
                <div className={[styles['footer-title-wrapper']].join(' ')}>
                  <h3 className={[styles['footer-title']].join(' ')}>
                    <span className={[styles['footer-series']].join(' ')}>{key}</span>
                    <span>연관 게시글</span>
                  </h3>
                </div>
                <TagWrapper data={v[key] as MDX.Metadata[]} />
              </div>
            </div>
          ))
        )}
    </>
  )
}
