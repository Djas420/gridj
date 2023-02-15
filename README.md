# Gridj

## Description

Display the grid on the site during frontend development.

## Quick start

### Install

This package can be installed with:

[npm](https://www.npmjs.com/package/@djas420/gridj): `npm i -D @djas420/gridj`

#### Static HTML

Place the script before the closing "body" tag:

```html
<script src="/node_modules/@djas420/gridj/gridj.js"></script>
```

Next, set up the grid as a designer.

```javascript
document.addEventListener('DOMContentLoaded', () => {
  initGridJ({
    bgColor: 'rgba(255, 0, 0, 0.2)', // Grid color
    media: {
      320: { // breakpoint
        padding: '0 15px', // Grid indent
        gap: '15px', // Column indent
        columns: 4, // Number of columns
      },
      920: {
        padding: '0',
        gap: 'calc(15px + (30 - 15) * (100vw - 920px) / (1200 - 920))', // Dynamic column padding
        columns: 6,
      },
      1200: {
        padding: '0 15px',
        gap: '15px',
        columns: 12,
        fix: '1000px', // Fixed grid width
      },
    },
  });
}, false);
```

Configuring Dynamic Column Padding:

calc(15px + (30 - 15) * (100vw - 920px) / (1200 - 920))

'15' — min offset value

'30' — max offset value

'920' — min breakpoint

'1200' — max breakpoint

## Managing grid display

Show/Hide — Alt + G

## Information

Official site [https://gridj.ru](https://gridj.ru) (in developing).

Email for feedback and suggestions [info@gridj.ru](mailto:info@gridj.ru)
