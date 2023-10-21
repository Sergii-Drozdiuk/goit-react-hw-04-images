import PropTypes from 'prop-types';
import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';

export const ImageGallery = ({ images }) => {
  return (
    <ul className='mx-auto grid grid-cols-1 gap-4 pl-1 pr-4 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4'>
      {images.map(({ id, webformatURL, largeImageURL, tags }) => (
        <li key={id} className='rounded-md shadow-md hover:shadow-lg'>
          <ImageGalleryItem src={webformatURL} tags={tags} img={largeImageURL} />
        </li>
      ))}
    </ul>
  );
};

ImageGallery.propTypes = {
  images: PropTypes.arrayOf(PropTypes.object).isRequired,
};
