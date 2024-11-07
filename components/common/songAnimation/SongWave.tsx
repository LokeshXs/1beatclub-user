"use client";

import React from "react";
import styles from "./songWave.module.css";

export default function SongWave() {


  return (
    <ul className={`${styles["wave-menu"]} w-[200px] h-11 max-sm:w-20`}>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
    </ul>
  );
}
