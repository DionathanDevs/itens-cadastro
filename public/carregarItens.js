export async function carregarItens(){
    try{
        const response = await fetch("http://localhost:3000/vendas");
        if(!response.ok) throw new Error("Erro ao buscar itens!");

        const itens = await response.json();

        const tbody = document.getElementById("table-body")

        tbody.innerHTML = '';

        if(itens.length === 0){

        const tr = document.createElement("tr")
        const td = document.createElement("td")
        td.setAttribute("colspan", "3")
        td.classList.add("text-center", "fst-italic", "text-muted");
        td.textContent = "Nenhum item cadastrado ainda!"

        tr.appendChild(td)
        tbody.append(tr)
        return;
     }

    //     <tr>
    //   <th scope="row">1</th>
    //   <td>Mark</td>
    //   <td>Otto</td>

    // </tr>

    itens.forEach((item, index) =>{
        const tr = document.createElement("tr")

        const th = document.createElement("th")
        
        th.setAttribute("scope", "row")
        
        th.textContent = index + 1;

        const tdItem = document.createElement("td")

        tdItem.textContent = item.item;

        const tdValor = document.createElement("td")

        tdValor.textContent = item.valor;

    

        tr.appendChild(th)
        tr.appendChild(tdItem)
        tr.appendChild(tdValor)

        tbody.appendChild(tr)
    });
    }catch(error){
        console.error("Erro ao carregar itens: ", error)
    }
    
}
//chamar a funcao quando a página recarregar
carregarItens()

window.addEventListener("DOMContentLoaded", carregarItens)