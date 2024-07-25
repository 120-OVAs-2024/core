import { Panel } from '@/shared/components';
import { FullScreenAlert } from '@/shared/components';

import { TypeWord } from './types/types';
import Level from './Level';

interface props_GameBottle {
  pharases: TypeWord[];
  onResult?(result: boolean): void;

  audio_success?: string;
  audio_wrong?: string;
  title?: string;
  alt?: string;
}
export function GameBallons({ onResult, pharases, title, alt, audio_success, audio_wrong }: props_GameBottle) {
  return (
    <Panel>
      <div id="fullscreen__section">
        <FullScreenAlert />

        {pharases.map((word, index) => (
          <Panel.Section key={index}>
            <Level
              word={word}
              index={index + 1 === pharases.length ? undefined : index + 1}
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
