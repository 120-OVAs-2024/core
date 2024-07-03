import { createContext } from 'books-ui';

import type { GameFishingContextType } from './types/types';

export const [FishingActivityProvider, useFishingActivityContext] = createContext<GameFishingContextType>({
  name: 'FishingActivityContext'
});
