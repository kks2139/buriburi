import classNames from "classnames/bind";

import styles from "./index.module.scss";

const cn = classNames.bind(styles);

function Result() {
  return <main className={cn("Result")}></main>;
}

export default Result;
