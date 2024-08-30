import Image from 'next/image';
import styles from './page.module.scss';
import { useReadMdx } from '@/hooks/useReadMdx';
import { MDX } from '@/interface';
import { ArticleCard } from '@/components/card';
import { useId } from 'react';

export default async function Home() {
  const markdownFiles = (await useReadMdx()) as MDX.Metadata[];

  return markdownFiles ? (
    <ul className={styles.main}>
      {markdownFiles?.map((v, idx) => {
        return (
          <li key={v.path + idx}>
            <ArticleCard {...v} />
          </li>
        );
      })}
    </ul>
  ) : null;
}
