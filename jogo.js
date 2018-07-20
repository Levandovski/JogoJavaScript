var timerId=null;//Variavel que armazena a chamada da funcao timeout

function inicia_jogo(){
	var url=window.location.search;//Pegando a query string da url, lembrando se tirar o search ele trás toda url.
	var nivel_jogo=url.replace("?","");//A funcao replace tira o caracter que eu especificar nas primeiras aspas.
    var tempo_segundos=0;
	if(nivel_jogo==1){//1 Fácil->120 segundos
       tempo_segundos=120;
	}
    if(nivel_jogo==2){//2 Normal->60 segundos
       tempo_segundos=60;
    }
	if(nivel_jogo==3){//3 Dificil-> 30 segundos
       tempo_segundos=30;
	}
	//Inserindo segundos no span
	document.getElementById('cronometro').innerHTML=tempo_segundos;//innerHTML coloca o conteudo dentro da tag
    //quantidade de balões
    var qtde_baloes=80;
    cria_baloes(qtde_baloes);
    //Imprimir qtd baloes inteiros
    document.getElementById('baloes_inteiros').innerHTML=qtde_baloes;
    document.getElementById('baloes_estourados').innerHTML=0;
    contagem_tempo(tempo_segundos+1);
}

function contagem_tempo(segundos){
	segundos=segundos-1;
	if(segundos==-1){
		clearTimeout(timerId);//Estamos parando a execuçao da funcao setTimeout
		gamer_over();
		return false;
	}
	document.getElementById('cronometro').innerHTML=segundos;
    timerId=setTimeout("contagem_tempo("+segundos+")",1000);//Funcao timeout é recursiva, ou seja, é executada a cada milisegundos
    
}
function gamer_over(){
	alert("Fim de Jogo você não conseguiu estourar todos os balões a tempo");
	window.location.href="index.html";
}

function cria_baloes(qtde_baloes){
    for(var i = 1; i <=qtde_baloes; i++){
    	var balao=document.createElement("img");//Com essa função createElement consiguimos criar uma tag dentro da nossa pagina
        balao.src='imagens/balao_azul_pequeno.png';//O src é o atributo da tag 
        balao.style.margin="10px";
        balao.id="b"+i;
        balao.onclick=function(){ estourar(this);};/*Passando a propria funcao com o próprio elemtno*/
        document.getElementById('cenario').appendChild(balao);
        /*Vai criar a tag dentro da div (tag imagem), e ela é parente da div, ou seja, os elementos
        não se sobrescreveram. Assim as tags imagens que serão criadas são filhas da div. Tudo isso
        é através da função appendChild

        */   
    }
}

function estourar(e){

	var id_balao=e.id;//pegamos o elemento passado da função anterior dentro do onclick
	document.getElementById(id_balao).setAttribute("onclick","");//SetAttribute serve para pegarmos um atributo da tag e passar um parametro para ele.
	document.getElementById(id_balao).src="imagens/balao_azul_pequeno_estourado.png";
	pontuacao(-1);
}
function pontuacao(acao){
    var baloes_inteiros=document.getElementById('baloes_inteiros').innerHTML;
    var baloes_estourados=document.getElementById('baloes_estourados').innerHTML;
    baloes_inteiros=parseInt(baloes_inteiros);
    baloes_estourados=parseInt(baloes_estourados);
    baloes_inteiros=baloes_inteiros+acao;
    baloes_estourados=baloes_estourados-acao;
    document.getElementById('baloes_inteiros').innerHTML=baloes_inteiros;
    document.getElementById('baloes_estourados').innerHTML=baloes_estourados;
    situacao_jogo(baloes_inteiros);
}

function situacao_jogo(bi){
     if(bi==0){
     	alert("Parabéns Você ganhou");
     	parar_jogo();
     	window.location.href="index.html";

     }
}

function parar_jogo(){
	clearTimeout(timerId);
}