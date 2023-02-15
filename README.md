# Gridj

## Description

Display the grid on the site during frontend development.

Add the gridj.js file to your project.

Set up the grid like a designer.

```javascript
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
