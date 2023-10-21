import { useState, useEffect } from 'react';
import { SearchBar } from './Searchbar/Searchbar';
import toast, { Toaster } from 'react-hot-toast';
import { fetchImages } from './Api/Api';
import { Loader } from './Loader/Loader';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Button } from './Button/Button';

export function App() {
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [btnLoadMore, setBtnLoadMore] = useState(false);
  const perPage = 12;

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const resp = await fetchImages(query, page);
        if (resp.hits.length === 0) {
          setError(true);
          toast.error('Sorry, there are no images matching your search query.');
        }

        const newImages = resp.hits.map(({ id, webformatURL, largeImageURL, tags }) => ({
          id,
          webformatURL,
          largeImageURL,
          tags,
        }));
        setImages(prevImages => [...prevImages, ...newImages]);
        smoothScroll();
        if (resp.totalHits !== 0 && page === 1) {
          toast.success(`Hooray! We found ${resp.totalHits} images!`);
        }
        const totalPage = Math.ceil(resp.totalHits / perPage);
        if (totalPage > page) {
          setBtnLoadMore(true);
        } else if (totalPage === page && resp.totalHits) {
          toast.error("Sorry, but you've reached the end of search results.");
          setBtnLoadMore(false);
        }
      } catch (error) {
        toast.error(error.message);
      } finally {
        setLoading(false);
      }
    };

    if (query !== '' || page !== 1) {
      fetchData();
    }
  }, [query, page]);

  const handleSubmit = e => {
    e.preventDefault();
    const form = e.currentTarget;
    const newQuery = form.search.value.trim().toLowerCase();
    if (newQuery === '') {
      toast.error('Enter your request');
      return;
    }
    setQuery(newQuery);
    setPage(1);
    setImages([]);
    setError(false);
    setBtnLoadMore(false);
  };

  const handleLoadMore = () => {
    setPage(prevPage => prevPage + 1);
    smoothScroll();
  };

  const smoothScroll = () => {
    window.scrollBy({
      top: document.documentElement.clientHeight,
      behavior: 'smooth',
    });
  };

  return (
    <div className='grid grid-cols-1 gap-4 pb-2'>
      <SearchBar onSubmit={handleSubmit} />
      {images.length > 0 && <ImageGallery images={images} />}
      {loading && <Loader />}
      {btnLoadMore && <Button onClick={handleLoadMore} />}
      {error && <p className='text-xl text-red-500'>Whoops! Error! Please reload this page!</p>}
      <Toaster autoClose={3000} position='top-right' containerClassName='text-xs' />
    </div>
  );
}
