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
