// Списко с выбранными товарами
const productsList = document.querySelector('[data-product-list]');
// Товары в списке выбранных
const products = productsList.querySelectorAll('[data-product]');
// Цифра над иконкой корзины
const selectedQuantity = document.querySelector('[data-quantity-goods]');
// Количество каждого товара
const quantityProducts = document.querySelectorAll('[data-product-quantity]');

// Копирование шаблона и добавление на страницу
// Находим фрагмент с содержимым темплейта
const templateFragment = document.querySelector('#error-quantity-message').content;
// В фрагменте находим нужный элемент
const template = templateFragment.querySelector('[data-error-quantity-message]')
// Клонируем элемент со всеми "внутренностями"
const element = template.cloneNode(true);


/**
 * Время удаления товара
 */
const PRODUCT_TIME_REMOVE = 300;

/**
 * Общее кол-во выбранных товаров
 */
let totalNumber = 0;

// Если есть значок над корзиной - пусть кол-во будет 0
if (selectedQuantity) {
  selectedQuantity.textContent = totalNumber;
}

/**
 * Получение количества товара при удалении/добавлении товара, увеличении/уменьшении кол-ва товара
 */
const changeQuantityProduct = () => {
  quantityProducts.forEach((quantity) => {
    totalNumber = totalNumber + Number(quantity.value);
    selectedQuantity.textContent = totalNumber;
  })
}

