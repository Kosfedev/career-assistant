import React, { useCallback } from 'react';
import ReactPaginate from 'react-paginate';
import { useAppNavigation } from '@/shared/lib';
import { TPagination } from '../model/types';

export function VacanciesPagination({ pagination }: { pagination: TPagination }) {
  const { searchParamsObj, pushQuery } = useAppNavigation();

  const handlePageClick = useCallback(({ selected }: { selected: number }) => {
    const newParams = { ...searchParamsObj, page: selected + 1 };

    pushQuery(newParams);
  }, [pushQuery, searchParamsObj]);

  return (
    <ReactPaginate
      breakLabel="..."
      nextLabel=">"
      onPageChange={handlePageClick}
      pageRangeDisplayed={5}
      pageCount={pagination.pages}
      forcePage={pagination.page ? pagination.page - 1 : 0}
      previousLabel="<"
      renderOnZeroPageCount={null}
      className="flex justify-end mt-5"
      pageClassName="ml-3 text-primary-500 hover:text-primary-400"
      activeLinkClassName="text-primary-300"
      breakClassName="ml-3 text-primary-500 hover:text-primary-400"
      previousClassName="mr-1 text-primary-500 hover:text-primary-400"
      nextClassName="ml-4 text-primary-500 hover:text-primary-400"
      disabledLinkClassName="text-dark-600"
    />
  );
}
