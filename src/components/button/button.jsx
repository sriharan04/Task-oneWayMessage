import React from "react";

import styles from "./button.css";

export function Button(props) {
  const { children, className, onClick, disabled } = props;
  return (
    <div
      className={`${styles.buttonContainer} ${className} ${disabled ? styles.disabled : ""}`}
      onClick={onClick}
    >
      {children}
    </div>
  );
}
