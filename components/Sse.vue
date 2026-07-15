<script setup lang="ts">
import { useDateFormat, useNow, useRefHistory } from "@vueuse/core";
import { computed } from "vue";
import Logs from "./Logs.vue";
import { provideServer } from "./server.ts";
import Server from "./Server.vue";

const { counter } = provideServer();
const { history } = useRefHistory(counter);
const counterHistory = computed(() =>
  history.value
    .map(({ snapshot, timestamp }) => ({
      value: snapshot,
      time: useDateFormat(timestamp, "HH:mm:ss").value,
    }))
    .slice(0, -1)
    .toReversed(),
);

const skiped = computed(() => (counter.value === 0 ? null : counter.value));

const { now, pause } = useNow({ controls: true });
pause();
const time = useDateFormat(now, "HH:mm:ss");
</script>

<template>
  <div role="group">
    <section class="card -basic">
      <hgroup>
        <h2>Client - <span aria-hidden="true">⚡</span> SSE</h2>
        <p>Connexion ouverte en continu</p>
      </hgroup>

      <output>
        Donnée reçue : <span class="value -numeric">{{ skiped }}</span>
      </output>

      <Logs>
        <div class="-info">
          <time :datetime="time">[{{ time }}]</time> GET /api/stream -> Accept: text/event-stream
        </div>

        <div>
          <time :datetime="time">[{{ time }}]</time> Connexion persistante établie. En attente...
        </div>

        <ol>
          <li class="-success" v-for="({ value, time }, index) in counterHistory" :key="index">
            <time :datetime="time">[{{ time }}]</time> Event reçu : {{ value }}
          </li>
        </ol>
      </Logs>
    </section>

    <Server />
  </div>
</template>
