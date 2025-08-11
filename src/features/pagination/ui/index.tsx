import ReactPaginate from 'react-paginate';

import styles from './pagination.module.scss';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  itemsPerPage?: number;
  totalItems?: number;
}

export const Pagination = ({
  totalPages,
  currentPage,
  onPageChange,
}: PaginationProps) => {
  const handlePageClick = (event: { selected: number }) => {
    onPageChange(event.selected + 1); // react-paginate использует 0-based индексы
  };

  if (totalPages <= 1) {
    return null; // Не показываем пагинацию если страница одна
  }

  return (
    <section className={styles.root}>
      <div className="container">
        <ReactPaginate
          previousLabel="←"
          nextLabel="→"
          pageCount={totalPages}
          pageRangeDisplayed={3}
          marginPagesDisplayed={1}
          onPageChange={handlePageClick}
          forcePage={currentPage - 1} // react-paginate использует 0-based индексы
          containerClassName={styles.pagination}
          pageClassName={styles.page}
          pageLinkClassName={styles.pageLink}
          previousClassName={styles.previous}
          nextClassName={styles.next}
          previousLinkClassName={styles.previousLink}
          nextLinkClassName={styles.nextLink}
          activeClassName={styles.active}
          disabledClassName={styles.disabled}
          breakClassName={styles.break}
          breakLinkClassName={styles.breakLink}
        />
      </div>
    </section>
  );
};
