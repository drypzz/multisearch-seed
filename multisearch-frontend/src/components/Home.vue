<template>
    
    <div class="search-container">

        <div class="logo">
            <img src="@/assets/logo.png" alt="Logo" />
        </div>

        <div class="search-bar">
            <div class="input-wrapper">
                <input name="search" v-model="query" placeholder="Digite para buscar..." />
                <button name="searchBtn" @click="search">🔍</button>
            </div>
        </div>

        <div class="results">
            <h3 v-if="results.length">Foram encontrados {{ results.length }} resultados:</h3>
        </div>

        <CategoryList :categories="allCategories" />
    </div>
    
</template>

<script>
    import axios from "axios";
    import CategoryList from "./CategoryList.vue";

    export default {
        components: { CategoryList },
        data() {
            return { // Retorna os dados
                query: "", // Query de busca
                results: [], // Resultados da busca
                categories: [ // Categorias e suas ordem de exibição
                    "Pedidos de Venda",
                    "Pedidos de Compra",
                    "Produtos",
                    "Equipamentos",
                    "Mão de Obra"
                ],
            };
        },

        computed: {
            groupedResults() { // Agrupa os resultados por categoria
                return this.results.reduce((acc, item) => {
                    if (!acc[item.category]) acc[item.category] = []; // Se não existir a categoria, cria um array vazio

                    acc[item.category].push(item); // Adiciona o item na categoria

                    return acc;
                }, {});
            },
            allCategories() { // Retorna todas as categorias
                return this.categories.reduce((acc, category) => {
                    acc[category] = this.groupedResults[category] || []; // Se não existir a categoria, retorna um array vazio

                    return acc;
                }, {});
            },
        },

        methods: {
            async search() {
                if (this.query.trim() === "") return; // Se a query estiver vazia, retorna

                try {
                    const response = await axios.get(`http://localhost:5000/search?q=${this.query}`); // Faz a requisição para a API

                    this.results = Array.isArray(response.data.results) ? response.data.results : []; // Garante que seja um array
                } catch (error) {
                    console.error("Erro ao buscar:", error);
                    this.results = []; // Em caso de erro, mantém um array vazio
                }
            }
        },
    };
</script>

<style>
    .search-container {
        max-width: 600px;
        margin: 0 auto;
        padding: 20px;
        font-family: Arial, sans-serif;
    }

    .logo {
        text-align: center;
    }

    .search-bar {
        width: 100%;
    }

    .results{
        margin: 10px 0;
        width: 100%;
    }

    .results h3 {
        font-size: .9rem;
        font-weight: normal;
        color: gray;
    }

    .input-wrapper {
        display: flex;
        width: 100%;
        overflow: hidden;
    }

    .input-wrapper input {
        flex: 1;
        padding: 12px;
        border: 1px solid #ccc;
        border-right: none;
        font-size: 1rem;
        outline: none;
    }

    .input-wrapper button {
        background-color: #d7d7d7;
        color: white;
        border: 1px solid #ccc;
        padding: 12px 15px;
        cursor: pointer;
        transition: all 300ms ease-in-out;
    }

    .input-wrapper button:hover {
        opacity: .7;
    }

    /* Categorias */
    .category {
        width: 500px;
        border: 1px solid #ccc;
        margin-top: 15px;
        height: 120px;
        /* border-radius: 10px; */
        background: #f9f9f9;
        box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.1);
    }

    .category-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        border-bottom: 1px solid #ccc;
        padding: 10px;
    }

    .category-header span{
        color: gray;
        font-size: .9rem;
    }

    strong {
        text-decoration: underline;
        color: red;
    }

    /* Lista de itens */
    .items {
        max-height: 77px;
        overflow-y: auto;
    }

    .items::-webkit-scrollbar {
        width: 5px;
    }

    .items::-webkit-scrollbar-thumb {
        background: #ccc;
        /* border-radius: 5px; */
    }

    .items::-webkit-scrollbar-track {
        background: transparent;
    }

    ul {
        width: 100%;
        list-style-type: none;
        padding: 10px;
        display: flex;
        flex-direction: column;
        gap: 20px;
    }

    .item {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding-bottom: 5px;
        border-bottom: 1px solid rgba(204, 204, 204, .3);
    }

    .item div {
        flex: 1;
        text-align: center;
    }

    .item-id {
        text-align: left;
    }

    .item-quantity {
        text-align: right;
    }

    /* Caso não tenha resultados */
    .no-results {
        color: #888;
        font-style: italic;
        text-align: center;
    }

    /* Responsividade */
    @media (max-width: 960px) {
        .search-container {
            width: 90%;
            padding: 0px 10px 10px 0px;
        }

        input {
            width: 100%;
        }

        .category {
            width: 100%;
        }
    }
</style>
