---
highlighter: shiki
fonts:
  poppins: Poppins
  provider: google
drawings:
  persist: false
transition: slide-left
title: Server-Sent Events (SSE)
---

# Server-Sent Events (SSE)

Ne demandez plus, écoutez : le temps réel sans le fardeau du polling.

---
layout: center
---

# Le polling et les SSE : La mise à jour instantannée

Recevoir l'information au moment précis où la donnée change

---
layout: image-right
image: assets/polling.png
---

# Le polling <span style="color: var(--color-important)">Traditionnel</span>

<br/>

## <span style="color: var(--color-important)">"Il y a du nouveau ?"</span>

<br/>

<v-clicks>

- Requête HTTP toutes les N secondes
- Le serveur répond souvent : "pas de changement"
  
</v-clicks>

---

# Le polling est <span style="color: var(--color-important)">inefficae</span>

<br/>

<CardList>
  <v-clicks>
    <Card>
      <NetworkIcon />
      <h3>Surchage</h3>
      <p>Trop d'appels réseau pour rien.</p>
    </Card>
    <Card>
      <HourglassIcon />
      <h3>Latence</h3>
      <p>Si la data change à T+1s et que l'appel est à T+3s, on attend 2s pour rien.</p>
    </Card>
    <Card>
      <BatteryWarningIcon />
      <h3>Énergie</h3>
      <p>Consomme des ressources côté client et serveur.</p>
    </Card>
  </v-clicks>
</CardList>

---
layout: center
--- 

# La Solution : les  SSE

Server-Sent-Events : Un abonnement unidirectionnel efficace

---
layout: image-right
image: assets/sse.webp
---

# S'abonner au <span style="color: var(--color-important)">Flux</span>

Une seule connexion HTTP ouverte.

Le serveur pousse les données dès qu'elles sont prêtes.

<span style="color: var(--color-important)">Le Front-end attend passivement la mise à jour</span>


---

# Les avantages des <span style="color: var(--color-important)">SSE</span>

<br/>

<CardList>
  <v-clicks>
    <Card>
      <ZapIcon />
      <h3>Instantané</h3>
      <p>Zéro latence après l'évènement.</p>
    </Card>
    <Card>
      <LinkIcon />
      <h3>Connexion unique</h3>
      <p>Réduit la charge réseau drastiquement.</p>
    </Card>
    <Card>
      <CodeXmlIcon />
      <h3>Natif</h3>
      <p>Utilise le protocole HTTP standard.</p>
    </Card>
  </v-clicks>
</CardList>

---
layout: two-cols-header
---

# L'implémentation <span style="color: var(--color-important)">Native</span>

::left::

## [EventSource](https://developer.mozilla.org/en-US/docs/Web/API/EventSource)

<br/>

```ts {all|1|3,6|4,5|8|all}
const source = new EventSource('/sse');

source.onmessage = (event) => {
  const data = JSON.parse(event.data);
  console.log(data);
};

source.close();
```

