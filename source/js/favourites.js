// import { renderGoods } from "./rendering-goods.js";
// import { goods } from "./util.js";

// // Секция для вставки
// const goodList = document.querySelector('[data-good-list]');

// if (goodList) {

//   // Просто отрисовываем товары на странице, как есть
//   renderGoods(goods);

//   // Товары
//   const goodItems = goodList.querySelector('[data-good]');


//   // Если есть товары в списке - погнали
//   if (goodItems) {
//     goodList.addEventListener('click', (evt) => {

//       /* Метод Element.matches() вернёт true или false, в зависимости от того, соответствует ли элемент указанному css-селектору. */
//       if (evt.target.matches('[data-good-delete]')) {
//         const currentGood = evt.target.closest('[data-good]');

//         currentGood.classList.add('remove-product');
//         setTimeout(() => currentGood.remove(), 300);
//       }
//     })
//   }


// }



