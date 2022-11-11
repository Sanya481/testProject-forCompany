/**
 * Форма в корзине
 */
const basketForm = document.querySelector('[data-form-basket]');

function handleFormSubmit(event) {
  event.preventDefault();
  serializeForm(basketForm);
}

function serializeForm(formNode) {
  const { elements } = formNode;

  const data = new FormData();

  Array.from(elements)
    .filter((item) => !!item.name)
    .forEach((element) => {
      const { name, type } = element;
      const value = type === 'checkbox' ? element.checked : element.value;

      data.append(name, value);
      console.log(Array.from(data.entries()));
    });

  return data;
}

if (basketForm) {
  basketForm.addEventListener('submit', handleFormSubmit);
}





// function serializeForm(formNode) {
//   return new FormData(formNode);
//   // const { elements } = formNode;

//   // const data = new FormData();

//   // Array.from(elements)
//   //   .filter((item) => !!item.name)
//   //   .map((element) => {
//   //     const { name, value } = element;

//   //     data.append(name, value);
//   //   });

//   // return data;
// }

// basketForm.addEventListener('submit',serializeForm);



// serializeForm(basketForm);

// const formElements = Array.from(basketForm.elements);
// const formData = formElements.filter((item) => !!item.name);
// const formElementsData = formData.map((elementsData) => {
//   const {name, value} = elementsData;

// })

// console.log(data);


