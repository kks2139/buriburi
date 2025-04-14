import classNames from "classnames/bind";
import { AnimatePresence } from "framer-motion";
import { useEffect } from "react";
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
  const {
    initMessage,
    addMessage,
    queryToAi,
    setLoanNeedsAnalyzationStatus,
    setIsFinanceAssetLoading,
    setIsInquiryInterestRateLimitLoading,
  } = useChatStore((s) => s.actions);

  const isShowLoading =
    isQuerying || isFinanceAssetLoading || isInquiryInterestRateLimitLoading;

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
      <ul className={cn("messages")}>
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
                console.log(titleMessage, subMessage, actionType);

                // VIEW_INQUIRY_RESULT > 조회결과 화면 호출
                // RESULT_SUMMARY > summary-inquiry-result GET 호출
                // READY_TO_INQUIRY > inquiry-ineterst-rate-limit POST 호출
                // CONTINUE_FROM_LAST > continue-from-last GET 호출
                // RESET_QUESTION > loan-needs-analyzation & Session 초기화
                // READY_TO_FETCH_ASSET > fetch-finance-asset 호출

                const queryMessage = `${titleMessage} ${subMessage}`;

                switch (actionType) {
                  case undefined:
                    addMessage({
                      speaker: "USER",
                      message: `${titleMessage} ${subMessage}`,
                    });
                    queryToAi(queryMessage, selectedCoach);
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
