import classNames from "classnames/bind";
import { InputHTMLAttributes, useRef, useState } from "react";
import { useSpeechRecognition } from "react-speech-recognition";

import { useFetch } from "@/hooks";
import { useChatStore } from "@/store";

import styles from "./index.module.scss";

const cn = classNames.bind(styles);

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  onAsk?: (text: string) => void;
}

function InputText({ placeholder = "내용을 입력하세요" }: Props) {
  const { addMessage } = useChatStore((s) => s.actions);
  const { listening } = useSpeechRecognition();
  const { request, isFetching } = useFetch({ skipErrorMessage: true });

  const [inputValue, setInputValue] = useState("");
  const [focused, setFocused] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);

  const queryAi = async () => {
    const result = await request("healthCheck");

    console.log("result: ", result);
  };

  console.log("isFetching:", isFetching);

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
        value={inputValue}
        onChange={(e) => {
          setInputValue(e.target.value);
        }}
        onKeyDown={(e) => {
          if (!inputValue.trim()) {
            return;
          }

          if (e.key === "Enter") {
            addMessage({ speaker: "USER", message: inputValue });
            setInputValue("");

            queryAi();
          }
        }}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
      />
    </div>
  );
}

export default InputText;
