import classNames from "classnames/bind";
import { useRef, useState } from "react";
import { useSpeechRecognition } from "react-speech-recognition";

import { useAiStore, useChatStore } from "@/store";

import InputMic from "../InputMic";
import InputText from "../InputText";
import styles from "./index.module.scss";

const cn = classNames.bind(styles);

function UserInput() {
  const { listening, transcript, resetTranscript } = useSpeechRecognition();

  const selectedCoach = useAiStore((s) => s.selectedCoach) || "DRAGON";
  const { queryToAi } = useChatStore((s) => s.actions);

  const [isInputfocused, setIsInputFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const focusInput = () => {
    setIsInputFocused(true);
    inputRef.current?.focus();
  };

  return (
    <div className={cn("UserInput", { listening })}>
      {!listening && (
        <InputText
          ref={inputRef}
          onAsk={(text) => {
            queryToAi(text, selectedCoach);
          }}
          isInputfocused={isInputfocused}
          setIsInputFocused={setIsInputFocused}
          focusInput={focusInput}
        />
      )}

      <div className={cn("mic", { listening })}>
        {listening ? (
          transcript ? (
            <div className={cn("text-container")}>{transcript}</div>
          ) : (
            <div className={cn("guide-text")}>말씀하세요</div>
          )
        ) : null}
        <InputMic
          onAsk={(text) => {
            queryToAi(text, selectedCoach);
            resetTranscript();
            focusInput();
          }}
        />
      </div>
    </div>
  );
}

export default UserInput;
