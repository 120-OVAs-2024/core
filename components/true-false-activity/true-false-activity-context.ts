import { createContext } from 'books-ui';

import type { TrueFalseActivityContextType } from './types/types';

export const [TrueFalseActivityProvider, useTrueFalseActivityContext] = createContext<TrueFalseActivityContextType>({
  name: 'TrueFalseActivityContext'
});