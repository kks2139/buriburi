import classNames from "classnames/bind";
import { motion } from "framer-motion";
import Lottie from "lottie-react";

import ImgChatCoach1 from "@/assets/img/img-chat-coach-1.png";
import ImgChatCoach2 from "@/assets/img/img-chat-coach-2.png";
import Bubbling from "@/assets/lottie/bubbling.json";
import { useAiStore } from "@/store";
import { Speaker } from "@/store/chat";

import styles from "./index.module.scss";

const cn = classNames.bind(styles);

interface Porps {
  speaker: Speaker;
  message: string;
  suggestions?: { title: string; subTitle?: string }[];
  onClickSuggestion?: (title: string, subTitle?: string) => void;
  isLoading?: boolean;
  useProfileIcon?: boolean;
}

function Message({
  speaker,
  message,
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

          <div className={cn("message-ai", { loading: isLoading })}>
            <span dangerouslySetInnerHTML={{ __html: message }}></span>
            {isLoading && (
              <div className={cn("lottie")}>
                <Lottie animationData={Bubbling} loop={true} />
              </div>
            )}
          </div>

          {suggestions.length > 0 && (
            <ul className={cn("suggestions")}>
              {suggestions.map(({ title, subTitle }) => (
                <li key={title + subTitle}>
                  <button
                    type="button"
                    onClick={() => {
                      onClickSuggestion?.(title, subTitle);
                    }}
                  >
                    <div className={cn("title")}>{title}</div>
                    <div className={cn("sub-title")}>{subTitle}</div>
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
