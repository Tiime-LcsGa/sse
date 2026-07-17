import { inject, provide, ref, type InjectionKey } from "vue";

const SERVER = Symbol("Server") as InjectionKey<ReturnType<typeof useServer>>;

function useServer() {
  const counter = ref(0);

  return { counter };
}

export function provideServer() {
  const server = useServer();
  provide(SERVER, server);
  return server;
}

export function injectServer() {
  const server = inject(SERVER);
  if (!server) throw new Error("Server not provided");
  return server;
}
