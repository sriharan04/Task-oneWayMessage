import React from "react";

import { getTime } from "../../utils";
import styles from "./bubble.css";

export function BubbleContainer(props) {
  const { value, profile } = props;
  console.log("profile", value);
  return (
    <div className={styles.bubbleContiner} key={value.id}>
      <img
        className={styles.profilePic}
        src={
          "https://avataaars.io/?accessoriesType=Round&avatarStyle=Circle&clotheColor=Heather&clotheType=BlazerShirt&eyeType=Close&eyebrowType=Default&facialHairColor=BlondeGolden&facialHairType=Blank&hairColor=Blonde&hatColor=PastelGreen&mouthType=Twinkle&skinColor=DarkBrown&topType=LongHairFro"
        }
        alt="avatar"
      />
      <div className={styles.bubbleContent}>
        <div className={styles.messageData}>{value.data}</div>
        <div className={styles.timeContianer}>{getTime(value.time)}</div>
      </div>
    </div>
  );
}
