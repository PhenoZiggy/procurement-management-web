import { action, makeObservable, observable } from 'mobx';
import { toJS } from 'mobx'


class DataStore {
  ItemList = [];
  dataItem = null;
  isLoading = false;

  constructor() {
    makeObservable(this, {
      ItemList: observable,
      dataItem: observable,
      addItem: action,
      fetchAll: action,
    });
  }

  addItem(item) {
    this.ItemList.push(item);
    console.log(toJS(this.ItemList));
  }
  fetchAll() {
    return this.ItemList;
  }
}
export default DataStore;
