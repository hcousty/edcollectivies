# ED Collectivités — Design Guidelines

> Charte à réutiliser pour tout nouveau projet (ex. catalogue produit) afin de
> garantir la cohérence visuelle avec le site ed-collectivites.fr.
> Colle ce document au début d'un nouveau projet pour bootstrapper le design.

---

## 1. Identité & ton

- **Positionnement** : institutionnel, sobre, expert (référence visuelle : Banque des Territoires)
- **Cible** : collectivités locales françaises (mairies, intercommunalités, syndicats publics)
- **Ton** : professionnel, vouvoiement, vocabulaire métier précis (Certiphyto, EPCI, FDS…), zéro jargon marketing
- **Tagline** : « Au service des espaces publics »

---

## 2. Couleurs

### Couleurs de marque
| Rôle | Token | Hex |
|------|-------|-----|
| **Bleu officiel** (primaire) | `navy-800` | `#072644` |
| Navy foncé (hover) | `navy-900` | `#051a30` |
| Bleu poudré clair (fonds doux) | `navy-50` | `#eaf0f6` |
| Bleu poudré moyen (bordures) | `navy-100` | `#d4dee8` |
| **Rouge officiel** (accent) | `coral-500` | `#DD1523` |
| Rouge foncé (hover) | `coral-600` | `#c91220` |
| Rose poudré clair (fonds doux) | `coral-50` | `#fde8eb` |
| Vert éco (signaux environnementaux) | `eco-600` | `#3d6b42` |

### Neutres
| Rôle | Hex |
|------|-----|
| Fond principal (blanc) | `#ffffff` |
| Fond cartes / sections alternées (gris doux) | `#f7f6f5` |
| Bordure subtile | `#ecebea` |
| Bordure marquée | `#d6d4d2` |
| Texte principal | `#1a1d2b` |
| Texte secondaire | `#5a5e6e` |
| Texte tertiaire / placeholder | `#92959f` |

### Règles d'usage
- **Le bleu navy domine** (titres, boutons, header, footer).
- **Le rouge est un ACCENT** : eyebrows, soulignements au survol, puces, mot accentué. Jamais en aplat de fond large.
- **Alternance blanc / gris doux** entre sections pour rythmer les pages.
- **Vert éco** réservé aux mentions environnementales (discret).

---

## 3. Typographie

- **Police** : `Source Sans 3` (auto-hébergée via Bunny Fonts, RGPD-friendly)
  ```
  @import url('https://fonts.bunny.net/css?family=source-sans-3:400,500,600,700&display=swap');
  --font-sans: 'Source Sans 3', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  ```
- **Hiérarchie** (sobre, contraste par le poids plus que par la taille) :
  | Élément | Taille | Poids |
  |---------|--------|-------|
  | H1 | clamp ~44→64px | 700 |
  | H2 | clamp ~30→40px | **600** (allégé) |
  | H3 | ~22px | **500** (élégant) |
  | H4 | ~19px | 500 |
  | Corps | ~17px | 400 |
  | Eyebrow | ~13px uppercase, letter-spacing 0.12em | 600, couleur rouge ou muted |
- **Pas de** : très gros titres criards, Inter, serif sur l'UI.

---

## 4. Espacements (échelle)

```
--space-1: 0.25rem (4px)    --space-6: 2rem (32px)
--space-2: 0.5rem  (8px)    --space-7: 3rem (48px)
--space-3: 0.75rem (12px)   --space-8: 4rem (64px)
--space-4: 1rem   (16px)    --space-9: 6rem (96px)
--space-5: 1.5rem (24px)    --space-10: 8rem (128px)
```
- Container max : **1240px**, padding latéral 24px.

---

## 5. Rayons & ombres

| Token | Valeur | Usage |
|-------|--------|-------|
| `radius-sm` | 6px | boutons |
| `radius-md` | 8px | cartes, champs |
| `radius-lg` | 12px | gros blocs |
| `radius-xl` | 16px | bannières, hero |

- **Ombres minimales** : les cartes utilisent surtout des **bordures 1px**, pas d'ombres marquées.
- Institutionnel = sobre. Pas de glow, pas de dégradés criards.

---

## 6. Composants clés

### Boutons (taille unique)
```css
.btn { padding: 0.85rem 1.5rem; border-radius: 6px; font-weight: 500; font-size: 0.9375rem; }
.btn--primary   { background: #072644; color: #fff; }              /* navy plein */
.btn--secondary { background: transparent; color: #072644; border: 1px solid #d6d4d2; }
/* Sur fond sombre : inverser → primaire blanc/texte navy */
```
Hover : assombrir le fond, **pas** de translation/scale.

### Cartes
- Fond blanc (`#fff`) ou gris doux selon la section, bordure 1px `#ecebea`, radius 8px.
- Hover : bordure passe en navy (`#072644`). Pas de transform.
- Égaliser les hauteurs en grille (`align-items: stretch`).

### Eyebrow (sur-titre)
- Petit, uppercase, letter-spacing 0.12em, couleur rouge `#DD1523` (ou muted selon contexte).

### Bandeau d'info / notice
- Bordure-gauche 3px rouge ou vert éco, fond gris doux, icône à gauche.

### Icônes
- Style **Lucide** : stroke 1.5–2, viewBox 24×24, formes simples. Pas d'emojis, pas d'icônes illustratives.

---

## 7. Imagerie
- **Photos réelles** (terrain, équipes, produits, mairies) — éviter les stock photos génériques.
- **Format WebP** (fallback JPEG via `<picture>`), dimensions `width`/`height` explicites (anti-CLS).
- `loading="lazy"` sous la ligne de flottaison, `decoding="async"`.
- Optimiser : viser <200 Ko pour les images de contenu, <300 Ko pour les bannières.

---

## 8. À bannir
- Stock photos génériques (poignées de main, sourires posés)
- Pop-ups intrusifs, carrousels auto, scroll-jacking
- Jargon corporate vide (« leader », « solutions clé en main »)
- Boutons pilule (border-radius full), ombres lourdes, dégradés
- Tirets longs « — » dans les contenus (utiliser « : » ou couper la phrase)
- Plusieurs H1 par page

---

## 9. Pour démarrer le catalogue produit

Copie ce document, puis ouvre une nouvelle session/projet et commence par :

> « Je crée un catalogue produit pour ED Collectivités. Respecte strictement les
> design guidelines ci-jointes (couleurs, typo Source Sans 3, radius, composants
> sobres institutionnels). [coller ce fichier]. Le catalogue doit présenter les
> 6 gammes : Espaces verts, Entretien, Traitement, Nuisibles, Peinture,
> Fournitures. Chaque produit : nom, description, formats, fiche technique, FDS. »

Pour une cohérence maximale, tu peux aussi réutiliser directement le fichier
`assets/css/styles.css` du site (les tokens `:root` et les composants `.btn`,
`.bento`/`.categories`, `.product-section`, etc. sont déjà prêts).
