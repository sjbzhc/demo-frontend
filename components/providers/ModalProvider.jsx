import { createContext, useContext, useState } from 'react';
import { childrenShape } from '../../shapes/shapes';
import Modal from '../UI/Modal';

const ModalContext = createContext();

const ModalProvider = ({ children }) => {
  const [displayModal, setDisplayModal] = useState(false);
  const [modalConfig, setModalConfig] = useState({});

  const value = { setDisplayModal, setModalConfig };
  return (
    <ModalContext.Provider value={value}>
      <div>
        {displayModal
        && (
        <Modal
          title={modalConfig.title || ''}
          message={modalConfig.message || ''}
          onCancel={modalConfig.onCancel || (() => {})}
          onConfirm={modalConfig.onConfirm || (() => {})}
        />
        )}
        {children}
      </div>
    </ModalContext.Provider>
  );
};

ModalProvider.propTypes = {
  children: childrenShape.isRequired,
};

const useModal = () => {
  const context = useContext(ModalContext);

  if (context === undefined) {
    throw new Error('useModal need to be wrapped by a ModalProvider');
  }

  return context;
};

export { ModalProvider, useModal };
