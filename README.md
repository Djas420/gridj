# Gridj

## Description

The ability to display the grid on the site during the development of the interface and not only…
As well as the outline of the elements and the background of the elements

## Quick start

### Install

This package can be installed with:

npm
npm i -D @djas420/gridj

And:

GitHub
git clone https://github.com/Djas420/gridj.git

#### Static HTML

Place the script before the closing body tag if using npm:

```html
<script src="/node_modules/@djas420/gridj/gridj.min.js"></script>
```

The number of breakpoints is not limited and you set them yourself, below is an example.

```javascript
document.addEventListener('DOMContentLoaded', () => {
 initGridJ({
  insertGrid: 'body', // The element to insert the grid (tag, .class, #id), set the element to position: relative;
  zIndexGrid: 100, // Set z-index for grid
  bgColorColumns: 'rgba(255, 0, 0, 0.2)', // Grid color
  notElements: ['body'], // List of exclusion items for "gridjOutline" and "gridjBackground"
  bgOpacity: 1, // Element background transparency
  media: {
   320: { // Breakpoint
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

## Control the display

Enable/disable grid display using keyboard shortcut MacOs&nbsp;(Option&nbsp;G) Linux/Windows&nbsp;(Alt&nbsp;G)

Turn on/off the display of layering using the keyboard shortcut MacOs&nbsp;(Option&nbsp;O) Linux/Windows&nbsp;(Alt&nbsp;O)

Turn background display on/off using keyboard shortcut MacOs&nbsp;(Option&nbsp;B) Linux/Windows&nbsp;(Alt&nbsp;B)

## From the author

How to calculate the exact width of an element?
For example, if there are 12 columns and the element should occupy 4 columns?
Here is the solution:

```css
.elem {
 width: calc(((100% - (((30px * 12) / 4) - 30px)) / 12) * 4);
}
```

Setting the width of the element:

calc(((100% - (((30px * 12) / 4) - 30px)) / 12) * 4)

'12' — number of columns

'30px' — indent between columns

'4' — how many columns to occupy

## Information

Official site [https://gridj.ru](https://gridj.ru) (in developing).

Email for feedback and suggestions [info@gridj.ru](mailto:info@gridj.ru)

## For designers

Interested in participating in an open project, write to email [design@gridj.ru](mailto:design@gridj.ru)
