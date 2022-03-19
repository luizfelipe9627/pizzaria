// Listagem das pizzas:

// Const criados com o intuito de não precisa ficar repetindo o mesmo código várias vezes.
const qS = (el) => document.querySelector(el);
const qSA = (el) => document.querySelectorAll(el);

pizzaJson.map( (item, index) => { 
    // Váriavel responsavel por fazer o clone dos modelo do pizza-item.
    let pizzaItem = qS('.models .pizza-item').cloneNode(true);

    // Aplicando os clones na tela.
    qS('.pizza-area').append(pizzaItem);

    // Adicionando as fotos das pizzas, definido no pizza.js.
    pizzaItem.querySelector('.pizza-item--img img').src = item.img;

    // Adicionando os preços das pizzas, definido no pizza.js.
    pizzaItem.querySelector('.pizza-item--price').innerHTML = `R$ ${item.price.toFixed(2)}`;

    // Adicionando o nome das pizzas, definido no pizza.js.
    pizzaItem.querySelector('.pizza-item--name').innerHTML = item.name;

    // Adicionando a descrição das pizzas, definido no pizza.js.
    pizzaItem.querySelector('.pizza-item--desc').innerHTML = item.description;



    


}) ;