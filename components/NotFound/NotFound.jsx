import React from "react";
import styles from "./NotFound.module.css";
import face from "../../public/face_confused.svg";
import whiteFace from "../../public/white_face_confused.svg";
import Image from "next/image";

const NotFound = ({ message, theme }) => {
  console.log(message);
  return (
    <>
      <div className={styles.message}>{message}</div>
      <div className={styles.iconFace}>
        {theme === "dark" ? (
          <Image src={whiteFace} alt="Face so confused" />
        ) : (
          <Image src={face} alt="Face so confused" />
        )}
      </div>
    </>
  );
};

export default NotFound;
