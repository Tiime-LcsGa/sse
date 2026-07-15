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
layout: section
kicker: Le problème
title: Le polling
subtitle: Des requêtes à intervalle de temps régulier
---

---
layout: diagram
title: Le Polling
---

<Polling />

<!--
- Requête HTTP toutes les N secondes
- Le serveur répond souvent : "pas de changement"
-->

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
layout: diagram
title: Les SSE
---

<Sse />

<!-- 
- S'abonner au flux
- Une seule connexion HTTP ouverte.
- Le serveur pousse les données dès qu'elles sont prêtes.
- Le Front-end attend passivement la mise à jour => on doit faire un GET pour la data initiale.
 -->

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

source.onerror = (error) => subscriber.error(error);
```

```ts
const source = new EventSource('/sse');

source.onmessage = (event) => {
  const data = JSON.parse(event.data);
  console.log(data);
};

source.onerror = (error) => subscriber.error(error);

...

source.close();
```
````

<!--
- Ultra simple à mettre en place et à l'usage.
- Limites : Pas de headers personnalisés (Auth) via l'API native.
-->

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

