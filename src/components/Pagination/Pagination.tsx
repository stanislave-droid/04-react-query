import ReactPaginateModule from "react-paginate";
import type { ReactPaginateProps } from "react-paginate";
import type { ComponentType } from "react";
import css from "./Pagination.module.css";

type ModuleWithDefault<T> = { default: T };

const ReactPaginate = (
  ReactPaginateModule as unknown as ModuleWithDefault<
    ComponentType<ReactPaginateProps>
  >
).default;

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: ({ selected }: { selected: number }) => void;
}

export default function Pagination(props: PaginationProps) {
  return (
    <ReactPaginate
      pageCount={props.totalPages}
      pageRangeDisplayed={5}
      marginPagesDisplayed={1}
      onPageChange={props.onPageChange}
      forcePage={props.currentPage - 1}
      containerClassName={css.pagination}
      activeClassName={css.active}
      nextLabel="→"
      previousLabel="←"
    />
  );
}
