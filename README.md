# ED Collectivités — Site vitrine statique

Site institutionnel d'ED Collectivités, distributeur français de produits d'entretien éco-responsables pour les collectivités locales.

**Stack** : HTML5 + CSS3 + JavaScript vanilla. Aucun framework, aucun CMS, aucune base de données. Conçu pour être servi statiquement par n'importe quel hébergeur Apache/Nginx.

---

## Structure du projet

```
ed-collectivites-site/
├── index.html                       # Accueil
├── a-propos.html                    # À propos (avec ancre #recrutement)
├── nos-produits.html                # Produits (6 sections ancrées)
├── nos-clients.html                 # Clients (3 sections ancrées + témoignages)
├── formations-certiphyto.html       # Formations Certiphyto
├── contact.html                     # Contact + formulaire
├── mentions-legales.html            # Mentions légales
├── politique-confidentialite.html   # RGPD / cookies
├── 404.html                         # Page d'erreur
│
├── assets/
│   ├── css/styles.css               # Design system complet (1 fichier)
│   ├── js/main.js                   # Interactions (nav, scroll, form)
│   ├── img/                         # Logo, favicon, photos
│   └── fonts/                       # (vide — fonts servies via Bunny Fonts)
│
├── robots.txt                       # Directives crawlers
├── sitemap.xml                      # Sitemap moteurs
├── llms.txt                         # Sitemap pour IA (ChatGPT, Perplexity, Claude)
├── .htaccess                        # Apache config (redirections + sécurité)
└── README.md                        # Ce fichier
```

---

## Avant la mise en ligne — Check-list

### 1. Personnalisations obligatoires

- [ ] **Formspree** : créer un compte gratuit sur [formspree.io](https://formspree.io), récupérer l'ID du formulaire, remplacer `YOUR_FORM_ID` dans `contact.html` (ligne `action="https://formspree.io/f/YOUR_FORM_ID"`).
- [ ] **Mentions légales** : remplir les champs `[à compléter]` dans `mentions-legales.html` (SIRET, RCS, capital, hébergeur).
- [ ] **Date RGPD** : mettre à jour la date dans `politique-confidentialite.html`.
- [ ] **Image OG** : créer une image `assets/img/og-default.jpg` (1200×630px) pour les partages sociaux.

### 2. Remplacer les photos placeholder

Les images de démo proviennent de `picsum.photos`. Les remplacer par les **vraies photos** d'ED Collectivités (équipes, terrain, produits) — voir tableau ci-dessous.

| Page | Image actuelle | À remplacer par |
|---|---|---|
| `index.html` | `picsum.photos/seed/edcollectivites-hero/...` | Photo hero : agent en intervention, espace public français |
| `a-propos.html` | `picsum.photos/seed/edcollectivites-team/...` | Photo des équipes en réunion |
| `a-propos.html` | `picsum.photos/seed/edcollectivites-eco/...` | Photo produit éco-responsable ou geste éco |
| `nos-clients.html` (×3) | `picsum.photos/seed/edcollectivites-{mairie,comcom,syndicat}/...` | 3 photos d'illustration (mairie, équipe, agent terrain) |

Formats recommandés : **WebP** ou **AVIF**, dimensions explicites dans `width`/`height` (déjà en place).

### 3. Plan de redirections 301 (critique post-piratage)

Avant la bascule DNS, **extraire toutes les URLs de l'ancien site WordPress** et les rediriger vers les nouvelles. Ouvrir `.htaccess` section **3. REDIRECTIONS 301 LEGACY** et ajouter une ligne par ancienne URL.

Méthode :
1. Récupérer le sitemap WordPress actuel : `https://ed-collectivites.fr/sitemap.xml` (s'il est encore accessible) ou via Google Search Console (URLs indexées).
2. Mapper chaque ancienne URL vers la nouvelle.
3. Tester chaque redirection avant la mise en ligne.

Sans ce travail, 20 ans de référencement Google sont perdus à la bascule.

---

## Déploiement

### Option A — Hébergement actuel (recommandé)

1. Connecter au serveur Apache d'ED Collectivités (FTP/SFTP).
2. **Sauvegarder** l'intégralité de l'arborescence WordPress existante (au cas où).
3. **Supprimer** tout le contenu du répertoire racine (`/var/www/...` ou `/public_html`).
4. **Uploader** le contenu de `ed-collectivites-site/` à la racine.
5. Vérifier que `.htaccess` est bien présent (fichier caché, peut être filtré par certains clients FTP).
6. Tester l'accès au site dans un navigateur incognito.

### Option B — Nouvel hébergement statique (Cloudflare Pages, Netlify, etc.)

1. Initialiser un dépôt Git avec ce projet.
2. Pousser sur GitHub.
3. Connecter au service d'hébergement statique choisi.
4. Configurer le domaine `ed-collectivites.fr`.
5. Activer le SSL automatique.

---

## Performance & SEO — Vérifications post-déploiement

| Outil | URL | À vérifier |
|---|---|---|
| Google PageSpeed | [pagespeed.web.dev](https://pagespeed.web.dev) | Score mobile et desktop > 90 |
| Google Search Console | [search.google.com/search-console](https://search.google.com/search-console) | Soumettre `sitemap.xml`, vérifier indexation |
| Schema validator | [validator.schema.org](https://validator.schema.org) | Valider les JSON-LD (Organization, BreadcrumbList, Course) |
| Lighthouse | DevTools Chrome | Performance, Accessibilité, SEO, Bonnes pratiques |
| Mobile-Friendly Test | [search.google.com/test/mobile-friendly](https://search.google.com/test/mobile-friendly) | Confirmer responsive |

---

## Modifications futures

### Ajouter une nouvelle page

1. Dupliquer une page existante (ex. `formations-certiphyto.html`).
2. Adapter le contenu, le `<title>`, la `<meta description>`, le `<link rel="canonical">`, le JSON-LD BreadcrumbList.
3. Ajouter l'URL dans `sitemap.xml` et `llms.txt`.
4. Si nécessaire, ajouter un lien dans la nav du header (toutes les pages).

### Modifier les couleurs ou la typo

Tout est centralisé dans `assets/css/styles.css` → section **2. CSS VARIABLES**. Modifier les variables `--color-*` ou `--font-sans`.

### Ajouter une page Marchés publics (prévue plus tard)

Quand les documents seront collectés (catalogue PDF, KBIS, FDS, attestations), créer `marches-publics.html` sur le modèle de `formations-certiphyto.html` avec une zone de téléchargements.

---

## Sécurité — Pourquoi ce setup ?

Le site WordPress précédent était compromis en profondeur (backdoors persistantes). Ce site supprime la cause racine :

- **Aucune base de données** → aucune injection SQL possible
- **Aucun panneau d'admin** → aucun login à brute-forcer
- **Aucun plugin** → aucun CVE à patcher en urgence
- **Code source figé** → toute modification non autorisée serait immédiatement visible dans le dépôt Git
- **Headers de sécurité durcis** (HSTS, CSP, X-Frame-Options, etc.) via `.htaccess`

La surface d'attaque devient comparable à celle d'un site institutionnel statique.

---

## Contact technique

Pour toute évolution ou question technique sur le site : [coordonnées du consultant à compléter].

Le code source est la propriété d'ED Collectivités. Hébergé sur GitHub à l'adresse : [URL du repo à compléter].
