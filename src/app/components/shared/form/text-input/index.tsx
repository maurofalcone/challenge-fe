import { FC } from "react";
import styles from "./text-input.module.css";

const TextInput: FC<React.HTMLProps<HTMLInputElement>> = (props) => {
  return <input className={styles.root} {...props} id={props.id} />;
};

export default TextInput;
