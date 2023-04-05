import axios from 'axios';

export default axios.create({
  baseURL: 'https://otchi.ovh',
  headers: {
    platform: 'MOBILE',
    Authorization: 'Bearer ',
  },
});
