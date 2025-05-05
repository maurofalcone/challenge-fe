import cs from "classnames";
import { FC } from "react";
import styles from "./favorite-button.module.css";
import Filled from "../../../../assets/filled-heart.svg";
import Outlined from "../../../../assets/outlined-heart.svg";

interface Props {
  isChecked: boolean;
  onClick: () => void;
}

const FavoriteButton: FC<Props> = ({ isChecked, onClick }) => {
  return (
    <button
      className={cs(styles.root, {
        [styles.filled]: isChecked,
        [styles.outlined]: !isChecked,
      })}
      onClick={onClick}
    >
      {isChecked ? <Filled /> : <Outlined />}
    </button>
  );
};

export default FavoriteButton;
