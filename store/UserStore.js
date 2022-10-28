import { action, makeObservable, observable } from 'mobx';
import { userServices } from '../pages/api/serviceInitializer';

class UserStore {
  response = '';
  isLoading = false;

  constructor() {
    makeObservable(this, {
      isLoading: observable,
      response: observable,
    });
  }
  async registerUser(name, email, password) {
    try {
      this.setIsLoading(true);
      const response = await userServices.registerUser(name, email, password);
      console.log(name, email, password);
      this.response = response;
    } catch (error) {
      throw new Error(error.toString());
    } finally {
      this.setIsLoading(false);
    }
  }
  setIsLoading(state) {
    this.isLoading = state;
  }
}
export default UserStore;
