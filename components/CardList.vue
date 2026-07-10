<template>
    <div class="card-list" role="list">
        <slot />
    </div>
</template>

<style scoped>
.card-list {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    column-gap: 1rem;
}
</style>