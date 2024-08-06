import { createContext } from 'books-ui';

import type { GameBagContextType } from './types/types';

export const [GameBagProvider, useGameBagContext] = createContext<GameBagContextType>({
  name: 'GameRadioBagContext'
});
