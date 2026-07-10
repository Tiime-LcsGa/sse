<template>
    <div class="card" role="listitem">
        <slot />
    </div>
</template>

<style scoped>
.card {
    --highlight: var(--color-important);
    display: inline grid;
    justify-items: center;
    align-content: start;
    border-radius: 1rem;
    padding: .5rem 1rem;
    text-align: center;
    background: color-mix(in oklab, var(--highlight), light-dark(white, #121212) 85%);

    > :deep(:is(h1, h2, h3, h4, h5, h6)) {
        color: var(--highlight);
    }
}
</style>