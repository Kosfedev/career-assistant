import React, { useCallback } from 'react';
import ReactPaginate from 'react-paginate';
import { useCookies } from 'react-cookie';

import { VACANCIES_QUERY_COOKIE_NAME } from '@/entities/vacancies';
import { TPagination } from '../model/types';

export function VacanciesPagination({ pagination }: { pagination: TPagination }) {
  const [cookies, setCookie] = useCookies([VACANCIES_QUERY_COOKIE_NAME]);
  const handlePageClick = useCallback(({ selected }: { selected: number }) => {
    const newCookie = { ...cookies[VACANCIES_QUERY_COOKIE_NAME], page: selected + 1 };

    setCookie(VACANCIES_QUERY_COOKIE_NAME, newCookie);
  }, [cookies, setCookie]);

  return (
    <ReactPaginate
      breakLabel="..."
      nextLabel="next >"
      onPageChange={handlePageClick}
      pageRangeDisplayed={5}
      pageCount={pagination?.pages}
      previousLabel="< previous"
      renderOnZeroPageCount={null}
    />
  );
}
