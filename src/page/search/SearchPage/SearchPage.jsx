import { useSearchParams, useLocation } from 'react-router-dom';

import { useScrollRestoration } from '@/shared/hook';
import { BackAppBar } from '@/shared/component';

import { Search, SearchResultListSuspense } from '@/feature/search/component';
import { PLACEHOLDER } from '@/feature/search/constant';

import styles from './SearchPage.module.css';

export default function SearchPage() {
  const [searchParams] = useSearchParams();
  const params = Object.fromEntries(searchParams.entries());
  const paramsLength = Object.keys(params).length;

  const { pathname } = useLocation();
  const current = pathname.split('/')[2];

  const { scrollRef, saveScrollPosition } = useScrollRestoration();

  return (
    <div className={styles.container} ref={scrollRef}>
      <BackAppBar hasSearchInput={true}>
        <Search placeholder={PLACEHOLDER[current]} />
      </BackAppBar>

      {paramsLength > 0 && (
        <SearchResultListSuspense saveScrollPosition={saveScrollPosition} />
      )}
    </div>
  );
}
