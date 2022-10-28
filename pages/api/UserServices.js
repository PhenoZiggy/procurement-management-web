import axios, { AxiosResponse } from 'axios';
import { action, makeObservable } from 'mobx';

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
}

export default UserServices;
