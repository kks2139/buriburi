import classNames from "classnames/bind";

import Speak from "@/components/Speak";
import Speech from "@/components/Speech";

import styles from "./index.module.scss";

const cn = classNames.bind(styles);

function Test() {
  return (
    <div className={cn("Test")}>
      <Speech />
      <Speak />
    </div>
  );
}

export default Test;
