import classNames from "classnames/bind";
import { forwardRef, InputHTMLAttributes } from "react";
import { useSpeechRecognition } from "react-speech-recognition";

import { useChatStore } from "@/store";

import styles from "./index.module.scss";

const cn = classNames.bind(styles);

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  onAsk: (text: string) => void;
  isInputfocused: boolean;
  setIsInputFocused: (value: boolean) => void;
  focusInput: () => void;
}

const InputText = forwardRef<HTMLInputElement, Props>(
  (
    {
      placeholder = "내용을 입력하세요",
      onAsk,
      isInputfocused,
      setIsInputFocused,
      focusInput,
    }: Props,
    inputRef,
  ) => {
    const { addMessage, setInputTextValue } = useChatStore((s) => s.actions);
    const inputTextValue = useChatStore((s) => s.inputTextValue);
    const isQuerying = useChatStore((s) => s.isQuerying);

    const { listening } = useSpeechRecognition();

    return (
      <div
        className={cn("InputText", {
          focus: isInputfocused,
          disabled: listening,
        })}
        tabIndex={-1}
        onFocus={() => {
          focusInput();
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
            if (e.key === "Enter") {
              if (!inputTextValue.trim() || isQuerying) {
                return;
              }

              addMessage({ speaker: "USER", message: inputTextValue });
              setInputTextValue("");

              onAsk(inputTextValue);

              focusInput();
            }
          }}
          onFocus={() => setIsInputFocused(true)}
          onBlur={() => setIsInputFocused(false)}
        />
      </div>
    );
  },
);

export default InputText;
