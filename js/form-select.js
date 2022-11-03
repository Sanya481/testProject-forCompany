import { isEscapeKey } from './util.js';

/**
 * Форма в корзине
 */
const formBasket = document.querySelector('[data-form-basket]');
/**
 * Все select на странице
 */
const selects = document.querySelectorAll('[data-form-select]');
/**
 * Высота выпадашки по умолчанию
 */
const SELECT_LIST_DEFAULT_HEIGHT = 0;
/**
 * Код клавиши Tab
 */
const KEYCODE_TAB = 9;
/**
 * Код клавиши Space
 */
const KEYCODE_SPACE = 32;

/**
 * Ловушка фокуса для элементов списка
 */
const trapFocus = (evt) => {

  selects.forEach((select) => {
    if (select.classList.contains('is-show')) {
      const selectList = select.querySelector('[data-select-list]');

      const focusableEls = selectList.querySelectorAll('button');
      const firstFocusableEl = focusableEls[0];
      const lastFocusableEl = focusableEls[focusableEls.length - 1];
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
    }
  });
};

/**
 * Изменение/выбор элемента, запись в input, автофокус, закрытие выпадашки
 */
const onChangeSelectContent = (evt) => {
  // Если клик по li -...
  if (evt.target.matches('[data-item-value]')) {
    // ...берем значение(текст) из элемента...
    const userSelectItem = evt.target;
    // Текущий блок с выбором упаковки
    const select = evt.target.closest('[data-form-select]');
    // Текущая кнопка
    const selectBtn = select.querySelector('[data-select-package-btn]');
    // Текущий список эл-тов для изменения высоты
    const selectList = select.querySelector('[data-select-list]');
    // Текущее скрытое поле ввода, чтобы форма могла взять значение от туда
    const selectInput = select.querySelector('[data-select-input]');
    // ...и подставляем в кнопку
    selectBtn.textContent = userSelectItem.textContent;
    // ...берем значение атрибута из элемента и подставляем в input для формы...
    selectInput.value = userSelectItem.dataset.itemValue;

    // ...закрываем выпадашку
    select.classList.remove('is-show');
    // ...убираем взаимодействие с элементами внутри списка (фокусировку и клики)
    selectList.inert = true;

    const buttons = selectList.querySelectorAll('button');
    buttons.forEach((button) => {
      button.disabled = true;
    });

    // ...только в десктопной версии
    if (window.matchMedia('(min-width: 1110px)').matches) {
      // ...автофокус на слудующем элементе - у нас это - textarea
      evt.target.closest('.basket-form__group--select')
        .nextElementSibling
        .querySelector('textarea').focus();
    }
  }
};

// Закрытию по нажатию на Esc
const onSelectEscPress = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();

    selects.forEach((select) => {
      if (select.classList.contains('is-show')) {
        select.classList.remove('is-show');
        const selectList = select.querySelector('[data-select-list]');
        selectList.style.maxHeight = SELECT_LIST_DEFAULT_HEIGHT;
        // ...убираем взаимодействие с элементами внутри списка (фокусировку и клики)
        selectList.inert = true;

        const buttons = selectList.querySelectorAll('button');
        buttons.forEach((button) => {
          button.disabled = true;
        });

        selectList.removeEventListener('click', onChangeSelectContent);
        document.removeEventListener('keydown', onSelectEscPress);
        document.removeEventListener('click', onOverlayClick);
        selectList.removeEventListener('keydown', trapFocus);
      }
    });
  }
};

// Закрытию по нажатию вне блока
const onOverlayClick = (evt) => {
  selects.forEach((select) => {
    // Текущая кнопка
    const selectBtn = select.querySelector('[data-select-package-btn]');
    // Текущий список эл-тов для изменения высоты
    const selectList = select.querySelector('[data-select-list]');

    if (evt.target !== selectBtn) {
      select.classList.remove('is-show');
      selectList.style.maxHeight = SELECT_LIST_DEFAULT_HEIGHT;
      // ...убираем взаимодействие с элементами внутри списка (фокусировку и клики)
      selectList.inert = true;

      const buttons = selectList.querySelectorAll('button');
      buttons.forEach((button) => {
        button.disabled = true;
      });

      selectList.removeEventListener('click', onChangeSelectContent);
      document.removeEventListener('keydown', onSelectEscPress);
      document.removeEventListener('click', onOverlayClick);
      selectList.removeEventListener('keydown', trapFocus);
    }
  });
};

