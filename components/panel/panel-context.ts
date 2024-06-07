import { createContext } from 'books-ui';

interface PanelContextType {
  titles: string[];
  addSectionTitle: (title: string) => void;
}

export const [PanelCoreProvider, usePanelCoreContext] = createContext<PanelContextType>({
  name: 'PanelCoreContext'
});
