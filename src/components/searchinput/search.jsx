import React from "react";
import { useNavigate } from "react-router-dom";
import { SearchOutlined, PlusOutlined } from "@ant-design/icons";

import { InputBox } from "../input/index";

import styles from "./search.css";

export function SearchInput(props) {
  const { value,onChange } = props;
  const navigate = useNavigate();
  return (
    <div className={styles.searchConatiner}>
      <SearchOutlined
        style={{
          color: "#FBF6F3",
          padding: "8px",
          fontSize: "16px",
          fontWeight: "700",
        }}
      />
      <InputBox
        type="text"
        value={value}
        placeholder={"Search people"}
        className={styles.inputbox}
        onChange={onChange}
      />
      <PlusOutlined
        style={{ color: "#FBF6F3", padding: "8px" }}
        onClick={() => navigate("/newcontact")}
      />
    </div>
  );
}
