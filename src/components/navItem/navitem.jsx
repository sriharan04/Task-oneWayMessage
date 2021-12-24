import React from "react";
import { useNavigate } from "react-router-dom";

import { getTime } from "../../utils";
import styles from "./navitem.css";

import { PhoneFilled, MessageFilled } from "@ant-design/icons";

export function NavItem(props) {
  const { type, userData } = props;
  const navigate = useNavigate();

  return type === "contact" ? (
    <div className={styles.contentItem}>
      <div className={styles.pluginContentItem}>
        <img
          className={styles.profilePic}
          src={userData.profile}
          alt="avatar"
        />
        <div className={styles.contactDetail}>
          <p className={styles.contactName}>{userData.FirstName}</p>
          <p>{userData.Mobile}</p>
          <p className={styles.duration}>
            {userData.message?.length > 0
              ? getTime(userData.message[userData.message?.length - 1].time)
              : ""}
          </p>
        </div>
      </div>
      <div style={{ display: "flex" }}>
        <PhoneFilled
          style={{
            transform: "scale(-1, 1)",
            padding: "8px",
            color: "white",
            fontSize: "24px",
          }}
        />
        <MessageFilled
          style={{ padding: "8px", color: "white", fontSize: "24px" }}
          onClick={() => navigate(`/message/${userData.id}`)}
        />
      </div>
    </div>
  ) : (
    <div
      className={styles.contentItem}
      onClick={() => navigate(`/message/${userData.id}`)}
    >
      <div className={styles.pluginContentItem}>
        <img
          className={styles.profilePic}
          src={userData.profile}
          alt="avatar"
        />
        <div className={styles.messageContainer}>
          <div className={styles.messageHeader}>
            <p className={styles.contactName}>{userData.FirstName}</p>
            <p className={styles.duration}>
              {userData.message?.length > 0
                ? getTime(userData.message[userData.message?.length - 1].time)
                : ""}
            </p>
          </div>
          <p className={styles.ellipsis3}>
            {userData.message?.length > 0
              ? userData.message[userData.message?.length - 1].data
              : ""}
          </p>
        </div>
      </div>
    </div>
  );
}
