import { writable } from 'svelte/store';

const loader = writable<boolean>(false);

export default loader;