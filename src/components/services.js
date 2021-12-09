class Api {
  constructor() {
    this.page = 1;
    this.searchValue = '';
  }

  getPage() {
    return this.page;
  }

  setPage() {
    this.page += 1;
  }

  resetPage() {
    this.page = 1;
  }
}

export default Api;
