import './autoheight-textarea.js';
import './choose-quantity-goods.js';
import './burger.js';
import './search-form.js';
import './select.js';
import './util.js';
import './basket-form.js';
import './modal-authorization.js';
import './rendering-goods.js';
import './sort-goods.js';
import './favourites.js';
import './remove-goods.js';
import { onEventCalllback } from './phone-input-mask.js';



const phoneInputs = document.querySelectorAll('[data-phone-pattern]');

const mapBasket = document.querySelector('[data-map]');

// Если нет ни одного поля ввода номера телефона - то ничего не происходит
if (phoneInputs) {
  for (let elem of phoneInputs) {
    for (let ev of ['input', 'blur', 'focus']) {
      elem.addEventListener(ev, onEventCalllback);
    }
  }
}

if (mapBasket) {

  const map = L.map(mapBasket)
    .setView({
      lat: 55.755864,
      lng: 37.617698,
    }, 10);

  L.tileLayer(
    'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    },
  ).addTo(map);

}
