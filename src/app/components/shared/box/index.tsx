import { CSSProperties, FC } from "react";
import styles from "./box.module.css";

interface Props {
  minWidth?: number;
  justifyContent?: CSSProperties["justifyContent"];
  alignItems?: CSSProperties["alignItems"];
}

const Box: FC<React.PropsWithChildren<Props>> = ({
  alignItems,
  justifyContent,
  children,
  minWidth,
}) => {
  return (
    <div
      style={{ alignItems, justifyContent, minWidth }}
      className={styles.root}
    >
      {children}
    </div>
  );
};

export default Box;
