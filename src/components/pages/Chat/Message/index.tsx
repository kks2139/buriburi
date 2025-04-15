import classNames from "classnames/bind";
import { motion } from "framer-motion";
import Lottie from "lottie-react";

import ImgChatCoach1 from "@/assets/img/img-chat-coach-1.png";
import ImgChatCoach2 from "@/assets/img/img-chat-coach-2.png";
import Bubbling from "@/assets/lottie/bubbling.json";
import { SuggestionBubble } from "@/hooks";
import { useAiStore } from "@/store";
import { Speaker } from "@/store/chat";

import styles from "./index.module.scss";

const cn = classNames.bind(styles);

interface Porps {
  speaker: Speaker;
  message?: string;
  loadingMessage?: string;
  suggestions?: SuggestionBubble[];
  onClickSuggestion?: (value: SuggestionBubble) => void;
  isLoading?: boolean;
  useProfileIcon?: boolean;
}

function Message({
  speaker,
  message = "",
  loadingMessage,
  suggestions = [],
  onClickSuggestion,
  isLoading,
  useProfileIcon,
}: Porps) {
  const selectedCoach = useAiStore((s) => s.selectedCoach);

  const isAi = speaker === "AI";
  const profileImg =
    isAi && useProfileIcon
      ? selectedCoach === "LINA"
        ? ImgChatCoach1
        : ImgChatCoach2
      : null;

  return (
    <motion.li
      data-message={isAi ? "ai" : "user"}
      className={cn("Message", { "show-on-right": speaker === "USER" })}
      initial={{ opacity: 0, transform: "translateY(10px)" }}
      animate={{ opacity: 1, transform: "translateY(0)" }}
      exit={{ opacity: 0, transform: "translateY(10px)" }}
      transition={{ duration: 0.3 }}
    >
      {isAi ? (
        <>
          {profileImg && (
            <img
              className={cn("profile-img")}
              src={profileImg}
              alt="프로필이미지"
              width={60}
              height={60}
            />
          )}

          <div className={cn("message-ai")}>
            {message && (
              <span dangerouslySetInnerHTML={{ __html: message }}></span>
            )}
            {isLoading && (
              <div className={cn("loading")}>
                {loadingMessage && <div>{loadingMessage}</div>}
                <div className={cn("lottie")}>
                  <Lottie animationData={Bubbling} loop={true} />
                </div>
              </div>
            )}
          </div>

          {suggestions.length > 0 && (
            <ul className={cn("suggestions")}>
              {suggestions.map((suggestion) => (
                <li key={suggestion.titleMessage + suggestion.subMessage}>
                  <button
                    type="button"
                    onClick={() => {
                      onClickSuggestion?.(suggestion);
                    }}
                  >
                    <div className={cn("title")}>{suggestion.titleMessage}</div>
                    <div className={cn("sub-title")}>
                      {suggestion.subMessage}
                    </div>
                  </button>
                </li>
              ))}
            </ul>
          )}
        </>
      ) : (
        <div className={cn("message-user")}>{message}</div>
      )}
    </motion.li>
  );
}

export default Message;
