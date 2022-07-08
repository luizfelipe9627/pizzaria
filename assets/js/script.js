const qS = (el) => document.querySelector(el);
const qSA = (el) => document.querySelectorAll(el);
let modalQt = 1;
let cart = [];
let modalKey = 0;

// Listagem das pizzas.

pizzaJson.map( (item, index) => { 
    // Variável responsável por fazer o clone dos modelo do pizza-item.
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
            
            // Usado para selecionar o tamanho grande como padrão.
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

    // Está aplicando um efeito de transparência e em seguida aplicando o display none.
    qS('.pizzaWindowArea').style.opacity = 0;
    setTimeout ( () => {
        qS('.pizzaWindowArea').style.display = 'none';
   }, 500);
}

// Quando clicar no botão fechar ele vai tirar o modal da tela.
qSA('.pizzaInfo--cancelButton, .pizzaInfo--cancelMobileButton').forEach((item) => {
    item.addEventListener('click', closeModal);
});

// Responsável por acrescentar a quantidade de pizza.
qS('.pizzaInfo--qtmais').addEventListener('click', () => {
    modalQt++;
    qS('.pizzaInfo--qt').innerHTML = modalQt;
});

// Responsável por tirar a quantidade de pizza.
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

    // Verifica se no carrinho tem o mesmo item/key.
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
    updateCart();
    closeModal();
});

// Quando escolher uma pizza e apertar no carrinho ele irá abrir o carrinho com todas as infos da pizza.
qS('.menu-openner').addEventListener('click', () => {
    if(cart.length > 0) {
        qS('aside').style.left = '0';
    }
});

// Quando clicar no "X" dentro do carrinho ele vai fechar o carrinho.
qS('.menu-closer').addEventListener('click', () => {
    qS('aside').style.left = '100vw'
});

// Responsável por atualizar e mostrar/abrir o carrinho.
function updateCart() {
    // Está atualizando o carrinho no mobile.
    qS('.menu-openner span').innerHTML = cart.length;

    if(cart.length > 0) {
        qS('aside').classList.add('show');

        // Zera a listagem das pizzas.
        qS('.cart').innerHTML = '';

        // Definindo o subtotal, desconto e total com o valor zerado.
        let subtotal = 0;
        let desconto = 0;
        let total = 0;

        // Pega item por item para exibir na tela do carrinho.
        for(let i in cart) {
            let pizzaItem = pizzaJson.find((item) => item.id == cart[i].id);
            subtotal += pizzaItem.price * cart[i].qt;

            // Responsável por adicionar o tamanho da pizza.
            let pizzaSizeName;
            if (cart[i].size == 0) {
                pizzaSizeName = "P";
            }

            if (cart[i].size == 1) {
                pizzaSizeName = "M";
            }

            if (cart[i].size == 2) {
                pizzaSizeName = "G";
            }
    
            // Preenche os itens do carrinho clonando o cart-item.
            let cartItem = qS('.models .cart--item').cloneNode(true);
            
            // Exibe as informações na tela.
            qS('.cart').append(cartItem);

            // Coloca a imagem da pizza.
            cartItem.querySelector('img').src = pizzaItem.img;
        
            // Responsável pela quantidade de pizza escolhida.
            cartItem.querySelector('.cart--item--qt').innerHTML = cart[i].qt;

            // Responsável por concatenar o nome da pizza com o tamanho.
            let pizzaName = `${pizzaItem.name} (${pizzaSizeName})`;

            // Coloca o nome da pizza no titulo.
            cartItem.querySelector('.cart--item-nome').innerHTML = pizzaName;

            // Responsável por adicionar mais pizzas.
            cartItem.querySelector('.cart--item-qtmais').addEventListener('click', () => {
                cart[i].qt++;
                updateCart();
            });

            // Responsável por diminuir a quantidade de pizzas.
            cartItem.querySelector('.cart--item-qtmenos').addEventListener('click', () => {
                if (cart[i].qt > 1)  {
                    cart[i].qt--;
                } else {
                    cart.splice(i, 1);
                }
                updateCart()
            });

            // Fazendo a conta do desconto e subtotal.
            desconto = subtotal * 0.1;

            // Fazendo a conta do total.
            total = subtotal - desconto;

            // Responsável por mostrar o subtotal.
            qS('.subtotal span:last-child').innerHTML = `R$ ${subtotal.toFixed(2)}`;
            // Responsável por mostrar o desconto.
            qS('.desconto span:last-child').innerHTML = `R$ ${desconto.toFixed(2)}`;

            // Responsável por mostrar o total.
            qS('.total span:last-child').innerHTML = `R$ ${total.toFixed(2)}`;
        }
    } else {
        // Quando tiver "0" pizzas ele vai fechar o carrinho no desktop. 
        qS('aside').classList.remove('show');
        // Quando tiver "0" pizzas ele vai fechar o carrinho no mobile.
        qS('aside').style.left = '100vw'
    }
}






