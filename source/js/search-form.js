import { isEscapeKey } from './util.js';

const pageBody = document.body;
// Кнока открытия окна поиска по сайту
const btnSearchOpen = document.querySelector('[data-search-btn-open]');
// Кнока закрытия окна поиска по сайту
const btnSearchClose = document.querySelector('[data-search-btn-close]');
// Форма с поиском в моб.версии
const searchFormMobile = document.querySelector('[data-search-form]');

// Функция открытия модального окна
const onOpenSearchPopup = (evt) => {
  evt.stopPropagation();
  searchFormMobile.classList.add('is-open');
  pageBody.classList.add('shadow');

  // Добавление обработчиа по закрытию окна поиска по сайту по клику на крестик
  btnSearchClose.addEventListener('click', onCloseSearchPopup);
  // Добавление обработчиа по закрытию окна поиска по нажатию на Escape
  document.addEventListener('keydown', onSearchPopupEsc);
  // Добавление обработчиа по закрытию окна поиска по нажатию вне элемента
  document.addEventListener('click', onOverlayElementClick);
};

// Функция закрытия окна поиска
const onCloseSearchPopup = () => {
  searchFormMobile.classList.remove('is-open');
  pageBody.classList.remove('shadow');

  // Удаление обработчиков
  btnSearchClose.removeEventListener('click', onCloseSearchPopup);
  document.removeEventListener('keydown', onSearchPopupEsc);
  document.removeEventListener('click', onOverlayElementClick);
};

/* Функция закрытия окна поиска по нажатию на Escape */
function onSearchPopupEsc(evt) {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    onCloseSearchPopup();
  }
}

// Функция закрытия окна поиска по нажатию вне элемента
function onOverlayElementClick(evt) {
  const clickOutsideElement = !evt.composedPath().includes(searchFormMobile);
  // ...если клик вне элемента
  if (clickOutsideElement) {
    onCloseSearchPopup();
  }
}

// Только для планшета и мобилки
if (window.matchMedia('(max-width: 767px)').matches) {
  // Если кнопка открытия окна поиска есть -
  if (btnSearchOpen) {
    // Открытие окна поиска по клику на лупу
    btnSearchOpen.addEventListener('click', onOpenSearchPopup);
  }
}

export {isEscapeKey};
