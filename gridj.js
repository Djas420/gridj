/*!
 * Gridj v1.0.0 (https://gridj.ru)
 * Copyright 2023 The DjCo.ru Authors
 * Licensed under MIT (https://gitlab.com/Djas420/gridj/LICENSE)
 */

document.addEventListener('DOMContentLoaded', () => {
	const initGridJ = (settings) => {
		let visible;
		const gridjHidden = localStorage.getItem('gridj-open');
		if (gridjHidden) {
			visible = gridjHidden;
		} else {
			visible = 'true';
		}

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

		const style = `
			<style class="grid-dj__style">
				.grid-dj {
					box-sizing: border-box;
					position: fixed;
					top: 0;
					bottom: 0;
					left: 0;
					width: 100vw;
					z-index: 2147483647;
					display: flex;
					pointer-events: none;
				}
				.grid-dj_hidden {
					display: none;
				}
				.grid-dj__col {
					flex: auto;
					background-color: ${settings.bgColor};
				}
				${media}
			</style>
		`;

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

		const gridDj = `
			${style}
			<grid-dj class="grid-dj${(visible === 'true') ? '' : ' grid-dj_hidden'}">
				${columns(col())}
			</grid-dj>
		`;

		document.body.insertAdjacentHTML('beforeend', gridDj);

		window.addEventListener('resize', () => {
			vw = document.documentElement.clientWidth;
			document.getElementsByClassName('grid-dj')[0].innerHTML = columns(col());
		});

		let key = [];

		document.addEventListener('keydown', (event) => {
			if (event.key === 'Alt') {
				key = [];
				key.push('Alt');
			}
			if (event.code === 'KeyG') {
				if (key.includes('Alt')) {
					event.preventDefault();
					document.getElementsByClassName('grid-dj')[0].classList.toggle('grid-dj_hidden');
					localStorage.setItem('gridj-open', (visible === 'true') ? 'false' : 'true');
				}
				key = [];
			}
		});
	};

	initGridJ({
		bgColor: 'rgba(255, 0, 0, 0.2)',
		media: {
			320: {
				padding: '0 15px',
				gap: '15px',
				columns: 4,
			},
			920: {
				padding: '0',
				gap: 'calc(15px + (30 - 15) * (100vw - 920px) / (1200 - 920))',
				columns: 6,
			},
			1200: {
				padding: '0 15px',
				gap: '15px',
				columns: 12,
				fix: '1000px',
			},
		},
	});
}, false);
