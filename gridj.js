/*!
 * Gridj v2.1.0 (https://gridj.ru)
 * Copyright 2023 The DjCo.ru Authors
 * Licensed under MIT (https://github.com/Djas420/gridj/-/blob/main/LICENSE)
 */

document.addEventListener('DOMContentLoaded', () => {
	window.initGridJ = (settings) => {
		// Settings localStorage
		let gridjColumn = localStorage.getItem('gridj-column');
		if (!gridjColumn) {
			gridjColumn = 'false';
		}
		let gridjOutline = localStorage.getItem('gridj-outline');
		if (!gridjOutline) {
			gridjOutline = 'false';
		}
		let gridjBackground = localStorage.getItem('gridj-background');
		if (!gridjBackground) {
			gridjBackground = 'false';
		}

		// Generate media query
		let media = '';
		Object.keys(settings.media).forEach((el) => {
			let fix;
			if ('fix' in settings.media[el]) {
				fix = `
					width: ${settings.media[el].fix};
					left: calc((100vw - ${settings.media[el].fix}) / 2);
					`;
			}
			media += `
				@media(min-width: ${el}px) {
					.grid-dj {
						padding: ${settings.media[el].padding};
						gap: ${settings.media[el].gap};
						${!fix ? '' : fix}
					}
				}
			`;
		});

		// Generate style css
		const style = `
			<style class="grid-dj__style">
				.grid-dj {
					box-sizing: border-box;
					position: absolute;
					top: 0;
					width: 100vw;
					height: 100%;
					left: 0;
					z-index: ${settings.zIndexGrid};
					display: flex;
					pointer-events: none;
					visibility: hidden;
				}
				.grid-dj_visible {
					visibility: visible;
				}
				.grid-dj__col {
					flex: auto;
					background-color: ${settings.bgColorColumns};
				}
				.grid-dj__ba--bg::before {
					background: var(--before-bg) ;
				}
				.grid-dj__ba--bg::after {
					background: var(--after-bg) ;
				}
				.grid-dj__ba--outline::before {
					outline: 1px solid var(--outline-before);
				}
				.grid-dj__ba--outline::after {
					outline: 1px solid var(--outline-after);
				}
				${media}
			</style>
		`;

		// Generate columns
		let vw = document.documentElement.clientWidth;
		const mw = Object.keys(settings.media);
		const col = () => {
			let column;
			for (let i = 0; i < mw.length; i += 1) {
				if (Number(mw[i]) <= Number(vw)) {
					column = settings.media[mw[i]].columns;
				} else {
					break;
				}
			}
			return column;
		};
		const columns = (c) => {
			let gridDjCol = '';
			for (let i = 0; i < c; i += 1) {
				gridDjCol += '<grid-dj__col class="grid-dj__col"></grid-dj__col>';
			}
			return gridDjCol;
		};

		// Generate columns HTML
		const gridColumns = `
			${style}
			<grid-dj class="grid-dj${(gridjColumn === 'true') ? ' grid-dj_visible' : ''}">
				${columns(col())}
			</grid-dj>
		`;
		document.querySelector(settings.insertGrid).insertAdjacentHTML('beforeend', gridColumns);

		const grid = document.querySelector('.grid-dj');

		// Resize windows
		function resize() {
			clearTimeout(this.timeOut);
			this.timeOut = setTimeout(() => {
				vw = document.documentElement.clientWidth;
				grid.innerHTML = columns(col());
			}, 100);
		}
		window.addEventListener('resize', resize);

		// Generate random RGB
		function randomInteger() {
			return Math.floor(Math.random() * (256));
		}
		function randomRgbColor() {
			return [randomInteger(), randomInteger(), randomInteger()];
		}

		// Query elements
		const notElementsDefault = ['html', 'head', 'head *', 'meta', 'link', 'style', 'script', '.grid-dj', '.grid-dj__col'];
		const notElements = [...notElementsDefault, ...settings.notElements];
		function allElement() {
			return document.querySelectorAll(`*:not(${notElements.join()})`);
		}

		// show outline elements
		if (gridjOutline === 'true') {
			allElement().forEach((elem) => {
				const el = elem;
				el.style.outline = `1px solid rgb(${randomRgbColor()})`;
			});
		}
		// show backgroundColor elements
		if (gridjBackground === 'true') {
			allElement().forEach((elem) => {
				const el = elem;
				el.style.backgroundColor = `rgba(${randomRgbColor()}, ${settings.bgOpacity})`;
			});
		}

		// Events keydown
		const keyDown = [];
		document.addEventListener('keydown', (e) => {
			if (e.key === 'Alt') {
				e.preventDefault();
				keyDown.push('Alt');
			}
			if (e.code === 'KeyG' && keyDown.includes('Alt')) {
				e.preventDefault();
				grid.classList.toggle('grid-dj_visible');
				gridjColumn = (gridjColumn === 'true') ? 'false' : 'true';
				localStorage.setItem('gridj-column', gridjColumn);
			}
			if (e.code === 'KeyO' && keyDown.includes('Alt')) {
				e.preventDefault();
				gridjOutline = (gridjOutline === 'true') ? 'false' : 'true';
				localStorage.setItem('gridj-outline', gridjOutline);

				allElement().forEach((elem) => {
					const el = elem;
					if (gridjOutline === 'true') {
						el.style.outline = `1px solid rgb(${randomRgbColor()})`;

						el.classList.add('grid-dj__ba--outline');
						el.style.setProperty("--outline-before", `rgba(${randomRgbColor()}, ${settings.bgOpacity})`);
						el.style.setProperty("--outline-after", `rgba(${randomRgbColor()}, ${settings.bgOpacity})`);

					} else {
						el.style.outline = '';
						el.classList.remove('grid-dj__ba--outline');
					}
				});
			}
			if (e.code === 'KeyB' && keyDown.includes('Alt')) {
				e.preventDefault();
				gridjBackground = (gridjBackground === 'true') ? 'false' : 'true';
				localStorage.setItem('gridj-background', gridjBackground);

				allElement().forEach((elem) => {
					const el = elem;
					if (gridjBackground === 'true') {
						el.style.backgroundColor = `rgba(${randomRgbColor()}, ${settings.bgOpacity})`;

						el.classList.add('grid-dj__ba--bg');
						el.style.setProperty("--before-bg", `rgba(${randomRgbColor()}, ${settings.bgOpacity})`);
						el.style.setProperty("--after-bg", `rgba(${randomRgbColor()}, ${settings.bgOpacity})`);

					} else {
						el.style.backgroundColor = '';
						el.classList.remove('grid-dj__ba--bg');
					}
				});
			}
		});
		document.addEventListener('keyup', (e) => {
			if (e.key === 'Alt') {
				keyDown.splice(0, keyDown.length);
			}
		});
	};
}, false);
