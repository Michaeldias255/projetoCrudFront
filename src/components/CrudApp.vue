<template> 
    <div style="margin: 0 auto; width: 85%">

        <Toolbar>
            <template #left>
                <Button label="Novo" icon="pi pi-plus" class="p-button-success p-mr-2" @click="abrirModal" />
                <Button label="Excluir" icon="pi pi-trash" class="p-button-danger" @click="modalExcluir" />
            </template>
        </Toolbar>
        <br>
        <DataTable :value="produtos" :paginator="true" :rows="10" :selection.sync="selectProduto" dataKey="id" :filters="filters" :loading="loading">
            <Panel header="Gerenciar Produtos">
                <span class="p-input-icon-left">
                    <i class="pi pi-search" />
                    <InputText v-model="filters['global']" placeholder="Nome do Produto..." />
                </span>
            </Panel>

            <Column selectionMode="multiple" headerStyle="width: 3em" ></Column>
            <Column field="codigo" header="Codigo" sortable></Column>
            <Column field="nome" header="Nome" sortable></Column>
            <Column field="preco" header="Preco" sortable></Column>
            <Column field="categoria" header="Categoria" sortable></Column>
            <Column field="status" header="Status" sortable></Column>
            <Column>
                <template #body>
                    <Button icon="pi pi-pencil" class="p-button-rounded p-button-success" @click="show" />
                    <Button icon="pi pi-trash" class="p-button-rounded p-button-warning" @click="modalExcluir" />
                </template>
            </Column>
                <template #body="slotProps">
                    {{formatCurrency(slotProps.data.price)}}
                </template>
        </DataTable>

        <Dialog 
            header="Detalhe do Produto" 
            :visible.sync="dysplayModal" 
            :style= "{width: '30vw'}" 
            :modal="true">

            <h5>Nome</h5>
            <span class="p-float-label">
                <InputText id="nome" type="text" v-model="produto.nome" />
                <label for="nome">Nome</label>
            </span>
            <br>
            <h5>Codigo</h5>
            <span class="p-float-label">
                <InputText id="codigo" type="text" v-model="produto.codigo" />
                <label for="codigo">Codigo</label>
            </span>
            <br>
            <h5>Status</h5>
            <span class="p-float-label">
                <InputText id="status" type="text" v-model="produto.status" />
                <label for="status">Status</label>
            </span>
            <br>
            <h5>Categoria</h5>
            <span class="p-float-label">
                <InputText id="categoria" type="text" v-model="produto.categoria" />
                <label for="categoria">Categoria</label>
            </span>
            <br>
            <h5>Preço</h5>
            <span class="p-float-label">
                <InputText id="preco" type="text" v-model="produto.preco" />
                <label for="preco">Preco</label>
            </span>
            <template #footer>
                <Button label="Cancelar" icon="pi pi-times" @click="fecharModal" class="p-button-text"/>
                <Button label="Salvar" icon="pi pi-check" @click="store" autofocus />
            </template>
        </Dialog>

        <Dialog 
            header="Detalhe do Produto" 
            :visible.sync="modalUpdate" 
            :style= "{width: '30vw'}" 
            :modal="true">

            <h5>Nome</h5>
            <span class="p-float-label">
                <InputText id="nome" type="text" v-model="produto.nome" />
                <label for="nome">Nome</label>
            </span>
            <br>
            <h5>Codigo</h5>
            <span class="p-float-label">
                <InputText id="codigo" type="text" v-model="produto.codigo" />
                <label for="codigo">Codigo</label>
            </span>
            <br>
            <h5>Status</h5>
            <span class="p-float-label">
                <InputText id="status" type="text" v-model="produto.status" />
                <label for="status">Status</label>
            </span>
            <br>
            <h5>Categoria</h5>
            <span class="p-float-label">
                <InputText id="categoria" type="text" v-model="produto.categoria" />
                <label for="categoria">Categoria</label>
            </span>
            <br>
            <h5>Preço</h5>
            <span class="p-float-label">
                <InputText id="preco" type="text" v-model="produto.preco" />
                <label for="preco">Preco</label>
            </span>
            <template #footer>
                <Button label="Cancelar" icon="pi pi-times" @click="fecharModal" class="p-button-text"/>
                <Button label="Salvar" icon="pi pi-check" @click="update" autofocus />
            </template>
        </Dialog>


        <Dialog header="Confirmation" :visible.sync="displayConfirmacao" :style="{width: '350px'}" :modal="true">
            <div class="confirmation-content">
                <i class="pi pi-exclamation-triangle p-mr-3" style="font-size: 2rem" />
                <span>Você realmente deseja excluir?</span>
            </div>
            <template #footer>
                <Button label="Não" icon="pi pi-times" @click="fecharExclusao" class="p-button-text"/>
                <Button label="Sim" icon="pi pi-check" @click="destroy" class="p-button-text" autofocus />
            </template>
        </Dialog>  

    </div>   
</template>

<script>
    import ProdutoService from '../service/ProdutoService';
    export default {
    name : 'CrudApp',
    data(){
        return{
            produtos : null,
            loading : true,
            filters: {},
            modalUpdate : false,
            dysplayModal: false,
            displayConfirmacao : false,
            produto : {
                id : null,
                codigo : null,
                nome : null,
                preco : null,
                categoria : null,
                status : null
            },
            selectProduto : null,
        }
    },
    ProdutoService : null,
    created() {
        this.produtoService = new ProdutoService();
    },
    mounted(){
        this.produtoService.index().then(data => {
            this.produtos = data.data;
            console.log(this.produtos);
            this.loading = false;
        });
    },
    methods : {
        abrirModal() {
            this.dysplayModal= true;
        },
        store(){
            this.produtoService.store(this.produto).then(data => {
                if (data.status === 201) {
                    this.dysplayModal = false;
                    this.produto = {
                        codigo : null,
                        nome : null,
                        preco : null,
                        categoria : null,
                        status : null  
                    };
                    this.index();
                }
            })
        },
        fecharModal(){
            this.dysplayModal = false;
        },
        destroy(){
            this.ProdutoService.delete(this.selectProduto.id).then(data => {
                if (data.status === 200) {
                    this.displayConfirmacao = false;
                    
                }
                this.index();
            })
        },
        modalExcluir(){
            this.displayConfirmacao = true;
        },
        fecharExclusao(){
            this.displayConfirmacao = false;
        },
        formatCurrency(value) {
            return value.toLocaleString('en-US', {style: 'currency', currency: 'USD'});
        },
        show(){
            this.produto = this.selectProduto;
            this.modalUpdate = true;
        },
        update(){
            this.produtoService.put(this.selectProduto.id).then(data => {
                if (data.status === 201) {
                    this.modalUpdate = false;
                    
                }
                this.index();
            })
        }

       
    }
}
</script>

