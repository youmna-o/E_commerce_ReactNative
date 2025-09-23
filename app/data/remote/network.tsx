
export


const getProductsFromApi = () => {
  return fetch('https://dummyjson.com/products')
    .then(response => response.json())
    .then(json => {
      return json.movies;
    })
    .catch(error => {
      console.error(error);
    });
};