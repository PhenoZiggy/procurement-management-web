import axios from 'axios';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';
import { userStore } from '../store/storeInitialize';

let authToken;
let refresh;
let baseURL;

if (typeof window !== 'undefined') {
  // Perform localStorage action
  authToken = localStorage.getItem('token');
  refresh = localStorage.getItem('refreshToken');
  baseURL = process.env.NEXT_PUBLIC_API_URL;
}

const axiosInstance = axios.create({
  headers: {
    authorization: `Bearer ${authToken}`,
  },
});

axiosInstance.interceptors.request.use(async (req) => {
  let authToken = localStorage.getItem('token');
  let reFresh = localStorage.getItem('refreshToken');
  if (authToken) {
    let authToken = localStorage.getItem('token');
    req.headers.authorization = `Bearer ${authToken}`;
    req.headers.Refresh = `Bearer ${reFresh}`;
    return req;
  } else {
    localStorage.clear();
    userStore.setError('Please Login');
    toast('Please Login First', { hideProgressBar: true, autoClose: 2000, type: 'error' });
  }
});

axiosInstance.interceptors.response.use(
  async (res) => {
    return res;
  },
  async (error) => {
    let newToken = '';
    let newrefresh = localStorage.getItem('refreshToken');
    if (error.response.status === 403) {
      axios
        .get(`${baseURL}auth/refresh`, {
          headers: {
            authorization: `Refresh ${newrefresh}`,
          },
        })
        .then((res) => {
          newToken = res.data.accessToken;
          localStorage.setItem('token', `${res.data.accessToken}`);
          error.config.headers.authorization = `Bearer ${newToken}`;
          return axiosInstance(error.config);
        })
        .catch((error) => {
          if (error?.response?.status === 401) {
            userStore.setError('Token not Provided! Please Login Again!');
          } else if (error.response.status === 403) {
            userStore.setError('Provided token is wrong or expired! Please Login Again!');
          }
        });
    } else {
      return Promise.reject(error);
    }
  }
);

export default axiosInstance;
