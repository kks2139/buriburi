import classNames from "classnames/bind";
import { AnimatePresence } from "framer-motion";
import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

import { updateSessionId } from "@/hooks";
import { useAiStore, useChatStore } from "@/store";

import styles from "./index.module.scss";
import Message from "./Message";
import UserInput from "./UserInput";

const cn = classNames.bind(styles);

function Chat() {
  const navigate = useNavigate();

  const selectedCoach = useAiStore((s) => s.selectedCoach) || "DRAGON";
  const messages = useChatStore((s) => s.messages);
  const isQuerying = useChatStore((s) => s.isQuerying);
  const isFinanceAssetLoading = useChatStore((s) => s.isFinanceAssetLoading);
  const isInquiryInterestRateLimitLoading = useChatStore(
    (s) => s.isInquiryInterestRateLimitLoading,
  );
  const isJeonsePlanningLoading = useChatStore(
    (s) => s.isJeonsePlanningLoading,
  );
  const {
    initMessage,
    addMessage,
    queryToAi,
    setLoanNeedsAnalyzationStatus,
    setIsFinanceAssetLoading,
    setIsInquiryInterestRateLimitLoading,
    setIsJeonsePlanningLoading,
  } = useChatStore((s) => s.actions);

  const messagesRef = useRef<HTMLUListElement>(null);

  const isShowLoading =
    isQuerying ||
    isFinanceAssetLoading ||
    isInquiryInterestRateLimitLoading ||
    isJeonsePlanningLoading;

  useEffect(() => {
    if (!messages.length) {
      initMessage();
    }
  }, [initMessage, messages.length]);

  useEffect(() => {
    if (messages.length > 0 || isShowLoading) {
      window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
    }
  }, [isShowLoading, messages.length]);

  return (
    <main className={cn("Chat")}>
      <ul ref={messagesRef} className={cn("messages")}>
        <AnimatePresence>
          {messages.map(({ id, speaker, message, suggestions }) => (
            <Message
              key={id}
              useProfileIcon
              speaker={speaker}
              message={message}
              suggestions={suggestions}
              onClickSuggestion={async ({
                titleMessage,
                subMessage,
                actionType,
              }) => {
                if (isShowLoading) {
                  return;
                }

                const queryMessage = `${titleMessage} ${subMessage}`;

                switch (actionType) {
                  case undefined:
                    addMessage({
                      speaker: "USER",
                      message: `${titleMessage} ${subMessage}`,
                    });
                    queryToAi(queryMessage, selectedCoach);
                    break;
                  case "ENTRY_1":
                    addMessage({
                      speaker: "USER",
                      message: titleMessage,
                    });

                    setTimeout(() => {
                      addMessage({
                        speaker: "AI",
                        message: `비상금이 필요하시군요!\n비상금의 사용 목적과 필요한 금액을 ${selectedCoach === "LINA" ? "알려주시겠어요?" : "알려줘"}`,
                      });
                    }, 500);

                    break;
                  case "ENTRY_2":
                    addMessage({
                      speaker: "USER",
                      message: titleMessage,
                    });

                    setTimeout(() => {
                      addMessage({
                        speaker: "AI",
                        meta: "address",
                        message: `이사가는구나? 집 정보를 먼저 살펴보자.\n알아본 매물 주소를 ${selectedCoach === "LINA" ? "알려주시겠어요?" : "알려줘"}\n\n예시 : 경기도 성남시 분당구 백현동 12-34 번지`,
                      });
                    }, 500);

                    break;
                  case "VIEW_INQUIRY_RESULT":
                    navigate("/result");
                    break;
                  case "READY_TO_INQUIRY":
                    addMessage({ speaker: "USER", message: titleMessage });

                    setIsInquiryInterestRateLimitLoading(true);

                    await new Promise((res) => setTimeout(res, 3_000));
                    await queryToAi(
                      "",
                      selectedCoach,
                      "inquryInterestRateLimit",
                    );

                    setIsInquiryInterestRateLimitLoading(false);
                    break;
                  case "RESULT_SUMMARY":
                    queryToAi("", selectedCoach, "summaryInquiryResult");
                    break;
                  case "CONTINUE_FROM_LAST":
                    queryToAi("", selectedCoach, "continueFromLast");
                    break;
                  case "RESET_QUESTION":
                    addMessage({
                      speaker: "AI",
                      message: "처음부터 다시 질문 해주세요~!",
                    });

                    setLoanNeedsAnalyzationStatus("ANALYZE_LOAN_NEEDS");
                    updateSessionId();
                    break;
                  case "READY_TO_FETCH_ASSET":
                    addMessage({ speaker: "USER", message: titleMessage });

                    setIsFinanceAssetLoading(true);

                    await new Promise((res) => setTimeout(res, 3_000));
                    queryToAi("", selectedCoach, "fetchFinanceAsset");

                    setIsFinanceAssetLoading(false);
                    break;
                  case "VIEW_ANOTHER_JEONSE":
                    addMessage({ speaker: "USER", message: titleMessage });

                    setIsJeonsePlanningLoading(true);

                    queryToAi("", selectedCoach, "fetchFinanceAsset");

                    setIsJeonsePlanningLoading(false);
                    break;
                }
              }}
            />
          ))}
          {isShowLoading && (
            <Message
              speaker="AI"
              isLoading
              message={
                isInquiryInterestRateLimitLoading
                  ? "잠시만 기다려주세요! 최적의 대출 상품을 찾고 있습니다."
                  : isFinanceAssetLoading
                    ? "카카오페이에 연결된\n자산 정보를 불러올게요."
                    : ""
              }
              loadingMessage={
                isInquiryInterestRateLimitLoading
                  ? "대출 조회 중"
                  : isFinanceAssetLoading
                    ? "자산 불러오는 중"
                    : "생각중이에요"
              }
            />
          )}
        </AnimatePresence>
      </ul>

      <UserInput />
    </main>
  );
}

export default Chat;
