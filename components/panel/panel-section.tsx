import { useEffect } from 'react';
import type { SectionProps } from 'books-ui';
import { Panel as PanelUI } from 'books-ui';

import { usePanelCoreContext } from './panel-context';

import css from './panel.module.css';

interface Props extends SectionProps {
  title?: string;
  addClass?: string;
}

export const PanelSection: React.FC<Props> = ({ title, addClass, children }) => {
  const { addSectionTitle } = usePanelCoreContext();

  useEffect(() => {
    if (title) {
      addSectionTitle(title);
    }
  }, [title, addSectionTitle]);

  return (
    <PanelUI.Section addClass={`${css['panel__section']} ${addClass ?? ''}`}>
      {children}
    </PanelUI.Section>
  );
};
