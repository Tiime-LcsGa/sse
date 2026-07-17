---
kicker: 'SSE : HTTP/1.1 - 2015'
title: Server-Sent Events
subtitle: 'Ne demandez plus, écoutez : le temps réel sans le fardeau du polling.'
theme: slidev-theme-tahta
themeConfig: { variant: atelier }
highlighter: shiki
drawings:
  persist: false
transition: slide-left
---

---
layout: feature
title: Les besoins
features:
  - { icon: lucide:scan-face, title: Attente d'une validation externe (2FA), desc: Bloquer l'écran desktop jusqu'à ce que l'utilisateur confirme sa tentative de connexion depuis son application mobile }
  - { icon: lucide:refresh-ccw, title: Synchronisation de parcours (Stepper), desc: "Faire avancer visuellement les étapes d'un formulaire en temps réel, même quand l'action est réalisée sur un autre appareil (ex : Fourthline)" }
---

---
layout: section
kicker: Le problème
title: Le polling
subtitle: Des requêtes à intervalle de temps régulier
---

---
title: Le Polling
---

<Polling />

---
layout: feature
title: Le polling est inefficace
features: 
  - { icon: lucide:trash, title: Gaspillage, desc: Requêtes "à vide" en continu qui consomment la bande passante inutilement }
  - { icon: lucide:hourglass, title: Latence, desc: L'information n'est jamais instantanée. On subit l'intervalle d'attente entre deux requêtes }
  - { icon: lucide:server-crash, title: Saturation, desc: Le serveur s'épuise à répondre "rien de nouveau" simultanément à tous les clients }
---

---
layout: section
kicker: La solution
title: 'Les SSE'
subtitle: 'Un abonnement unidirectionnel efficace'
---

---
title: Les SSE
---

<Sse />

---
layout: feature
title: Les avantages des SSE
features:
  - { icon: lucide:zap, title: Instantané, desc: Le serveur "pousse" l'information instantanément dès qu'elle est prête. Zéro délai d'attente }
  - { icon: lucide:link, title: Connexion unique, desc: Une seule requête HTTP est maintenue ouverte. Fini le gaspillage des appels réseau répétitifs }
---

---
layout: feature
title: L'inconvénient des SSE
features:
  - { icon: lucide:puzzle, title: État initial, desc: Nécessite souvent un appel HTTP "GET" classique pour récupérer la donnée de départ avant d'écouter le flux d'événements }
---

---
layout: code
title: L'implémentation native
---

````md magic-move
```ts
const source = new EventSource('/sse');
```

```ts
const source = new EventSource('/sse');

source.onmessage = (event) => {
  const data = JSON.parse(event.data);
  console.log(data);
};
```

```ts
const source = new EventSource('/sse');

source.onmessage = (event) => {
  const data = JSON.parse(event.data);
  console.log(data);
};

source.onerror = (error) => console.error(error);
```

```ts
const source = new EventSource('/sse');

source.onmessage = (event) => {
  const data = JSON.parse(event.data);
  console.log(data);
};

source.onerror = (error) => console.error(error);

...

source.close();
```
````

---
layout: code
title: L'implémentation native - Surcouche réactive
comark: true
---

````md magic-move
```ts
const source = new EventSource('/sse');  
```

```ts
fromSse('/sse').subscribe(console.log);
```

```ts
function fromSse<T>(url: string) {
  return new Observable<T>((subscriber) => {
    ...
  });
}

fromSse('/sse').subscribe(console.log);
```

```ts
function fromSse<T>(url: string) {
  return new Observable<T>((subscriber) => {
    const source = new EventSource(url);
  });
}

fromSse('/sse').subscribe(console.log);
```

```ts
function fromSse<T>(url: string) {
  return new Observable<T>((subscriber) => {
    const source = new EventSource(url);

    source.onmessage = (event) => {
      const data = JSON.parse(event.data);
      subscriber.next(data);
    };
  });
}

fromSse('/sse').subscribe(console.log);
```

```ts
function fromSse<T>(url: string) {
  return new Observable<T>((subscriber) => {
    const source = new EventSource(url);

    source.onmessage = (event) => {
      const data = JSON.parse(event.data);
      subscriber.next(data);
    };

    source.onerror = (error) => subscriber.error(error);
  });
}

fromSse('/sse').subscribe(console.log);
```

```ts
function fromSse<T>(url: string) {
  return new Observable<T>((subscriber) => {
    const source = new EventSource(url);

    source.onmessage = (event) => {
      const data = JSON.parse(event.data);
      subscriber.next(data);
    };

    source.onerror = (error) => subscriber.error(error);

    return () => source.close();
  });
}

fromSse('/sse').subscribe(console.log);
```
````

---
layout: section
title: PHP - Mercure
---

---
layout: feature
title: Pourquoi Mercure ?
features:
  - { icon: lucide:server-crash, title: Décharge le serveur, desc: PHP n'est pas fait pour maintenir des milliers de connexions ouvertes. Le "Hub" Mercure s'en occupe en externe ; PHP ne fait que lui pousser les mises à jour }
  - { icon: lucide:shield-user, title: Sécurité native, desc: Gère les droits d'accès directement via des tokens JWT. Contrôle de manière standardisée qui a le droit d'écouter quels événements privés }    
  - { icon: lucide:rocket, title: Prêt à l'emploi, desc: Natif sous Symfony. Quelques lignes de code suffisent pour publier un événement sans configurer d'infrastructure complexe }
---

---
layout: feature
title: Angular + Mercure = SseClient (maison)
features:
  - { icon: lucide:network, title: Intégration native, desc: "Conçu pour la DI Angular" }
  - { icon: lucide:pencil-ruler, title: API familière, desc: Approche push-based intuitive qui reprend les codes d'HttpClient }
  - { icon: lucide:rotate-3d, title: Support des Intercepteurs, desc: "Permet notamment l'ajout de headers, impossible avec l'EventSource natif" }
  - { icon: lucide:blocks, title: Évolutif, desc: "Architecture calquée sur le standard Angular" }
---

---
layout: code
title: SseClient - Configuration
---

```ts twoslash
// @noErrors
import { provideSseClient, withInterceptors } from '@angular-extension/common/sse';

// ---cut-start---
type ApplicationConfig = { providers: Provider[] }

/** {@link https://github.com/ManakinCubber/tiime-desk-web/blob/develop/libs/angular-extension/common/src/sse/provider.ts#L8-L15} */
declare function provideSseClient(...features: SseFeature<SseFeatureKind>[]): EnvironmentProviders

/** {@link https://github.com/ManakinCubber/tiime-desk-web/blob/develop/libs/angular-extension/common/src/sse/interceptor.ts#L53-L62} */
declare function withSseInterceptors(interceptorFns: SseInterceptorFn[]): SseFeature<SseFeatureKind.Interceptors>

/** {@link https://github.com/ManakinCubber/tiime-desk-web/blob/develop/libs/core/src/mercure/redirect-sse-request-interceptor.ts} */
declare function redirectSseRequestInterceptor(topicPrefix?: string): SseInterceptorFn;

/** {@link https://github.com/ManakinCubber/tiime-desk-web/blob/develop/libs/core/src/mercure/auth-interceptor.ts} */
declare const sseAuthInterceptor: SseInterceptorFn;
// ---cut-end---

export const appConfig: ApplicationConfig = {
  providers: [
    // ...
    provideSseClient(
      withSseInterceptors([
        redirectSseRequestInterceptor('forms'),
        sseAuthInterceptor,
      ])
    )
  ]
};
```

---
layout: code
title: SseClient - Utilisation
---

```ts {1,4,12-14}
import { SseClient } from '@angular-extension/common/sse';

export  function useWorkflowStore() {
  const sseClient = inject(SseClient);

  const workflow = /* ... */
  const state = /* ... */

  toObservable(workflow).pipe(
    filter(Boolean),
    switchMap(({ id }) =>
      sseClient
        .from<WorkflowState>(`sse/workflow_users/${id}/step`)
        .pipe(tap((workflowState) => /* update state with workflowState */)),
    ),
    takeUntilDestroyed(),
  ).subscribe();

  return { workflow, state, /* ... */ };
}
```

---
layout: end
title: Merci
---