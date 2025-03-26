import classNames from 'classnames/bind';
import styles from './index.module.scss';

const cn = classNames.bind(styles);

interface Props {
  msg: string;
  size?: 'small' | 'regular' | 'big';
}

function Text({ msg, size = 'small' }: Props) {
  return <span className={cn('Text', { [size]: true })}>{msg}</span>;
}

export default Text;
