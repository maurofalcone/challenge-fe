import { FC, PropsWithChildren } from "react";
import styles from "./card.module.css";
import Image from "next/image";

interface Props {
  src: string;
  alt: string;
}

const Card: FC<PropsWithChildren<Props>> = ({ children, alt, src }) => {
  return (
    <div className={styles.root}>
      <div className={styles.imageContainer}>
        <Image
          className={styles.img}
          width={100}
          height={100}
          src={src}
          alt={alt}
        />
      </div>
      <div className={styles.children}>{children}</div>
    </div>
  );
};

export default Card;
