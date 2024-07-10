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
      nextLabel=">"
      onPageChange={handlePageClick}
      pageRangeDisplayed={5}
      pageCount={pagination?.pages}
      previousLabel="<"
      renderOnZeroPageCount={null}
      className="flex justify-end mt-5"
      pageClassName="ml-3 text-primary-300 hover:text-primary-200"
      activeLinkClassName="text-primary-100"
      breakClassName="ml-3 text-primary-300 hover:text-primary-200"
      previousClassName="mr-1 text-primary-300 hover:text-primary-200"
      nextClassName="ml-4 text-primary-300 hover:text-primary-200"
      disabledLinkClassName="text-dark-600"
    />
  );
}
