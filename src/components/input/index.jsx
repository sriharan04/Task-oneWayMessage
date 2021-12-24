import React from "react";

import styles from "./input.css";

export function InputBox(props) {
  const { type = "text", value, className,onChange, placeholder } = props;
  return (
    <React.Fragment>
      <input
        type={type}
        value={value}
        placeholder={placeholder}
        className={`${styles.searchContainer} ${className}`}
        onChange={onChange}
      />
    </React.Fragment>
  );
}
