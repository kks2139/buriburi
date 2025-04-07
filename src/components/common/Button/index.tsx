import classNames from "classnames/bind";
import { ButtonHTMLAttributes } from "react";

import styles from "./index.module.scss";

const cn = classNames.bind(styles);

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  children?: React.ReactNode;
}

function Button({ children, ...rest }: Props) {
  return (
    <button {...rest} className={cn("Button")}>
      {children}
    </button>
  );
}

export default Button;
