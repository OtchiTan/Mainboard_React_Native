import axios from 'axios';

export default axios.create({
  baseURL: 'https://otchi.ovh:3000/',
  headers: {
    platform: 'MOBILE',
  },
});
