import React from "react";
import styles from "./error.css";

export function ErrorComponent({ error }) {
  return <p className={`tiny ${styles.errorTxt}`}>{error}</p>;
}