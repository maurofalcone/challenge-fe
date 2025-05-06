import { FC, PropsWithChildren } from "react";
import styles from "./badge.module.css";

interface Props {
  label: string;
  description: string | number;
}

const Badge: FC<PropsWithChildren<Props>> = ({ description, label }) => {
  return (
    <div className={styles.root}>
      <span className={styles.label}>{label}</span>
      <span className={styles.description}>{description}</span>
    </div>
  );
};

export default Badge;
