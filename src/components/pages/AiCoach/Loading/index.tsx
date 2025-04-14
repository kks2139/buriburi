import classNames from "classnames/bind";
import Lottie from "lottie-react";

import Blink from "@/assets/lottie/blink.json";

import styles from "./index.module.scss";

const cn = classNames.bind(styles);

function Loading() {
  return (
    <div className={cn("Loading")}>
      <div className={cn("lottie")}>
        <Lottie animationData={Blink} loop={true} />
      </div>
      <h3 className={cn("title")}>대출코치 매칭 중</h3>
    </div>
  );
}

export default Loading;
