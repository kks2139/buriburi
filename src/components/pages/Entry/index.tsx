import classNames from "classnames/bind";
import { AnimatePresence, motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

import Button from "@/components/common/Button";
import Chip from "@/components/common/Chip";
import { AI_STYLES, AiStyle, useAiStore } from "@/store";

import styles from "./index.module.scss";

const cn = classNames.bind(styles);

function Entry() {
  const navigate = useNavigate();

  const selectedAiStyle = useAiStore((s) => s.selectedAiStyle);
  const { setAiStyle } = useAiStore((s) => s.actions);

  return (
    <div className={cn("Entry")}>
      <h2 className={cn("title")}>{"대출코치가 어떻게\n말하면 좋을까요?"}</h2>

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

      <AnimatePresence>
        {selectedAiStyle.size > 0 && (
          <motion.div
            className={cn("start-button")}
            initial={{ opacity: 0, transform: "translateY(10px)" }}
            animate={{ opacity: 1, transform: "translateY(0)" }}
            exit={{ opacity: 0, transform: "translateY(10px)" }}
            transition={{ duration: 0.2 }}
          >
            <Button fullSize onClick={() => navigate("/ai-coach")}>
              대출코치 만나기
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default Entry;
