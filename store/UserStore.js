import { action, makeObservable, observable } from 'mobx';
import { userServices } from '../pages/api/serviceInitializer';

class UserStore {
  response = '';
  loginRsponse = null;
  error = '';
  isLoading = false;
  currentUser = null;

  constructor() {
    makeObservable(this, {
      loginRsponse: observable,
      currentUser: observable.deep,
      error: observable,
      isLoading: observable,
      response: observable,
      setIsLoading: action,
      setError: action,
      setCurretUser: action,
    });
  }
  async registerUser(name, email, password) {
    try {
      this.setIsLoading(true);
      this.setError('');
      this.response = '';
      const response = await userServices.registerUser(name, email, password);
      this.response = response;
    } catch (error) {
      if (error.response?.status === 409) {
        this.setError('Already have a user with this Email');
      } else {
        throw new Error(error.toString());
      }
    } finally {
      this.setIsLoading(false);
    }
  }
  setIsLoading(state) {
    this.isLoading = state;
  }
  setError(error) {
    this.error = error;
  }

  async loginUser(email, password) {
    try {
      this.setIsLoading(true);
      this.setError('');
      this.loginRsponse = '';
      const response = await userServices.loginUser(email, password);
      this.loginRsponse = response;
      localStorage.setItem('token', `${response.data.token}`);
      localStorage.setItem('refreshToken', `${response.data.refresh}`);
    } catch (error) {
      if (error.response.status === 401) {
        this.setError('Wrong Password');
      } else if (error.response.status === 404) {
        this.setError('User not exist');
      } else {
        throw new Error(error.toString());
      }
    } finally {
      this.setIsLoading(false);
    }
  }

  async setCurretUser() {
    try {
      this.setIsLoading(true);
      const resposne = await userServices.currentUser();
      if (resposne) {
        if (resposne.data.response.token === 'loggedOut') {
          localStorage.clear();
        }
        this.currentUser = resposne;
      }
    } catch (error) {
    } finally {
      this.setIsLoading(false);
    }
  }

  async logOutUser() {
    try {
      this.setIsLoading(true);
      this.loginRsponse = null;
      const response = await userServices.logoutUser();
    } catch (error) {
    } finally {
      this.setIsLoading(false);
      this.currentUser = null;
      localStorage.clear();
    }
  }

  async testAuth() {
    try {
      this.setIsLoading(true);
      this.setError('');
      const response = await userServices.testAuth();
    } catch (error) {
      console.error(error);
    } finally {
      this.setIsLoading(false);
    }
  }
}
export default UserStore;
