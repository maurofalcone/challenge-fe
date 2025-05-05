import { FC, PropsWithChildren } from "react";
import SortIcon from "../../icons/sort-icon";
import styles from "./table-header.module.css";

export type SortKeys = "asc" | "desc";

interface Props {
  sort: SortKeys | null;
}

const TableHeader: FC<PropsWithChildren<Props>> = ({ children, sort }) => {
  return (
    <>
      {children}
      <div className={styles.icon}>
        <SortIcon sort={sort} />
      </div>
    </>
  );
};

export default TableHeader;
