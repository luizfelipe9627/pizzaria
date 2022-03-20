const qS = (el) => document.querySelector(el);
const qSA = (el) => document.querySelectorAll(el);
let modalQt = 1;
let cart = [];
let modalKey = 0;

// Listagem das pizzas.

pizzaJson.map( (item, index) => { 
    // Váriavel responsavel por fazer o clone dos modelo do pizza-item.
    let pizzaItem = qS('.models .pizza-item').cloneNode(true);

    // Aplicando os clones na tela.
    qS('.pizza-area').append(pizzaItem);

    // Armazena a pizza que está no modal.
    pizzaItem.setAttribute('data-key', index)

    // Adicionando as fotos das pizzas, definido no pizza.js.
    pizzaItem.querySelector('.pizza-item--img img').src = item.img;

    // Adicionando os preços das pizzas, definido no pizza.js.
    pizzaItem.querySelector('.pizza-item--price').innerHTML = `R$ ${item.price.toFixed(2)}`;

    // Adicionando o nome das pizzas, definido no pizza.js.
    pizzaItem.querySelector('.pizza-item--name').innerHTML = item.name;

    // Adicionando a descrição das pizzas, definido no pizza.js.
    pizzaItem.querySelector('.pizza-item--desc').innerHTML = item.description;

    // Adicionando um evento de abertura do modal ao clicar nas pizzas.
    pizzaItem.querySelector('a').addEventListener('click', (e) => {
       e.preventDefault();
        // Puxa a ID/KEY da pizza clicada.
        let key = e.target.closest('.pizza-item').getAttribute('data-key');

        // Usado para zerar a quantidade de pizzas.
        modalQt= 1;

        //Usado para definir um KEY permanente.
        modalKey = key;

        // Usado para aplicar um efeito quando clicado na pizza.
       qS('.pizzaWindowArea').style.opacity = 0;
       qS('.pizzaWindowArea').style.display = 'flex';
       setTimeout ( () => {
            qS('.pizzaWindowArea').style.opacity = 1;
       }, 200);

        // Aplica a imagem da pizza escolhida.
        qS('.pizzaBig img').src = pizzaJson[key].img;

        // Usado para colocar o nome da pizza escolhida no titulo.
       qS('.pizzaInfo h1').innerHTML = pizzaJson[key].name;

       // Usado para colocar a descrição da pizza escolhida.
       qS('.pizzaInfo--desc').innerHTML = pizzaJson[key].description;

       // Quando clica na pizza ele não vai selecionar nenhum tamanho.
       qS('.pizzaInfo--size.selected').classList.remove('selected');

       //  Aplicando as gramas da pizza.
       qSA('.pizzaInfo--size').forEach((size, sizeIndex) => {
            size.querySelector('span').innerHTML = pizzaJson[key].sizes[sizeIndex];
            
            // Usado para selecionar o tamanho grande.
            if(sizeIndex == 2) {
                size.classList.add('selected')
            }
       });

       // Usado para colocar o preço da pizza escolhida.
       qS('.pizzaInfo--actualPrice').innerHTML = `R$ ${pizzaJson[key].price.toFixed(2)}`;

        // Usado para definir a quantidade de pizzas.
        qS('.pizzaInfo--qt').innerHTML = modalQt;
    });
}) ;

// Eventos do modal.

function closeModal() {

    // Está aplicando um efeito de transparencia e em seguida aplicando o display none.
    qS('.pizzaWindowArea').style.opacity = 0;
    setTimeout ( () => {
        qS('.pizzaWindowArea').style.display = 'none';
   }, 500);
}

// Quando clicar no botão fechar ele vai tirar o modal da tela.
qSA('.pizzaInfo--cancelButton, .pizzaInfo--cancelMobileButton').forEach((item) => {
    item.addEventListener('click', closeModal);
});

// Responsavel por acrescentar a quantidade de pizza.
qS('.pizzaInfo--qtmais').addEventListener('click', () => {
    modalQt++;
    qS('.pizzaInfo--qt').innerHTML = modalQt;
});

// Responsavel por tirar a quantidade de pizza.
qS('.pizzaInfo--qtmenos').addEventListener('click', () => {
    if (modalQt > 1)  {
        modalQt--;
        qS('.pizzaInfo--qt').innerHTML = modalQt;
    }
});

// Tamanho das pizzas.
qSA('.pizzaInfo--size').forEach((size, sizeIndex) => {
    size.addEventListener('click', (e) => {
        qS('.pizzaInfo--size.selected').classList.remove('selected');
        size.classList.add('selected');
    });
});

// Informações do carrinho de compras.

qS('.pizzaInfo--addButton').addEventListener('click', () => {
    // Tamanho da pizza.
    let size = qS('.pizzaInfo--size.selected').getAttribute('data-key');
    
    //Cria o item no carrinho.
    let identifier = pizzaJson[modalKey].id+'@'+size;

    // Vertifica se no carrinho tem o mesmo item/key.
    let key = cart.findIndex( (item) => item.identifier == identifier);

    // Se ele não encontrar ele vai enviar as informações para o carrinho.
    if(key > -1) {
        cart[key].qt += modalQt
    } else {
        // Enviando as informações para o carrinho.
        cart.push({
        id:pizzaJson[modalKey].id,
        size,
        qt:modalQt
        });
    }

    closeModal();
});



