import PropTypes from 'prop-types';
import { FcSearch } from 'react-icons/fc';

export const SearchBar = ({ onSubmit }) => (
  <header
    className='sticky right-0 top-0 z-[900] flex
    min-h-[64px] items-center justify-center bg-[#3f51b5] px-6 py-3 text-black shadow-lg'
  >
    <form
      onSubmit={onSubmit}
      className='flex w-full max-w-[600px] items-center overflow-hidden rounded bg-white pr-1'
    >
      <button className='h-8 w-8 bg-slate-300 p-2 opacity-60 transition-all hover:scale-110 hover:opacity-100'>
        <span>
          <FcSearch size='18' />
        </span>
      </button>

      <input
        type='text'
        name='search'
        autoComplete='off'
        autoFocus
        placeholder='Enter a search query'
        className='w-full px-1 outline-none'
      />
    </form>
  </header>
);

SearchBar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
