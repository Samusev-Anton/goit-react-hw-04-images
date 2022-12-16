import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ImageGallery from './imageGallery/imageGallery';
import { SearchBar } from './Searchbar/Searchbar';
import { Button } from './Button/Button';
import { Loader } from './Loader/loader';
import { Modal } from './Modal/Modal';
import { fetchSearch } from './Api';
import { useState } from 'react';
import { useEffect } from 'react';

export const App = () => {
  const [searchName, setSearchName] = useState('');
  const [backEnd, setBackEnd] = useState('');
  const [page, setPage] = useState(1);
  // const [error] = useState(null);
  const [status, setStatus] = useState('idle');
  const [largeImage, setLargeImage] = useState('');

  useEffect(() => {
    if (searchName === '') {
      return;
    }

    setBackEnd('');
    const getImages = async () => {
      setStatus('pending');
      try {
        const responce = await fetchSearch(searchName, page);
        const { hits } = responce;
        if (hits.length === 0) {
          setStatus('rejected');
          toast.error('По Вашему запросу ничего не найдено');
          return;
        }
        setStatus('resolved');
        setBackEnd(responce);
      } catch (error) {
        setStatus('rejected');
        toast.error('Что-то пошло не так, попробуйте перезагрузить страницу');
      }
    };
    getImages();
  }, [page, searchName]);

  const handleImgClick = largeImageURL => {
    console.log(largeImageURL);
    setLargeImage(largeImageURL);
  };

  const handleLodeMore = event => {
    // console.log(event);
    setPage(prevPage => prevPage + 1);
  };

  const handleFormSubmit = searchName => {
    setSearchName(searchName);
    setPage(1);
  };

  const modalClose = () => {
    setLargeImage('');
  };

  return (
    <>
      <SearchBar onSubmit={handleFormSubmit} />
      {status === 'idle' && (
        <h1 style={{ textAlign: 'center' }}>Введите текст для поиска</h1>
      )}
      {status === 'pending' && <Loader />}
      {/* {status === 'rejected' && <h1> {error} </h1>} */}
      {status === 'resolved' && (
        <>
          <ImageGallery events={backEnd.hits} picture={handleImgClick} />
          <Button
            totalHits={backEnd.totalHits}
            page={page}
            onIncrement={handleLodeMore}
          />
          {largeImage && (
            <Modal onClose={modalClose}>
              <img
                src={largeImage.largeImageURL}
                alt="тут должна быть картинка"
              />
            </Modal>
          )}
        </>
      )}
    </>
  );
};
