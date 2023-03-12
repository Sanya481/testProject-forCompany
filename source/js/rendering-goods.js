// Секция для вставки
const goodList = document.querySelector('[data-good-list]');

/**
   * @description Функция по отрисовке товаров на странице
   * @param {array} products - массив данных
   * @returns {void}
   */
 const renderGoods = (products) => {

  // Шаблон
  const goodTemplate = document.querySelector('#good')
    .content.querySelector('[data-good]');

  const goodsFragment = document.createDocumentFragment();

  products.forEach((product) => {
    const goodItem = goodTemplate.cloneNode(true);

    goodItem.querySelector('[data-good-title]').textContent = product.title;
    goodItem.querySelector('[data-good-description]').textContent = product.description;
    goodItem.querySelector('[data-good-image]').src = `img/products/${product.url}`;
    goodItem.querySelector('[data-good-price]').textContent = product.price;

    goodsFragment.append(goodItem);
  })

  // Добавляем на страницу
  goodList.append(goodsFragment);
}

export {renderGoods}
