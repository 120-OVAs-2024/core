import { Panel } from '@/shared/components';
import { FullScreenAlert } from '@/shared/components';

import { question_game } from './types/types';
import Level from './Level';

interface props_GameFish {
  questions: question_game[];
  onResult?(result: boolean): void;
}
export function GameFish({ questions, onResult }: props_GameFish) {
  return (
    <Panel>
      <FullScreenAlert />
      <Panel.Section>
        <Level intro />
      </Panel.Section>
      {questions.map((quest, index) => (
        <Panel.Section key={index}>
          <Level question={quest} index={index + 1 === questions.length ? undefined : index + 1} onResult={onResult} />
        </Panel.Section>
      ))}
    </Panel>
  );
}
