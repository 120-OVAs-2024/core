import { Panel } from '@/shared/components';

import type { question_game } from './types/types';
import type { propsLevel } from './Level';
import Level from './Level';

interface props_GameFish extends propsLevel {
  questions: question_game[];
  initData: question_game;
  addClassBtnFish?: string;
}

export function GameFish({ addClassBtnFish, questions, initData, children, ...props }: props_GameFish) {
  return (
    <Panel>
      <div id="fullscreen__section">
        <Panel.Section>
          <Level intro question={initData} {...props} />
        </Panel.Section>
        {questions.map((quest, index) => (
          <Panel.Section key={index}>
            <Level
              addClassBtnFish={addClassBtnFish}
              question={quest}
              index={index + 1 === questions.length ? undefined : index + 1}
              {...props}
              questionsCount={questions.length}
            />
          </Panel.Section>
        ))}
        {children}
      </div>
    </Panel>
  );
}
