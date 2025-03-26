import Button from '@/components/common/Button';
import Text from '@/components/common/Text';

function Welcome() {
  return (
    <div>
      <Text msg="웰컴입니다" />
      <Text msg="웰컴입니다" size="regular" />
      <Text msg="웰컴입니다" size="big" />
      <Button>버튼</Button>
    </div>
  );
}

export default Welcome;
