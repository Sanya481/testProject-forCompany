import { isEscapeKey } from './util.js';


const pageBody = document.body;
/**
 * Кнопка открытия модалки
 */
const btnModalLoginOpen = document.querySelector('[data-modal-login-open]');
/**
 * Модалка
 */
const modalLogin = document.querySelector('[data-modal-login]');

if (modalLogin) {

  // https://hidde.blog/using-javascript-to-trap-focus-in-an-element/

  // Модальное окно авторизации
  const callbackModal = document.querySelector('[data-modal-login]');

  const focusableEls = callbackModal.querySelectorAll('a[href]:not([disabled]), button:not([disabled]), textarea:not([disabled]), input[type="text"]:not([disabled]), input[type="radio"]:not([disabled]), input[type="tel"]:not([disabled]), input[type="text"]:not([disabled]), input[type="checkbox"]:not([disabled]), select:not([disabled])');
  const firstFocusableEl = focusableEls[0];
  const lastFocusableEl = focusableEls[focusableEls.length - 1];
  const KEYCODE_TAB = 9;


  /**
   * Ловушка фокуса (не разобрался, как из util.js забирать функцию ничего не ломая)
   */
  const onTrapFocus = (evt) => {
    const isTabPressed = (evt.key === 'Tab' || evt.keyCode === KEYCODE_TAB);

    if (!isTabPressed) {
      return;
    }

    if (evt.shiftKey) /* shift + tab */ {
      if (document.activeElement === firstFocusableEl) {
        lastFocusableEl.focus();
        evt.preventDefault();
      }
    } else /* tab */ {
      if (document.activeElement === lastFocusableEl) {
        firstFocusableEl.focus();
        evt.preventDefault();
      }
    }
  };

  /**
   * Кнопка закрытия модалки
   */
  const btnModalLoginClose = modalLogin.querySelector('[data-close-login-modal]');
  /**
   * Первое поле в форме для автофокуса
   */
  const inputLoginMail = modalLogin.querySelector('[data-login-mail]');
  /**
   * Кнопка показать/скрыть пароль
   */
  const passwordViewBtn = modalLogin.querySelector('[data-password-view]');
  /**
   * Поле для ввода пароля
   */
  const inputPassword = modalLogin.querySelector('[data-password-input]');

  // console.log(document.data-form-login)


  /**
   * Открытие модалки
   */
  function onModalLoginOpen(evt) {
    evt.preventDefault();
    evt.stopPropagation();

    modalLogin.classList.add('is-show');
    pageBody.classList.add('shadow');

    // Не фокусируется !?
    inputLoginMail.focus();
    document.forms[2].elements[0].focus();


    btnModalLoginClose.addEventListener('click', onModalLoginClose);
    document.addEventListener('keydown', onModalLoginCloseEsc);
    document.addEventListener('click', onClickOverlay);
    document.addEventListener('keydown', onTrapFocus);

  }

  /**
   * Закрытие модалки
   */
  function modalLoginClose(evt) {
    modalLogin.classList.remove('is-show');
    pageBody.classList.remove('shadow');

    btnModalLoginClose.removeEventListener('click', onModalLoginClose);
    btnModalLoginClose.removeEventListener('keydown', onModalLoginCloseEsc);
    document.removeEventListener('click', onClickOverlay);
    document.removeEventListener('keydown', onTrapFocus);
  }

  /**
   * Закрытие модалки по нажатию на крестик
   */
  function onModalLoginClose() {
    modalLoginClose();
  }

  /**
   * Закрытие модалки по нажатию на Escape
   */
  function onModalLoginCloseEsc(evt) {
    if (isEscapeKey(evt)) {
      evt.preventDefault();
      onModalLoginClose();
    }
  }

  /**
   * Закрытие модалки по клику вне области
   */
  function onClickOverlay(evt) {
    const elementsClickArea = !evt.composedPath().includes(modalLogin);
    if (elementsClickArea) {
      onModalLoginClose();
    }
  }

  // Если элемент есть на странице то вешаем обработчик
  if (btnModalLoginOpen) {
    btnModalLoginOpen.addEventListener('click', onModalLoginOpen);
  }

  // Показать/скрыть пароль
  function onPasswordChangeView() {

    if (inputPassword.getAttribute('type') === 'password') {
      inputPassword.setAttribute('type', 'text')
      passwordViewBtn.classList.add('is-show');
    } else {
      inputPassword.setAttribute('type', 'password')
      passwordViewBtn.classList.remove('is-show');
    }
  }

  if (passwordViewBtn) {
    passwordViewBtn.addEventListener('click', onPasswordChangeView);
  }

}
