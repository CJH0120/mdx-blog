'use client';
import { MDX } from '@/interface';
import Link from 'next/link';
import styles from './articleCard.module.scss';
import Image from 'next/image';
import { memo, useCallback, useEffect, useRef } from 'react';
import { useAnimation } from '@/hooks/useAnimation';
import { getKoreaDate } from '@/utils/getKorDate';
export const ArticleCard = ({
  date,
  description,
  path,
  thumbnail,
  title,
  isMain = true,
}: Omit<MDX.Metadata, 'tags'> & { isMain?: boolean }) => {
  const ref = useRef<HTMLAnchorElement>(null);
  const { isAnimate } = useAnimation();
  const handleIntoView = useCallback(() => {
    if (!ref.current) return;
    ref.current.classList.add(styles['card-into-view']);
  }, []);

  useEffect(() => {
    if (!ref.current || !isMain || !isAnimate) return;

    const options = {
      root: null,
      rootMargin: '-1px',
      threshold: 1.0,
    };

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        handleIntoView();
      }
    }, options);

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        // eslint-disable-next-line react-hooks/exhaustive-deps
        observer.unobserve(ref.current);
      }
    };
  }, [isAnimate, isMain, handleIntoView]);
  return (
    <Link
      className={[styles['card-wrapper'], !isMain ? styles['card-not-intersect'] : '', !isAnimate ? styles['card-into-view'] : ''].join(
        ' '
      )}
      href={`/article/${path}`}
      ref={ref}>
      <div className={styles['card-content']}>
        <h3 className={styles['card-title']}>{title}</h3>
        {isMain && <span className={styles['card-description']}>{description}</span>}
        <span className={styles['card-date']}>{getKoreaDate(date)}</span>
      </div>

      <div className={styles['card-thumbnail']}>
        <Image
          style={{
            objectFit: 'cover',
          }}
          src={`/${thumbnail}`}
          alt={title}
          fill
          quality={85}
          blurDataURL="data:image/gif;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAFklEQVR42mN8//HLfwYiAOOoQvoqBABbWyZJf74GZgAAAABJRU5ErkJggg=="
          placeholder="blur"
        />
      </div>
    </Link>
  );
};

ArticleCard.displayName = 'ArticleCard';
