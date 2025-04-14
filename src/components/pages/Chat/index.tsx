import classNames from "classnames/bind";
import { AnimatePresence } from "framer-motion";
import { useEffect } from "react";

import { useChatStore } from "@/store";

import styles from "./index.module.scss";
import Message from "./Message";
import UserInput from "./UserInput";

const cn = classNames.bind(styles);

function Chat() {
  const messages = useChatStore((s) => s.messages);
  const isQuerying = useChatStore((s) => s.isQuerying);
  const { initMessage } = useChatStore((s) => s.actions);

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
              key={id}
              useProfileIcon
              speaker={speaker}
              message={message}
              suggestions={suggestions}
              onClickSuggestion={(title, subTitle) => {
                console.log(title, subTitle);
                // TODO: 질의 api -> title + subTitle
              }}
            />
          ))}
          {isQuerying && (
            <Message speaker="AI" message="생각중이에요" isLoading />
          )}
        </AnimatePresence>
      </ul>

      <UserInput />
    </main>
  );
}

export default Chat;
