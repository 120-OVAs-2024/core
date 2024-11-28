import { Modal } from '@shared/components';

import { usePhraseAndImageContext } from './game-phrase-context';

interface Props {
  children: React.ReactElement;
}

export const PhraseAndImageModal: React.FC<Props> = ({ children }) => {
  const { openModal, updateActivity } = usePhraseAndImageContext();
  const handleCloseModal = () => {
    updateActivity({ openModal: false });
  };
  return (
    <Modal isOpen={openModal} onClose={handleCloseModal} finalFocusRef="card_0">
      {children}
    </Modal>
  );
};
