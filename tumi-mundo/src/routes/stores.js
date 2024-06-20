import { writable } from 'svelte/store';

// tells if animation should be included or not
export let isActive = writable(false);

// Tells which animal is checked
export const icon = writable({
	animalName: 'Panda',
	animalIcon: '🐼',
	animalBackground: '../lib/images/panda.jpg',
	animalGradient:
		'linear-gradient(to bottom right, var(--color-text), var(--color-accent-blue), var(--color-accent-lilac))'
});

// get audio file
export const audioFile = writable('HF-list1.wav');
