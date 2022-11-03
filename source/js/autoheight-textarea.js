// Поле ввода комментариев
const textareaField = document.querySelector('#field-for-comment');

// Высота поля с комментариями по умолчанию
const TEXTAREA_HEIGHT_DEFAULT = 35;

// Проверяем присутствие элемента на странице, чтобы не сломать js код других модулей
if (textareaField) {
  textareaField.addEventListener('keyup', (evt) => {
    textareaField.style.height = `${TEXTAREA_HEIGHT_DEFAULT}px`;

    let textareaHeight = evt.target.scrollHeight;
    textareaField.style.height = `${textareaHeight}px`;
  });
}
