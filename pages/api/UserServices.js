import axios, { AxiosResponse } from 'axios';
import { action, makeObservable } from 'mobx';
import axiosInstance from '../../middleware/setAxiosIntercepter';

class UserServices {
  baseURL = process.env.NEXT_PUBLIC_API_URL;
  endPointURL = 'auth';

  constructor() {
    makeObservable(this, {
      registerUser: action,
      loginUser: action,
      currentUser: action,
      logoutUser: action,
    });
  }

  async registerUser(name, email, password) {
    return axios.post(`${this.baseURL}${this.endPointURL}/register/`, { name, email, password });
  }
  async loginUser(email, password) {
    return axios.post(`${this.baseURL}${this.endPointURL}/login/`, { email, password });
  }
  async currentUser() {
    return axiosInstance.get(`${this.baseURL}${this.endPointURL}/currentuser/`);
  }
  async logoutUser() {
    return axiosInstance.get(`${this.baseURL}${this.endPointURL}/logout/`);
  }
  async testAuth() {
    return axiosInstance.post(`${this.baseURL}${this.endPointURL}/test/`);
  }
}

export default UserServices;
