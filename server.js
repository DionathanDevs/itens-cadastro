import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import VendaMensal from "./VendaMensal.js";

//stamos usando path e fileURLToPath porque, com type: "module" no package.json, o Node.js não oferece suporte direto a __dirname e __filename como em CommonJS. Por isso, precisamos recriá-los manualmente.
import path from "path";
import { fileURLToPath } from "url";
//essa linha converte o caminho do módulo ES (import.meta.url) para um caminho de arquivo compatível com o sistema (por exemplo, no formato /caminho/para/o/arquivo.js).
const __filename = fileURLToPath(import.meta.url);
//aqui extraímos apenas o diretório (a pasta) onde está o arquivo atual, simulando o __dirname que o CommonJS forneceria automaticamente.
const __dirname = path.dirname(__filename);

dotenv.config();

const app = express();

const PORT = 3000;

app.use(express.json());

//essa linha diz ao Express para servir arquivos estáticos (HTML, CSS, JS, imagens) da pasta public. Ou seja, quando alguém acessa http://localhost:3000, o servidor vai procurar um index.html dentro da pasta public.
app.use(express.static(path.join(__dirname, "public")));

const connectDB = async () => {

    try{
        await mongoose.connect(process.env.MONGO_URI)
        console.log('Conectado ao Banco de Dados')
    }catch(error){
        console.error("Deu erro ao conectar com o banco: " + error)
    }
   
}

connectDB();

//Criando - Create
app.post("/vendas", async (req,res) => {
    try{
    const novaVendaMensal = await VendaMensal.create(req.body);
    res.json(novaVendaMensal)
    }catch(error){
        res.send({error: error})
    }
});

//GET - BUSCANDO

app.get("/vendas", async (req, res)=>{
    try{
        const vendasMensais = await VendaMensal.find()
        res.json(vendasMensais)
    }catch(error){
        res.json({error: error});
    }
})

//PUT - Atualizando

app.put("/vendas/:id", async (req,res)=>{
    try{
        const atualizarVenda = await VendaMensal.findByIdAndUpdate(
            req.params.id, 
            req.body, 
            { new: true }
        );
        res.json(atualizarVenda)
    }catch(error){
        res.json({error: error});
    }
});

//Deletar 


app.delete("/vendas/:id", async (req, res) => {
    try{
        const deletarVenda = await VendaMensal.findByIdAndDelete(
        req.params.id,
        req.body,
        {new : true}
        
    );
    res.json(deletarVenda)
}catch(error){
    res.json({error : error});
}
});
   

app.listen(PORT, () => console.log(`Server rodando: ${PORT}`))