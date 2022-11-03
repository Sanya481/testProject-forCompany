// // https://webkaa.ru/javascript/maska-nomera-telefona-js

const onEventCalllback = function (evt) {
  const el = evt.target;
  const clearVal = el.dataset.phoneClear;
  const pattern = el.dataset.phonePattern;
  const matrixDef = '+7(___) ___-__-__';
  const matrix = pattern ? pattern : matrixDef;
  const def = matrix.replace(/\D/g, '');
  let i = 0;
  let val = evt.target.value.replace(/\D/g, '');
  if (clearVal !== 'false' && evt.type === 'blur') {
    if (val.length < matrix.match(/([\_\d])/g).length) {
      evt.target.value = '';
      return;
    }
  }
  if (def.length >= val.length) {
    val = def;
  }
  evt.target.value = matrix.replace(/./g, function (a) {
    return /[_\d]/.test(a) && i < val.length ? val.charAt(i++) : i >= val.length ? '' : a;
  });
};

export {onEventCalllback};
