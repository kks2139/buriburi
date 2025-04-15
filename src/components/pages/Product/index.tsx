import classNames from "classnames/bind";

import styles from "./index.module.scss";

const cn = classNames.bind(styles);

function Product() {
  return <main className={cn("Product")}></main>;
}

export default Product;
