// Проверяем какую кнопку нажал юзер
export const isEscapeKey = (evt) => evt.key === 'Escape';


// // https://hidde.blog/using-javascript-to-trap-focus-in-an-element/

// // Модальное окно авторизации
// const callbackModal = document.querySelector('[data-modal-login]');

// const focusableEls = callbackModal.querySelectorAll('a[href]:not([disabled]), button:not([disabled]), textarea:not([disabled]), input[type="text"]:not([disabled]), input[type="radio"]:not([disabled]), input[type="tel"]:not([disabled]), input[type="text"]:not([disabled]), input[type="checkbox"]:not([disabled]), select:not([disabled])');
// const firstFocusableEl = focusableEls[0];
// const lastFocusableEl = focusableEls[focusableEls.length - 1];
// const KEYCODE_TAB = 9;



// export const onTrapFocus = (evt) => {
//   const isTabPressed = (evt.key === 'Tab' || evt.keyCode === KEYCODE_TAB);

//   if (!isTabPressed) {
//     return;
//   }

//   if (evt.shiftKey) /* shift + tab */ {
//     if (document.activeElement === firstFocusableEl) {
//       lastFocusableEl.focus();
//       evt.preventDefault();
//     }
//   } else /* tab */ {
//     if (document.activeElement === lastFocusableEl) {
//       firstFocusableEl.focus();
//       evt.preventDefault();
//     }
//   }
// };


// Выдуманные товары
const goods = [
  {
    title: "Товар 1",
    description: "Описание товара, которое может быть очень-очень длинным",
    url: "product.jpg",
    price: 5590
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
    price: 20000
  },
  {
    title: "Товар 4",
    description: "Описание товара, которое может быть очень-очень длинным",
    url: "product.jpg",
    price: 1350
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
    price: 1560
  },
  {
    title: "Товар 7",
    description: "Описание товара, которое может быть очень-очень длинным",
    url: "product.jpg",
    price: 10000
  },
  {
    title: "Товар 8",
    description: "Описание товара, которое может быть очень-очень длинным",
    url: "product.jpg",
    price: 9800
  },
  {
    title: "Товар 9",
    description: "Описание товара, которое может быть очень-очень длинным",
    url: "product.jpg",
    price: 800
  },
  {
    title: "Товар 10",
    description: "Описание товара, которое может быть очень-очень длинным",
    url: "product.jpg",
    price: 10400
  }
]

export {goods};






