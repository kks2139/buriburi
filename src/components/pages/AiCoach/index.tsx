import classNames from "classnames/bind";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import ImgCoach1 from "@/assets/img/img-coach-1.png";
import Button from "@/components/common/Button";
import { AI_INFO } from "@/store";

import styles from "./index.module.scss";

const cn = classNames.bind(styles);

function AiCoach() {
  const navigate = useNavigate();

  // TODO: AI스타일 요청
  const [isAiLoading, setIsAiLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => setIsAiLoading(false), 1_000);
  }, []);

  if (isAiLoading) {
    return (
      <div className={cn("loading")}>
        <img className={cn("lottie")} src="" alt="" width={60} height={60} />
        <h3 className={cn("title")}>대출코치 매칭 중</h3>
      </div>
    );
  }

  return (
    <main className={cn("AiCoach")}>
      <div className={cn("title")}>
        <h2>
          대출 기초부터 실행까지
          <br />
          코칭해드릴게요
        </h2>
      </div>

      <img className={cn("ai-img")} src={ImgCoach1} />

      <div className={cn("float-layout")}>
        <section className={cn("ai-info")}>
          <div className={cn("content")}>
            <span
              className={cn("name")}
            >{`${AI_INFO.gln.name}(${AI_INFO.gln.age}세)`}</span>

            <ul className={cn("specs")}>
              {AI_INFO.gln.spec.map(({ Icon, value }) => (
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
