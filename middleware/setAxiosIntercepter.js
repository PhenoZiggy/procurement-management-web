// import axios from 'axios';

// const setAxiosInterceptor = () => {
//   axios.interceptors.request.use(
//     async (config) => {
//       let sessionResponse = null;
//       let accessToken = '';
//       let refreshToken = '';

//       try {
//         accessToken = sessionResponse?.accessToken;
//         idToken = sessionResponse?.idToken;
//       } catch (error) {
//         console.error(error.toString());
//       }
//       const configWithHeaders = config;
//       if (configWithHeaders.headers) {
//         configWithHeaders.headers['Content-Type'] = 'application/json';
//         configWithHeaders.headers.Accept = 'text/plain';
//         if (refreshToken) {
//           configWithHeaders.headers.Identity = idToken;
//         }
//         if (accessToken) {
//           configWithHeaders.headers.Authorization = `Bearer ${accessToken}`;
//         }
//       }
//       return configWithHeaders;
//     },
//     (error) => {
//       Promise.reject(error);
//     }
//   );
// };
// export default setAxiosInterceptor;
