import type { SvelteComponent } from 'svelte';
import { writable } from 'svelte/store';

const view = writable<typeof SvelteComponent>(null);

export default view;