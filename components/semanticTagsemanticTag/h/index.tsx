'use client';
import { FC, forwardRef, memo, PropsWithChildren, useEffect, useRef, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import './h.scss';

interface HeadingProps extends PropsWithChildren {
  level: 1 | 2 | 3 | 4;
}

export const Heading: FC<HeadingProps> = memo(({ level, children }) => {
  const [hash, setHash] = useState('');
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    const handleHashChange = () => {
      const currentHash = window.location.hash;

      setHash(currentHash);
    };
    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    return () => {
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, []);

  useEffect(() => {
    const id = `#${children?.toString().replaceAll(' ', '-')}`;
    if (hash === encodeURI(id)) {
      setIsActive(hash === encodeURI(id));
      const timeoutId = setTimeout(() => {
        setIsActive(false);
      }, 2000);
      return () => clearTimeout(timeoutId);
    }
  }, [children, hash]);

  const Tag = `h${level}` as keyof JSX.IntrinsicElements;
  const id = children?.toString().replaceAll(' ', '-');

  return (
    <Tag id={id} className={[isActive ? 'item-text' : ''].join(' ')}>
      {children}
    </Tag>
  );
});

Heading.displayName = 'Heading';

export const H1: FC<PropsWithChildren> = ({ children }) => <Heading level={1}>{children}</Heading>;

export const H2: FC<PropsWithChildren> = ({ children }) => <Heading level={2}>{children}</Heading>;

export const H3: FC<PropsWithChildren> = ({ children }) => <Heading level={3}>{children}</Heading>;

export const H4: FC<PropsWithChildren> = ({ children }) => <Heading level={4}>{children}</Heading>;
