'use client'
import { useState } from 'react'
import styles from './article.module.scss'
const ArticleNav = ({ articleNav }: { articleNav: string[] }) => {
  const [isHover, setIsHover] = useState<boolean>(false)
  return (
    <nav className={styles.nav} onMouseEnter={() => setIsHover(true)} onMouseLeave={() => setIsHover(false)}>
      <ul className={styles.navList}>
        {articleNav.map((v) => (
          <li key={v} className={styles.navItem} />
        ))}
      </ul>
      {isHover && <ArticleBox articleNav={articleNav} />}
    </nav>
  )
}
export default ArticleNav

const ArticleBox = ({ articleNav }: { articleNav: string[] }) => {
  return (
    <div className={[styles.articleBox].join(' ')}>
      {articleNav.map((v) => (
        <a key={v} href={`#${v.replaceAll(' ', '-')}`} className={styles.articleItem}>
          {v}
        </a>
      ))}
    </div>
  )
}
