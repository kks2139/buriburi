import classNames from "classnames/bind";

import styles from "./index.module.scss";

const cn = classNames.bind(styles);

function Loading() {
  return (
    <div className={cn("Loading")}>
      <img className={cn("lottie")} src="" alt="" width={60} height={60} />
      <h3 className={cn("title")}>대출코치 매칭 중</h3>
    </div>
  );
}

export default Loading;
