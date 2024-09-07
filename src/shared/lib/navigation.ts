import { useCallback, useMemo } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import queryString from 'query-string';

export const useAppNavigation = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const pushQuery = useCallback((query: string | Record<string | number | symbol, unknown>) => {
    const newQuery = typeof query === 'string' ? query : queryString.stringify(query);

    router.push(`${pathname}?${newQuery}`);
  }, [pathname, router]);

  const searchParamsObj = useMemo(() => {
    return Object.fromEntries(searchParams.entries());
  }, [searchParams]);


  return { searchParamsObj, searchParams, pushQuery };
};
