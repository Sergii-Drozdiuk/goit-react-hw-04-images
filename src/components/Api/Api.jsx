import axios from 'axios';

export async function fetchImages(query, page) {
  const BASE_URL = 'https://pixabay.com/api/';
  const resp = await axios(BASE_URL, {
    params: {
      key: '39181304-34c4662094c53de77895ac9be',
      q: query,
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: true,
      page: page,
      per_page: 12,
    },
  });
  return resp.data;
}
