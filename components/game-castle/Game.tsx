import { Audio } from 'books-ui';

import { Panel } from '@/shared/components';

import { question_game } from './types/types';
import Level from './Level';

interface props_GameCastle {
  questions: question_game[];
  onResult?(result: boolean): void;
  content?: React.ReactNode;
  title: string;
  alt: string;
  audio?: {
    description?: string;
    content?: string;
  };
}

export function GameCastle({ questions, onResult, title, alt, content, audio }: props_GameCastle) {
  return (
    <Panel>
      <Panel.Section>
        {audio?.description ? <Audio a11y src={audio.description} /> : null}
        {audio?.content ? <Audio src={audio.content} /> : null}
        <Level intro title={title} alt={alt} />
      </Panel.Section>
      {questions.map((quest, index) => (
        <Panel.Section key={index}>
          <Level
            content={content}
            question={quest}
            index={index + 1 === questions.length ? undefined : index + 1}
            onResult={onResult}
            title={title}
            alt={alt}
          />
        </Panel.Section>
      ))}
    </Panel>
  );
}
