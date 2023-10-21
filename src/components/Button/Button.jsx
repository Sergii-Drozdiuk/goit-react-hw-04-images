import PropTypes from 'prop-types';

export const Button = ({ onClick }) => {
  return (
    <button
      type='button'
      onClick={onClick}
      className='m-auto w-24 rounded-lg border bg-[#3f51b5] p-1 text-white hover:scale-105 hover:bg-[#303f9f]'
    >
      Load more
    </button>
  );
};

Button.propTypes = {
  onClick: PropTypes.func.isRequired,
};
