import { useState } from 'react';
import type { PanelProps } from 'books-ui';
import { Panel as PanelUI } from 'books-ui';

import { PanelCoreProvider } from './panel-context';
import { PanelProgress } from './panel-progress';
import { PanelSection } from './panel-section';

import css from './panel.module.css';

interface Props extends PanelProps {
  addClass?: string;
}

type SubModules = {
  Section: typeof PanelSection;
};

const Panel: React.FC<Props> & SubModules = ({ addClass, children, ...props }) => {
  const [sectionTitles, setSectionTitles] = useState<string[]>([]);

  const addSectionTitle = (title: string): void => {
    if (!sectionTitles.includes(title)) {
      setSectionTitles(prev => ([...prev, title]));
    }
  };

  return (
    <PanelCoreProvider value={{ titles: sectionTitles, addSectionTitle }}>
      <PanelUI type="carrousel" addClass={`${css['panel']} ${addClass ?? ''}`} {...props}>
        <PanelProgress />
        {children}
      </PanelUI>
    </PanelCoreProvider>
  );
};

Panel.Section = PanelSection;

export { Panel };
