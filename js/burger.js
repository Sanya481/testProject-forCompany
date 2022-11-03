import { isEscapeKey } from './util.js';

const pageBody = document.body;
/**
 *  Кнопка для открытия/закрытия меню
 */
const burger = document.querySelector('[data-burger]');
/**
 * Шапка сайта
 */
const header = document.querySelector('[data-header]');
/**
 * Навигация по сайту
 */
const headerNav = document.querySelector('[data-site-nav]');

/**
 * Закрытие по нажатию на Escape
 */
const onEscapePress = (evt) => {
  if (isEscapeKey(evt)) {
    burger.classList.remove('is-open');
    headerNav.classList.remove('is-open');
    header.classList.remove('is-open');
    pageBody.classList.remove('shadow');
    pageBody.classList.remove('scroll-lock');

    document.removeEventListener('keydown', onEscapePress);
  }
};

if (window.matchMedia('(max-width: 767px)').matches) {

  if (burger) {

    burger.addEventListener('click', () => {

      burger.classList.toggle('is-open');
      headerNav.classList.toggle('is-open');
      header.classList.toggle('is-open');
      pageBody.classList.toggle('shadow');
      pageBody.classList.toggle('scroll-lock');

      document.addEventListener('keydown', onEscapePress);
    });
  }
}

