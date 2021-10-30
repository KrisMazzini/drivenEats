let pedido = {prato: null, bebida: null, sobremesa: null};

const botao = document.querySelector('.botao');
const opcoes = document.querySelectorAll('.opcao');

botao.onclick = function() {finalizarPedido()};

opcoes.forEach (op => {
    op.onclick = function() {selecionarOpcao(this)}
})

// -------------------- FUNCTIONS --------------------

function selecionarOpcao(opcao) {
    const tipo = opcao.parentElement.parentElement.classList[0];
    const selecionada = document.querySelector(`.${tipo} .selecionada`);

    const descricao = opcao.children.namedItem('textoOpcao');
    const nome = descricao.children.namedItem('nome').innerHTML;
    const preco = Number(descricao.children.namedItem('preco').innerHTML.replace('R$ ', '').replace(',', '.'));

    if (selecionada && selecionada !== opcao) {
        selecionada.classList.remove('selecionada');
    }

    opcao.classList.toggle('selecionada');

    pedido[tipo] = opcao.classList.contains('selecionada') ? {nome: nome, preco: preco} : null;

    if (pedido && pedido.prato && pedido.bebida && pedido.sobremesa){
        botao.classList.add('finalizar');
    } else {
        botao.classList.remove('finalizar');
    }
}

function finalizarPedido() {
    if (botao.classList.contains('finalizar')) {
        const nome = prompt('Qual o seu nome?');
        const endereco = prompt('Qual o seu endereço?');

        const total = (pedido.prato.preco + pedido.bebida.preco + pedido.sobremesa.preco).toFixed(2).toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'});

        const mensagem = encodeURIComponent('Olá, gostaria de fazer o pedido:\n' + 
                        `- Prato: ${pedido.prato.nome}\n` + 
                        `- Bebida: ${pedido.bebida.nome}\n` + 
                        `- Sobremesa: ${pedido.sobremesa.nome}\n` + 
                        `Total: ${total}\n\n` +
                        `Nome: ${nome}\n` +
                        `Endereço: ${endereco}`);

        window.open("https://wa.me/5532988248479?text=" + mensagem);
    }
}