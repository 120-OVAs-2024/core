import { useEffect, useReducer, useRef } from 'react';
import { motion } from 'framer-motion';
import { FullScreenButton } from '@shared/components';

import type { InitialState, Option } from './types/types';
import { States } from './types/types';
import { Particule } from './particule';
import { RadioActivityProvider } from './radio-activity-context';
import { RadioButton } from './radio-button';
import { Ray } from './ray';

import css from './game-particulas.module.css';

interface Props {
  children: JSX.Element | JSX.Element[];
  onResult?: ({ result, options }: { result: boolean; options: Option[] }) => void;
  minSelected?: number;
  question: string;
  id: string;
}
const INITIAL_STATE = Object.freeze({
  validation: false,
  button: true,
  result: false,
  options: []
});

type SubComponents = {
  Particule: typeof Particule;
  Button: typeof RadioButton;
};

export const GameParticulas: React.FC<Props> & SubComponents = ({
  children,
  onResult,
  minSelected = 1,
  question,
  id
}) => {
  const [activity, updateActivity] = useReducer(
    (prev: InitialState, next: Partial<InitialState>) => ({ ...prev, ...next }),
    INITIAL_STATE
  );

  const radioElementsId = useRef<string[]>([]);

  const addRadioElementsId = (uid: string): void => {
    if (!radioElementsId.current.includes(uid)) {
      radioElementsId.current = [...radioElementsId.current, uid];
    }
  };

  const addRadiosValues = ({ id, name, state }: Option) => {
    updateActivity({
      options: [...activity.options.filter((option) => option.name !== name), { id, name, state }]
    });
  };

  const handleValidation = () => {
    updateActivity({ validation: true, button: true });

    const result = activity.options.every(({ state }) => state === States.SUCCESS);

    if (onResult) {
      onResult({ result, options: activity.options });
    }

    updateActivity({ result: result });
  };

  const handleReset = () => {
    updateActivity(INITIAL_STATE);
  };

  useEffect(() => {
    if (!activity.options.length) return;

    const MITAD = 2;
    const MIN_SELECTED = minSelected || radioElementsId.current.length / MITAD;

    if (MIN_SELECTED === activity.options.length && !activity.validation) {
      updateActivity({ button: false });
    }
  }, [activity.options, activity.validation, radioElementsId, minSelected]);
  return (
    <RadioActivityProvider
      value={{
        addRadiosValues,
        handleValidation,
        addRadioElementsId,
        handleReset,
        button: activity.button,
        result: activity.result,
        validation: activity.validation
      }}>
      <div id={id} className={css.actParticulas}>
        <FullScreenButton elementId={id}></FullScreenButton>
        <Ray />
        <motion.div
          initial={{
            opacity: '0.8'
          }}
          animate={{
            opacity: '1'
          }}
          transition={{
            duration: 0.12,
            ease: 'easeInOut'
          }}
          className={css.containerQuestion}
          data-state={activity.validation ? activity.result : null}>
          <p>{question}</p>
        </motion.div>
        {children}
      </div>
    </RadioActivityProvider>
  );
};

GameParticulas.Button = RadioButton;
GameParticulas.Particule = Particule;
