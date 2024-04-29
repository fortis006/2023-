export default class ProductService {
    getv1() {
                return fetch('mock/v1.json')
                .then(response => response.json()) // 將響應轉換為JSON格式
                .then(data => {
                  const dates = data.map(doc => doc.time.$date); // 將每個文檔的 time.$date 轉換為新陣列
                  console.log(dates); // 打印日期陣列
                  return dates; // 返回日期陣列
            })
            .catch(error => {
              console.error('Error fetching JSON data:', error); // 處理錯誤
            });
        } // Add closing curly brace for getv1 method
  
}