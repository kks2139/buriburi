import styles from './index.module.scss';
import classNames from 'classnames/bind';

const cn = classNames.bind(styles);

interface Props {
  children?: React.ReactNode;
  onClick?: () => void;
}

function Button({ children, onClick }: Props) {
  return (
    <button className={cn('Button')} onClick={onClick}>
      {children}
    </button>
  );
}

export default Button;
