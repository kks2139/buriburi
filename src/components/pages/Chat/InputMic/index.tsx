import classNames from "classnames/bind";
import { ButtonHTMLAttributes } from "react";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";

import { ArrowUp, Mic, SvgSoundVive } from "@/assets/svg";
import { useChatStore } from "@/store";

import styles from "./index.module.scss";

const cn = classNames.bind(styles);

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  onAsk: (text: string) => void;
}

function InputMic({ onAsk, ...rest }: Props) {
  const isQuerying = useChatStore((s) => s.isQuerying);
  const inputTextValue = useChatStore((s) => s.inputTextValue);
  const { addMessage, setInputTextValue } = useChatStore((s) => s.actions);
  const isJeonsePlanningMode = useChatStore((s) => s.isJeonsePlanningMode);

  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition();

  const isReadyToAsk = !!inputTextValue || (listening && transcript);
  const inputValue = listening ? transcript : inputTextValue;

  const stopListening = () => {
    SpeechRecognition.stopListening();
    resetTranscript();
  };

  const pushMessage = () => {
    if (!isJeonsePlanningMode) {
      addMessage({
        speaker: "USER",
        message: inputValue,
      });
    }

    resetTranscript();
    setInputTextValue("");
  };

  return (
    <button
      {...rest}
      className={cn("InputMic", { highlight: isReadyToAsk || listening })}
      onClick={() => {
        if (isReadyToAsk) {
          if (isQuerying) {
            return;
          }

          pushMessage();
          onAsk(inputValue);

          return;
        }

        if (!browserSupportsSpeechRecognition) {
          return;
        }

        if (listening) {
          stopListening();
        } else {
          SpeechRecognition.startListening({
            continuous: true,
            language: "ko-KR",
          });
        }
      }}
    >
      <div className={cn("icon")}>
        {isReadyToAsk ? (
          <ArrowUp width={18} height={18} />
        ) : listening ? (
          <SvgSoundVive width={18} height={18} />
        ) : (
          <Mic width={18} height={18} />
        )}
      </div>
    </button>
  );
}

export default InputMic;
