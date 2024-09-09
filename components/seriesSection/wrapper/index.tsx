import { MDX } from '@/interface';
import styles from './seriesWrapper.module.scss';
import { SeriesCard } from '../card';
export const SeriesWrapper = ({ data, currentPath, locale }: { data: MDX.Metadata[]; currentPath: string; locale: string }) => {
  return (
    <ul className={[styles['series-wrapper']].join(' ')}>
      {data.map((v) => (
        <li key={v.path} className={styles['series-item']}>
          <SeriesCard {...v} currentPath={currentPath} locale={locale} />
        </li>
      ))}
    </ul>
  );
};
