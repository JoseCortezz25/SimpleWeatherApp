import React from "react";
import styles from "./NotFound.module.css";
import face from "../../public/face_confused.svg";
import Image from "next/image";

const NotFound = ({ message }) => {
  console.log(message);
  return (
    <>
      <div className={styles.message}>{message}</div>
      <div className={styles.iconFace}>
        <Image src={face} alt="Face so confused" />
      </div>
    </>
  );
};

export default NotFound;
