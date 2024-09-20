import { FC, memo } from 'react';
import styles from './seriesCard.module.scss';
import { MDX } from '@/interface';
import Link from 'next/link';
import { getEnglishDate, getKoreaDate } from '@/utils/getKorDate';
export const SeriesCard: FC<MDX.Metadata & { currentPath: string; locale: string }> = ({ locale, date, title, path, currentPath }) => {
  locale;
  return (
    <Link href={`/article/${path}`} className={[styles['series-wrapper'], currentPath === path ? styles['active'] : ''].join(' ')}>
      <h4 className={styles['series-title']}>{title}</h4>
      <span className={styles['series-date']}>{locale === 'en' ? getEnglishDate(date) : getKoreaDate(date)}</span>
    </Link>
  );
};

SeriesCard.displayName = 'SeriesCard';
