<script setup lang="ts">
import { onSlideEnter } from "@slidev/client";
import { useDateFormat } from "@vueuse/core";
import { useObservable } from "@vueuse/rxjs";
import { scan, Subject, switchMap, timer } from "rxjs";
import { computed } from "vue";
import { provideServer } from "../composables/server";
import Logs from "./Logs.vue";
import Server from "./Server.vue";

const { counter } = provideServer();

onSlideEnter(() => start$.next());

const start$ = new Subject<void>();
const pollingDelay$ = start$.pipe(switchMap(() => timer(0, 3000)));

const requests = useObservable(
  pollingDelay$.pipe(
    scan((acc) => {
      const last = acc.at(-1);
      const changed = last?.value !== counter.value;
      return [
        ...acc,
        {
          time: useDateFormat(new Date(), "HH:mm:ss").value,
          value: counter.value,
          changed,
        },
      ];
    }, Array<{ time: string; value: number; changed: boolean }>()),
  ),
);

const currentValue = computed(() => requests.value?.at(-1)?.value ?? 0);
</script>

<template>
  <div role="group">
    <section class="card -basic">
      <hgroup>
        <h2>Client - <span aria-hidden="true">🔄</span> Polling</h2>
        <p>Fetch toutes les 3 secondes</p>
      </hgroup>

      <output aria-live="off">
        Donnée reçue : <span class="value -numeric">{{ currentValue }}</span>
      </output>

      <Logs ref="logs" class="polling-logs">
        <ol>
          <li
            v-for="({ time, value, changed }, index) in requests"
            :key="index"
            class="log"
            :class="changed || index === 0 ? '-success' : '-warn'"
          >
            <time :datetime="time">[{{ time }}]</time>
            GET /api/data -> {{ value }}
            <template v-if="index > 0">
              (<span aria-hidden="true">{{ changed ? "✅" : "⚠️" }}</span>
              {{ changed ? "Mise à jour enfin récupérée" : "Inutile, gaspillage réseau" }})
            </template>
          </li>
        </ol>
      </Logs>
    </section>

    <Server />
  </div>
</template>
