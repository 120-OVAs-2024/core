import { ReactNode } from 'react';

import { Panel } from '@/shared/components';
import { FullScreenAlert } from '@/shared/components';

import { question_game } from './types/types';
import Level from './Level';

interface props_GameCastle {
  questions: question_game[];
  onResult?(result: boolean): void;
  content?: ReactNode;
  audio_success?: string;
  audio_wrong?: string;
  title?: string;
  alt?: string;
  isSpace?: boolean;
}
export function GameCastle({
  questions,
  onResult,
  title,
  alt,
  audio_success,
  audio_wrong,
  content,
  isSpace = true
}: props_GameCastle) {
  return (
    <Panel>
      <div id="fullscreen__section">
        <FullScreenAlert />

        <Panel.Section>
          <Level intro title={title} alt={alt} />
        </Panel.Section>
        {questions.map((quest, index) => (
          <Panel.Section key={index}>
            <Level
              isSpace={isSpace}
              content={content}
              question={quest}
              index={index + 1 === questions.length ? undefined : index + 1}
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
