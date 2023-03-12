/**
   * Сортировка товаров - 'сначала дешевле'
   * @param {array} products - массив данных
   * @returns {array}
   */
 const sortGoodsCheap = (products) => products
 .slice()
 .sort((productA, productB) => productA.price - productB.price);

/**
* Сортировка товаров - 'сначала дороже'
* @param {array} products - массив данных
* @returns {array}
*/
const sortGoodsExpensive = (products) =>
 products.slice()
   .sort((productA, productB) => productB.price - productA.price);

export {sortGoodsCheap, sortGoodsExpensive};
