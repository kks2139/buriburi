import classNames from "classnames/bind";
import { InputHTMLAttributes, useState } from "react";

import { useChatStore } from "@/store";

import styles from "./index.module.scss";

const cn = classNames.bind(styles);

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  onAsk?: (text: string) => void;
}

function InputText({ placeholder = "내용을 입력하세요" }: Props) {
  const addMessage = useChatStore((s) => s.addMessage);
  const [inputValue, setInputValue] = useState("");

  return (
    <input
      className={cn("InputText")}
      placeholder={placeholder}
      value={inputValue}
      onChange={(e) => {
        setInputValue(e.target.value);
      }}
      onKeyDown={(e) => {
        if (e.key === "Enter") {
          addMessage({ speaker: "USER", message: inputValue });
          setInputValue("");
        }
      }}
    />
  );
}

export default InputText;
