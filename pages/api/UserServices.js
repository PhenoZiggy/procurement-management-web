import axios, { AxiosResponse } from 'axios';
import { action, makeObservable } from 'mobx';
import axiosInstance from '../../middleware/setAxiosIntercepter';

class UserServices {
  baseURL = process.env.NEXT_PUBLIC_API_URL;
  endPointURL = 'auth';

  constructor() {
    makeObservable(this, {
      registerUser: action,
    });
  }

  async registerUser(name, email, password) {
    return axios.post(`${this.baseURL}${this.endPointURL}/register/`, { name, email, password });
  }
  async loginUser(email, password) {
    return axios.post(`${this.baseURL}${this.endPointURL}/login/`, { email, password });
  }
  async testAuth() {
    return axiosInstance.post(`${this.baseURL}${this.endPointURL}/test/`);
  }
}

export default UserServices;
