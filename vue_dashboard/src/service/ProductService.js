export default class ProductService {
  /**
   * Fetches data from 'mock/v1.json' and returns the data.
   * @returns {Promise<Object[]>} A promise that resolves to an array of objects.
   */
  async getv1() {
    try {
      const response = await fetch('mock/v1.json');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      console.log(data);
      return data;
    } catch (error) {
      console.error('Error fetching JSON data:', error);
      throw error; // Re-throw the error after logging it
    }
  }
}
