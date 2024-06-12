import { writable } from 'svelte/store';

export const isActive = writable(false);
export const icon = writable({
    animalName: 'Panda',
    animalIcon: '🐼',
    animalBackground: '../lib/images/panda.jpg',
    animalGradient:
        'linear-gradient(to bottom right, var(--color-text), var(--color-accent-blue), var(--color-accent-lilac))'
});
export const audioFile = writable();