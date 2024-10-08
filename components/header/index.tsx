'use client';
import Link from 'next/link';
import styles from './header.module.scss';
import { usePathname, useRouter } from 'next/navigation';
const Header = () => {
  const router = useRouter();
  const pathname = usePathname();
  const handleClick = () => {
    pathname.includes('/en')
      ? (window.location.href = pathname.replace('/en', '/ko'))
      : (window.location.href = pathname.replace('/', '/en/'));
  };
  const handleHover = () => {
    pathname.includes('/en') ? router.prefetch(pathname.replace('/en', '/ko')) : router.prefetch(pathname.replace('/', '/en/'));
  };
  return (
    <header id="header" className={styles.header}>
      <div className={styles['header-container']}>
        <div>
          <Link href={'/'} className={styles['header-main']}>
            <h1 className={styles['title']}>Bitten</h1>
          </Link>
        </div>
        <div className={styles['header-version']} onClick={handleClick} onMouseEnter={handleHover}>
          {pathname.includes('/en') ? 'Kor.V' : 'Eng.V'}{' '}
        </div>
      </div>
    </header>
  );
};

export default Header;
