# Certificate Personalization

Générateur et personnalisateur de certificats, diplômes et attestations de compétences — avec prévisualisation en direct, registre d'authenticité et export PDF haute résolution.

Application web statique (React + Vite + TypeScript) : tout s'exécute dans le navigateur, aucune donnée n'est envoyée à un serveur en dehors de l'appel optionnel à l'API Gemini.

---

## Fonctionnalités

| Fonction | Détail |
| --- | --- |
| **Éditeur double mode** | Mode *simple* (champs essentiels) et mode *avancé* (contrôle complet de la mise en page) |
| **Prévisualisation en direct** | Le certificat se met à jour à chaque modification, avec zoom et plein écran |
| **Signatures** | Pad de signature manuscrite pour chaque signataire |
| **Sceau et filigrane** | Composant de sceau vectoriel et filigrane anti-copie |
| **QR code de vérification** | Chaque certificat porte un identifiant et une URL de vérification |
| **Registre d'authenticité** | Modale de vérification d'un certificat par son identifiant |
| **Génération par lot** | Production de plusieurs certificats d'un coup |
| **Export** | PDF haute résolution (jsPDF), PNG (html2canvas) et impression directe |
| **Préréglages** | Modèles prêts à l'emploi et réinitialisation en un clic |
| **Persistance locale** | L'état de travail est conservé dans `localStorage` |

## Stack technique

- **React 19** + **TypeScript**
- **Vite** — build et serveur de développement
- **Tailwind CSS 4**
- **jsPDF** + **html2canvas** — export PDF et PNG
- **motion** — animations
- **lucide-react** — icônes
- **@google/genai** — intégration Gemini optionnelle

## Démarrage

Prérequis : **Node.js 20+**.

```bash
npm install
npm run dev
```

L'application est servie sur `http://localhost:3000`.

### Scripts

| Commande | Rôle |
| --- | --- |
| `npm run dev` | Serveur de développement (port 3000) |
| `npm run build` | Build de production |
| `npm run preview` | Prévisualisation du build |
| `npm run lint` | Vérification TypeScript (`tsc --noEmit`) |

## Configuration

Copiez `.env.example` vers `.env` et renseignez :

| Variable | Rôle |
| --- | --- |
| `GEMINI_API_KEY` | Clé API Google Gemini — utilisée uniquement pour les fonctions d'assistance IA |
| `APP_URL` | URL publique de l'application (liens auto-référents, callbacks) |

Sans `GEMINI_API_KEY`, l'application reste pleinement utilisable : seules les fonctions IA optionnelles sont désactivées.

## Structure du projet

```text
Certificate-personalization/
├── src/
│   ├── App.tsx                      # Composant racine et état global
│   ├── components/
│   │   ├── CertificatePreview.tsx   # Rendu du certificat
│   │   ├── SimpleEditor.tsx         # Éditeur simplifié
│   │   ├── EditorPanel.tsx          # Éditeur avancé
│   │   ├── CertificateSeal.tsx      # Sceau vectoriel
│   │   ├── SignatureDisplay.tsx     # Affichage des signatures
│   │   ├── SignaturePadModal.tsx    # Pad de signature
│   │   ├── BatchGeneratorModal.tsx  # Génération par lot
│   │   ├── VerificationModal.tsx    # Vérification d'authenticité
│   │   └── logos/                   # Logos vectoriels
│   ├── data/presets.ts              # Données et modèles par défaut
│   ├── utils/exportUtils.ts         # Export PDF / PNG / impression
│   └── types.ts                     # Types partagés
├── index.html
├── metadata.json                    # Métadonnées de l'applet
└── package.json
```

## Licence

MIT — voir [LICENSE](./LICENSE).
