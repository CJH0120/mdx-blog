import styles from './page.module.scss'
import { useReadMdx } from '@/hooks/useReadMdx'
import { MDX } from '@/interface'
import { ArticleCard } from '@/components/card'

export default async function Home({ params }: { params: { locale: string } }) {
  const markdownFiles = (await useReadMdx(undefined, params.locale)) as MDX.Metadata[]
  return markdownFiles ? (
    <ul className={styles.main}>
      {markdownFiles?.map((v, idx) => {
        return (
          <li key={v.path}>
            <ArticleCard {...v} />
          </li>
        )
      })}
    </ul>
  ) : null
}
