import { Panel } from '@/shared/components';
import { FullScreenAlert } from '@/shared/components';

import { question_game } from './types/types';
import Level from './Level';

export function GameFish({ questions }: { questions: question_game[] }) {
  return (
    <Panel>
      <FullScreenAlert />
      {questions.map((quest, index) => (
        <Panel.Section key={index}>
          <Level question={quest} index={index} />
        </Panel.Section>
      ))}
    </Panel>
  );
}
