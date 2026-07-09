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

### Ne demandez plus, écoutez : le temps réel sans le fardeau du polling.

---

## Le polling vs les SSEs

Les deux solutions servent un même but : être notifié quand de la donnée change.

### Le polling

Le polling est la technique la plus basique qui soit et elle consiste à interroger le serveur à intervalles réguliers afin de savoir si de nouvelles données sont disponibles.

---

### Les SSEs

Les SSEs servent le même objectif mais cette fois on ouvre un flux de communication unidirectionnel entre le client et le serveur. Le serveur peut alors pousser des données vers le client dès que de nouvelles données sont disponibles.

C'est un protocole basé sur le HTTP natif et qui est parfait pour les flux de données en temps réel

---

#### Avantages des SSEs

- plus économe en bande passante qu'un polling

- utilisation du protocole HTTP, ce qui simplifie l'architecture

- gestion automatique des reconnexions en cas de coupure réseau

---

#### Inconvénients des SSEs

- limitation du nombre de connexions simultanées

- pas de bidirectionnalité