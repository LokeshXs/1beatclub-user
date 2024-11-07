import styles from "./loader.module.css";

export default function Loader() {
  return (
    /* From Uiverse.io by AqFox */
    <div className={`${styles["spinner"]} w-11 h-11`}>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
}
