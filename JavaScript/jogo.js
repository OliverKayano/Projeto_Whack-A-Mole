/** Mensagens de texto podem ser feitas assim */
//Ou assim.

/** Quantidade de acertos */
var acertos = 0;

/** Quantidade de topeiras perdidas */
var perdidos = 0;

/** Quantidade de erros */
var errados = 0;

/** Tempo para aparecer uma toupeira, em milissegundos */
var intervalo = 5000;

/** Tempo de permanência da toupeira */
var janela = 2000;

/** Timer de controle das toupeiras, com retorno null, porque vamos adicionar uma função no decorrer do código */
var timer = null;

/** Vamos iniciar tratando os eventos que ocorrerão: */

/** O evento load carrega um objeto primeiro, para depois carregar a função indicada, 
 * no nosso caso, o objeto é o window, ou seja, carrega a pagina toda antes de começar os eventos*/

onload = function() {       
    document.getElementById('start').addEventListener('click', start);                      /**Evento por clicar no botão de início do jogo */
    document.getElementById('idGramado').addEventListener('mouseDown', marteloBaixo);       /**Clicar na tela faz o martelo descer */
    document.getElementById('idGramado').addEventListener('mouseUp', marteloCima);          /**Soltar o botão do mouse faz o martelo voltar para cima */
    document.getElementById('buraco0').addEventListener('click', martelada);                /**acertar o buraco pode ou não contar um ponto */
    document.getElementById('buraco1').addEventListener('click', martelada);
    document.getElementById('buraco2').addEventListener('click', martelada);
    document.getElementById('buraco3').addEventListener('click', martelada);
    document.getElementById('buraco4').addEventListener('click', martelada);
}

function start() {                                      /**Inicia uma função sem entrada de parâmetros */
    var botao = document.getElementById('start');       /**Associa o elemento HTML do botão start com a variável botao. */

    botao.removeEventListener('click', start)           /**Remove o evento do botão para que o jogo não seja inicializado várias vezes. */
    botao.disable = true;
    sobeToupeira();
}

function sobeToupeira() {
    var buraco = Math.floor(Math.random()*5);                       /**Randomiza um número de 0 até 4.99, e o método .floor truca o valor para um inteiro. */
    var objBuraco = document.getElementById('buraco' + buraco);     /**Associa a variável objBuraco com o elemento HTML cujo id seja o resultado da expressão 'buraco' + buraco*/
    objBuraco.src = '../images/hole-mole.png';                      /**Troca a imagem do buraco para um com a toupeira */
    timer = setTimeout(tiraToupeira, janela, objBuraco);            /**Adiciona um timer para ativar a função tiraToupeira, o tempo é dado na variável janela, e o parâmetro enviado é o objBuraco */
    setTimeout(sobeToupeira, intervalo);                            /**Determina o tempo de reativação da função sobeToupeira, de acordo com o tempo da variável intervalo */
}

function tiraToupeira(objBuraco) {
    objBuraco.src = '../images/hole.png';                           /**Retorna a imagem do buraco vazio */
    perdidos++;                                                     /**Soma 1 no contador de toupeiras perdidas */
    mostraPontuacao();                                              /**Atualiza o placar do jogo */
}

function mostraPontuacao() {
    mostraPontuacaoDe('acertos', acertos);                          
    mostraPontuacaoDe('perdidos', perdidos);
    mostraPontuacaoDe('errados', errados);
    mostraPontuacaoDe('saldo', Math.max(acertos - perdidos - errados, 0));      /**Compara o resultado da conta da esquerda com 0. O maior é exibido. */
}

function mostraPontuacaoDe(display, valor) {
    //Pega imagem.
    let objCentena = document.getElementById('display').firstChild;
    let objDezena = objCentena.nextSibling;
    let ObjUnidade = objDezena.nextSibling;

    // Calcula Valor a ser exibido no placar
    let centena = parseInt(valor/100);
    let dezena = parseInt((valor%10)/10);
    let unidade = valor%10;

    //Muda imagem na tela:
    objCentena.src = '../images/caractere_' + centena + '.gif';
    objCentena.alt = centena;
    objDezena.src = '../images/caractere_' + dezena + '.gif';
    objDezena.alt = dezena;
    ObjUnidade.src = '../images/caractere_' + unidade + '.gif';
    ObjUnidade.alt = unidade;
}

function marteloBaixo() {
    document.getElementById('idGramado').style.cursor = 'url(../images/hammerDown.png)', default;
}

function marteloCima() {
    document.getElementById('idGramado').style.cursor = 'url(../images/hammer.png)', default;
}

function martelada(evento) {            /**O evento é o 'click', ele foi definido lá no começo, dentro do atributo onload. */
    //Em caso de acerto:
    if(evento.target.src.includes('hole-mole')) {
        acertos++;
        evento.target.src = '../images/hole.png'
        clearTimeout(timer);
    }

    //Em caso de erro:
    else {
        errados++;
    }
    mostraPontuacao();
}
