import React,{useState} from "react";
import Api from "./Api";
import './App.css'
import {FiSearch} from 'react-icons/fi'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function App() {
  const[cep,setcep] = useState('');
  const[dados,setdados] = useState({});




    async function loadingcep(e){

      if(cep === ''){
        toast.error('O campo precisa ser preenchido')
      }
      try{
        e.preventDefault()      
        const url = cep + '/json/'
        const resposta = await Api.get(url)
        console.log(resposta.data)
        setdados(resposta.data)
       
      }
      catch{
        toast.error('ops, Algo deu errado')
      }
    
    }


  return (


    <div className="App">
        <ToastContainer />
      <h1>BUSCADOR DE CEP</h1>
      <div className="container">
       <form onSubmit={loadingcep}>
        <input type='text' placeholder="Digite o cep ex: 212454548" onChange={(e)=>setcep(e.target.value)}/>
        <button type="submit"><FiSearch size={25} color="white"/></button>
        </form>

        
      </div>
      
     {
      Object.keys(dados).length > 0 &&(
        <main className="main">
        <h1>CEP: {dados.cep}</h1>
        <span><b>Logradouro:</b> {dados.logradouro}</span>
        <span><b>Bairro:</b> {dados.bairro}</span>
        <span><b>Cidade:</b> {dados.localidade}</span>
        <span><b>UF:</b> {dados.uf}</span>
      </main>
    
      )
     }
  

     
    
    
  
   
    </div> 
  );
}

export default App;
