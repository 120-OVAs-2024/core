import type { SectionProps } from 'books-ui';
import { Panel as PanelUI } from 'books-ui';

import { useSectionManager } from './hooks/useSectionManager';

import css from './panel.module.css';

interface Props extends SectionProps {
  title?: string;
  addClass?: string;
}

export const PanelSection: React.FC<Props> = ({ title, addClass, children }) => {
  const ref = useSectionManager(title);

  return (
    <PanelUI.Section ref={ref} addClass={`${css['panel__section']} ${addClass ?? ''}`}>
      {children}
    </PanelUI.Section>
  );
};
