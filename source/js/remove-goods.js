import { renderGoods } from "./rendering-goods.js";
import { goods } from "./util.js";

// Секция для вставки
const goodList = document.querySelector('[data-good-list]');

// Кнопка удалить все
const removeAllBtn = document.querySelector('[data-remove-all]');

/**
 * Функция для удаление всех товаров
 */
const clearOldGoods = () => {
  // Секция для вставки
  const goodList = document.querySelector('[data-good-list]');

  // Товары
  const goodItems = goodList.querySelectorAll('[data-good]');

  goodItems.forEach((good) => {
    good.remove();
  })
}

/**
 * Удаление товаров по нажатию на кнопку 'удалить всё'
 */
 const onRemoveAllGoods = (evt) => {
  if (evt.target.matches('[data-remove-all]')) {
    clearOldGoods();
  }
}

// Удаление товара по нажатию на крестик
// Если есть список товаров
if (goodList) {

  // Просто отрисовываем товары на странице, как есть
  renderGoods(goods);

  // Товары
  const goodItems = goodList.querySelector('[data-good]');


  // Если есть товары в списке - погнали
  if (goodItems) {
    goodList.addEventListener('click', (evt) => {

      /* Метод Element.matches() вернёт true или false, в зависимости от того, соответствует ли элемент указанному css-селектору. */
      if (evt.target.matches('[data-good-delete]')) {
        const currentGood = evt.target.closest('[data-good]');

        currentGood.classList.add('remove-product');
        setTimeout(() => currentGood.remove(), 300);
      }
    })
  }
}

// если есть кнопка - повесим обработчик на кнопку
if (removeAllBtn) {
  removeAllBtn.addEventListener('click', onRemoveAllGoods);
}

export { clearOldGoods }
