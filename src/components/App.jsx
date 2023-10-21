import { Component } from 'react';
import { SearchBar } from './Searchbar/Searchbar';
import toast, { Toaster } from 'react-hot-toast';
import { fetchImages } from './Api/Api';
import { Loader } from './Loader/Loader';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Button } from './Button/Button';
export class App extends Component {
  state = {
    query: '',
    page: 1,
    images: [],
    loading: false,
    error: false,
    btnLoadMore: false,
    perPage: 12,
  };

  async componentDidUpdate(_, prevState) {
    if (prevState.query !== this.state.query || prevState.page !== this.state.page) {
      try {
        this.setState({ loading: true });
        const { query, page } = this.state;
        const resp = await fetchImages(query, page);
        if (resp.hits.length === 0) {
          this.setState({ error: true });
          toast.error('Sorry, there are no images matching your search query.');
        }

        const newImages = resp.hits.map(({ id, webformatURL, largeImageURL, tags }) => ({
          id,
          webformatURL,
          largeImageURL,
          tags,
        }));
        this.setState(prevState => ({ images: [...prevState.images, ...newImages] }));
        this.smoothScroll();
        if (resp.totalHits !== 0 && this.state.page === 1) {
          toast.success(`Hooray! We found ${resp.totalHits} images!`);
        }
        const totalPage = Math.ceil(resp.totalHits / this.state.perPage);
        if (totalPage > page) {
          this.setState({ btnLoadMore: true });
        } else if (totalPage === page && resp.totalHits) {
          toast.error("Sorry, but you've reached the end of search results.");
          this.setState({ btnLoadMore: false });
        }
      } catch (error) {
        toast.error(error.message);
      } finally {
        this.setState({ loading: false });
      }
    }
  }

  handleSubmit = e => {
    e.preventDefault();
    const form = e.currentTarget;
    const query = form.search.value.trim().toLowerCase();
    if (query === '') {
      toast.error('Enter your request');
      return;
    }
    this.setState({
      query: query,
      page: 1,
      images: [],
      error: false,
      btnLoadMore: false,
    });
  };

  handleLoadMore = () => {
    this.setState(prevState => ({ page: prevState.page + 1 }));
    this.smoothScroll();
  };

  smoothScroll = () => {
    window.scrollBy({
      top: document.documentElement.clientHeight,
      behavior: 'smooth',
    });
  };

  render() {
    return (
      <div className='grid grid-cols-1 gap-4 pb-2'>
        <SearchBar onSubmit={this.handleSubmit} />
        {this.state.images.length > 0 && <ImageGallery images={this.state.images} />}
        {this.state.loading && <Loader />}
        {this.state.btnLoadMore && <Button onClick={this.handleLoadMore} />}
        {this.state.error && (
          <p className='text-xl text-red-500'>Whoops! Error! Please reload this page!</p>
        )}
        <Toaster autoClose={3000} position='top-right' containerClassName='text-xs' />
      </div>
    );
  }
}
