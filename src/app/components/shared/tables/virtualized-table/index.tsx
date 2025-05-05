"use client";
import React, { JSX, RefObject } from "react";
import cs from "classnames";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  OnChangeFn,
  Row,
  SortingState,
  Updater,
  useReactTable,
  VisibilityState,
} from "@tanstack/react-table";
import styles from "./virtualized-table.module.css";
import { useVirtualizer } from "@tanstack/react-virtual";
import TableHeader, { SortKeys } from "../table-header";
import Spinner from "../../icons/loaders/spinner";

const ROW_HEIGHT = 50;
export const ROW_SIZE = 20;
const TABLE_HEIGHT = ROW_HEIGHT * ROW_SIZE;

interface Props<T> {
  data: T[];
  columns: ColumnDef<T, unknown>[];
  onSortChange: (param: Updater<SortingState>) => void;
  isLoading?: boolean;
  isLoadingExtraData?: boolean;
  containerRef: RefObject<HTMLTableElement | null>;
  sortingState?: SortingState | undefined;
  columnVisibility?: VisibilityState | undefined;
}

function VirtualizedTable<T>({
  data,
  columns,
  onSortChange,
  isLoadingExtraData = false,
  isLoading = false,
  containerRef,
  sortingState,
  columnVisibility,
}: Props<T>): JSX.Element {
  const table = useReactTable({
    data,
    columns,
    state: {
      columnVisibility,
      sorting: sortingState,
    },
    getCoreRowModel: getCoreRowModel(),
    manualSorting: true,
  });

  const handleSortingChange: OnChangeFn<SortingState> = (updater) => {
    onSortChange(updater);
    if (!!table.getRowModel().rows.length) {
      rowVirtualizer.scrollToIndex?.(0);
    }
  };

  table.setOptions((prev) => ({
    ...prev,
    onSortingChange: handleSortingChange,
  }));

  const { rows } = table.getRowModel();

  const rowVirtualizer = useVirtualizer({
    count: rows.length,
    estimateSize: () => ROW_HEIGHT, //estimate row height for accurate scrollbar dragging
    getScrollElement: () => containerRef.current,
    //measure dynamic row height, except in firefox because it measures table border height incorrectly
    measureElement:
      typeof window !== "undefined" &&
      navigator.userAgent.indexOf("Firefox") === -1
        ? (element) => element?.getBoundingClientRect().height
        : undefined,
    overscan: 5,
  });

  if (isLoading) {
    return <>Loading...</>;
  }
  return (
    <div className={styles.root}>
      <div
        ref={containerRef}
        style={{
          overflow: "auto",
          position: "relative",
          height: TABLE_HEIGHT,
          maxHeight: "80vh",
        }}
      >
        {/* Even though we're still using sematic table tags, we must use CSS grid and flexbox for dynamic row heights */}
        <table className={styles.table}>
          <thead className={styles.header}>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <th
                      key={header.id}
                      style={{
                        display: "flex",
                        width:
                          header.getSize() === Number.MAX_SAFE_INTEGER
                            ? "auto"
                            : header.getSize(),
                        ...(header.getSize() === Number.MAX_SAFE_INTEGER && {
                          flex: 1,
                        }),
                      }}
                    >
                      <div
                        {...{
                          className: cs(styles.headerContainer, {
                            [styles.headerEnabled]: header.column.getCanSort(),
                          }),
                          onClick: header.column.getToggleSortingHandler(),
                        }}
                      >
                        <TableHeader
                          sort={
                            (header.column.getIsSorted() as SortKeys) ?? null
                          }
                        >
                          {flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                        </TableHeader>
                      </div>
                    </th>
                  );
                })}
              </tr>
            ))}
          </thead>
          <tbody
            className={styles.body}
            style={{
              display: "grid",
              height: `${rowVirtualizer.getTotalSize()}px`, //tells scrollbar how big the table is
              position: "relative", //needed for absolute positioning of rows
            }}
          >
            {rowVirtualizer.getVirtualItems().map((virtualRow) => {
              const row = rows[virtualRow.index] as Row<T>;
              return (
                <tr
                  className={styles.row}
                  data-index={virtualRow.index} //needed for dynamic row height measurement
                  ref={(node) => {
                    rowVirtualizer.measureElement(node);
                  }} //measure dynamic row height
                  key={row.id}
                  style={{
                    display: "flex",
                    position: "absolute",
                    height: `${virtualRow.size}px`,
                    transform: `translateY(${virtualRow.start}px)`, //this should always be a `style` as it changes on scroll
                    width: "100%",
                  }}
                >
                  {row.getVisibleCells().map((cell) => {
                    return (
                      <td
                        key={cell.id}
                        style={{
                          display: "flex",
                          width:
                            cell.column.getSize() === Number.MAX_SAFE_INTEGER
                              ? "auto"
                              : cell.column.getSize(),
                          ...(cell.column.getSize() ===
                            Number.MAX_SAFE_INTEGER && { flex: 1 }),
                        }}
                      >
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      {isLoadingExtraData && (
        <div className={styles.overlay}>
          <Spinner /> {"Loading..."}
        </div>
      )}
    </div>
  );
}

export default VirtualizedTable as <T>(props: Props<T>) => JSX.Element;
