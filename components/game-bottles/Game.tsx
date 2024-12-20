import { ReactNode } from 'react';

import { Panel } from '@/shared/components';

import { TypeWord } from './types/types';
import Level from './Level';

interface props_GameBottle {
  words: TypeWord[];
  onResult?(result: boolean): void;
  content?: ReactNode;
  audio_success?: string;
  audio_wrong?: string;
  title?: string;
  alt?: string;
}

export function GameBottle({ onResult, words, title, alt, audio_success, audio_wrong, content }: props_GameBottle) {
  return (
    <Panel>
      <div id="fullscreen__section">
        {words.map((word, index) => (
          <Panel.Section interpreter={{ ...word?.interpreter }} key={index}>
            <Level
              content={content}
              baseWords={word}
              index={index + 1 === words.length ? undefined : index + 1}
              onResult={onResult}
              title={title}
              alt={alt}
              audio_success={audio_success}
              audio_wrong={audio_wrong}
            />
          </Panel.Section>
        ))}
      </div>
    </Panel>
  );
}
