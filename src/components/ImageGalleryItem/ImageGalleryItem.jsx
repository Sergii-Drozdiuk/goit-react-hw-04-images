import PropTypes from 'prop-types';
import { Component } from 'react';
import { ModalWindow } from '../Modal/Modal';

export class ImageGalleryItem extends Component {
  state = {
    modalIsOpen: false,
  };

  toggleModal = () => {
    this.setState(prevState => ({ modalIsOpen: !prevState.modalIsOpen }));
  };

  closeModal = () => {
    this.setState({ modalIsOpen: false });
  };

  render() {
    const { src, tags, img } = this.props;

    return (
      <>
        <img
          onClick={this.toggleModal}
          src={src}
          alt={tags}
          className='h-48 w-full cursor-zoom-in rounded-lg object-cover transition-transform hover:scale-105'
        />
        <ModalWindow
          src={img}
          tags={tags}
          modalIsOpen={this.state.modalIsOpen}
          closeModal={this.closeModal}
        />
      </>
    );
  }
}

ImageGalleryItem.propTypes = {
  src: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
  img: PropTypes.string.isRequired,
};
