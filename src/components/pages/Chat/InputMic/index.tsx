import classNames from "classnames/bind";
import { ButtonHTMLAttributes } from "react";

import { Mic } from "@/assets/svg";

import styles from "./index.module.scss";

const cn = classNames.bind(styles);

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  onAsk?: (text: string) => void;
}

function InputMic({ onAsk }: Props) {
  // TODO: 음성인식 완료 타이밍
  console.log(onAsk);

  return (
    <button className={cn("InputMic")}>
      <div className={cn("icon")}>
        <Mic width={18} height={18} />
      </div>
    </button>
  );
}

export default InputMic;
