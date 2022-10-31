import { action, makeObservable, observable } from 'mobx';
import { products } from '../const/products';
import { productServices } from '../pages/api/serviceInitializer';

class DataStore {
  ItemList = null;
  ItemsPerPage = null;
  filteredItems = null;
  isLoading = false;
  itemResponse = null;

  constructor() {
    makeObservable(this, {
      ItemList: observable,
      isLoading: observable,
      filteredItems: observable,
      itemResponse: observable.deep,
      filterItems: action,
      pages: action,
    });
  }

  async addProduct(product) {
    try {
      this.setIsloading(true);
      this.itemResponse = null;
      const response = await productServices.addProduct(product);
      this.itemResponse = response;
    } catch (error) {
      this.itemResponse = error;
    } finally {
      this.setIsloading(false);
    }
  }

  async getAll() {
    try {
      this.setIsloading(true);
      const response = await productServices.getAll();
      this.ItemList = response.data;
    } catch (error) {
    } finally {
      this.setIsloading(false);
    }
  }

  async deleteProduct(id) {
    try {
      this.setIsloading(true);
      const response = await productServices.deleteProduct(id);
    } catch (error) {
    } finally {
      this.getAll();
      this.setIsloading(false);
    }
  }

  filterItems(filter) {
    let Items = [];
    filter.forEach((keywords) => {
      this.ItemList.forEach((item) => {
        if (item.categoris == {}) {
          if (item.categoris.id == keywords.value) {
            Items.push(item);
          }
        }
      });
    });
    this.filteredItems = Items;
  }

  pages(page_number = 1) {
    return this.ItemList?.slice((page_number - 1) * 8, page_number * 8);
  }
  pagesForFilter(page_number = 1) {
    if (this.filteredItems) {
      return this.filteredItems.slice((page_number - 1) * 8, page_number * 8);
    }
  }
  setIsloading(value) {
    this.isLoading = value;
  }
}
export default DataStore;
