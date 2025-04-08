import classNames from "classnames/bind";
import { ButtonHTMLAttributes } from "react";

import styles from "./index.module.scss";

const cn = classNames.bind(styles);

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  children?: React.ReactNode;
  fullSize?: boolean;
}

function Button({
  children,
  className,
  fullSize,
  type = "button",
  ...rest
}: Props) {
  return (
    <button
      type={type}
      {...rest}
      className={cn(className, "Button", { full: fullSize })}
    >
      {children}
    </button>
  );
}

export default Button;
