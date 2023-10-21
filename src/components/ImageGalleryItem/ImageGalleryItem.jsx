import { useState } from 'react';
import PropTypes from 'prop-types';
import { ModalWindow } from '../Modal/Modal';

export function ImageGalleryItem({ src, tags, img }) {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const toggleModal = () => {
    setModalIsOpen(prevModalIsOpen => !prevModalIsOpen);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  return (
    <>
      <img
        onClick={toggleModal}
        src={src}
        alt={tags}
        className='h-48 w-full cursor-zoom-in rounded-lg object-cover transition-transform hover:scale-105'
      />
      <ModalWindow src={img} tags={tags} modalIsOpen={modalIsOpen} closeModal={closeModal} />
    </>
  );
}

ImageGalleryItem.propTypes = {
  src: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
  img: PropTypes.string.isRequired,
};
