import React, { useEffect, useState, useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";
import shortid from "shortid";
import { useSelector, useDispatch } from "react-redux";

import { InputBox } from "../input";
import { BubbleContainer } from "../bubble/bubble";

import styles from "./newmessage.css";

import {
  LeftCircleOutlined,
  UploadOutlined,
  SendOutlined,
} from "@ant-design/icons";

import * as actionTypes from "../../store/actions";

export function MessageComponent(props) {
  const { userId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const contactData = useSelector((state) => state.contactData);
  const userData = useSelector((state) => state.currentUserMessageData);

  const [message, setMessage] = useState("");

  useEffect(() => {
    dispatch({
      type: actionTypes.GET_USER_MESSAGE_DATA,
      id: userId,
    });
  }, [userId]);

  return (
    <div className={styles.messageContainer}>
      <div className={styles.messageHeader}>
        <LeftCircleOutlined
          style={{ padding: "8px", fontSize: "36px", color: "white" }}
          onClick={() => navigate("/")}
        />
        <p>{userData?.FirstName}</p>
      </div>
      <div className={styles.messageBody}>
        {!userData?.message?.length > 0 ? (
          <div className={styles.emptyContent}>
            <p>Start Messaging</p>
          </div>
        ) : (
          userData?.message?.map((el) => (
            <BubbleContainer value={el} key={el.id} profile={userData.profile}/>
          ))
        )}
      </div>
      <div className={styles.messageFooter}>
        <UploadOutlined
          style={{
            color: "#FBF6F3",
            padding: "12px",
            fontSize: "20px",
            fontWeight: "700",
          }}
        />
        <InputBox
          type="text"
          placeholder={"Send Message"}
          className={styles.inputbox}
          onChange={(e) => setMessage(e.target.value)}
          value={message}
        />
        <SendOutlined
          style={{ color: "#FBF6F3", padding: "12px", fontSize: "20px" }}
          onClick={() => {
            if (message) {
              dispatch({
                type: actionTypes.SEND_MESSAGE,
                message: {
                  data: message,
                  id: `${"message"}_${shortid.generate()}`,
                  time: new Date(),
                },
                id: userId,
              });
              setMessage("");
            }
          }}
        />
      </div>
    </div>
  );
}
