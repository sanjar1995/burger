// console.log('Привет\nАндрей');
// function asd(a, b) {
//    return a + b;
// }
// let asd = function (a, b) {
//    return a + b;
// }
// let asd = (a, b) => console.log(a+b);



let products = {
   plainBurger: {
      name: 'Гамбургер простой',
      price: 10000,
      kcall: 400,
      amount: 0,
      get sum() {
         return this.amount * this.price;
      },
      get calcKcall() {
         return this.kcall * this.amount;
      },
      doubleMayonnaise: true,
   },
   freshBurger: {
      name: 'Гамбургер FRESH',
      price: 20500,
      kcall: 500,
      amount: 0,
      get sum() {
         return this.amount * this.price;
      },
      get calcKcall() {
         return this.kcall * this.amount;
      },
   },
   freshCombo: {
      name: 'FRESH COMBO',
      price: 31900,
      kcall: 700,
      amount: 0,
      get sum() {
         return this.amount * this.price;
      },
      get calcKcall() {
         return this.kcall * this.amount;
      },
   }
};
let extraProduct = {
   doubleMayonnaise: {
      name: 'Двойной майонез',
      price: 500,
      kcall: 50
   },
   lettuce: {
      name: 'Салатный лист',
      price: 300,
      kcall: 30
   },
   cheese: {
      name: 'Сыр',
      price: 400,
      kcall: 40
   }
};
const btnPlusOrMinus = document.querySelectorAll('.main__product-btn'),
   checkExtraProduct = document.querySelectorAll('.main__product-checkbox'),
   addCart = document.querySelector('.addCart'),
   receipt = document.querySelector('.receipt'),
   receiptOut = document.querySelector('.receipt__window-out'),
   receiptWindow = document.querySelector('.receipt__window'),
   btnReceipt = document.querySelector('.receipt__window-btn');
// console.log(btnPlusOrMinus);

for (let i = 0; i < btnPlusOrMinus.length; i++) {
   btnPlusOrMinus[i].addEventListener('click', function (e) {
      e.preventDefault();
      plusOrMinus(this);
   })
}

function plusOrMinus(el) {
   //.closest('selector') метод, который подключается к ближайшему родителю с таким селектором
   //.getAttribute() берет информацию и атрибута
   const parent = el.closest('.main__product'),//подключаемся к родителю с таким классом
      parentId = parent.getAttribute('id'), //берем у родителя из id название бургера
      price = parent.querySelector('.main__product-price span'),
      out = parent.querySelector('.main__product-num'),
      kcall = parent.querySelector('.main__product-call span'),
      elementData = el.getAttribute('data-symbol');
   // console.log(elementData);
   // console.log(parentId);
   if (elementData == '+' && products[parentId].amount < 10) products[parentId].amount++;
   else if (elementData == '-' && products[parentId].amount > 0) products[parentId].amount--;

   out.innerHTML = products[parentId].amount;
   price.innerHTML = products[parentId].sum;
   kcall.innerHTML = products[parentId].calcKcall;
}
// console.log(checkExtraProduct);
for (let input of checkExtraProduct) {//перебираем все инпуты
   input.addEventListener('click', function () {//на каждый вешаем обработчик на click
      //если на какой-то инпут нажали то запускаем функцию и передаем туда этот инпут
      //this - содержит тот элемент на который нажали
      addExtraProduct(this);
   })
}
function addExtraProduct(input) {
   const parent = input.closest('.main__product'),//находим секцию в которой находится инпут на который нажали
      parentId = parent.getAttribute('id'),//у это секции берем инфо из id
      inputName = input.getAttribute('data-extra'),//название доп продукта
      price = parent.querySelector('.main__product-price span'),
      kcall = parent.querySelector('.main__product-call span');
   // console.log(inputName);
   // console.log(input.checked);
   products[parentId][inputName] = input.checked;
   if (products[parentId][inputName]) {
      products[parentId].price += extraProduct[inputName].price;
      products[parentId].kcall += extraProduct[inputName].kcall;
   }
   else {
      products[parentId].price -= extraProduct[inputName].price;
      products[parentId].kcall -= extraProduct[inputName].kcall;
   }
   // console.log(products[parentId]);
   price.innerHTML = products[parentId].sum;
   kcall.innerHTML = products[parentId].calcKcall;
}

let arrayProduct = [],
   totalName = '',
   totalPrice = 0,
   totalKcall = 0;
//формируем заказ
addCart.addEventListener('click', function () {
   for (const burger in products) {//перебираем весь объект products
      if (products[burger].amount > 0) {//если бургер выбрали
         arrayProduct.push(products[burger])//добавляем в массив
         products[burger].name += ` - ${products[burger].amount} шт`;
         for (let key in products[burger]) {//перебираем внутренний объект который выбрали
            if (products[burger][key] === true) {//если какой-то доп продукт выбран для этого бургера
               products[burger].name += `\n\t${extraProduct[key].name}`;//добавляем к названию бургера название доп продукта
            }
         }
      }
   }
   // console.log(arrayProduct);

   for (let el of arrayProduct) {
      totalPrice += el.sum;
      totalKcall += el.calcKcall;
      totalName += `\n${el.name}\n`;
   }
   receiptOut.innerHTML = `Ваш заказ:\n${totalName}\nКалорийность заказа: ${totalKcall} кКал\nОбщая стоимость заказа: ${totalPrice} сум`;
   receipt.style.display = 'flex';
   setTimeout(function () { receipt.style.opacity = '1'; }, 100);
   setTimeout(function () { receiptWindow.style.top = '0'; }, 200);
   document.body.style.overflow = 'hidden';

   document.querySelectorAll('.main__product-num').forEach((a) => a.innerHTML = 0);
   document.querySelectorAll('.main__product-price span').forEach((a) => a.innerHTML = 0);
   document.querySelectorAll('.main__product-call span').forEach((a) => a.innerHTML = 0);

})
btnReceipt.addEventListener('click', function () {
   location.reload();
})