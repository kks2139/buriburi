import classNames from "classnames/bind";
import { ButtonHTMLAttributes, useEffect } from "react";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";

import { Mic } from "@/assets/svg";
import { useChatStore } from "@/store";

import styles from "./index.module.scss";

const cn = classNames.bind(styles);

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  onAsk?: (text: string) => void;
}

function InputMic({ onAsk }: Props) {
  const { addMessage } = useChatStore((s) => s.actions);

  const {
    finalTranscript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition();

  useEffect(() => {
    if (finalTranscript) {
      addMessage({ speaker: "USER", message: finalTranscript });
      resetTranscript();

      onAsk?.(finalTranscript);
    }
  }, [addMessage, finalTranscript, onAsk, resetTranscript]);

  return (
    <button
      className={cn("InputMic", { listening })}
      onClick={() => {
        if (!browserSupportsSpeechRecognition) {
          return;
        }

        if (listening) {
          SpeechRecognition.stopListening();
          resetTranscript();
        } else {
          SpeechRecognition.startListening({
            continuous: true,
            language: "ko-KR",
          });
        }
      }}
    >
      <div className={cn("icon")}>
        <Mic width={18} height={18} />
      </div>
    </button>
  );
}

export default InputMic;
