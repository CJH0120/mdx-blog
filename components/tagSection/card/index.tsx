import { FC, memo } from 'react';
import styles from './tagCard.module.scss';
import { MDX } from '@/interface';
import Link from 'next/link';
import { getKoreaDate } from '@/utils/getKorDate';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

export const TagCard: FC<MDX.Metadata> = ({ date, title, path, description, series, tags, thumbnail }) => {
  return (
    <Link href={`/article/${path}`} className={[styles['tag-wrapper']].join(' ')}>
      <div className={styles['tag-thumbnail']}>
        <Image src={`/${thumbnail}`} alt="series" fill />
      </div>
      <h4 className={styles['tag-title']}>{title}</h4>
      <span className={styles['tag-date']}>{getKoreaDate(date)}</span>
    </Link>
  );
};
