import styles from './mdxWrapper.module.scss';
import { MDX } from '@/interface';
import MDXContent from './mdxContent';
import Image from 'next/image';
import { getEnglishDate, getKoreaDate } from '@/utils/getKorDate';

const MDXWrapper = ({ content, meta, language }: MDX.Props & { language: string }) => {
  return (
    <>
      <article className={styles.container}>
        <header className={styles.header}>
          <div
            style={{
              position: 'relative',
              aspectRatio: '16/9',
              borderRadius: '10px',
              overflow: 'hidden',
            }}>
            <Image
              blurDataURL="data:image/gif;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAFklEQVR42mN8//HLfwYiAOOoQvoqBABbWyZJf74GZgAAAABJRU5ErkJggg=="
              placeholder="blur"
              quality={85}
              priority
              style={{
                objectFit: 'cover',
              }}
              sizes="(max-width: 666px) 80vw,100vw"
              draggable={false}
              src={`/${meta.thumbnail}`}
              alt={meta.title}
              fill
            />
          </div>
          <h1 className={styles.title}>{meta.title}</h1>
          {meta.tags && (
            <div className={styles.tags}>
              {meta.tags.map((v) => (
                <span className={styles.tag} key={v}>
                  {v}
                </span>
              ))}
            </div>
          )}
          <span className={styles.date}>{language === 'en' ? getEnglishDate(meta.date) : getKoreaDate(meta.date)}</span>
        </header>
        <MDXContent content={content} meta={meta} />
      </article>
      {/* 
				{articleNav.length > 0 && <ArticleNav articleNav={articleNav} />} */}
    </>
  );
};

export default MDXWrapper;
