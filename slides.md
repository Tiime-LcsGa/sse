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

## L'objectif final du polling et du SSE : La mise à jour instantannée

Recevoir l'information au moment précis où la donnée change

---
layout: two-cols-header
---

## Le polling <span style="color: var(--color-important)">Traditionnel</span>

<br/>

::left::
### <span style="color: var(--color-important)">"Est-ce qu'on est arrivés ?"</span>

<br/>

<v-clicks>

- Requête HTTP toutes les N secondes
- Le serveur répond souvent : "pas de changement"
  
</v-clicks>

::right::
[image explicative du polling ]

---

## Le polling est <span style="color: var(--color-important)">inefficae</span>

<br/>

<CardList>
  <Card>
    <Network />
    <h3>Surchage</h3>
    <p>Trop d'appels réseau pour rien.</p>
  </Card>

  <Card>
    <h3>Latence</h3>
    <p>Si la data change à T+1s et que l'appel est à T+3s, on attend 2s pour rien.</p>
  </Card>

  <Card>
    <h3>Énergie</h3>
    <p>Consomme des ressources côté client et serveur.</p>
  </Card>
</CardList>