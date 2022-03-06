/*  Dicionario de Códigos:

O querySelector é usado para selecionar elementos HTML com base no id, classes, tipos, atributos, valores de atributos, etc. 

O cloneNode() é usado para recriar algo, no caso como o proprio nome já diz, clonar.

O append() é usado para adicionar mais um conteudo alem do que ele está recebendo.

*/

// Listagem das pizzas:

// Const criados com o intuito de não precisa ficar repetindo o mesmo código várias vezes.
const qS = (el) => document.querySelector(el);
const qSA = (el) => document.querySelectorAll(el);

pizzaJson.map( (item, index) => { 
    // Váriavel responsavel por fazer o clone dos modelo do pizza-item.
    let pizzaItem = qS('.models .pizza-item').cloneNode(true);

    // Responsavel por adicionar os clones na tela.
    qS('.pizza-area').append(pizzaItem);


}) ;