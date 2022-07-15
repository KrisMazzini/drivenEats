let pedido = {prato: null, bebida: null, sobremesa: null};

let solicitante, endereco;

const botao = document.querySelector('.botao');
const opcoes = document.querySelectorAll('.opcao');
const confirmar = document.querySelector('.ok');
const cancelar = document.querySelector('.cancelar');
const validacao = document.querySelector('.novaPagina');
const body = document.querySelector('body');
const total = document.querySelector('.total');

botao.onclick = function() {finalizarPedido()};

opcoes.forEach (op => {
    op.onclick = function() {selecionarOpcao(this)};
})

confirmar.onclick = function() {confirmarPedido()};

cancelar.onclick = function() {cancelarPedido()};

// -------------------- FUNCTIONS --------------------

function selecionarOpcao(opcao) {
    const tipo = opcao.parentElement.parentElement.classList[0];
    const selecionada = document.querySelector(`.${tipo} .selecionada`);

    const resumo_nome = document.querySelector(`#resumo_${tipo} .nome`);
    const resumo_preco = document.querySelector(`#resumo_${tipo} .preco`);

    if (selecionada && selecionada !== opcao) {
        selecionada.classList.remove('selecionada');
    }

    opcao.classList.toggle('selecionada');
    
    if (opcao.classList.contains('selecionada')) {
        const nome = document.querySelector(`.${tipo} .selecionada .nome`).innerHTML;
        const preco = Number(document.querySelector(`.${tipo} .selecionada .preco`).innerHTML.replace('R$ ', '').replace(',', '.'));

        pedido[tipo] = {nome: nome, preco: preco};
        resumo_nome.innerHTML = nome;
        resumo_preco.innerHTML = preco.toFixed(2).toString().replace('.', ',');
    } else {
        pedido[tipo] = null;
        resumo_nome.innerHTML = tipo;
        resumo_preco.innerHTML = '0,00';
    }

    if (pedido && pedido.prato && pedido.bebida && pedido.sobremesa){
        botao.classList.add('finalizar');
        botao.innerHTML = 'Fechar pedido'
    } else {
        botao.classList.remove('finalizar');
        botao.innerHTML = 'Selecione os 3 itens<br>para fechar o pedido'
    }
}

function finalizarPedido() {
    if (botao.classList.contains('finalizar')) {
        solicitante = prompt('Qual o seu nome?');
        endereco = prompt('Qual o seu endereço?');

        exibirConfirmacao();
    }
}

function exibirConfirmacao() {
    body.style.overflow = "hidden";
    validacao.style.display = "flex";
    
    total.innerHTML = `<span>TOTAL</span>\n<span>${calculaTotal()}</span>`;
}

function confirmarPedido() {
    const mensagem = encodeURIComponent('Olá, gostaria de fazer o pedido:\n' + 
                                        `- Prato: ${pedido.prato.nome}\n` + 
                                         `- Bebida: ${pedido.bebida.nome}\n` + 
                                        `- Sobremesa: ${pedido.sobremesa.nome}\n` + 
                                         `Total: ${calculaTotal()}\n\n` +
                                         `Nome: ${solicitante}\n` +
                                         `Endereço: ${endereco}`);

    window.open("https://wa.me/5532988248479?text=" + mensagem);
    window.location.reload(true);
}

function cancelarPedido() {
    body.style.overflow = "auto";
    validacao.style.display = "none";

    total.innerHTML = `<span>TOTAL</span>\n<span>R$ 0,00</span>`;
}

function calculaTotal() {
    return 'R$ ' + (pedido.prato.preco + pedido.bebida.preco + pedido.sobremesa.preco).toFixed(2).toString().replace('.', ',');
}