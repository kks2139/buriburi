import classNames from "classnames/bind";

import styles from "./index.module.scss";

const cn = classNames.bind(styles);

function Main() {
  return <div className={cn("Main")}>메인페이지</div>;
}

export default Main;
