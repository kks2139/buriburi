import classNames from "classnames/bind";

import styles from "./index.module.scss";

const cn = classNames.bind(styles);

interface Props {
  label: string;
  value: string;
  isSelected?: boolean;
  onSelect?: (value: string) => void;
}

function Chip({ label, value, isSelected, onSelect }: Props) {
  return (
    <button
      className={cn("Chip", { selected: isSelected })}
      type="button"
      onClick={() => {
        onSelect?.(value);
      }}
    >
      {label}
    </button>
  );
}

export default Chip;
