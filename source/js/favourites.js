// // Секция для вставки
const goodList = document.querySelector('[data-good-list]');

if (goodList) {
  // Шаблон
  const goodTemplate = document.querySelector('#good')
    .content.querySelector('[data-good]');


  // Выдуманные товары
  const goods = [
    {
      title: "Товар 1",
      description: "Описание товара, которое может быть очень-очень длинным",
      url: "product.jpg",
      price: 50
    },
    {
      title: "Товар 2",
      description: "Описание товара, которое может быть очень-очень длинным",
      url: "product.jpg",
      price: 1000
    },
    {
      title: "Товар 3",
      description: "Описание товара, которое может быть очень-очень длинным",
      url: "product.jpg",
      price: 2000
    },
    {
      title: "Товар 4",
      description: "Описание товара, которое может быть очень-очень длинным",
      url: "product.jpg",
      price: 350
    },
    {
      title: "Товар 5",
      description: "Описание товара, которое может быть очень-очень длинным",
      url: "product.jpg",
      price: 4000
    },
    {
      title: "Товар 6",
      description: "Описание товара, которое может быть очень-очень длинным",
      url: "product.jpg",
      price: 560
    },
    {
      title: "Товар 7",
      description: "Описание товара, которое может быть очень-очень длинным",
      url: "product.jpg",
      price: 6000
    },
    {
      title: "Товар 8",
      description: "Описание товара, которое может быть очень-очень длинным",
      url: "product.jpg",
      price: 7800
    },
    {
      title: "Товар 9",
      description: "Описание товара, которое может быть очень-очень длинным",
      url: "product.jpg",
      price: 8900
    },
    {
      title: "Товар 10",
      description: "Описание товара, которое может быть очень-очень длинным",
      url: "product.jpg",
      price: 9400
    }
  ]

  const goodsFragment = document.createDocumentFragment();

  goods.forEach((good) => {
    const goodItem = goodTemplate.cloneNode(true);

    goodItem.querySelector('[data-good-title]').textContent = good.title;
    goodItem.querySelector('[data-good-description]').textContent = good.description;
    goodItem.querySelector('[data-good-image]').src = `img/products/${good.url}`;
    goodItem.querySelector('[data-good-price]').textContent = good.price;

    goodsFragment.append(goodItem);
  })

  // Добавляем на страницу
  goodList.append(goodsFragment);
}



// Удаление товара

// Если есть список товаров
if (goodList) {

  // Товары
  const goodItems = goodList.querySelector('[data-good]');

  // Если есть товары в нем то - погнали
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



console.log(document.querySelector('[data-product-list]'));
