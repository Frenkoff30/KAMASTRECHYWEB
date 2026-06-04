# KAMA STŘECHY — Web Jiřího Švece

Osobní web pokrývačské a klempířské firmy **KAMA STŘECHY** (Jiří Švec, Hlinsko).  
Čistý HTML/CSS/JS projekt bez frameworků — snadno upravitelný i bez programátorských zkušeností.

---

## 🗂 Struktura projektu

```
kama-strechy/
├── index.html          ← celý web (jedna stránka)
├── css/
│   └── style.css       ← veškeré styly
├── js/
│   └── main.js         ← interakce (menu, galerie, formulář)
├── images/
│   ├── logo.png        ← logo firmy
│   ├── galerie/        ← fotky realizací (jpg, png, webp)
│   └── partneri/       ← loga partnerů
└── php/
    └── contact.php     ← odesílání formuláře na e-mail
```

---

## 📸 Jak přidat fotky do galerie

1. Zkopíruj fotky do složky `images/galerie/`
2. V `index.html` najdi sekci `<!-- GALLERY -->` a uvnitř každého `.gallery-placeholder` přidej:
```html
<img src="images/galerie/nazev-fotky.jpg" alt="Popis realizace">
```
3. Ulož, commitni a pushni:
```bash
git add .
git commit -m "přidány fotky do galerie"
git push
```

---

## 🏢 Loga partnerů

Vlož loga (PNG s průhledným pozadím) do `images/partneri/` a v `index.html` najdi sekci `<!-- PARTNERS -->`:
```html
<img src="images/partneri/logo-partnera.png" alt="Název partnera" class="partner-logo">
```

---

## 📬 Kontaktní formulář

Formulář odesílá data přes `php/contact.php` na adresu **strechykama@seznam.cz**.

> ⚠️ PHP funguje pouze na hostingu — lokálně (otevření přes `index.html` v prohlížeči) formulář nefunguje. Doporučujeme hosting **Wedos** nebo **Forpsi** (od ~50 Kč/měsíc).

---

## 🚀 Nasazení na hosting

1. Nahraj celou složku `kama-strechy/` na FTP hosting
2. Ujisti se, že hosting podporuje PHP 8+
3. Hotovo — web běží

### GitHub Pages (zdarma, bez formuláře)
Settings → Pages → Branch: `main` → `/root` → Save  
Web bude na: `frenkoff30.github.io/KAMASTRECHYWEB`

---

## ✏️ Časté úpravy

| Co chceš změnit | Kde to najdeš |
|---|---|
| Telefon / e-mail | `index.html` → sekce `#kontakt` |
| Texty služeb | `index.html` → sekce `#sluzby` |
| Barvy | `css/style.css` → `:root { --orange: ... }` |
| Odesílací e-mail | `php/contact.php` → `$to = '...'` |
| Statistiky v hero | `index.html` → `.hero-stats` |

---

## 🛠 Technologie

- **HTML5 / CSS3 / Vanilla JS** — žádné frameworky
- **Bebas Neue + DM Sans** — Google Fonts
- **PHP 8** — pouze pro kontaktní formulář

---

*Vytvořeno s ❤️ pro tátu — Hlinsko 2025*
