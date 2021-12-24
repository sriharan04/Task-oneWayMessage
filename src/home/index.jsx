import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";

import { LeftNav } from "../lefnav/index";
import { NewContact } from "../components/newcontact/newcontact";
import { MessageComponent } from "../components/newmessage/newmessage";

import styles from "./home.css";

export function Home() {
  return (
    <div className={styles.homeContainer}>
      <LeftNav />
      <div className={styles.rightNavCotnaier}>
        <Routes>
          <Route
            path={"/newcontact"}
            exact={true}
            element={<NewContact />}
          ></Route>
          <Route
            path={"/message/:userId"}
            exact={true}
            element={<MessageComponent />}
          ></Route>
          <Route
            path={"/home"}
            exact={true}
            element={<div className={styles.emptyState}>Create new contact or Start a conversation.</div>}
          ></Route>
          <Route path="/" element={<Navigate replace to="/home" />} />
        </Routes>
      </div>
    </div>
  );
}
