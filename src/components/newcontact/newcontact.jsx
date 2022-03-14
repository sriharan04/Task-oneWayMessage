import React, { useEffect, useState } from "react";
import shortid from "shortid";
import { AvatarGenerator } from "random-avatar-generator";

import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { InputBox } from "../input";
import { Button } from "../button/button";
import { ErrorComponent } from "../errorcomponent/error";

import styles from "./newcontact.css";

import * as actionTypes from "../../store/actions";

import {
  UserAddOutlined,
  PhoneOutlined,
  MailOutlined,
  LeftCircleOutlined,
} from "@ant-design/icons";

const numberOnly = (value) => {
  return isNaN(value) ? "Value should be a number" : "";
};

const email = (value) => {
  let r =
    /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  return r.test(value) || !value ? "" : "Invalid email format";
};

export function NewContact(props) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const generator = new AvatarGenerator();

  const [data, setData] = useState({});
  const [error, setError] = useState({});
  const [profilePic, setProfilePic] = useState("");

  useEffect(
    function validate() {
      if (data?.Mobile) {
        let isError = numberOnly(data?.Mobile);
        console.log("errors", isError);
        if (isError) setError({ ...error, Mobile: isError });
        else setError({ ...error, Mobile: "" });
      } else setError({ ...error, Mobile: "" });
    },
    [data.Mobile]
  );

  useEffect(
    function validate() {
      if (data?.Email) {
        let isError = email(data?.Email);
        if (isError) setError({ ...error, Email: isError });
        else setError({ ...error, Email: "" });
      } else setError({ ...error, Email: "" });
    },
    [data.Email]
  );

  useEffect(() => {
    let profile = generator.generateRandomAvatar();
    setProfilePic(profile);
  }, []);
  function isDisabled() {
    let mandatoryArray = ["FirstName", "Mobile", "Email"];
    let disable = mandatoryArray.filter((el) => data[el]);
    let iserror = mandatoryArray.filter((el) => !error[el]);
    return !(
      mandatoryArray.length === disable.length &&
      mandatoryArray.length === iserror.length
    );
  }

  console.log("data", data);

  return (
    <div className={styles.newContactContinaer}>
      <div className={styles.contactHeader}>
        <LeftCircleOutlined
          style={{ padding: "8px", fontSize: "36px", color: "white" }}
          onClick={() => navigate("/")}
        />
        <p>New Contact</p>
      </div>
      <div className={styles.contactBody}>
        <div className={styles.profileContainer}>
          <img className={styles.profilePic} src={profilePic} alt="avatar" />
          <p>Profile</p>
        </div>
        <div className={styles.profileDetails}>
          <div className={styles.profileName}>
            <div className={styles.nameDetails}>
              <div className={styles.alignRequired}>
                <UserAddOutlined
                  style={{
                    padding: "8px",
                    fontSize: "36px",
                    color: "darkgray",
                  }}
                />
                <span className={styles.required}>*</span>
              </div>
              <InputBox
                placeholder="First Name"
                className={styles.inputbox}
                onChange={(e) =>
                  setData({ ...data, FirstName: e.target.value })
                }
                value={data?.FirstName}
              />
              {error?.FirstName ? (
                <ErrorComponent error={error?.FirstName} />
              ) : (
                ""
              )}
            </div>
            <div className={styles.nameDetails}>
              <InputBox
                placeholder="Last Name"
                className={styles.inputbox}
                onChange={(e) => setData({ ...data, LastName: e.target.value })}
                value={data?.LastName}
              />
            </div>
          </div>
          <div className={styles.profileName}>
            <div className={styles.nameDetails}>
              <div className={styles.alignRequired}>
                <PhoneOutlined
                  style={{
                    transform: "scale(-1, 1)",
                    padding: "8px",
                    fontSize: "36px",
                    color: "darkgray",
                  }}
                />
                <span className={styles.required}>*</span>
              </div>
              <div className={styles.errorContainer}>
                <InputBox
                  placeholder="Mobile Number"
                  className={styles.inputbox}
                  onChange={(e) => setData({ ...data, Mobile: e.target.value })}
                  value={data?.Mobile}
                />
                {error?.Mobile ? <ErrorComponent error={error?.Mobile} /> : ""}
              </div>
            </div>
          </div>
          <div className={styles.profileName}>
            <div className={styles.nameDetails}>
              <div className={styles.alignRequired}>
                <MailOutlined
                  style={{
                    padding: "8px",
                    fontSize: "36px",
                    color: "darkgray",
                  }}
                />
                <span className={styles.required}>*</span>
              </div>
              <div className={styles.errorContainer}>
                <InputBox
                  placeholder="E-Mail"
                  className={`${styles.inputbox} ${styles.emailinput}`}
                  onChange={(e) => setData({ ...data, Email: e.target.value })}
                  value={data?.Email}
                />
                {error?.Email ? <ErrorComponent error={error?.Email} /> : ""}
              </div>
            </div>
          </div>
        </div>
        <div className={styles.confirmSection}>
          <Button
            className={`${styles.button}`}
            onClick={() => {
              dispatch({
                type: actionTypes.ADD_CONTACT,
                data: {
                  ...data,
                  id: `${"contact"}_${shortid.generate()}`,
                  message: [],
                  profile: profilePic,
                },
              });
              setData({ FirstName: "", Mobile: "", Email: "", LastName: "" });
            }}
            disabled={isDisabled()}
          >
            Save
          </Button>
          <Button
            className={`${styles.button}`}
            onClick={() => {
              setData({ FirstName: "", Mobile: "", Email: "", LastName: "" });
            }}
          >
            Discard
          </Button>
        </div>
      </div>
    </div>
  );
}
