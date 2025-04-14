import classNames from "classnames/bind";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Button from "@/components/common/Button";
import { useFetch } from "@/hooks";
import { AI_INFO, CoachType, useAiStore, useChatStore } from "@/store";

import styles from "./index.module.scss";
import Loading from "./Loading";

const cn = classNames.bind(styles);

function AiCoach() {
  const navigate = useNavigate();
  const selectedAiStyle = useAiStore((s) => s.selectedAiStyle);
  const selectedCoach = useAiStore((s) => s.selectedCoach);
  const { setSelectedCoach } = useAiStore((s) => s.actions);
  const { initMessage } = useChatStore((s) => s.actions);

  const { request } = useFetch();

  const [isSelectCoachLoading, setIsSelectCoachLoading] =
    useState(!selectedCoach);

  const isType1 = selectedCoach === "LINA";
  const aiInfo = isType1 ? AI_INFO.LINA : AI_INFO.DRAGON;

  useEffect(() => {
    (async () => {
      if (selectedCoach) {
        return;
      }

      const result = await request<{ type: CoachType; name: string }>(
        "selectCounselor",
        {
          types: Array.from(selectedAiStyle),
        },
      );

      setIsSelectCoachLoading(false);

      if (!result) {
        return;
      }

      setSelectedCoach(result.type);
      initMessage(result.type);
    })();
  }, [initMessage, request, selectedAiStyle, selectedCoach, setSelectedCoach]);

  if (isSelectCoachLoading) {
    return <Loading />;
  }

  return (
    <main className={cn("AiCoach", { type1: isType1 })}>
      <div className={cn("title")}>
        <h2>{"대출 기초부터 실행까지\n코칭해드릴게요"}</h2>
      </div>

      <img
        className={cn("ai-img", { wide: !isType1 })}
        src={isType1 ? "/img-coach-1.png" : "/img-coach-2.png"}
      />

      <div className={cn("float-layout")}>
        <section className={cn("ai-info")}>
          <div className={cn("content")}>
            <span
              className={cn("name")}
            >{`${aiInfo.name}(${aiInfo.age}세)`}</span>

            <ul className={cn("specs")}>
              {aiInfo.spec.map(({ Icon, value }) => (
                <li key={value}>
                  <Icon width={16} height={16} />
                  <span>{value}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <Button fullSize onClick={() => navigate("/chat")}>
          시작하기
        </Button>
      </div>
    </main>
  );
}

export default AiCoach;
