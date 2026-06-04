# KAMA STŘECHY

Web pro tátu. Pokrývačství a klempířství z Hlinska, co dělá střechy od roku 2001.

Žádný framework, žádný build proces — jen HTML, CSS, JavaScript a trocha PHP na formulář.

## Co kde je

```
index.html        — celý web
css/style.css     — styly
js/main.js        — menu, galerie, formulář
php/contact.php   — odesílání mailu
images/galerie/   — sem patří fotky realizací
images/partneri/  — sem patří loga partnerů
```

## Fotky do galerie

Hoď fotky do `images/galerie/` a v `index.html` v sekci galerie přidej dovnitř `.gallery-placeholder`:

```html
<img src="images/galerie/strecha1.jpg" alt="Popis">
```

## Formulář

Funguje jen na hostingu s PHP — lokálně ne. Mail chodí na `strechykama@seznam.cz`, změnit to jde v `php/contact.php` na řádku s `$to`.

## Časté změny

- telefon / mail → `index.html`, sekce kontakt
- barvy → `css/style.css`, proměnná `--orange`
- texty služeb → `index.html`, sekce služby
