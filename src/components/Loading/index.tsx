import { AiOutlineLoading3Quarters } from "react-icons/ai";

import styles from "./styles.module.scss";

export function Loading() {
  return (
    <div className={styles.container}>
      <AiOutlineLoading3Quarters
        className={styles.icon}
        color="ffcd1e"
        size="30"
      />
    </div>
  );
}
