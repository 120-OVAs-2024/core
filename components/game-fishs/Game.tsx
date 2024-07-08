import { Panel } from '@/shared/components';
import { FullScreenAlert } from '@/shared/components';

import { question_game } from './types/types';
import Level from './Level';

interface props_GameFish {
  questions: question_game[];
  onResult?(result: boolean): void;
  initData: question_game;
}
export function GameFish({ questions, onResult, initData }: props_GameFish) {
  return (
    <Panel>
      <div id="fullscreen__section">
        <FullScreenAlert />

        <Panel.Section>
          <Level intro question={initData} />
        </Panel.Section>
        {questions.map((quest, index) => (
          <Panel.Section key={index}>
            <Level
              question={quest}
              index={index + 1 === questions.length ? undefined : index + 1}
              onResult={onResult}
            />
          </Panel.Section>
        ))}
      </div>
    </Panel>
  );
}
