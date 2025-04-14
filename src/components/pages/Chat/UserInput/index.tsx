import classNames from "classnames/bind";
import { useSpeechRecognition } from "react-speech-recognition";

import { useFetch } from "@/hooks";
import { useChatStore } from "@/store";

import InputMic from "../InputMic";
import InputText from "../InputText";
import styles from "./index.module.scss";

const cn = classNames.bind(styles);

function UserInput() {
  const { listening, transcript, resetTranscript } = useSpeechRecognition();
  const { request } = useFetch({ skipErrorMessage: true });

  const { setIsQuerying, addMessage } = useChatStore((s) => s.actions);

  const queryAi = async (text: string) => {
    setIsQuerying(true);

    const result = await request<{
      statusCode: number;
      body: string;
      errorMessage?: string;
    }>("loanNeedsAnalyzation", {
      sessionId: "test123",
      message: text,
    });

    setIsQuerying(false);

    const errorMsg = "죄송해요 다시 질문해주세요!";

    if (result) {
      addMessage({
        speaker: "AI",
        message: result.errorMessage ? errorMsg : result.body,
      });
    } else {
      addMessage({
        speaker: "AI",
        message: errorMsg,
      });
    }
  };

  return (
    <div className={cn("UserInput", { listening })}>
      {!listening && <InputText onAsk={queryAi} />}

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
            queryAi(text);
            resetTranscript();
          }}
        />
      </div>
    </div>
  );
}

export default UserInput;
