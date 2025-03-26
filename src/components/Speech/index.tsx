import SpeechRecognition, {
  useSpeechRecognition,
} from 'react-speech-recognition';

import styles from './index.module.scss';
import classNames from 'classnames/bind';

const cn = classNames.bind(styles);

function Speech() {
  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition();

  // 브라우저가 음성 인식을 지원하지 않을 때
  if (!browserSupportsSpeechRecognition) {
    return <span>❌ 현재 브라우저는 음성 인식을 지원하지 않습니다!</span>;
  }

  return (
    <div className={cn('Speech')}>
      <div className={cn('buttons')}>
        <button
          onClick={() =>
            SpeechRecognition.startListening({
              continuous: true,
              language: 'ko-KR',
            })
          }
        >
          🎙️ 음성 인식 시작
        </button>
        <button onClick={SpeechRecognition.stopListening}>🛑 인식 중지</button>
        <button onClick={resetTranscript}>🔄 리셋</button>
      </div>

      <div className={cn('status', { active: listening })}>
        🎧 상태 : <span>{listening ? '듣는 중' : '대기 중'}</span>
      </div>

      <div className={cn('result-text')}>
        {transcript || '인식된 내용이 없음.'}
      </div>
    </div>
  );
}

export default Speech;
