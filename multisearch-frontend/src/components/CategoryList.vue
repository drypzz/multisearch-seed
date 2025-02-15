<template>

    <div v-for="(e, category) in categories" :key="category" :style="{height: (e.length >= 1 ? '150px' : '90px')}" class="category">
        
        <div class="category-header">
            <div>
                <h4>{{ category }}</h4>
            </div>
            <div>
                <span>({{ e.length || "nenhum" }} item encontrado)</span>
            </div>
        </div>

        <div :style="{maxHeight: (e.length >= 1 ? '109px' : 'auto')}" class="items" >
            <ul>
                <CategoryItem v-for="item in e" :key="item.id" :item="item" />
                <li v-if="e.length === 0" class="no-results">Nenhum item encontrado.</li>
            </ul>
        </div>
        
    </div>
    
</template>

<script>
    import CategoryItem from "./CategoryItem.vue";

    export default {
        components: { CategoryItem }, // Importa o componente CategoryItem
        props: {
            categories: Object, // Recebe um objeto agrupado por categorias
        },
    };
</script>