// armazenando os elementos da pagina index.

const form = document.getElementById('form')
const inputItem = document.getElementById('item')
const inputValor = document.getElementById('valor')

// adicionando um evento no botão submit com uma função assincrona, o parametro é passado automaticamente pelo js, depois disso o prevent default impede o comportamento padrão do evento, ou seja o recagarremento da página após envio, tudo dentro da função só é executado após o submit
form.addEventListener("submit", async (e) => {
e.preventDefault();

//armazenando os valores dos inputs, limpando os espaços em branco no inicio e no fim.
const item = inputItem.value.trim();
const valor = inputValor.value.trim();

//validando o preenchimento do input, verdadeiro se preenchido, falso se não preenchido.
function validarItem(){
    return item != '';
 
}
function validarValor(){
    return valor != '';
}

//try para tratar as condicionais, evitando o código para por algum erro
try{
//se a condicional for falsa, retorna no console para testes.
if(!validarItem()){
    console.log("Preencha o item!")
    inputItem.value = '';
    return;
}else if(!validarValor()){
//se a condicional for falsa, retorna no console para testes.
    console.log("Preencha o valor!")
    inputValor.value = '';
    return;
}else{
    console.log("Itens preenchidos!")
}
}catch(error){
    console.log(error)
}

const dadosEnvio = {
    item: item,
    valor: valor
}

try{

const response = await fetch("http://localhost:3000/vendas", {
    method: "POST",
    headers: {
      "Content-Type": "application/json" // diz que estamos enviando JSON
    },
    body: JSON.stringify(dadosEnvio)
})

const data = await response.json()
console.log("Resposta da API:", data)

inputItem.value = '';
inputValor.value = '';

}catch(error){
    console.log({error: error})
}

});

