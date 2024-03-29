export default class ProductService {
    getProductsSmall() {
        return fetch('demo/data/products-small.json')
            .then((res) => res.json())
            .then((d) => d.data);
    }

    getProducts() {
        return fetch('demo/data/products.json')
            .then((res) => res.json())
            .then((d) => d.data);
    }

    getProductsWithOrdersSmall() {
        return fetch('demo/data/products-orders-small.json')
            .then((res) => res.json())
            .then((d) => d.data);
    }
    getv1() {
        return fetch('mock/v1.json')
        .then(response => response.json()) // 將響應轉換為JSON格式
        .then(data => {
            data.forEach(doc => {
            console.log(doc);
        });
})
        .catch(error => {
          console.error('Error fetching JSON data:', error); // 處理錯誤
        });
    }
  
}