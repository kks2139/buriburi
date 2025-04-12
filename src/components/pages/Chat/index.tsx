import classNames from "classnames/bind";
import { AnimatePresence } from "framer-motion";
import { useEffect } from "react";

import { useChatStore } from "@/store";

import styles from "./index.module.scss";
import InputMic from "./InputMic";
import InputText from "./InputText";
import Message from "./Message";

const cn = classNames.bind(styles);

function Chat() {
  const messages = useChatStore((s) => s.messages);
  const initMessage = useChatStore((s) => s.initMessage);

  useEffect(() => {
    if (!messages.length) {
      initMessage();
    }
  }, [initMessage, messages.length]);

  useEffect(() => {
    if (messages.length > 0) {
      window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
    }
  }, [messages.length]);

  return (
    <main className={cn("Chat")}>
      <ul className={cn("messages")}>
        <AnimatePresence>
          {messages.map(({ id, speaker, message, suggestions }) => (
            <Message
              id={id}
              speaker={speaker}
              message={message}
              suggestions={suggestions}
              onClickSuggestion={(title, subTitle) => {
                console.log(title, subTitle);
                // TODO: 질의 api -> title + subTitle
              }}
            />
          ))}
        </AnimatePresence>
      </ul>

      <div className={cn("input-container")}>
        <InputText />
        <InputMic />
      </div>
    </main>
  );
}

export default Chat;
