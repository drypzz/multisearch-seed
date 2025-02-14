<template>
    <li class="item">
        <div class="item-id">
            <strong>#{{ item.id }}</strong>
        </div>
        <div class="item-name">
            <span>{{ item.name }}</span>
        </div>
        <div v-if="item.quantity >= 1" class="item-quantity">
            <span>Qtd: {{ item.quantity }} pç</span>
        </div>
        <div v-if="item.shift" class="item-quantity">
            <span>{{ item.shift }}</span>
        </div>
    </li>
</template>

<script>
    export default {
        props: {
            item: Object, // Recebe um objeto com as propriedades id, name, quantity e turno
        },
    };
</script>