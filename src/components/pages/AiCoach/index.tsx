import classNames from "classnames/bind";

import styles from "./index.module.scss";

const cn = classNames.bind(styles);

function AiCoach() {
  return <main className={cn("AiCoach")}>코치 선택</main>;
}

export default AiCoach;
