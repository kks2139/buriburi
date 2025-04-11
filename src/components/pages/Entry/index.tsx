import classNames from "classnames/bind";
import { useNavigate } from "react-router-dom";

import Button from "@/components/common/Button";
import Chip from "@/components/common/Chip";
import { AI_STYLES, AiStyle, useAiStore } from "@/store";

import styles from "./index.module.scss";

const cn = classNames.bind(styles);

function Entry() {
  const navigate = useNavigate();

  const selectedAiStyle = useAiStore((state) => state.selectedAiStyle);
  const setAiStyle = useAiStore((state) => state.setAiStyle);

  return (
    <div className={cn("Entry")}>
      <h2 className={cn("title")}>
        대출코치가 어떻게
        <br />
        말하면 좋을까요?
      </h2>

      <ul className={cn("chips")}>
        {AI_STYLES.map((st) => (
          <li key={st}>
            <Chip
              label={st}
              isSelected={selectedAiStyle.has(st)}
              value={st}
              onSelect={(value) => setAiStyle(value as AiStyle)}
            />
          </li>
        ))}
      </ul>

      <div className={cn("start-button")}>
        <Button fullSize onClick={() => navigate("/ai-coach")}>
          대출코치 만나기
        </Button>
      </div>
    </div>
  );
}

export default Entry;
