<script setup lang="ts">
import { PlusIcon } from "@lucide/vue";
import { injectServer } from "../composables/server";

const { counter } = injectServer();
</script>

<template>
  <section class="server card -basic">
    <h2><span aria-hidden="true">🖥️</span> Server</h2>

    <output class="vertical">
      État de la donnée : <span class="value -numeric">{{ counter }}</span>
    </output>

    <button class="btn" @click="counter++"><PlusIcon aria-hidden="true" /> Increment</button>
  </section>
</template>

<style scoped>
.server {
  display: grid;
}
</style>