// Проверяем присутствие элемента на странице, чтобы не сломать js код других модулей
if (products) {

  // Если товары есть/появились - считаем их
  changeQuantityProduct();

  // Проверяем кол-во товара ...
  // ..если кол-во <= 1 - блокируем кнопку минус
  // ..если больше - ничего ни делаем
  products.forEach((product) => {
    // Кол-во товара
    const productValue = product.querySelector('[data-product-quantity]').value;
    if (productValue <= 1) {
      product.querySelector('[data-btn-minus]').disabled = true;
    }
    // product.querySelector('[data-btn-minus]').disabled = false;
  });

  // С помощью делегирования вешаем обработчик события и отлавливаем клик по нужному нам элементу
  productsList.addEventListener('click', (evt) => {
    // Если клик был по кнопке минус то ...
    // ..находим
    if (evt.target.matches('[data-btn-minus]')) {
      // ..блок с кол-вом товара и кнопками
      const currentQuantityBlock = evt.target.closest('[data-select-quantity]');
      // ..текущую кнопку уменьшения кол-ва выбранного товара
      const currentBtnMinus = currentQuantityBlock.querySelector('[data-btn-minus]');
      // ...текущую кнопку увеличения кол-ва выбранного товара
      const currentBtnPlus = currentQuantityBlock.querySelector('[data-btn-plus]');
      // ..текущее поле ввода кол-ва товара
      const currentProductQuantity = currentQuantityBlock.querySelector('[data-product-quantity]');

      // Преобразуем строки в числа
      // Max кол-во товара у дилера
      let maxQuantityProduct = Number(currentProductQuantity.max);
      // Кол-во введенное юзером
      let productQuantity = Number(currentProductQuantity.value);

      // Уменьшаем на 1 единицу общее кол-во товара
      selectedQuantity.textContent--;

      // Если кол-во товара меньше 1 - кнопка минус блокируется...
      if (productQuantity <= 2) {
        currentBtnMinus.disabled = true;
      }

      // Если количество меньше максимального и блок содержит класс, то
      if (currentQuantityBlock.classList.contains('is-error') && productQuantity <= maxQuantityProduct) {
        // удаляем класс
        currentQuantityBlock.classList.remove('is-error');
        // удаляем элемент из DOM
        currentQuantityBlock.querySelector('.quantity-select__error').remove();
      }
      // ...иначе минус разблокируется
      currentBtnPlus.disabled = false;
      currentProductQuantity.value--;
    }

    // Если клик был по кнопке плюс то находим ...
    if (evt.target.matches('[data-btn-plus]')) {
      // ..блок с кол-вом товара и кнопками
      const currentQuantityBlock = evt.target.closest('[data-select-quantity]');
      // ..текущую кнопку уменьшения кол-ва выбранного товара
      const currentBtnMinus = currentQuantityBlock.querySelector('[data-btn-minus]');
      // ...текущую кнопку увеличения кол-ва выбранного товара
      const currentBtnPlus = currentQuantityBlock.querySelector('[data-btn-plus]');
      // ..текущее поле ввода кол-ва товара
      const currentProductQuantity = currentQuantityBlock.querySelector('[data-product-quantity]');

      // Преобразуем строки в числа
      // Max кол-во товара у дилера
      let maxQuantityProduct = Number(currentProductQuantity.max);
      // Кол-во введенное юзером
      let productQuantity = Number(currentProductQuantity.value);

      // Увеличиваем на 1 единицу общее кол-во товара
      selectedQuantity.textContent++;

      // Если кол-во товара больше max (из атрибутов) - кнопка плюс блокируется...
      if (maxQuantityProduct <= productQuantity) {
        currentBtnPlus.disabled = true;
      }
      // ...иначе кнопка плюс разблокируется...
      currentProductQuantity.value++;
      currentBtnMinus.disabled = false;
    }
  });

  // Проверка ввода юзером кол-ва товара вручную через input..
  // ...если кол-во введенное юзером превышает max - шлём смс и красим кнопки...
  // ..если все ок - ок
  productsList.addEventListener('keyup', (evt) => {

    // Если нажатие/отпускаиние клавишы было на поле ввода то ...
    // ..находим
    if (evt.target.matches('[data-product-quantity]')) {
      // ..блок с кол-вом товара и кнопками
      const currentQuantityBlock = evt.target.closest('[data-select-quantity]');
      // ..текущую кнопку уменьшения кол-ва выбранного товара
      const currentBtnMinus = currentQuantityBlock.querySelector('[data-btn-minus]');
      // ...текущую кнопку увеличения кол-ва выбранного товара
      const currentBtnPlus = currentQuantityBlock.querySelector('[data-btn-plus]');
      // ..текущее поле ввода кол-ва товара
      const currentProductQuantity = currentQuantityBlock.querySelector('[data-product-quantity]');

      // Преобразуем строки в числа
      // Max кол-во товара у дилера
      let maxQuantityProduct = Number(currentProductQuantity.max);
      // Кол-во введенное юзером
      let productQuantity = Number(currentProductQuantity.value);

      // Если введенное юзером кол-во товара больше max - показываем смс используя шаблон в разметке
      if (maxQuantityProduct <= productQuantity) {

        // Добавляем на страницу сообщение об ошибке
        currentQuantityBlock.append(element);
        // Добавляем класс для изменения цвета
        currentQuantityBlock.classList.add('is-error');
        currentBtnPlus.disabled = true;
        // Не разобрался зачем нужно это св-во, но помогло...
        currentBtnMinus.disabled = false;

      } else {
        currentBtnPlus.disabled = false;
        currentQuantityBlock.classList.remove('is-error');
        currentQuantityBlock.querySelector('.quantity-select__error').remove();
      }

      // Обнуляем общее кол-во и считаем заново. p.s - работа в лоб
      selectedQuantity.textContent = 0;
      totalNumber = 0;

      // Ищем все продукты, считаем их кол-во и записываем в общее
      changeQuantityProduct();

    }
  });

  // Удаление товара
  productsList.addEventListener('click', (evt) => {
    // Проверяем, что клик был по кнопке "удалить", если да - ...
    // ...находим
    if (evt.target.matches('[data-delete-product]')) {
      // ...текущий продукт
      const currentProduct = evt.target.closest('[data-product]');
      // ..добавляем анимацию и удаляем его из DOM
      currentProduct.classList.add('remove-product')
      setTimeout(() => currentProduct.remove(), PRODUCT_TIME_REMOVE);

      // Обнуляем общее кол-во и считаем заново. p.s - работа в лоб
      selectedQuantity.textContent = 0;
      totalNumber = 0

      // Ищем все продукты, считаем их кол-во и записываем в общее
      changeQuantityProduct();
    }
  });
}
