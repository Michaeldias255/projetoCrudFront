import axios from "axios";



export default class ProdutoService{
    url = "http://127.0.0.1:8000/api/produtos"

    index(){
        return axios.get(this.url);
    }

    url1 ="http://127.0.0.1:8000/api/produto"

    store(produto){
        return axios.post(this.url1, produto);
    }

    url2 = "http://127.0.0.1:8000/api/produto/{id}"

    destroy(id){
        return axios.delete(this.url2+id);
    }

    url3 = "http://127.0.0.1:8000/api/produto"

    update(id){
        return axios.put(this.url3 + id);
    }

    url4 = "http://127.0.0.1:8000/api/produto"

    show(id){
        return axios.get(this.url4 + id);
    }



}    