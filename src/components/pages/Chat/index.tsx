import classNames from "classnames/bind";

import styles from "./index.module.scss";

const cn = classNames.bind(styles);

function Chat() {
  return <main className={cn("Chat")}>채팅</main>;
}

export default Chat;
