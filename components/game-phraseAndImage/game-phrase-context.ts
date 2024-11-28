import { createContext } from 'books-ui';
type State = {
  openModal: boolean;
  validation: boolean;
  button: boolean;
  result: boolean;
  cardsCorrect: boolean[];
};
interface RadioActivityContextType {
  handleValidation: () => void;
  handleReset: () => void;
  updateActivity: React.Dispatch<Partial<State>>;
  validation: boolean;
  button: boolean;
  result: boolean;
  openModal: boolean;
  handleSelectImage: (imageUrl: string, join: number, alt: string) => void;
  handleOpenModal: (id: number, join: number) => void;
}

export const [PhraseAndImageProvider, usePhraseAndImageContext] = createContext<RadioActivityContextType>({
  name: 'PhraseAndImageContext'
});
