import { useEffect, useMemo } from 'react';
import type { ButtonProps as ButtonPropsUI } from 'books-ui';
import { Button } from 'books-ui';

import { useOvaContext } from '@/context/ova-context';
import { useFullScreen } from '@/shared/hooks/useFullScreen';

import { Icon } from '../icon';

import { i18n } from './const';

import css from './fullscreen-button.module.css';

interface Props extends ButtonPropsUI {
  elementId: string;
  label?: string;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  controlFullScreen?: boolean;
}

export const FullScreenButton: React.FC<Props> = ({
  elementId,
  label,
  addClass,
  controlFullScreen,
  onClick,
  ...props
}) => {
  const { lang } = useOvaContext();
  const [isFullScreen, toggleFullScreen] = useFullScreen(elementId);

  // Verifica si el modo de pantalla completa está habilitado en el navegador
  const isFullScreenEnabled = useMemo(() => document.fullscreenEnabled, []);

  const DEFAULT_LABEL = isFullScreen ? i18n[lang].labelExit : i18n[lang].label;

  const handleButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (onClick) {
      onClick(event);
    }
    toggleFullScreen();
  };

  useEffect(() => {
    if (controlFullScreen) {
      toggleFullScreen();
    }
  }, [controlFullScreen, toggleFullScreen]);

  return (
    <Button
      label={label || DEFAULT_LABEL}
      aria-pressed={isFullScreen}
      hasAriaLabel
      onClick={handleButtonClick}
      disabled={!isFullScreenEnabled}
      addClass={`${css['button']} ${addClass ?? ''}`}
      {...props}>
      <Icon name={isFullScreen ? 'fullscreen-exit' : 'fullscreen'} />
    </Button>
  );
};
