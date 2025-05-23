import { useEffect, useRef } from 'react';
import { motion, useAnimationControls } from 'framer-motion';

import type { Option } from './types/types';
import { useGameBagContext } from './game-radio-context';

import css from './game-bag.module.css';

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  option: Option;
  uid: string;
}

const animationVariants = {
  expand: {
    scale: [0, 1],
    y: [-240, 0],
    transition: {
      duration: 1,
      ease: 'backInOut',
      times: [0, 0.5, 1],
    },
  },
  collapse: {
    scale: [1, 0],
    y: [0, -240],
    transition: {
      duration: 1,
      ease: 'backInOut',
      times: [0, 0.5, 1],
    },
  },
};

export const Radio: React.FC<Props> = ({  uid, option, ...props }) => {
  const { selectedId, validation } = useGameBagContext();
  const radioControls = useAnimationControls();
  const flagIsReset = useRef<boolean>(false);

  const isEqual = selectedId === option.id;

  useEffect(() => {
    const isAnimationReset = !validation || !isEqual;
  
    if (isAnimationReset) {
      if (flagIsReset.current) {
        flagIsReset.current = false;
        radioControls.start('expand');
      }
    } else {
      flagIsReset.current = true;
      radioControls.start('collapse');
    }
  }, [validation, radioControls, isEqual]);

  return (
    <motion.div
      className={css['radio']}
      animate={radioControls}
      variants={animationVariants}
      {...(validation && isEqual && { ['data-state']: option?.state || '' })}>
      <input
        type="radio"
        id={option.id}
        className={`${css['radio__input']} u-sr-only`}
        name={`radio-group-${uid}`}
        checked={isEqual}
        disabled={validation}
        {...props}
      />
      <label className={css['radio__label']} htmlFor={option.id}>
        <span dangerouslySetInnerHTML={{ __html: option.label }}></span>
      </label>
    </motion.div>
  );
};
