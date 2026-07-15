<script setup lang="ts">
import { useMutationObserver } from "@vueuse/core";
import { useTemplateRef } from "vue";

const logs = useTemplateRef("logs");

useMutationObserver(logs, () => scrollEnd(), { childList: true, subtree: true });

async function scrollEnd() {
  logs.value?.scrollTo({ top: Number.MAX_SAFE_INTEGER, behavior: "smooth" });
}
</script>

<template>
  <div class="logs" ref="logs" role="log" aria-live="polite" aria-relevant="additions">
    <slot />
  </div>
</template>

<style scoped>
.logs {
  overflow-y: auto;
  scrollbar-gutter: stable;
  scrollbar-width: thin;
  background: var(--ink);
  padding: 8px 16px;
  border-radius: var(--radius-sm);
  border: var(--surface-border);
  block-size: 150px;

  :deep(time) {
    color: var(--fg-dim);
    font-variant-numeric: tabular-nums;
  }

  :deep(.-info) {
    color: var(--info);
  }

  :deep(.-warn) {
    color: var(--warn);
  }

  :deep(.-success) {
    color: var(--good);
  }
}
</style>
