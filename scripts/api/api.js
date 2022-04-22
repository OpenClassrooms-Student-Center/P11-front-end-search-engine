export class Api {
  constructor(url) {
    this.url = url;
  }
  //recover data, all thes photographers
  async getData() {
    return fetch(this.url)
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        return data;
      })
      .catch(function (error) {
        console.log(error);
      });
  }
}
