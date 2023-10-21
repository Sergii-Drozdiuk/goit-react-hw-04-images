import { Dna } from 'react-loader-spinner';

export const Loader = () => {
  return (
    <div className='z-1000 absolute left-1/2 top-1/2'>
      <Dna
        visible={true}
        height='100'
        width='100'
        ariaLabel='dna-loading'
        wrapperStyle={{}}
        wrapperClass='dna-wrapper'
      />
    </div>
  );
};
