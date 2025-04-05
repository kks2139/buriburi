import { useSpeech, useVoices } from 'react-text-to-speech';
import styles from './index.module.scss';
import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';

const cn = classNames.bind(styles);

const LANG = 'ko-KR';
const DEFAULT_TEXT = `안녕하세요, 저는 젤다입니다. 크래딧클랜에서 리더를 맡고있습니다. 저의 필살기는 젤다브레스 입니다. 후우, 하아, 후우, 하아`;

function Speak() {
  const [voiceURI, setvoiceURI] = useState<string>();
  const [inputText, setinputText] = useState(DEFAULT_TEXT);

  const { voices } = useVoices();

  const { Text, speechStatus, start, pause, stop } = useSpeech({
    text: inputText,
    pitch: 2,
    rate: 1.1,
    lang: LANG,
    voiceURI,
    highlightText: true,
    showOnlyHighlightedText: false,
    highlightMode: 'word',
  });

  useEffect(() => {
    const koreans = voices.filter(({ lang }) => lang === LANG);

    if (koreans.length) {
      setvoiceURI(koreans[0]?.voiceURI);
    }
  }, [voices]);

  return (
    <div className={cn('Speak')}>
      <div className={cn('inputs')}>
        <div className={cn('buttons')}>
          <button disabled={speechStatus === 'started'} onClick={start}>
            시작
          </button>
          <button disabled={speechStatus === 'paused'} onClick={pause}>
            일시정지
          </button>
          <button disabled={speechStatus === 'stopped'} onClick={stop}>
            그만
          </button>
        </div>

        <textarea
          className={cn('input-text')}
          value={inputText}
          onChange={(e) => {
            setinputText(e.target.value);
          }}
        />
      </div>

      <span className={cn('arrow')}>출력 {'>'} </span>

      <div className={cn('result-text')}>
        <Text />
      </div>
    </div>
  );
}

export default Speak;
