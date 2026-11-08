# FTML Viewer Minimal

Eine minimale FloDown-Demo: Der Text `Auto Computation` wird als FTML-
Symbolreferenz gerendert. Beim Hover beziehungsweise Klick kann FloDown die
Definition über MathHub anzeigen.

## Starten

```bash
npm install
npm run dev
```

Danach die von Vite ausgegebene lokale URL öffnen.

Die FloDown-Browserdatei liegt unter
[`public/flodown/flodown.js`](public/flodown/flodown.js). Als Backend wird
`https://mathhub.info` verwendet.

## Produktionsbuild

```bash
npm run build
npm run preview
```
