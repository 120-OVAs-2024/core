import { createContext } from 'books-ui';

import type { OrderActivityContextType } from './types/types';

export const [OrderActivityProvider, useOrderActivityContext] = createContext<OrderActivityContextType>({
  name: 'DndActivityContext'
});