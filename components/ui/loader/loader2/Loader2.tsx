import styles from "./loader2.module.css";

export default function Loader2() {
  return (
    /* From Uiverse.io by abrahamcalsin */
    <div className={styles["dot-spinner"]}>
      <div className={styles["dot-spinner__dot"]}></div>
      <div className={styles["dot-spinner__dot"]}></div>
      <div className={styles["dot-spinner__dot"]}></div>
      <div className={styles["dot-spinner__dot"]}></div>
      <div className={styles["dot-spinner__dot"]}></div>
      <div className={styles["dot-spinner__dot"]}></div>
      <div className={styles["dot-spinner__dot"]}></div>
      <div className={styles["dot-spinner__dot"]}></div>
    </div>
  );
}
