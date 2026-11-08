# FTML Viewer Minimal

<img width="874" height="249" alt="Screenshot from 2026-11-08 16-06-25" src="https://github.com/user-attachments/assets/ec67d5a5-5713-479a-aa97-db9355c1e3f0" />

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
