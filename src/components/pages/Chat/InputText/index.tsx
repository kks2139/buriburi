import classNames from "classnames/bind";
import { InputHTMLAttributes, useRef, useState } from "react";
import { useSpeechRecognition } from "react-speech-recognition";

import { useChatStore } from "@/store";

import styles from "./index.module.scss";

const cn = classNames.bind(styles);

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  onAsk: (text: string) => void;
}

function InputText({ onAsk, placeholder = "내용을 입력하세요" }: Props) {
  const inputTextValue = useChatStore((s) => s.inputTextValue);
  const { addMessage, setInputTextValue } = useChatStore((s) => s.actions);

  const { listening } = useSpeechRecognition();

  const [focused, setFocused] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <div
      className={cn("InputText", { focus: focused, disabled: listening })}
      tabIndex={-1}
      onFocus={() => {
        setFocused(true);
        inputRef.current?.focus();
      }}
    >
      <input
        ref={inputRef}
        disabled={listening}
        placeholder={placeholder}
        value={inputTextValue}
        onChange={(e) => {
          setInputTextValue(e.target.value);
        }}
        onKeyDown={(e) => {
          if (!inputTextValue.trim()) {
            return;
          }

          if (e.key === "Enter") {
            addMessage({ speaker: "USER", message: inputTextValue });
            setInputTextValue("");

            onAsk(inputTextValue);
          }
        }}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
      />
    </div>
  );
}

export default InputText;
