const inputTarefa = document.querySelector('.input-tarefa');
const btnTarefa = document.querySelector('.btn-tarefa');
const tarefas = document.querySelector('.tarefas');

function criaLi(){
    const li = document.createElement('li');
    return li;
}

inputTarefa.addEventListener('keypress', function(e){
    if(e.keyCode === 13){
        if(!inputTarefa.value) return;
        criaTarefa(inputTarefa.value);
    }
})

function limpaInput(){
    inputTarefa.value = '';
    inputTarefa.focus();
}

function criaBotaoApagar(li){
    li.innerText += ' '
    const botaoApagar = document.createElement('button');
    botaoApagar.innerText = 'Apagar'
    botaoApagar.setAttribute('class', 'apagar');    //setAttribute nesse caso é uma alternativa al classList.add, mas com o setAttribute, você pode adicionar outros atributos a este elemento também.
    botaoApagar.setAttribute('title', 'Apagar esta tarefa')
    li.appendChild(botaoApagar)
}

function criaTarefa(textoInput){
    const li = criaLi();
    li.innerText = textoInput;
    tarefas.appendChild(li);
    limpaInput();
    criaBotaoApagar(li);
    salvarTarefas();
}

btnTarefa.addEventListener('click', function(e){
    if(!inputTarefa.value) return;
    criaTarefa(inputTarefa.value)
})

document.addEventListener('click', function(e){
    const el = e.target;
    if (el.classList.contains('apagar')){
        el.parentElement.remove();  //o metodo parentElement seleciona o pai do elemento el neste caso.
        salvarTarefas();
    }
})

function salvarTarefas(){
    const liTarefas = tarefas.querySelectorAll('li')
    const listaDeTarefas = [];
    liTarefas.forEach((tarefa) => {
        let tarefaTexto = tarefa.innerText.replace('Apagar', '').trim();
        //tarefaTexto.replace('Apagar', '');
        listaDeTarefas.push(tarefaTexto)
    })
    const tarefasJSON = JSON.stringify(listaDeTarefas)  //Aqui estou convertendo o array listaDeTarefas em um string JSON.
    localStorage.setItem('tarefas', tarefasJSON);   //Neste passo, estou armazenando a string (Esta função só funciona com string) em uma mini base de dados do navegador.

}

function adicionaTarefasSalvas(){
    const tarefas = localStorage.getItem('tarefas') //Aqui eu estou recuperando as tarefas salvas em localstorage.
    const listaDeTarefas = JSON.parse(tarefas)  //Convertendo uma string no formato JSON para um array

    for(let tarefa of listaDeTarefas){
        criaTarefa(tarefa);
    }
}
adicionaTarefasSalvas()