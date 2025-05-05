import { FC } from "react";

import ArrowUp from "../../../../assets/arrow-up.svg";
import ArrowDown from "../../../../assets/arrow-down.svg";
import { SortKeys } from "../../tables/table-header";

interface Props {
  sort: SortKeys | null;
}

const SortIcon: FC<Props> = ({ sort }) => {
  if (!sort) return null;
  if (sort === "asc") return <ArrowUp />;
  return <ArrowDown />;
};

export default SortIcon;