// Если форма присутствует на странице...
if (formBasket) {
  // ...добавим обработчик клик и ...
  formBasket.addEventListener('click', (evt) => {
    // ...отловим клик по кнопке выбора упаковки...
    if (evt.target.matches('[data-select-package-btn]')) {
      evt.stopPropagation();

      // Текущий блок с выбором упаковки
      const currentSelect = evt.target.closest('[data-form-select]');
      // Текущий список эл-тов для изменения высоты
      const currentSelectList = currentSelect.querySelector('[data-select-list]');

      // Если текущий элемент не содержит класс - то остальные содержат - надо проверить и удалить
      if (!currentSelect.classList.contains('is-show')) {
        const selects = document.querySelectorAll('[data-form-select]');

        // Проходимся по всем и удаляем
        selects.forEach((select) => {
          select.classList.remove('is-show');
          const selectList = select.querySelector('[data-select-list]');
          selectList.style.maxHeight = SELECT_LIST_DEFAULT_HEIGHT;

          // ...убираем взаимодействие с элементами внутри списка (фокусировку и клики)
          selectList.inert = true;

          const buttons = selectList.querySelectorAll('button');
          buttons.forEach((button) => {
            button.disabled = true;
          });

          selectList.removeEventListener('click', onChangeSelectContent);
          document.removeEventListener('keydown', onSelectEscPress);
          document.removeEventListener('click', onOverlayClick);
          currentSelectList.removeEventListener('keydown', trapFocus);
        });

        // А тому по которому кликнули - проставляем класс
        currentSelect.classList.add('is-show');
        currentSelectList.style.maxHeight = `${currentSelectList.scrollHeight}px`;

        // ...убираем взаимодействие с элементами внутри списка (фокусировку и клики)
        currentSelectList.inert = false;
        // ...в firefox не работает что-то будем по старинке кнопкам делать disabled
        const buttons = currentSelectList.querySelectorAll('button');
        buttons.forEach((button) => {
          button.disabled = false;
        });

        currentSelectList.addEventListener('click', onChangeSelectContent);
        document.addEventListener('keydown', onSelectEscPress);
        document.addEventListener('click', onOverlayClick);
        currentSelectList.addEventListener('keydown', trapFocus);

      } else {
        currentSelect.classList.remove('is-show');
        currentSelectList.style.maxHeight = SELECT_LIST_DEFAULT_HEIGHT;

        // ...убираем взаимодействие с элементами внутри списка (фокусировку и клики)
        currentSelectList.inert = true;

        const buttons = currentSelectList.querySelectorAll('button');
        buttons.forEach((button) => {
          button.disabled = true;
        });

        currentSelectList.removeEventListener('click', onChangeSelectContent);
        document.removeEventListener('keydown', onSelectEscPress);
        document.removeEventListener('click', onOverlayClick);
        currentSelectList.removeEventListener('keydown', trapFocus);
      }
    }
  });

  // ...добавим обработчик нажатия клавиши
  formBasket.addEventListener('keyup', (evt) => {

    // ...отловим нажатие по input...
    if (evt.target.matches('[data-select-input]')) {
      if (evt.keyCode === KEYCODE_SPACE || evt.key === 'Space') {

        // Текущий блок с выбором упаковки
        const currentSelect = evt.target.closest('[data-form-select]');
        // Текущий список эл-тов для изменения высоты
        const currentSelectList = currentSelect.querySelector('[data-select-list]');

        // Если текущий элемент не содержит класс - то остальные содержат - надо проверить и удалить
        if (!currentSelect.classList.contains('is-show')) {
          const selects = document.querySelectorAll('[data-form-select]');

          // Проходимся по всем и удаляем
          selects.forEach((select) => {
            select.classList.remove('is-show');
            const selectList = select.querySelector('[data-select-list]');
            selectList.style.maxHeight = SELECT_LIST_DEFAULT_HEIGHT;

            // ...убираем взаимодействие с элементами внутри списка (фокусировку и клики)
            selectList.inert = true;

            const buttons = selectList.querySelectorAll('button');
            buttons.forEach((button) => {
              button.disabled = true;
            });

            selectList.removeEventListener('click', onChangeSelectContent);
            document.removeEventListener('keydown', onSelectEscPress);
            document.removeEventListener('click', onOverlayClick);
            currentSelectList.removeEventListener('keydown', trapFocus);
          });

          // А тому по которому кликнули - проставляем класс
          currentSelect.classList.add('is-show');
          currentSelectList.style.maxHeight = `${currentSelectList.scrollHeight}px`;

          // ...убираем взаимодействие с элементами внутри списка (фокусировку и клики)
          currentSelectList.inert = false;
          // ...в firefox не работает что-то будем по старинке кнопкам делать disabled
          const buttons = currentSelectList.querySelectorAll('button');
          buttons.forEach((button) => {
            button.disabled = false;
          });

          currentSelectList.addEventListener('click', onChangeSelectContent);
          document.addEventListener('keydown', onSelectEscPress);
          document.addEventListener('click', onOverlayClick);
          currentSelectList.addEventListener('keydown', trapFocus);

        } else {
          currentSelect.classList.remove('is-show');
          currentSelectList.style.maxHeight = SELECT_LIST_DEFAULT_HEIGHT;

          // ...убираем взаимодействие с элементами внутри списка (фокусировку и клики)
          currentSelectList.inert = true;

          const buttons = currentSelectList.querySelectorAll('button');
          buttons.forEach((button) => {
            button.disabled = true;
          });

          currentSelectList.removeEventListener('click', onChangeSelectContent);
          document.removeEventListener('keydown', onSelectEscPress);
          document.removeEventListener('click', onOverlayClick);
          currentSelectList.removeEventListener('keydown', trapFocus);
        }
      }
    }
  });
}
