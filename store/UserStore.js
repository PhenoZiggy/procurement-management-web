import { action, makeObservable, observable } from 'mobx';
import { userServices } from '../pages/api/serviceInitializer';

class UserStore {
  response = '';
  error = '';
  isLoading = false;

  constructor() {
    makeObservable(this, {
      error: observable,
      isLoading: observable,
      response: observable,
      setIsLoading: action,
      setError: action,
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
}
export default UserStore;
