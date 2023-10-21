import ReactModal from 'react-modal';
import PropTypes from 'prop-types';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    padding: '0',
    border: 'none',
  },
  overlay: {
    background: ' rgba(0, 0, 0, 0.5)',
    backdropFilter: 'blur(5px)',
    zIndex: '1200',
  },
  body: {
    overflow: 'hidden',
  },
};

ReactModal.setAppElement('#root');

export const ModalWindow = ({ src, tags, modalIsOpen, closeModal }) => {
  return (
    <ReactModal
      isOpen={modalIsOpen}
      style={customStyles}
      onRequestClose={closeModal}
      onAfterOpen={() => (document.body.style.overflow = 'hidden')}
      onAfterClose={() => (document.body.style.overflow = 'unset')}
    >
      <img
        src={src}
        alt={tags}
        width='900'
        className='max-h-[calc(100vh-24px)] basis-[calc(100vw-48px)] rounded-lg bg-white p-4'
      />
    </ReactModal>
  );
};

ModalWindow.propTypes = {
  src: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
  modalIsOpen: PropTypes.bool.isRequired,
  closeModal: PropTypes.func.isRequired,
};
