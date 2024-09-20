import { MDX } from '@/interface'
import styles from './tagWrapper.module.scss'
import { TagCard } from '../card'
export const TagWrapper = ({ data }: { data: MDX.Metadata[] }) => {
  return (
    <ul className={[styles['tag-wrapper']].join(' ')}>
      {data.map((v) => (
        <li key={v.path} className={styles['tag-item']}>
          <TagCard {...v} />
        </li>
      ))}
    </ul>
  )
}
